/**
 * Performance 7 Gastronomia
 * Client-side interactions for reveal animations, menu-image buttons,
 * magnetic links and the current copyright year.
 */
(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  /**
   * Activates elements as they enter the viewport. When IntersectionObserver
   * is unavailable, or reduced motion is requested, all elements are shown
   * immediately.
   */
  const initializeRevealAnimations = () => {
    const revealElements = document.querySelectorAll('[data-reveal]');

    if (!('IntersectionObserver' in window) || prefersReducedMotion) {
      revealElements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px'
      }
    );

    revealElements.forEach((element) => observer.observe(element));
  };

  /**
   * Opens the image configured in each menu button's `data-menu-image`
   * attribute in a new browser tab.
   */
  const initializeMenuImageButtons = () => {
    document.querySelectorAll('[data-menu-image]').forEach((button) => {
      button.addEventListener('click', () => {
        const imageUrl = button.dataset.menuImage;

        if (!imageUrl) {
          return;
        }

        window.open(imageUrl, '_blank', 'noopener,noreferrer');
      });
    });
  };

  /**
   * Adds a subtle pointer-following movement to elements marked as magnetic.
   * The effect is limited to devices with a precise pointer.
   */
  const initializeMagneticElements = () => {
    const supportsFinePointer = window.matchMedia('(pointer: fine)').matches;

    if (prefersReducedMotion || !supportsFinePointer) {
      return;
    }

    document.querySelectorAll('[data-magnetic]').forEach((element) => {
      element.addEventListener('pointermove', (event) => {
        const bounds = element.getBoundingClientRect();
        const horizontalOffset =
          (event.clientX - bounds.left - bounds.width / 2) * 0.09;
        const verticalOffset =
          (event.clientY - bounds.top - bounds.height / 2) * 0.12;

        element.style.transform = `translate(${horizontalOffset}px, ${verticalOffset}px)`;
      });

      element.addEventListener('pointerleave', () => {
        element.style.transform = '';
      });
    });
  };

  /**
   * Keeps the copyright year current while preserving the HTML fallback.
   */
  const updateCurrentYear = () => {
    const currentYear = String(new Date().getFullYear());

    document.querySelectorAll('[data-current-year]').forEach((element) => {
      element.textContent = currentYear;
    });
  };

  initializeRevealAnimations();
  initializeMenuImageButtons();
  initializeMagneticElements();
  updateCurrentYear();
})();
