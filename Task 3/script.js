document.addEventListener('DOMContentLoaded', () => {

    const initHeaderOnScroll = () => {
        const header = document.getElementById('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    };

    const initMobileMenu = () => {
        const hamburger = document.getElementById('hamburger-menu');
        const navLinks = document.getElementById('nav-links');
        const navLinksItems = navLinks.querySelectorAll('a');

        const toggleMenu = () => {
            navLinks.classList.toggle('active');
            document.body.classList.toggle('nav-open');
            hamburger.querySelector('i').classList.toggle('fa-bars');
            hamburger.querySelector('i').classList.toggle('fa-times');
        };

        hamburger.addEventListener('click', toggleMenu);
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    };

    const initScrollAnimations = () => {
        const animatedElements = document.querySelectorAll('.animated-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cards = entry.target.parentElement.querySelectorAll('.animated-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, index * 150);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        const observedParents = new Set();
        animatedElements.forEach(element => {
            const parent = element.parentElement;
            if (!observedParents.has(parent)) {
                observer.observe(element);
                observedParents.add(parent);
            }
        });
    };

    const initPricingToggle = () => {
        const toggle = document.getElementById('pricing-switch');
        if (!toggle) return;

        toggle.addEventListener('change', () => {
            const isYearly = toggle.checked;
            document.querySelectorAll('.price').forEach(priceEl => {
                const monthlyPrice = priceEl.getAttribute('data-monthly');
                const yearlyPrice = priceEl.getAttribute('data-yearly');
                
                if (isYearly) {
                    priceEl.innerHTML = `$${yearlyPrice} <span>/year</span>`;
                } else {
                    priceEl.innerHTML = `$${monthlyPrice} <span>/month</span>`;
                }
            });
        });
    };

    const updateCopyrightYear = () => {
        const yearSpan = document.getElementById('copyright-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    };

    initHeaderOnScroll();
    initMobileMenu();
    initScrollAnimations();
    initPricingToggle();
    updateCopyrightYear();
});