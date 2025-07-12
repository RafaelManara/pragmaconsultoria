// Efeito Parallax
document.addEventListener('DOMContentLoaded', function() {
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    const particles = document.querySelectorAll('.particle');
    
    // Parallax no movimento do mouse
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        parallaxLayers.forEach((layer, index) => {
            const speed = layer.dataset.speed || 0.5;
            const x = (mouseX - 0.5) * speed * 50;
            const y = (mouseY - 0.5) * speed * 50;
            
            layer.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // Parallax no scroll (se houver conteúdo adicional)
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxLayers.forEach((layer, index) => {
            const speed = parseFloat(layer.dataset.speed) || 0.5;
            layer.style.transform = `translateY(${rate * speed}px)`;
        });
    });
    
    // Animação das partículas com interação do mouse
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        particles.forEach((particle, index) => {
            const rect = particle.getBoundingClientRect();
            const particleX = rect.left + rect.width / 2;
            const particleY = rect.top + rect.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(mouseX - particleX, 2) + Math.pow(mouseY - particleY, 2)
            );
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                const angle = Math.atan2(particleY - mouseY, particleX - mouseX);
                const moveX = Math.cos(angle) * force * 20;
                const moveY = Math.sin(angle) * force * 20;
                
                particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
                particle.style.opacity = 0.8 + force * 0.2;
            } else {
                particle.style.transform = 'translate(0, 0)';
                particle.style.opacity = 0.6;
            }
        });
    });
    
    // Efeito de ondulação no clique
    document.addEventListener('click', function(e) {
        createRipple(e.clientX, e.clientY);
    });
    
    function createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'radial-gradient(circle, rgba(0, 191, 255, 0.3) 0%, transparent 70%)';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '1000';
        ripple.style.animation = 'ripple-effect 0.8s ease-out forwards';
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 800);
    }
    
    // Adicionar CSS para o efeito de ondulação
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-effect {
            to {
                width: 200px;
                height: 200px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Animação suave para elementos que entram na viewport
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
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.main-title, .subtitle, .cta-button');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Efeito de typing para o título (opcional)
    const title = document.querySelector('.main-title');
    const titleText = title.textContent;
    
    // Função para redimensionar partículas baseado no tamanho da tela
    function adjustParticles() {
        const screenWidth = window.innerWidth;
        const particleCount = screenWidth > 768 ? 8 : 4;
        
        particles.forEach((particle, index) => {
            if (index >= particleCount) {
                particle.style.display = 'none';
            } else {
                particle.style.display = 'block';
            }
        });
    }
    
    // Ajustar partículas no carregamento e redimensionamento
    adjustParticles();
    window.addEventListener('resize', adjustParticles);
    
    // Performance: throttle para eventos de mouse
    let ticking = false;
    
    function updateParallax(e) {
        if (!ticking) {
            requestAnimationFrame(function() {
                // Lógica do parallax aqui
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Adicionar efeito de brilho ao logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.filter = 'drop-shadow(0 0 50px rgba(0, 191, 255, 0.8)) brightness(1.2)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.filter = 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.3)) brightness(1)';
        });
    }
    
    // Efeito de loading suave
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease-in-out';
    });
});

// Preloader simples
document.body.style.opacity = '0';

