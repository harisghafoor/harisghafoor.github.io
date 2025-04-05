document.addEventListener('DOMContentLoaded', function() {
    // Get the preloader that already exists in HTML
    const preloader = document.querySelector('.preloader');
    
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: false
    });
    
    // Hide preloader immediately if no load event fires within 3 seconds
    const preloaderTimeout = setTimeout(function() {
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(function() {
                preloader.style.display = 'none';
                initAllEffects();
            }, 500);
        }
    }, 3000);
    
    // Theme switcher
    const themeToggle = document.getElementById('checkbox');
    const themeIcon = document.querySelector('.theme-icon i');
    
    // Check if there's a saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'dark-theme';
    
    // Make sure body has the current theme
    document.body.className = ''; // Clear any existing classes
    document.body.classList.add(currentTheme);
    
    // Set toggle state based on theme
    if (currentTheme === 'light-theme') {
        themeToggle.checked = true;
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        themeToggle.checked = false;
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
    
    // Update navbar style based on theme
    updateNavbarForTheme(currentTheme);
    
    // Handle theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('change', function(e) {
            if (e.target.checked) {
                document.body.className = ''; // Clear all classes
                document.body.classList.add('light-theme');
                themeIcon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'light-theme');
                updateNavbarForTheme('light-theme');
                
                // Update particles color if particles.js is loaded
                if (typeof pJSDom !== 'undefined' && pJSDom.length > 0) {
                    pJSDom[0].pJS.particles.color.value = '#6c5ce7';
                    pJSDom[0].pJS.particles.line_linked.color = '#a29bfe';
                    pJSDom[0].pJS.fn.particlesRefresh();
                }
            } else {
                document.body.className = ''; // Clear all classes
                document.body.classList.add('dark-theme');
                themeIcon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'dark-theme');
                updateNavbarForTheme('dark-theme');
                
                // Update particles color if particles.js is loaded
                if (typeof pJSDom !== 'undefined' && pJSDom.length > 0) {
                    pJSDom[0].pJS.particles.color.value = '#6c5ce7';
                    pJSDom[0].pJS.particles.line_linked.color = '#a29bfe';
                    pJSDom[0].pJS.fn.particlesRefresh();
                }
            }
        });
    }
    
    // Function to update navbar style based on theme
    function updateNavbarForTheme(theme) {
        const navbar = document.querySelector('.navbar');
        if (theme === 'light-theme') {
            navbar.style.backgroundColor = 'rgba(248, 249, 250, 0.95)';
        } else {
            navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
        }
    }
    
    // Normal load event handler
    window.addEventListener('load', function() {
        clearTimeout(preloaderTimeout);
        if (preloader) {
            setTimeout(function() {
                preloader.style.opacity = '0';
                setTimeout(function() {
                    preloader.style.display = 'none';
                    initAllEffects();
                }, 500);
            }, 1000);
        } else {
            initAllEffects();
        }
    });
    
    // Text Scramble Effect
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = '!<>-_\\/[]{}—=+*^?#_';
            this.update = this.update.bind(this);
        }
        
        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise((resolve) => this.resolve = resolve);
            this.queue = [];
            
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }
            
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }
        
        update() {
            let output = '';
            let complete = 0;
            
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += `<span class="dud">${char}</span>`;
                } else {
                    output += from;
                }
            }
            
            this.el.innerHTML = output;
            
            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
        
        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }
    
    // Initialize text scramble effect
    const phrases = [
        'Advancing Computational Science & Medical Imaging',
        'Solving Inverse Problems in Medical Imaging',
        'MS-PhD Researcher at Yonsei University',
        'Building the Future of Medical AI'
    ];
    
    const textElement = document.querySelector('.text-scramble');
    if (textElement) {
        const fx = new TextScramble(textElement);
        
        let counter = 0;
        const next = () => {
            fx.setText(phrases[counter]).then(() => {
                setTimeout(next, 3000);
            });
            counter = (counter + 1) % phrases.length;
        };
        
        next();
    }
    
    // Initialize particles.js
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#6c5ce7"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.3,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#a29bfe",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.5
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Initialize Vanta.js network effect for hero background
    // DISABLED: removed blue glowy effect as requested
    /*
    if (document.getElementById('vanta-net')) {
        VANTA.NET({
            el: '#vanta-net',
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x4361ee,
            backgroundColor: 0x121212,
            points: 12,
            maxDistance: 20.00,
            spacing: 15.00
        });
    }
    */
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const currentTheme = document.body.classList.contains('light-theme') ? 'light-theme' : 'dark-theme';
        
        if (window.scrollY > 50) {
            navbar.style.padding = '0.7rem 0';
            if (currentTheme === 'light-theme') {
                navbar.style.backgroundColor = 'rgba(248, 249, 250, 0.98)';
            } else {
                navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.98)';
            }
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.padding = '1rem 0';
            if (currentTheme === 'light-theme') {
                navbar.style.backgroundColor = 'rgba(248, 249, 250, 0.95)';
            } else {
                navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
            }
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        }
        
        // Back to top button visibility
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            if (window.scrollY > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        }
    });
    
    // Back to top button functionality
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Mobile menu toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Change menu icon based on state
            const icon = menuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navLinks && navLinks.classList.contains('active') && 
            !navLinks.contains(event.target) && 
            menuBtn && !menuBtn.contains(event.target)) {
            navLinks.classList.remove('active');
            
            // Reset icon
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    
    // Smooth scrolling for navigation links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                
                // Reset icon
                const icon = menuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
            
            // Get the target element
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate position to scroll to
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active state in nav
                scrollLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Research card flip effect on mobile
    const researchCards = document.querySelectorAll('.research-card');
    if (researchCards.length > 0 && window.innerWidth < 768) {
        researchCards.forEach(card => {
            card.addEventListener('click', function() {
                const cardInner = this.querySelector('.card-inner');
                if (cardInner.style.transform === 'rotateY(180deg)') {
                    cardInner.style.transform = 'rotateY(0deg)';
                } else {
                    cardInner.style.transform = 'rotateY(180deg)';
                }
            });
        });
    }
    
    // Project image hover effect
    const projectImages = document.querySelectorAll('.project-image');
    projectImages.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.querySelector('.project-hover').style.opacity = '1';
            this.querySelector('.project-hover i').style.transform = 'scale(1)';
        });
        
        image.addEventListener('mouseleave', function() {
            this.querySelector('.project-hover').style.opacity = '0';
            this.querySelector('.project-hover i').style.transform = 'scale(0)';
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + navbar.offsetHeight + 50;
        
        // Get all sections
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                scrollLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For now, we'll just log it and show a success message
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show success message (in a real implementation, you'd show this after successful submission)
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Input animation on focus
    const formInputs = document.querySelectorAll('.input-animation');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    // Add tilt effect to project cards using vanilla-tilt.js
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll('.project-card'), {
            max: 10,
            speed: 400,
            glare: true,
            'max-glare': 0.3
        });
    }
});

