// ========================================
// NAVIGATION
// ========================================

// Scroll header
const header = document.getElementById('header');
const scrollY = window.pageYOffset;

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
});

// Mobile menu
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Close menu on link click
const navLinks = document.querySelectorAll('.nav__link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        const link = document.querySelector('.nav__link[href*="' + sectionId + '"]');

        if (link) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        }
    });
}

window.addEventListener('scroll', scrollActive);

// ========================================
// SMOOTH SCROLL
// ========================================

const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// STATS COUNTER ANIMATION
// ========================================

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// Intersection Observer for stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                if (!stat.classList.contains('animated')) {
                    animateCounter(stat);
                    stat.classList.add('animated');
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ========================================
// ANIMATE ON SCROLL (AOS)
// ========================================

const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        observer.observe(element);
    });
};

// Initialize AOS
window.addEventListener('DOMContentLoaded', animateOnScroll);

// ========================================
// FORM HANDLING
// ========================================

const contactForm = document.querySelector('.contact__form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: this.querySelector('#name').value,
            email: this.querySelector('#email').value,
            phone: this.querySelector('#phone').value,
            subject: this.querySelector('#subject').value,
            message: this.querySelector('#message').value
        };

        // Simulate form submission
        console.log('Form Data:', formData);
        
        // Show success message
        showNotification('¡Gracias por contactarnos! Nos pondremos en contacto pronto.', 'success');
        
        // Reset form
        this.reset();
    });
}

const newsletterForm = document.querySelector('.footer__newsletter');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        console.log('Newsletter subscription:', email);
        
        showNotification('¡Suscripción exitosa! Recibirá nuestras novedades.', 'success');
        this.reset();
    });
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================

function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__icon">${type === 'success' ? '✓' : 'ℹ'}</span>
            <p class="notification__message">${message}</p>
            <button class="notification__close">&times;</button>
        </div>
    `;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 24px;
            background: white;
            padding: 20px 24px;
            border-radius: 4px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
            z-index: 9999;
            animation: slideInRight 0.4s ease-out;
            max-width: 400px;
        }

        .notification-success {
            border-left: 4px solid #8b7355;
        }

        .notification__content {
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .notification__icon {
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #8b7355;
            color: white;
            border-radius: 50%;
            font-weight: 700;
            flex-shrink: 0;
        }

        .notification__message {
            flex: 1;
            color: #333;
            font-size: 0.9375rem;
            margin: 0;
        }

        .notification__close {
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #666;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.3s;
        }

        .notification__close:hover {
            color: #333;
        }

        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }

        @media screen and (max-width: 480px) {
            .notification {
                right: 16px;
                left: 16px;
                max-width: none;
            }
        }
    `;

    if (!document.querySelector('.notification-style')) {
        style.className = 'notification-style';
        document.head.appendChild(style);
    }

    // Add to page
    document.body.appendChild(notification);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.4s ease-out';
        setTimeout(() => notification.remove(), 400);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.4s ease-out';
            setTimeout(() => notification.remove(), 400);
        }
    }, 5000);
}

// ========================================
// PARALLAX EFFECT ON HERO
// ========================================

const hero = document.querySelector('.hero');

if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        hero.style.backgroundPositionY = -(scrolled * parallaxSpeed) + 'px';
    });
}

// ========================================
// LOADING ANIMATION
// ========================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add subtle entrance animations
    const heroContent = document.querySelector('.hero__content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease-out';
            heroContent.style.opacity = '1';
        }, 100);
    }
});

// ========================================
// CARD HOVER EFFECTS
// ========================================

const cards = document.querySelectorAll('.area-card, .team-card, .testimonial-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ========================================
// LAZY LOADING IMAGES
// ========================================

const images = document.querySelectorAll('img[src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

// ========================================
// CURSOR EFFECT (OPTIONAL - PREMIUM)
// ========================================

const createCursorFollower = () => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 40px;
        height: 40px;
        border: 2px solid rgba(139, 115, 85, 0.5);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease, opacity 0.2s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    // Smooth cursor follow
    function animate() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.1;
        cursorY += dy * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animate);
    }
    animate();

    // Scale on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea, select');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
};

// Only enable custom cursor on desktop devices
if (window.innerWidth > 768) {
    createCursorFollower();
}

// ========================================
// SCROLL PROGRESS BAR
// ========================================

const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 3px;
        background: linear-gradient(to right, #8b7355, #c9a96e);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

createScrollProgress();

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    scrollActive();
}, 10));

// ========================================
// CONSOLE MESSAGE
// ========================================

console.log('%c👨‍⚖️ Tauil & Asoc.', 'font-size: 24px; font-weight: bold; color: #8b7355;');
console.log('%cEstudio Jurídico Profesional', 'font-size: 14px; color: #666;');
console.log('%cDesarrollado con ❤️ para defender sus derechos', 'font-size: 12px; color: #999;');

// ========================================
// ACCESSIBILITY IMPROVEMENTS
// ========================================

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('show-menu');
    }
});

// Focus trap for mobile menu
const focusableElements = navMenu ? navMenu.querySelectorAll('a, button') : [];
const firstFocusable = focusableElements[0];
const lastFocusable = focusableElements[focusableElements.length - 1];

if (navMenu) {
    navMenu.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    });
}