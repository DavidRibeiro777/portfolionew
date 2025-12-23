// scripts.js - Versão otimizada e modular
class PortfolioApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupMobileMenu();
    this.setupSmoothScroll();
    this.setupCurrentYear();
    this.setupAnimations();
    this.setupForm();
  }

  // Mobile Menu
  setupMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      
      mobileMenu.classList.toggle('hidden');
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      menuIcon.classList.toggle('fa-bars');
      menuIcon.classList.toggle('fa-times');
      
      document.body.style.overflow = isExpanded ? '' : 'hidden';
    });

    // Fechar ao clicar em links
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
          mobileMenu.classList.add('hidden');
          menuToggle.setAttribute('aria-expanded', 'false');
          menuIcon.classList.remove('fa-times');
          menuIcon.classList.add('fa-bars');
          document.body.style.overflow = '';
        }
      });
    });

    // Fechar ao redimensionar
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        mobileMenu.classList.add('hidden');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
        document.body.style.overflow = '';
      }
    });
  }

  // Smooth Scroll
  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (!target) return;

        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    });
  }

  // Current Year in Footer
  setupCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  // Animations on Scroll
  setupAnimations() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
        }
      });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.service-card, .project-card, .contact-card').forEach(el => {
      observer.observe(el);
    });
  }

  // Form Handling
  setupForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      try {
        // Simular envio (substituir por sua API)
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;

        // Aqui você integraria com seu backend
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
        form.reset();
      } catch (error) {
        alert('Erro ao enviar mensagem. Tente novamente.');
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  // Lazy Loading Images
  lazyLoadImages() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PortfolioApp;
}
