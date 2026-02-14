const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const profileImg = document.getElementById('profile-img');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    enableDarkMode();
}

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
});

function enableDarkMode() {
    body.classList.add('dark-theme');
    themeIcon.src = 'nightmode.png';
    profileImg.src = 'dark-pfp.png';
    localStorage.setItem('theme', 'dark');
}

function disableDarkMode() {
    body.classList.remove('dark-theme');
    themeIcon.src = 'lightmode.png';
    profileImg.src = 'light-pfp.png';
    localStorage.setItem('theme', 'light');
}

const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navMenu = document.getElementById('nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

const navLinks = document.querySelectorAll('.navbar ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});


// Calligraphy Carousel Logic
document.addEventListener('DOMContentLoaded', () => {
    const viewButton = document.getElementById('view-calligraphy');
    const carouselContainer = document.getElementById('calligraphy-carousel');

    if (viewButton && carouselContainer) {
        viewButton.addEventListener('click', (e) => {
            e.preventDefault();
            carouselContainer.classList.toggle('active');

            if (carouselContainer.classList.contains('active')) {
                carouselContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }
    // Contact Form Handler
    const contactForm = document.querySelector('.contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.textContent = 'Thanks! Your message has been sent successfully.';
                    formStatus.className = 'form-status success active';
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    if (data.errors) {
                        formStatus.textContent = data.errors.map(error => error.message).join(", ");
                    } else {
                        formStatus.textContent = 'Oops! There was a problem submitting your form.';
                    }
                    formStatus.className = 'form-status error active';
                }
            } catch (error) {
                formStatus.textContent = 'Oops! There was a problem submitting your form.';
                formStatus.className = 'form-status error active';
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';

                // Hide message after 5 seconds
                setTimeout(() => {
                    formStatus.classList.remove('active');
                }, 5000);
            }
        });
    }
});
