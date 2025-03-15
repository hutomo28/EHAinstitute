/**
* Template Name: eStartup
* Template URL: https://bootstrapmade.com/estartup-bootstrap-landing-page-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
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
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
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
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

})();

document.addEventListener("DOMContentLoaded", () => {
  let gallery = document.getElementById("gallery");
  let images = document.querySelectorAll(".gallery img");
  let currentIndex = 0;
  let scale = 1, moveX = 0, moveY = 0;
  let startX, isDragging = false, dragStartX;

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  function updateGallery() {
      gallery.style.transform = `translateX(${-currentIndex * 100}%)`;
  }

  function nextImage() {
      if (currentIndex < images.length - 1) {
          currentIndex++;
          resetZoom();
          updateGallery();
      }
  }

  function prevImage() {
      if (currentIndex > 0) {
          currentIndex--;
          resetZoom();
          updateGallery();
      }
  }

  images.forEach((img, index) => {
      img.addEventListener("wheel", (e) => {
          e.preventDefault();
          if (index === currentIndex) {
              scale += e.deltaY * -0.001;
              scale = Math.min(Math.max(1, scale), 3);
              img.style.transform = `scale(${scale}) translate(${moveX}px, ${moveY}px)`;
          }
      });

      img.addEventListener("mousedown", (e) => {
          if (scale > 1) {
              startX = e.clientX - moveX;
              moveY = e.clientY - moveY;
              img.style.cursor = "grabbing";
              document.addEventListener("mousemove", onMove);
              document.addEventListener("mouseup", () => {
                  img.style.cursor = "grab";
                  document.removeEventListener("mousemove", onMove);
              });
          } else {
              isDragging = true;
              dragStartX = e.clientX;
          }
      });

      img.addEventListener("mouseup", (e) => {
          if (isDragging) {
              let dragEndX = e.clientX;
              let diff = dragStartX - dragEndX;
              if (diff > 50) nextImage();
              if (diff < -50) prevImage();
              isDragging = false;
          }
      });

      function onMove(e) {
          moveX = e.clientX - startX;
          img.style.transform = `scale(${scale}) translate(${moveX}px, ${moveY}px)`;
      }
  });

  function resetZoom() {
      scale = 1;
      moveX = 0;
      moveY = 0;
      images.forEach(img => img.style.transform = "scale(1)");
  }

  prevBtn.addEventListener("click", prevImage);
  nextBtn.addEventListener("click", nextImage);
});

const gallery = document.getElementById("gallery");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0; // Slide ke berapa sekarang
const totalImages = document.querySelectorAll(".gallery img").length;

function updateSlide() {
    gallery.style.transform = `translateX(-${currentIndex * 100}%)`;
}

nextBtn.addEventListener("click", () => {
    if (currentIndex < totalImages - 1) {
        currentIndex++;
        updateSlide();
    }
});

prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlide();
    }
});
