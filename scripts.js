document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const btnMenu = document.getElementById('btn-mobile-menu');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const iconMenu = document.getElementById('icon-menu');
    const iconClose = document.getElementById('icon-close');

    // Função para abrir/fechar menu
    function toggleMenu() {
        const isExpanded = btnMenu.getAttribute('aria-expanded') === 'true';
        
        // Alternar visibilidade do menu
        dropdownMenu.classList.toggle('hidden');
        
        // Alternar ícones
        iconMenu.classList.toggle('hidden');
        iconClose.classList.toggle('hidden');
        
        // Atualizar atributo ARIA
        btnMenu.setAttribute('aria-expanded', !isExpanded);
        
        // Controlar scroll do body
        document.body.style.overflow = isExpanded ? '' : 'hidden';
    }

    // Evento de clique no botão
    btnMenu.addEventListener('click', toggleMenu);

    // Fechar menu ao clicar nos links
    dropdownMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 768) { // Só fecha se for mobile
                dropdownMenu.classList.add('hidden');
                iconMenu.classList.remove('hidden');
                iconClose.classList.add('hidden');
                btnMenu.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    });

    // Fechar menu ao redimensionar para desktop
    function handleResize() {
        if (window.innerWidth >= 768) {
            dropdownMenu.classList.add('hidden');
            iconMenu.classList.remove('hidden');
            iconClose.classList.add('hidden');
            btnMenu.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    }

    window.addEventListener('resize', handleResize);

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Set current year in footer
    document.getElementById("ano-atual").textContent = new Date().getFullYear();

    // Animation helper functions
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-fade-in-up, .animate-fade-in-down');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Run animation check on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Smooth scroll functions for specific sections
    window.smoothScrollToPortfolio = function() {
        const portfolioSection = document.getElementById('portfolio');
        if (portfolioSection) {
            portfolioSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    window.smoothScrollToContact = function() {
        const contactSection = document.getElementById('contato');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };
});