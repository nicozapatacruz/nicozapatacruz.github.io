// Image Lightbox — adds click-to-expand to all .img-full and .img-grid img elements
(function() {
  function initLightbox() {
    // Create overlay
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

    // Styles
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
        border-radius: 8px;
        object-fit: contain;
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
      .img-full, .img-pair img, .img-trio img, .img-grid img, .img-grid-3 img, .project-img, .photo-grid img, .hero-photo img {
        cursor: zoom-in;
        transition: opacity 0.2s;
      }
      .img-full:hover, .img-pair img:hover, .img-trio img:hover,
      .img-grid img:hover, .img-grid-3 img:hover, .project-img:hover, .photo-grid img:hover, .hero-photo img:hover {
        opacity: 0.85;
      }
    `;
    document.head.appendChild(style);

    // Open lightbox
    function openLightbox(img) {
      const lbImg = document.getElementById('lightbox-img');
      const lbCap = document.getElementById('lightbox-caption');
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      // Look for next sibling caption
      const parent = img.closest('.img-full') || img.parentElement;
      const caption = parent && parent.nextElementSibling && parent.nextElementSibling.classList.contains('img-caption')
        ? parent.nextElementSibling.textContent
        : img.alt || '';
      lbCap.textContent = caption;
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Attach to all images
    function attachToImages() {
      const selectors = '.img-full, .img-pair img, .img-trio img, .img-grid img, .img-grid-3 img, .project-img, .photo-grid img, .hero-photo img';
      document.querySelectorAll(selectors).forEach(img => {
        if (!img.dataset.lightbox) {
          img.dataset.lightbox = 'true';
          img.addEventListener('click', () => openLightbox(img));
        }
      });
    }

    attachToImages();

    // Close on overlay click or ESC
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target === document.getElementById('lightbox-inner')) closeLightbox();
    });
    document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLightbox);
  } else {
    initLightbox();
  }
})();
