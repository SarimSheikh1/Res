// ===== Navigation =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle hamburger menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Active Link Highlighting on Scroll =====
const sections = document.querySelectorAll('section[id]');

function highlightActiveSection() {
    const scrollY = window.pageYOffset;
    const navHeight = document.querySelector('.navbar').offsetHeight;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);
window.addEventListener('load', highlightActiveSection);

// ===== Intersection Observer for Fade-in Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in-up class
const fadeElements = document.querySelectorAll('.fade-in-up');
fadeElements.forEach(el => observer.observe(el));

// ===== Form Validation =====
const form = document.getElementById('reservation-form');
const formMessage = document.getElementById('form-message');

// Get form fields
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');
const guestsInput = document.getElementById('guests');
const messageInput = document.getElementById('message');

// Error message elements
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const phoneError = document.getElementById('phone-error');
const dateError = document.getElementById('date-error');
const timeError = document.getElementById('time-error');
const guestsError = document.getElementById('guests-error');

// Validation functions
function validateName(name) {
    if (!name.trim()) {
        return 'Name is required';
    }
    if (name.trim().length < 2) {
        return 'Name must be at least 2 characters';
    }
    return '';
}

function validateEmail(email) {
    if (!email.trim()) {
        return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }
    return '';
}

function validatePhone(phone) {
    if (!phone.trim()) {
        return 'Phone number is required';
    }
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone) || phone.replace(/\D/g, '').length < 10) {
        return 'Please enter a valid phone number';
    }
    return '';
}

function validateDate(date) {
    if (!date) {
        return 'Date is required';
    }
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        return 'Please select a future date';
    }
    return '';
}

function validateTime(time) {
    if (!time) {
        return 'Time is required';
    }
    return '';
}

function validateGuests(guests) {
    if (!guests) {
        return 'Number of guests is required';
    }
    return '';
}

// Clear error messages
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.textContent = '';
    });
    formMessage.classList.remove('success', 'error');
    formMessage.style.display = 'none';
}

// Show error message
function showError(field, message) {
    const errorElement = document.getElementById(`${field}-error`);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

// Real-time validation
nameInput.addEventListener('blur', () => {
    const error = validateName(nameInput.value);
    showError('name', error);
});

emailInput.addEventListener('blur', () => {
    const error = validateEmail(emailInput.value);
    showError('email', error);
});

phoneInput.addEventListener('blur', () => {
    const error = validatePhone(phoneInput.value);
    showError('phone', error);
});

dateInput.addEventListener('change', () => {
    const error = validateDate(dateInput.value);
    showError('date', error);
});

timeInput.addEventListener('change', () => {
    const error = validateTime(timeInput.value);
    showError('time', error);
});

guestsInput.addEventListener('change', () => {
    const error = validateGuests(guestsInput.value);
    showError('guests', error);
});

// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

// Form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    // Validate all fields
    const nameErr = validateName(nameInput.value);
    const emailErr = validateEmail(emailInput.value);
    const phoneErr = validatePhone(phoneInput.value);
    const dateErr = validateDate(dateInput.value);
    const timeErr = validateTime(timeInput.value);
    const guestsErr = validateGuests(guestsInput.value);

    // Show errors if any
    if (nameErr) showError('name', nameErr);
    if (emailErr) showError('email', emailErr);
    if (phoneErr) showError('phone', phoneErr);
    if (dateErr) showError('date', dateErr);
    if (timeErr) showError('time', timeErr);
    if (guestsErr) showError('guests', guestsErr);

    // Check if there are any errors
    const hasErrors = nameErr || emailErr || phoneErr || dateErr || timeErr || guestsErr;

    if (hasErrors) {
        formMessage.classList.remove('success');
        formMessage.classList.add('error');
        formMessage.textContent = 'Please correct the errors above and try again.';
        formMessage.style.display = 'block';
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        return;
    }

    // Simulate form submission (in a real app, you would send data to a server)
    formMessage.classList.remove('error');
    formMessage.classList.add('success');
    formMessage.textContent = 'Thank you! Your reservation has been received. We will contact you shortly to confirm.';
    formMessage.style.display = 'block';
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Reset form after successful submission
    setTimeout(() => {
        form.reset();
        clearErrors();
    }, 5000);

    // In a real application, you would send the data to a server here
    // Example:
    // const formData = {
    //     name: nameInput.value,
    //     email: emailInput.value,
    //     phone: phoneInput.value,
    //     date: dateInput.value,
    //     time: timeInput.value,
    //     guests: guestsInput.value,
    //     message: messageInput.value
    // };
    // fetch('/api/reservation', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData)
    // })
    // .then(response => response.json())
    // .then(data => {
    //     // Handle success
    // })
    // .catch(error => {
    //     // Handle error
    // });
});

// ===== Close menu when clicking outside =====
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===== Close menu on window resize (if menu is open on desktop) =====
window.addEventListener('resize', () => {
    if (window.innerWidth > 968) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===== Statistics Counter Animation =====
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000) {
        return num.toLocaleString();
    }
    return num.toString();
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
        }
    });
}, { threshold: 0.5 });

const statNumbers = document.querySelectorAll('.stat-number');
statNumbers.forEach(stat => statsObserver.observe(stat));

// ===== Scroll to Top Button =====
const scrollTopBtn = document.getElementById('scroll-top');

function toggleScrollTop() {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
}

window.addEventListener('scroll', toggleScrollTop);

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Newsletter Form =====
const newsletterForm = document.getElementById('newsletter-form');
const newsletterMessage = document.getElementById('newsletter-message');
const newsletterInput = newsletterForm.querySelector('input[type="email"]');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = newsletterInput.value.trim();
    
    if (!email) {
        showNewsletterMessage('Please enter your email address.', 'error');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNewsletterMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate newsletter subscription
    showNewsletterMessage('Thank you for subscribing! You\'ll receive our latest updates and exclusive offers.', 'success');
    newsletterInput.value = '';
    
    // In a real application, you would send the email to a server
    // fetch('/api/newsletter', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email })
    // })
    // .then(response => response.json())
    // .then(data => {
    //     showNewsletterMessage('Thank you for subscribing!', 'success');
    //     newsletterInput.value = '';
    // })
    // .catch(error => {
    //     showNewsletterMessage('Something went wrong. Please try again.', 'error');
    // });
});

function showNewsletterMessage(message, type) {
    newsletterMessage.textContent = message;
    newsletterMessage.classList.remove('success', 'error');
    newsletterMessage.classList.add(type);
    
    setTimeout(() => {
        newsletterMessage.classList.remove('success', 'error');
    }, 5000);
}

