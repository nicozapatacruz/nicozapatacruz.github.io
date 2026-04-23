class NavBar extends HTMLElement {
  connectedCallback() {
    const base = this.getAttribute('base') || './';

    this.innerHTML = `
      <nav>
        <a class="nav-logo" href="${base}index.html">NZ</a>
        <ul class="nav-links">
          <li><a href="${base}index.html">Home</a></li>
          <li class="nav-dropdown">
            <button class="nav-drop-btn">Work <span class="drop-arrow">⌄</span></button>
            <ul class="dropdown-menu">
              <li><a href="${base}work/neurored.html">Neurored</a></li>
              <li><a href="${base}work/prime-scout.html">Prime Scout</a></li>
              <li><a href="${base}work/singular-things.html">Singular Things</a></li>
              <li><a href="${base}work/master-ux.html">Master in UX</a></li>
              <li><a href="${base}work/neu.html">NEU Energy</a></li>
              <li><a href="${base}work/bachelors.html">Bachelor's</a></li>
            </ul>
          </li>
          <li><a href="${base}index.html#experience">Experience</a></li>
          <li><a href="${base}about.html">About</a></li>
        </ul>
        <a class="nav-cta" href="${base}index.html#contact">Let's talk</a>
      </nav>

      <style>
        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 clamp(1.5rem, 5vw, 3.5rem);
          height: 64px;
          background: rgba(244,241,235,0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 0.5px solid rgba(14,14,12,0.10);
          font-family: 'DM Sans', system-ui, sans-serif;
        }
        .nav-logo {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 1.1rem; color: #0E0E0C; text-decoration: none;
        }
        .nav-links {
          display: flex; gap: 2rem; list-style: none; align-items: center;
        }
        .nav-links a {
          font-size: 0.825rem; font-weight: 400;
          letter-spacing: 0.04em; text-transform: uppercase;
          color: #5A5950; text-decoration: none; transition: color 0.2s;
        }
        .nav-links a:hover { color: #0E0E0C; }
        .nav-cta {
          font-size: 0.825rem; font-weight: 500;
          color: #2B4FFF; text-decoration: none;
          border: 1px solid #2B4FFF; padding: 0.4rem 1rem;
          border-radius: 100px; transition: background 0.2s, color 0.2s;
        }
        .nav-cta:hover { background: #2B4FFF; color: #fff; }
        .nav-dropdown { position: relative; }
        .nav-drop-btn {
          font-size: 0.825rem; font-weight: 400;
          letter-spacing: 0.04em; text-transform: uppercase;
          color: #5A5950; background: none; border: none;
          cursor: pointer; display: flex; align-items: center; gap: 0.3rem;
          padding: 0; font-family: 'DM Sans', system-ui, sans-serif;
          transition: color 0.2s;
        }
        .nav-drop-btn:hover { color: #0E0E0C; }
        .drop-arrow { font-size: 1rem; font-weight: 600; transition: transform 0.2s; display: inline-block; line-height: 0.8; position: relative; top: 1px; }
        .nav-dropdown.open .drop-arrow { transform: rotate(180deg); }
        .dropdown-menu {
          display: none; position: absolute;
          top: calc(100% + 1rem); left: 50%; transform: translateX(-50%);
          background: #F4F1EB; border: 0.5px solid rgba(14,14,12,0.10);
          border-radius: 10px; padding: 0.5rem;
          list-style: none; min-width: 180px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08); z-index: 200;
        }
        .nav-dropdown.open .dropdown-menu { display: block; }
        .dropdown-menu li a {
          display: block; padding: 0.5rem 0.85rem;
          font-size: 0.85rem; font-weight: 400;
          color: #5A5950; text-decoration: none;
          border-radius: 6px;
          transition: background 0.15s, color 0.15s;
          letter-spacing: 0; text-transform: none;
        }
        .dropdown-menu li a:hover { background: #EDE9E1; color: #0E0E0C; }
        @media (max-width: 768px) { .nav-links { display: none; } }
      </style>
    `;

    this.querySelector('.nav-drop-btn').addEventListener('click', function(e) {
      e.stopPropagation();
      this.closest('.nav-dropdown').classList.toggle('open');
    });

    document.addEventListener('click', () => {
      const dd = this.querySelector('.nav-dropdown');
      if (dd) dd.classList.remove('open');
    });
  }
}

customElements.define('nav-bar', NavBar);
