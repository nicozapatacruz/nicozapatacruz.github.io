class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer>
        <p>© 2025 Nicolás Zapata Cruz — Madrid, Spain</p>
        <p>Designed & built by hand</p>
      </footer>

      <style>
        footer {
          background: #0E0E0C;
          border-top: 0.5px solid rgba(255,255,255,0.08);
          padding: 1.5rem clamp(1.5rem, 5vw, 3.5rem);
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 1rem;
          font-family: 'DM Sans', system-ui, sans-serif;
        }
        footer p { font-size: 0.78rem; color: rgba(255,255,255,0.3); }
      </style>
    `;
  }
}

customElements.define('site-footer', SiteFooter);