// Rain effect
function createRain() {
    const rainContainer = document.querySelector('.rain-container');
    if (!rainContainer) return;
    
    const rainCount = 50;
    const windowWidth = window.innerWidth;
    
    for (let i = 0; i < rainCount; i++) {
        const drop = document.createElement('div');
        drop.classList.add('rain');
        
        // Random positioning and timing
        drop.style.left = `${Math.random() * windowWidth}px`;
        drop.style.animationDuration = `${Math.random() * 1 + 0.5}s`;
        drop.style.animationDelay = `${Math.random() * 2}s`;
        drop.style.opacity = Math.random() * 0.3 + 0.2;
        
        rainContainer.appendChild(drop);
    }
}

// Animate elements when they come into view
function animateOnEntry() {
    const animatedElements = document.querySelectorAll('.animated-underline, .neon-text');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Initialize gradient borders
function initGradientBorders() {
    const elements = document.querySelectorAll('.gradient-border');
    elements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.animationPlayState = 'running';
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.animationPlayState = 'paused';
        });
    });
}

// Initialize shiny buttons
function initShinyButtons() {
    const buttons = document.querySelectorAll('.shiny-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.classList.add('shine');
        });
        
        button.addEventListener('mouseleave', () => {
            button.classList.remove('shine');
        });
    });
}

// Initialize nested particles for research section
function initNestedParticles() {
    const researchSection = document.querySelector('#research');
    if (!researchSection) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.classList.add('nested-particles');
    particlesContainer.style.position = 'absolute';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '0';
    
    researchSection.style.position = 'relative';
    researchSection.insertBefore(particlesContainer, researchSection.firstChild);
    
    if (typeof particlesJS !== 'undefined') {
        particlesJS(particlesContainer, {
            particles: {
                number: {
                    value: 15,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#4361ee'
                },
                shape: {
                    type: 'circle',
                },
                opacity: {
                    value: 0.1,
                    random: true,
                },
                size: {
                    value: 5,
                    random: true,
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#4361ee',
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: false
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.3
                        }
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Form input animations
const formInputs = document.querySelectorAll('.form-control');
formInputs.forEach(input => {
    const formGroup = input.closest('.form-group');
    
    input.addEventListener('focus', () => {
        formGroup.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (input.value.length === 0) {
            formGroup.classList.remove('focused');
        }
    });
    
    // Check on load if input has value
    if (input.value.length > 0) {
        formGroup.classList.add('focused');
    }
});

// Initialize electric borders
const electricBorders = document.querySelectorAll('.electric-border');
electricBorders.forEach(border => {
    border.addEventListener('mouseenter', () => {
        border.style.animationPlayState = 'running';
    });
    
    border.addEventListener('mouseleave', () => {
        border.style.animationPlayState = 'paused';
    });
});

// Add 3D tilt effect to cards
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.project-card'), {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.2,
    });
}

// Create floating bubbles
function createBubbles() {
    const bubblesContainer = document.querySelector('.floating-bubbles');
    if (!bubblesContainer) return;
    
    const bubbleCount = 20;
    const containerWidth = bubblesContainer.offsetWidth;
    const containerHeight = bubblesContainer.offsetHeight || 400; // Default height if not set
    
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        // Random size between 10px and 40px
        const size = Math.random() * 30 + 10;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        // Random position
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.top = `${Math.random() * 100}%`;
        
        // Random opacity
        bubble.style.opacity = Math.random() * 0.3 + 0.1;
        
        // Random animation duration between 10-20s
        bubble.style.animationDuration = `${Math.random() * 10 + 10}s`;
        
        // Random animation delay
        bubble.style.animationDelay = `${Math.random() * 5}s`;
        
        bubblesContainer.appendChild(bubble);
    }
}

// Initialize all animations and effects
function initAllEffects() {
    createRain();
    createBubbles();
    initGradientBorders();
    initShinyButtons();
    initNestedParticles();
    animateOnEntry();
} 