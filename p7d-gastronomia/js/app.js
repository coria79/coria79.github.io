(() => {
  'use strict';

  const header = document.querySelector('[data-header]');
  const nav = document.querySelector('[data-nav]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const modal = document.querySelector('[data-modal]');
  const modalPanel = document.querySelector('[data-modal-panel]');
  const modalTitle = document.querySelector('#modal-title');
  const modalDescription = document.querySelector('[data-modal-description]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let lastFocusedElement = null;

  const menuCopy = {
    kebab: ['Menù Kebab', 'Un esempio di carta digitale dedicata a panini, piadine, piatti e box.'],
    pizza: ['Menù Pizze', 'Una presentazione pulita per pizze classiche, speciali e stagionali.'],
    street: ['Menù Street Food', 'Categorie rapide, immagini invitanti e navigazione immediata da smartphone.'],
    sushi: ['Menù Sushi', 'Un menù elegante per uramaki, nigiri, sashimi e specialità dello chef.'],
    demo: ['Menù digitale', 'Un esempio di apertura su vetro satinato con sfondo sfocato.']
  };

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 34);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      nav.classList.toggle('is-open', !isOpen);
    });
    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    reveals.forEach((element) => observer.observe(element));
  } else {
    reveals.forEach((element) => element.classList.add('is-visible'));
  }

  const tilt = document.querySelector('[data-tilt]');
  const tiltFrame = tilt?.querySelector('.hero-frame');
  if (tilt && tiltFrame && !prefersReducedMotion && matchMedia('(pointer:fine)').matches) {
    tilt.addEventListener('pointermove', (event) => {
      const rect = tilt.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      tiltFrame.style.transform = `rotateY(${x * 6}deg) rotateX(${y * -5}deg) translateZ(0)`;
    });
    tilt.addEventListener('pointerleave', () => {
      tiltFrame.style.transform = '';
    });
  }

  if (!prefersReducedMotion && matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.magnetic').forEach((element) => {
      element.addEventListener('pointermove', (event) => {
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * 0.09;
        const y = (event.clientY - rect.top - rect.height / 2) * 0.12;
        element.style.transform = `translate(${x}px, ${y}px)`;
      });
      element.addEventListener('pointerleave', () => {
        element.style.transform = '';
      });
    });
  }

  const openModal = (type = 'demo') => {
    if (!modal || !modalPanel) return;
    lastFocusedElement = document.activeElement;
    const [title, description] = menuCopy[type] || menuCopy.demo;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    requestAnimationFrame(() => modalPanel.focus());
  };

  const closeModal = () => {
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
  };

  document.querySelectorAll('[data-open-menu]').forEach((button) => {
    button.addEventListener('click', () => openModal(button.dataset.openMenu));
  });
  document.querySelectorAll('[data-open-demo]').forEach((button) => {
    button.addEventListener('click', () => openModal('demo'));
  });
  document.querySelectorAll('[data-close-modal]').forEach((button) => {
    button.addEventListener('click', closeModal);
  });

  document.querySelectorAll('.menu-card').forEach((card) => {
    card.addEventListener('keydown', (event) => {
      if ((event.key === 'Enter' || event.key === ' ') && event.target === card) {
        event.preventDefault();
        openModal(card.dataset.menu);
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal && !modal.hidden) closeModal();
    if (event.key === 'Tab' && modal && !modal.hidden) {
      const focusable = [...modalPanel.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
