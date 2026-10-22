# Portafolio — Nicolás Zapata

Sitio estático publicado en **https://nicozapatacruz.github.io/** con GitHub Pages.

## Estructura

```
portfolio/
├── index.html, about.html     Páginas principales
├── work/                      Case studies (uno por proyecto)
│   └── neurored-private.html  Página privada cifrada (se genera, no se edita a mano)
├── components/                Nav, footer, lightbox y animaciones (JS compartido)
├── styles/base.css            Estilos compartidos por todas las páginas
├── images/                    Imágenes públicas
├── cv/                        CV en inglés y español
├── og-image.png               Imagen que aparece al compartir el link
└── tools/                     Script y plantilla de la página privada
```

---

## Página privada de Neurored

La política de la empresa no permite publicar material de Neurored, así que esta parte del
case study vive en una página protegida con contraseña: `work/neurored-private.html`.

El contenido de esa página (textos e imágenes) está **cifrado con AES-256**. El archivo que se
publica solo contiene datos ilegibles; el navegador los descifra cuando alguien escribe la
contraseña correcta. Sin contraseña no se puede ver nada, ni siquiera mirando el código fuente.

### La carpeta `portfolio-private`

El contenido original **sin cifrar** está en una carpeta aparte, fuera de este repositorio:

```
~/Downloads/portfolio-private/
└── neurored/
    ├── content.html   Textos y estructura de la página privada
    └── images/        Imágenes sin cifrar (recortes de la documentación en Figma)
```

> ⚠️ **Nunca subas `portfolio-private` a GitHub.** Este repositorio es público: cualquiera
> podría ver esas imágenes sin contraseña. Por eso la carpeta está fuera de `portfolio/`.
>
> **No la borres.** Es necesaria para cambiar el contenido o la contraseña. Si se pierde, la
> página publicada sigue funcionando, pero habría que rehacer las imágenes para modificarla.

### Cambiar el contenido

1. Edita `~/Downloads/portfolio-private/neurored/content.html`.
   - Las imágenes van en `images/` y se enlazan como `src="images/nombre.png"`.
   - Clases disponibles: `section`, `section-label`, `section-title`, `img-full`,
     `img-pair` (dos imágenes lado a lado), `img-narrow`, `img-caption`, `used-in`.
2. Regenera la página:
   ```bash
   cd ~/Downloads/portfolio && node tools/build-private.mjs
   ```
   Pide la contraseña dos veces (no se ve al escribirla; es normal).
3. Sube el nuevo `work/neurored-private.html` a GitHub.

Hay que repetir el paso 2 **cada vez** que cambien los textos o las imágenes.

### Cambiar la contraseña

La contraseña no se guarda en ningún archivo: se fija en el momento de generar la página.
Para cambiarla:

1. Ejecuta el mismo comando y escribe la contraseña nueva:
   ```bash
   cd ~/Downloads/portfolio && node tools/build-private.mjs
   ```
2. Sube el nuevo `work/neurored-private.html` a GitHub.

La contraseña anterior deja de funcionar en cuanto se publica el archivo nuevo. Úsalo también
si compartiste la contraseña con alguien y quieres retirarle el acceso.

**Recomendaciones:** mínimo 10 caracteres (el script no acepta menos); mejor una frase de
varias palabras. Guárdala en un gestor de contraseñas: si se olvida no se puede recuperar,
solo generar la página de nuevo con otra.

### Probar antes de subir

Abre la página con un servidor local (abrir el archivo con doble clic puede no funcionar):

```bash
cd ~/Downloads/portfolio && python3 -m http.server 8000
```

Entra en http://localhost:8000/work/neurored.html, pulsa **Full Docs** (al final de la sección Design System) y prueba la
contraseña. Cierra el servidor con `Ctrl+C`.

---

## Notas

- **`.sf/`**: la crea la extensión de Salesforce de VS Code al abrir esta carpeta. No forma parte
  del sitio y está en `.gitignore`; no hay que subirla.
- **Requisitos del script privado:** Node.js 18 o superior.
