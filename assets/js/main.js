/**
* Template Name: Nur Group
* Updated: Dec 05 2024 with Bootstrap v5.3.3[cite: 3]
* Author: Nur Group Development Team
* License: Custom License
*/

(function() {
  "use strict";

  /**
   * Add scrolled class to body when page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Toggle mobile navigation menu visibility
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToggle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.classList.toggle('bi-list');
      mobileNavToggleBtn.classList.toggle('bi-x');
    }
  }
  
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToggle);
  }

  /**
   * Hide mobile navigation menu when clicking internal hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToggle();
      }
    });
  });

  /**
   * Toggle dropdown submenus inside mobile navigation
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Remove preloader element once window has finished loading
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Show or hide the scroll to top button based on scroll position
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);
  }

  /**
   * Initialize AOS animation library on window load
   */
  function aosInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  }
  window.addEventListener('load', aosInit);

  /**
   * Initialize GLightbox image preview plugin
   */
  if (typeof GLightbox !== 'undefined') {
    const glightbox = GLightbox({
      selector: '.glightbox'
    });
  }

  /**
   * Animate skill level progress bars when scrolled into view
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    if (typeof Waypoint !== 'undefined') {
      new Waypoint({
        element: item,
        offset: '80%',
        handler: function(direction) {
          let progress = item.querySelectorAll('.progress .progress-bar');
          progress.forEach(el => {
            el.style.width = el.getAttribute('aria-valuenow') + '%';
          });
        }
      });
    }
  });

  /**
   * Initialize PureCounter plugin for numerical count-up effects
   */
  if (typeof PureCounter !== 'undefined') {
    new PureCounter();
  }

  /**
   * Initialize all Swiper slider components on the page
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let configElement = swiperElement.querySelector(".swiper-config");
      if (configElement) {
        let config = JSON.parse(configElement.innerHTML.trim());
        if (swiperElement.classList.contains("swiper-tab")) {
          initSwiperWithCustomPagination(swiperElement, config);
        } else {
          new Swiper(swiperElement, config);
        }
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initialize Isotope grid layouts and filtering controls
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    let container = isotopeItem.querySelector('.isotope-container');
    if (container && typeof imagesLoaded !== 'undefined' && typeof Isotope !== 'undefined') {
      imagesLoaded(container, function() {
        initIsotope = new Isotope(container, {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter: filter,
          sortBy: sort
        });
      });

      isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
        filters.addEventListener('click', function() {
          let activeFilter = isotopeItem.querySelector('.isotope-filters .filter-active');
          if (activeFilter) activeFilter.classList.remove('filter-active');
          this.classList.add('filter-active');
          initIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aosInit === 'function') {
            aosInit();
          }
        }, false);
      });
    }
  });

  /**
   * Toggle accordion state for Frequently Asked Questions items
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Adjust scroll position offset when landing on a page with hash links
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      let section = document.querySelector(window.location.hash);
      if (section) {
        setTimeout(() => {
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop || 0),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

})();

/**
 * Make entire service card clickable for improved user experience
 */
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.service-item').forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function(e) {
            const link = this.querySelector('a');
            if (link && e.target.tagName !== 'A') {
                window.location.href = link.href;
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Create Unique Modal Structure if not exists
    if (!document.getElementById("myUniqueZoomModal")) {
        const modalDiv = document.createElement("div");
        modalDiv.id = "myUniqueZoomModal";
        modalDiv.innerHTML = `
            <div class="modal-box">
                <button class="close-btn">&times;</button>
                <button class="nav-btn prev-btn">&#10094;</button>
                <button class="nav-btn next-btn">&#10095;</button>
                <img id="myUniqueModalImg" src="" alt="Zoom Image">
                <div class="counter-text">Image 1 of 1</div>
            </div>
        `;
        document.body.appendChild(modalDiv);
    }

    const modal = document.getElementById("myUniqueZoomModal");
    const modalImg = document.getElementById("myUniqueModalImg");
    const closeBtn = modal.querySelector(".close-btn");
    const prevBtn = modal.querySelector(".prev-btn");
    const nextBtn = modal.querySelector(".next-btn");
    const counterDiv = modal.querySelector(".counter-text");

    let galleryImages = [];
    let currentIndex = 0;

    let scale = 1;
    let posX = 0, posY = 0;
    let isDragging = false;
    let startX = 0, startY = 0;

    // Collect all zoomable images
    function updateGalleryList() {
        galleryImages = Array.from(document.querySelectorAll(".zoomable-product-img"));
    }

    // Open Modal at Index
    function openModalAtIndex(index) {
        updateGalleryList();
        if (galleryImages.length === 0) return;

        if (index < 0) index = galleryImages.length - 1;
        if (index >= galleryImages.length) index = 0;

        currentIndex = index;
        const targetImg = galleryImages[currentIndex];

        modal.style.display = "block";
        modalImg.src = targetImg.src;
        scale = 1;
        posX = 0;
        posY = 0;
        updateTransform();

        counterDiv.innerText = `Image ${currentIndex + 1} of ${galleryImages.length}`;
    }

    // Click event delegation for images
    document.addEventListener("click", function(e) {
        const targetImg = e.target.closest(".zoomable-product-img");
        if (targetImg) {
            updateGalleryList();
            const index = galleryImages.indexOf(targetImg);
            if (index !== -1) {
                openModalAtIndex(index);
            }
        }
    });

    // Navigation buttons
    prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openModalAtIndex(currentIndex - 1);
    });

    nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openModalAtIndex(currentIndex + 1);
    });

    // Close buttons
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // Keyboard support
    document.addEventListener("keydown", function(e) {
        if (modal.style.display === "block") {
            if (e.key === "Escape") {
                if (scale > 1) {
                    scale = 1;
                    posX = 0;
                    posY = 0;
                    updateTransform();
                } else {
                    modal.style.display = "none";
                }
            } else if (e.key === "ArrowLeft") {
                openModalAtIndex(currentIndex - 1);
            } else if (e.key === "ArrowRight") {
                openModalAtIndex(currentIndex + 1);
            }
        }
    });

    // Mouse wheel zoom
    modalImg.addEventListener("wheel", function(e) {
        e.preventDefault();
        if (e.deltaY < 0) {
            scale += 0.2;
        } else {
            scale -= 0.2;
            if (scale < 1) {
                scale = 1;
                posX = 0;
                posY = 0;
            }
        }
        updateTransform();
    }, { passive: false });

    // Drag / Pan functionality
    modalImg.addEventListener("mousedown", function(e) {
        if (e.button === 0 && scale > 1) {
            isDragging = true;
            startX = e.clientX - posX;
            startY = e.clientY - posY;
            modalImg.style.cursor = "grabbing";
            e.preventDefault();
        }
    });

    window.addEventListener("mouseup", function(e) {
        if (e.button === 0 && isDragging) {
            isDragging = false;
            modalImg.style.cursor = scale > 1 ? "grab" : "default";
        }
    });

    window.addEventListener("mousemove", function(e) {
        if (!isDragging) return;
        posX = e.clientX - startX;
        posY = e.clientY - startY;
        updateTransform();
    });

    function updateTransform() {
        modalImg.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
    }
});