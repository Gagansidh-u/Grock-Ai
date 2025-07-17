// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (!link.parentElement.classList.contains('dropdown')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Smooth Scrolling for anchor links on the same page
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Plan Duration Toggle & Payment Modal
document.addEventListener('DOMContentLoaded', function() {
    // Plan Duration Logic
    const durationContainer = document.querySelector('.plan-duration');
    if (durationContainer) {
        const durationBtns = document.querySelectorAll('.duration-btn');
        const monthlyPrices = document.querySelectorAll('.monthly-price');
        const yearlyPrices = document.querySelectorAll('.yearly-price');
        const monthlyPeriods = document.querySelectorAll('.monthly-period');
        const yearlyPeriods = document.querySelectorAll('.yearly-period');
        const monthlyOriginals = document.querySelectorAll('.monthly-original');
        const yearlyOriginals = document.querySelectorAll('.yearly-original');

        durationBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const duration = this.dataset.duration;
                
                durationBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                if (duration === 'monthly') {
                    monthlyPrices.forEach(el => el.style.display = 'inline');
                    yearlyPrices.forEach(el => el.style.display = 'none');
                    monthlyPeriods.forEach(el => el.style.display = 'inline');
                    yearlyPeriods.forEach(el => el.style.display = 'none');
                    monthlyOriginals.forEach(el => el.style.display = 'inline');
                    yearlyOriginals.forEach(el => el.style.display = 'none');
                } else {
                    monthlyPrices.forEach(el => el.style.display = 'none');
                    yearlyPrices.forEach(el => el.style.display = 'inline');
                    monthlyPeriods.forEach(el => el.style.display = 'none');
                    yearlyPeriods.forEach(el => el.style.display = 'inline');
                    monthlyOriginals.forEach(el => el.style.display = 'none');
                    yearlyOriginals.forEach(el => el.style.display = 'inline');
                }
            });
        });

        // Initialize pricing display
        const monthlyBtn = document.querySelector('.duration-btn[data-duration="monthly"]');
        if (monthlyBtn) {
            monthlyBtn.click();
        }
    }

    // Design Add-on Calculator
    const designAddons = document.querySelectorAll('.design-addon');
    if (designAddons.length > 0) {
        designAddons.forEach(addon => {
            addon.addEventListener('change', function() {
                const priceCard = this.closest('.pricing-card');
                const monthlyAmount = priceCard.querySelector('.monthly-price');
                const yearlyAmount = priceCard.querySelector('.yearly-price');
                
                const originalMonthly = parseInt(monthlyAmount.dataset.originalPrice || monthlyAmount.textContent);
                const originalYearly = parseInt(yearlyAmount.dataset.originalPrice || yearlyAmount.textContent);
                
                if(!monthlyAmount.dataset.originalPrice) monthlyAmount.dataset.originalPrice = originalMonthly;
                if(!yearlyAmount.dataset.originalPrice) yearlyAmount.dataset.originalPrice = originalYearly;

                const addonPrice = parseInt(this.dataset.monthly);
                
                if (this.checked) {
                    monthlyAmount.textContent = originalMonthly + addonPrice;
                    yearlyAmount.textContent = originalYearly + addonPrice;
                } else {
                    monthlyAmount.textContent = originalMonthly;
                    yearlyAmount.textContent = originalYearly;
                }
            });
        });
    }

    // Payment Modal Logic
    const modal = document.getElementById('payment-modal');
    const okBtn = document.getElementById('modal-ok-btn');
    const pricingButtons = document.querySelectorAll('.pricing-card .btn-primary');

    if (modal && okBtn && pricingButtons.length > 0) {
        pricingButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                modal.style.display = 'flex';
                setTimeout(() => modal.classList.add('active'), 10);
            });
        });

        const closeModal = () => {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        };

        okBtn.addEventListener('click', closeModal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelector('input[type="text"]:nth-of-type(2)').value;
        const message = this.querySelector('textarea').value;
        
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#fff';
        navbar.style.backdropFilter = 'none';
    }
});

// Animate on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .pricing-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.navbar')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});
