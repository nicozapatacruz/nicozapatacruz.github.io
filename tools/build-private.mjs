#!/usr/bin/env node
// Builds work/neurored-private.html: a password-protected page whose content
// (HTML + images) is encrypted with AES-256-GCM. Only the ciphertext is published —
// without the password, the deployed file reveals nothing.
//
// Usage (from the portfolio folder):
//   node tools/build-private.mjs [source-folder]
//
// source-folder defaults to ../portfolio-private/neurored and must contain
// content.html, which may reference images as <img src="images/…">.
// Keep that folder OUTSIDE the portfolio so the raw images are never deployed.
//
// The password is asked interactively (or read from PRIVATE_PASSWORD).

import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline';
import { webcrypto as crypto } from 'node:crypto';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = resolve(process.argv[2] || join(ROOT, '..', 'portfolio-private', 'neurored'));
const OUT = process.env.PRIVATE_OUT || join(ROOT, 'work', 'neurored-private.html');
const ITERATIONS = 600000;

const MIME = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.gif': 'image/gif', '.svg': 'image/svg+xml' };

function askHidden(question) {
  return new Promise(res => {
    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    rl._writeToOutput = s => { if (s.startsWith(question)) process.stdout.write(question); };
    rl.question(question, answer => { rl.close(); process.stdout.write('\n'); res(answer); });
  });
}

async function getPassword() {
  if (process.env.PRIVATE_PASSWORD) return process.env.PRIVATE_PASSWORD;
  const a = await askHidden('Password: ');
  const b = await askHidden('Repeat password: ');
  if (a !== b) throw new Error('Passwords do not match.');
  if (a.length < 10) throw new Error('Use at least 10 characters — the page can be attacked offline.');
  return a;
}

async function inlineImages(html) {
  const refs = [...new Set([...html.matchAll(/src="([^"]+)"/g)].map(m => m[1]).filter(s => !/^(data:|https?:)/.test(s)))];
  for (const ref of refs) {
    const file = join(SRC, ref);
    const mime = MIME[extname(file).toLowerCase()];
    if (!existsSync(file)) throw new Error(`Image not found: ${file}`);
    if (!mime) throw new Error(`Unsupported image type: ${file}`);
    const data = (await readFile(file)).toString('base64');
    html = html.split(`src="${ref}"`).join(`src="data:${mime};base64,${data}"`);
  }
  return html;
}

async function encrypt(plaintext, password) {
  const enc = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const base = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: ITERATIONS, hash: 'SHA-256' },
    base, { name: 'AES-GCM', length: 256 }, false, ['encrypt']);
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(plaintext));
  const b64 = u => Buffer.from(u).toString('base64');
  return { v: 1, iterations: ITERATIONS, salt: b64(salt), iv: b64(iv), data: b64(new Uint8Array(ct)) };
}

const contentPath = join(SRC, 'content.html');
if (!existsSync(contentPath)) {
  console.error(`Missing ${contentPath}`);
  process.exit(1);
}

try {
  const html = await inlineImages(await readFile(contentPath, 'utf8'));
  const payload = await encrypt(html, await getPassword());
  const template = await readFile(join(ROOT, 'tools', 'private-template.html'), 'utf8');
  const page = template.replace('__PAYLOAD__', () => JSON.stringify(payload));
  await writeFile(OUT, page);
  console.log(`Wrote ${OUT} (${(page.length / 1024 / 1024).toFixed(1)} MB)`);
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
