// Script para funcionalidades adicionais
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    const menuLinks = document.querySelectorAll('.menu-link');
    const sections = document.querySelectorAll('.section');
    const menuBanner = document.querySelector('.menu-banner');
    
    // ========== INICIALIZAÇÃO: Ativa "Psicóloga" por padrão ==========
    function setActiveMenu(targetId) {
        menuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${targetId}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Define "Psicóloga" como ativo ao carregar
    setActiveMenu('psicologa');
    
    // ========== HAMBURGER MENU ==========
    if (hamburger && menu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            menu.classList.toggle('active');
        });

        // Fechar menu quando um link é clicado
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                menu.classList.remove('active');
            });
        });
    }

    // ========== MENU LINKS - Smooth scroll e realce ao clicar ==========
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Atualiza o realce do menu imediatamente
                setActiveMenu(targetId);
                
                // Smooth scroll para o alvo
                const menuHeight = menuBanner.offsetHeight;
                const targetPosition = targetElement.offsetTop - menuHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== DETECÇÃO DE SCROLL - Atualiza realce baseado na seção visível ==========
    function updateActiveMenuOnScroll() {
        const menuHeight = menuBanner.offsetHeight;
        const scrollPosition = window.scrollY + menuHeight + 50; // 50px de margem para detectar a seção
        
        let currentActiveSection = 'psicologa'; // padrão
        
        sections.forEach(section => {
            if (section.id && section.offsetTop <= scrollPosition) {
                currentActiveSection = section.id;
            }
        });
        
        setActiveMenu(currentActiveSection);
    }
    
    // Listener para scroll
    window.addEventListener('scroll', updateActiveMenuOnScroll, { passive: true });

    // ========== ANIMAÇÃO DAS SEÇÕES ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplica animação às seções
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Adiciona classe de carregamento
    document.body.classList.add('loaded');

    // Console message
    console.log('👋 Bem-vindo(a) ao site da Psicóloga Mariana Franco!');
    console.log('💼 CRP: 06/140775');
    console.log('🌐 Desenvolvido com cuidado para seus pacientes');
});

// Função para o formulário de contato (se adicionar no futuro)
function handleContactForm(event) {
    event.preventDefault();
    // Implementação futura para formulário de contato
    alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
}