// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = hamburger.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (hamburger.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bar.style.transform = '';
                bar.style.opacity = '';
            }
        });
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            const bars = hamburger.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = '';
                bar.style.opacity = '';
            });
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                entry.target.classList.add('loaded');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate stats counters
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
                
                // Animate skill tags
                if (entry.target.classList.contains('skill-category')) {
                    animateSkillTags(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .timeline-item, .cert-card, .education-item, .stat');
    animatedElements.forEach(el => {
        el.classList.add('loading');
        // Set initial visible state to prevent hiding
        el.style.opacity = '0.3';
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });

    // Counter animation function
    function animateCounter(element) {
        const finalValue = parseInt(element.textContent.replace(/\D/g, ''));
        const duration = 2000;
        const increment = finalValue / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= finalValue) {
                current = finalValue;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }, 16);
    }

    // Skill tags animation
    function animateSkillTags(skillCategory) {
        const skillTags = skillCategory.querySelectorAll('.skill-tag');
        skillTags.forEach((tag, index) => {
            setTimeout(() => {
                tag.style.transform = 'translateY(0)';
                tag.style.opacity = '1';
            }, index * 100);
        });
    }

    // Initialize skill tags for animation
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.style.transform = 'translateY(20px)';
        tag.style.opacity = '0';
        tag.style.transition = 'all 0.3s ease';
    });

    // Enhanced typing animation for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                if (text.charAt(i) === '<') {
                    // Skip HTML tags
                    let tagEnd = text.indexOf('>', i);
                    if (tagEnd !== -1) {
                        element.innerHTML += text.substring(i, tagEnd + 1);
                        i = tagEnd + 1;
                    } else {
                        element.innerHTML += text.charAt(i);
                        i++;
                    }
                } else {
                    element.innerHTML += text.charAt(i);
                    i++;
                }
                setTimeout(type, speed);
            } else {
                // Add cursor blink effect
                element.innerHTML += '<span class="cursor-blink">|</span>';
                setTimeout(() => {
                    const cursor = element.querySelector('.cursor-blink');
                    if (cursor) cursor.remove();
                }, 2000);
            }
        }
        type();
    }

    // Initialize typing animation
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const originalText = heroTitle.innerHTML;
            typeWriter(heroTitle, originalText, 80);
        }
    }, 1000);

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero');
        const floatingCards = document.querySelectorAll('.floating-card');
        
        // Reduced parallax effect to prevent issues
        if (heroSection && scrolled < window.innerHeight) {
            heroSection.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    });

    // Initialize EmailJS with config
    emailjs.init(window.EMAILJS_CONFIG.PUBLIC_KEY);
    
    // Form handling with EmailJS
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple form validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Prepare template parameters
            const templateParams = {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message,
                to_email: 'eyasshmashaqi@gmail.com' // Your email
            };
            
            // Send email using EmailJS
            emailjs.send(window.EMAILJS_CONFIG.SERVICE_ID, window.EMAILJS_CONFIG.TEMPLATE_ID, templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    // Reset form
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                }, function(error) {
                    console.log('FAILED...', error);
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    showNotification('Failed to send message. Please try again or contact me directly.', 'error');
                });
        });
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '10000',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            minWidth: '300px',
            transform: 'translateX(400px)',
            transition: 'all 0.3s ease'
        });
        
        // Set background color based on type
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            info: '#3b82f6'
        };
        notification.style.backgroundColor = colors[type] || colors.info;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.background = 'none';
        closeBtn.style.border = 'none';
        closeBtn.style.color = 'white';
        closeBtn.style.fontSize = '1.5rem';
        closeBtn.style.cursor = 'pointer';
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Removed mouse cursor effect as requested

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Loading screen
    function showLoadingScreen() {
        const loader = document.createElement('div');
        loader.id = 'page-loader';
        loader.innerHTML = `
            <div class="loader">
                <div class="loader-inner">
                    <div class="loader-line-wrap">
                        <div class="loader-line"></div>
                    </div>
                    <div class="loader-line-wrap">
                        <div class="loader-line"></div>
                    </div>
                    <div class="loader-line-wrap">
                        <div class="loader-line"></div>
                    </div>
                    <div class="loader-line-wrap">
                        <div class="loader-line"></div>
                    </div>
                    <div class="loader-line-wrap">
                        <div class="loader-line"></div>
                    </div>
                </div>
                <div class="loader-text">Loading Portfolio...</div>
            </div>
        `;
        
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #0f172a;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            z-index: 10000;
        `;
        
        document.body.appendChild(loader);
        
        // Add loader styles
        const loaderStyles = `
            <style>
                .loader {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 2rem;
                }
                .loader-inner {
                    width: 60px;
                    height: 60px;
                    position: relative;
                }
                .loader-line-wrap {
                    animation: spin 2s cubic-bezier(.175, .885, .32, 1.275) infinite;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                }
                .loader-line {
                    position: absolute;
                    top: 50%;
                    left: 0;
                    width: 100%;
                    height: 4px;
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    border-radius: 2px;
                    transform: translateY(-50%);
                }
                .loader-line-wrap:nth-child(1) { animation-delay: -0.8s; }
                .loader-line-wrap:nth-child(2) { animation-delay: -0.6s; }
                .loader-line-wrap:nth-child(3) { animation-delay: -0.4s; }
                .loader-line-wrap:nth-child(4) { animation-delay: -0.2s; }
                .loader-line-wrap:nth-child(5) { animation-delay: 0s; }
                .loader-text {
                    color: #cbd5e1;
                    font-size: 1.2rem;
                    font-weight: 500;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', loaderStyles);
        
        // Remove loader after page loads
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 2000);
    }

    // Show loading screen
    showLoadingScreen();

    // Initialize all animations after load
    setTimeout(() => {
        document.querySelectorAll('.loading').forEach(el => {
            el.classList.add('loaded');
        });
    }, 2500);

    // Smooth reveal animations for sections
    const revealElements = document.querySelectorAll('section');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(section => {
        // Don't hide sections completely, just make them slightly transparent
        section.style.opacity = '0.7';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease';
        revealObserver.observe(section);
    });

    // Enhanced particle background
    function createParticles() {
        const heroSection = document.querySelector('.hero');
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particlesContainer.appendChild(particle);
        }
        
        heroSection.appendChild(particlesContainer);
    }

    // Enhanced scroll reveal animations
    function enhancedScrollReveal() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const enhancedObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-animated');
                    
                    // Add staggered animation for child elements
                    const children = entry.target.querySelectorAll('.stagger-item');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('stagger-reveal');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        document.querySelectorAll('.project-card, .skill-category, .cert-card').forEach(el => {
            enhancedObserver.observe(el);
        });
    }

    // Add tilt effect to cards
    function addTiltEffect() {
        const cards = document.querySelectorAll('.project-card, .skill-category');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }

    // Enhanced floating animation for profile
    function enhanceProfileAnimation() {
        const profileImage = document.querySelector('.profile-image');
        const profileRing = document.querySelector('.profile-ring');
        
        if (profileImage) {
            profileImage.addEventListener('mouseenter', () => {
                profileRing.style.animationDuration = '2s';
            });
            
            profileImage.addEventListener('mouseleave', () => {
                profileRing.style.animationDuration = '8s';
            });
        }
    }

    // Dynamic skill progress animation
    function animateSkillProgress() {
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach((tag, index) => {
            tag.style.animationDelay = `${index * 0.1}s`;
            tag.classList.add('skill-animate');
        });
    }

    // Interactive background gradient
    function interactiveBackground() {
        const hero = document.querySelector('.hero');
        
        hero.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            hero.style.background = `
                linear-gradient(135deg, rgba(99, 102, 241, ${0.1 + x * 0.1}), rgba(139, 92, 246, ${0.1 + y * 0.1})),
                radial-gradient(ellipse at ${x * 100}% ${y * 100}%, rgba(99, 102, 241, 0.15), transparent 50%),
                radial-gradient(ellipse at ${(1-x) * 100}% ${(1-y) * 100}%, rgba(244, 63, 94, 0.15), transparent 50%)
            `;
        });
    }

    // Initialize enhanced features
    setTimeout(() => {
        createParticles();
        enhancedScrollReveal();
        addTiltEffect();
        enhanceProfileAnimation();
        animateSkillProgress();
        interactiveBackground();
    }, 1500);

    console.log('🚀 Enhanced Portfolio loaded successfully!');
}); 