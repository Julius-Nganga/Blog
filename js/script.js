// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Particle Animation Background
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    document.body.prepend(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = 'rgba(255,255,255,0.8)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    // Interactive Hover Effects
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            link.style.setProperty('--x', `${x}px`);
            link.style.setProperty('--y', `${y}px`);
        });
    });

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.nav-container, .header').forEach(el => {
        observer.observe(el);
    });

    // Dynamic Theme Toggler
    const themeButton = document.createElement('button');
    themeButton.className = 'theme-toggler';
    themeButton.innerHTML = '🌓';
    document.body.appendChild(themeButton);

    let isDark = false;
    themeButton.addEventListener('click', () => {
        isDark = !isDark;
        document.body.style.backgroundColor = isDark ? '#1a1a1a' : '#f8f9fa';
        document.body.style.color = isDark ? '#fff' : '#333';
        themeButton.style.transform = `rotate(${isDark ? '180deg' : '0deg'})`;
    });

    // Initialize
    initParticles();
    animateParticles();
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});