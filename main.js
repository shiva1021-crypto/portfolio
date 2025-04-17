// Spinner
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const spinner = document.getElementById('spinner');
        if (spinner) {
            spinner.classList.remove('show');
        }
    }, 1000);
});

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            
            // For skill progress bars
            if (entry.target.classList.contains('skill-item')) {
                const progressBar = entry.target.querySelector('.progress-bar');
                if (progressBar) {
                    const progress = progressBar.getAttribute('data-progress');
                    progressBar.style.width = `${progress}%`;
                }
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animate-up class and skill items
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-up, .skill-item');
    animatedElements.forEach(element => {
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });
});

// Navigation active state
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-item');

    const setActiveNavItem = () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const scrollPosition = window.pageYOffset;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === currentSection) {
                item.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', setActiveNavItem);
    setActiveNavItem();
});

// Smooth scroll for navigation
document.querySelectorAll('.nav-item').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 50,
                behavior: 'smooth'
            });
        }
    });
});

// Back to top button
document.addEventListener('DOMContentLoaded', () => {
    const backToTop = document.querySelector('.back-to-top');
    
    const toggleBackToTop = () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    };

    window.addEventListener('scroll', toggleBackToTop);
    
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Typing Animation
document.addEventListener('DOMContentLoaded', () => {
    const typedTextSpan = document.querySelector('.typed-text');
    const texts = [
        'Software Engineer',
        'Cloud Computing Specialist',
        'Web Developer',
        'IoT Enthusiast'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        if (isDeleting) {
            typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            // Pause at end of typing
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            // Pause before starting to type next word
            setTimeout(type, 500);
        } else {
            // Speed of typing and deleting
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }

    if (typedTextSpan) type();
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    const navTrigger = document.querySelector('.nav-trigger');
    const navSection = document.querySelector('.nav-section');

    if (navTrigger && navSection) {
        navTrigger.addEventListener('click', () => {
            navSection.classList.toggle('active');
        });

        // Close navigation when clicking outside
        document.addEventListener('click', (e) => {
            if (!navSection.contains(e.target) && !navTrigger.contains(e.target) && navSection.classList.contains('active')) {
                navSection.classList.remove('active');
            }
        });

        // Close navigation when clicking on a nav item (mobile only)
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navSection.classList.remove('active');
                }
            });
        });
    }
});

// Contact form submission
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your form submission logic here
            // For now, just show an alert
            alert('Thank you for your message! This is a demo form.');
            contactForm.reset();
        });
    }
});
