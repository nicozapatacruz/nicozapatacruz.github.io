// Image Lightbox — click to expand any image
(function() {
  function initLightbox() {
    const overlay = document.createElement('div');
    overlay.id = 'lightbox-overlay';
    overlay.innerHTML = `
      <div id="lightbox-inner">
        <button id="lightbox-close">✕</button>
        <img id="lightbox-img" src="" alt="" />
        <p id="lightbox-caption"></p>
      </div>
    `;
    document.body.appendChild(overlay);

    const style = document.createElement('style');
    style.textContent = `
      #lightbox-overlay {
        display: none;
        position: fixed; inset: 0; z-index: 9999;
        background: rgba(10,10,10,0.92);
        align-items: center; justify-content: center;
        padding: 2rem;
        cursor: zoom-out;
      }
      #lightbox-overlay.active { display: flex; }
      #lightbox-inner {
        position: relative;
        max-width: 90vw; max-height: 90vh;
        display: flex; flex-direction: column; align-items: center; gap: 1rem;
        cursor: default;
      }
      #lightbox-img {
        max-width: 100%; max-height: 82vh;
        border-radius: 8px; object-fit: contain;
        box-shadow: 0 24px 64px rgba(0,0,0,0.5);
      }
      #lightbox-caption {
        font-family: 'DM Sans', system-ui, sans-serif;
        font-size: 0.82rem; color: rgba(255,255,255,0.5);
        text-align: center; max-width: 600px; margin: 0;
      }
      #lightbox-close {
        position: absolute; top: -2.5rem; right: 0;
        background: none; border: none;
        color: rgba(255,255,255,0.6); font-size: 1.1rem;
        cursor: pointer; padding: 0.25rem 0.5rem;
        transition: color 0.15s;
      }
      #lightbox-close:hover { color: #fff; }
      .img-full, .img-pair img, .img-trio img,
      .img-grid img, .img-grid-3 img, .project-img,
      .photo-grid img, .hero-photo img { cursor: zoom-in; transition: opacity 0.2s; }
      .img-full:hover, .img-pair img:hover, .img-trio img:hover,
      .img-grid img:hover, .img-grid-3 img:hover, .project-img:hover,
      .photo-grid img:hover, .hero-photo img:hover { opacity: 0.85; }
      @media (max-width: 768px) {
        #lightbox-overlay { padding: 0; }
        #lightbox-inner { max-width: 100vw; width: 100vw; max-height: 100vh; gap: 0; }
        #lightbox-img { max-width: 100vw; width: 100vw; max-height: 90vh; border-radius: 0; box-shadow: none; }
        #lightbox-close {
          position: fixed; top: 1rem; right: 1rem;
          background: rgba(0,0,0,0.5); border-radius: 50%;
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.9rem; color: #fff; top: 1rem;
        }
        #lightbox-caption { padding: 0.75rem 1rem; font-size: 0.75rem; }
      }
    `;
    document.head.appendChild(style);

    function openLightbox(img) {
      document.getElementById('lightbox-img').src = img.src;
      document.getElementById('lightbox-img').alt = img.alt;
      const parent = img.closest('.img-full') || img.parentElement;
      const next = parent && parent.nextElementSibling;
      const caption = (next && next.classList.contains('img-caption')) ? next.textContent : img.alt || '';
      document.getElementById('lightbox-caption').textContent = caption;
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    function attachToImages() {
      const sel = '.img-full, .img-pair img, .img-trio img, .img-grid img, .img-grid-3 img, .project-img, .photo-grid img, .hero-photo img';
      document.querySelectorAll(sel).forEach(img => {
        if (!img.dataset.lightbox) {
          img.dataset.lightbox = 'true';
          img.addEventListener('click', (e) => { e.stopPropagation(); openLightbox(img); });
        }
      });
    }

    attachToImages();
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeLightbox(); });
    document.getElementById('lightbox-close').addEventListener('click', (e) => { e.stopPropagation(); closeLightbox(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLightbox);
  } else {
    initLightbox();
  }
})();
