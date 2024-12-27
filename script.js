document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        body.setAttribute('data-theme', body.getAttribute('data-theme') === 'night' ? 'day' : 'night');
        localStorage.setItem('theme', body.getAttribute('data-theme'));
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.setAttribute('data-theme', 'night');
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Skills animation
    const skillItems = document.querySelectorAll('.skill-category li');

    skillItems.forEach(item => {
        const skill = item.getAttribute('data-skill');
        const randomWidth = Math.floor(Math.random() * (95 - 60 + 1) + 60);
        
        item.style.setProperty('--skill-width', `${randomWidth}%`);
        item.style.setProperty('--skill-color', getComputedStyle(document.documentElement).getPropertyValue('--forest-accent'));
        
        item.innerHTML = `${skill} <span style="float: right;">${randomWidth}%</span>`;
    });

    // Intersection Observer for section animations
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Forest background animation
    const forestBackground = document.getElementById('forest-background');
    let forestPosition = 0;

    function animateForest() {
        forestPosition -= 0.5;
        if (forestPosition <= -100) {
            forestPosition = 0;
        }
        forestBackground.style.backgroundPosition = `${forestPosition}% bottom`;
        requestAnimationFrame(animateForest);
    }

    animateForest();

    // Cursor effect
    const cursorEffect = document.getElementById('cursor-effect');

    function createFirefly() {
        const firefly = document.createElement('div');
        firefly.classList.add('firefly');
        firefly.style.width = '4px';
        firefly.style.height = '4px';
        firefly.style.borderRadius = '50%';
        firefly.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--forest-accent');
        firefly.style.position = 'absolute';
        firefly.style.opacity = '0';
        cursorEffect.appendChild(firefly);
        return firefly;
    }

    const fireflies = Array.from({ length: 20 }, createFirefly);

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        fireflies.forEach((firefly, index) => {
            setTimeout(() => {
                firefly.style.left = `${x + Math.random() * 40 - 20}px`;
                firefly.style.top = `${y + Math.random() * 40 - 20}px`;
                firefly.style.opacity = '0.7';
                setTimeout(() => {
                    firefly.style.opacity = '0';
                }, 500);
            }, index * 50);
        });
    });
});

