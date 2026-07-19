class NavBar extends HTMLElement {
  connectedCallback() {
    const base = this.getAttribute('base') || './';

    this.innerHTML = `
      <nav>
        <a class="nav-logo" href="${base}index.html">NZ</a>

        <!-- Desktop links -->
        <ul class="nav-links">
          <li><a href="${base}index.html">Home</a></li>
          <li class="nav-dropdown">
            <button class="nav-drop-btn">Work
              <svg class="drop-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
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

        <!-- Hamburger button (mobile only) -->
        <button class="hamburger" aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
      </nav>

      <!-- Mobile menu overlay -->
      <div class="mobile-menu">
        <div class="mobile-menu-inner">
          <ul class="mobile-links">
            <li><a href="${base}index.html">Home</a></li>
            <li class="mobile-work-toggle">
              <button class="mobile-work-btn">Work
                <svg class="mobile-drop-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <ul class="mobile-work-list">
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
            <li><a href="${base}index.html#contact" class="mobile-cta">Let's talk</a></li>
          </ul>
        </div>
      </div>

      <style>
        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 clamp(1.5rem, 5vw, 3.5rem);
          height: 64px;
          background: rgba(244,241,235,0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 0.5px solid rgba(14,14,12,0.10);
          font-family: 'DM Sans', system-ui, sans-serif;
        }
        .nav-logo {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 1.1rem; color: #0E0E0C; text-decoration: none;
          z-index: 101;
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

        /* Desktop dropdown */
        .nav-dropdown { position: relative; }
        .nav-drop-btn {
          font-size: 0.825rem; font-weight: 400;
          letter-spacing: 0.04em; text-transform: uppercase;
          color: #5A5950; background: none; border: none;
          cursor: pointer; display: flex; align-items: center; gap: 6px;
          padding: 0; font-family: 'DM Sans', system-ui, sans-serif;
          transition: color 0.2s;
        }
        .nav-drop-btn:hover { color: #0E0E0C; }
        .drop-arrow { display: inline-block; transition: transform 0.2s; flex-shrink: 0; }
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
          font-size: 0.85rem; color: #5A5950; text-decoration: none;
          border-radius: 6px; transition: background 0.15s, color 0.15s;
        }
        .dropdown-menu li a:hover { background: #EDE9E1; color: #0E0E0C; }

        /* Hamburger */
        .hamburger {
          display: none;
          flex-direction: column; justify-content: center; gap: 5px;
          width: 36px; height: 36px;
          background: none; border: none; cursor: pointer;
          padding: 4px; z-index: 101;
        }
        .hamburger span {
          display: block; width: 22px; height: 1.5px;
          background: #0E0E0C; border-radius: 2px;
          transition: transform 0.25s, opacity 0.25s;
          transform-origin: center;
        }
        .hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* Mobile menu */
        .mobile-menu {
          display: none;
          position: fixed; inset: 0; z-index: 99;
          background: #F4F1EB;
          padding-top: 64px;
          overflow-y: auto;
        }
        .mobile-menu.open { display: block; }
        .mobile-menu-inner { padding: 2rem clamp(1.5rem, 5vw, 2.5rem); }
        .mobile-links { list-style: none; display: flex; flex-direction: column; gap: 0; }
        .mobile-links > li {
          border-bottom: 0.5px solid rgba(14,14,12,0.10);
        }
        .mobile-links > li > a,
        .mobile-work-btn {
          display: block; width: 100%;
          padding: 1.1rem 0;
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 1.6rem; letter-spacing: -0.01em;
          color: #0E0E0C; text-decoration: none;
          background: none; border: none; cursor: pointer;
          text-align: left;
          display: flex; align-items: center; justify-content: space-between;
        }
        .mobile-work-btn { font-family: 'DM Serif Display', Georgia, serif; font-size: 1.6rem; }
        .mobile-drop-arrow { transition: transform 0.2s; flex-shrink: 0; }
        .mobile-work-toggle.open .mobile-drop-arrow { transform: rotate(180deg); }
        .mobile-work-list {
          display: none; list-style: none;
          padding: 0 0 1rem 1rem;
        }
        .mobile-work-toggle.open .mobile-work-list { display: block; }
        .mobile-work-list li a {
          display: block; padding: 0.6rem 0;
          font-size: 1rem; color: #5A5950; text-decoration: none;
          border-bottom: 0.5px solid rgba(14,14,12,0.06);
          transition: color 0.15s;
        }
        .mobile-work-list li:last-child a { border-bottom: none; }
        .mobile-work-list li a:hover { color: #0E0E0C; }
        .mobile-cta {
          display: inline-block !important;
          margin-top: 1.5rem;
          padding: 0.75rem 1.75rem !important;
          background: #0E0E0C; color: #F4F1EB !important;
          border-radius: 100px;
          font-family: 'DM Sans', system-ui, sans-serif !important;
          font-size: 0.9rem !important; font-weight: 500;
          letter-spacing: 0; text-transform: none;
          border-bottom: none !important;
        }

        @media (max-width: 768px) {
          .nav-links, .nav-cta { display: none; }
          .hamburger { display: flex; }
        }
      </style>
    `

    // Desktop dropdown
    this.querySelector('.nav-drop-btn').addEventListener('click', function(e) {
      e.stopPropagation();
      this.closest('.nav-dropdown').classList.toggle('open');
    });
    document.addEventListener('click', () => {
      const dd = this.querySelector('.nav-dropdown');
      if (dd) dd.classList.remove('open');
    });

    // Hamburger toggle
    const hamburger = this.querySelector('.hamburger');
    const mobileMenu = this.querySelector('.mobile-menu');
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Mobile work dropdown
    const mobileWorkBtn = this.querySelector('.mobile-work-btn');
    mobileWorkBtn.addEventListener('click', () => {
      this.querySelector('.mobile-work-toggle').classList.toggle('open');
    });

    // Close mobile menu on link click
    this.querySelectorAll('.mobile-links a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

customElements.define('nav-bar', NavBar);