/**
 * Gabriel Rovesti - Portfolio
 * Main JavaScript file
 */

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const header = document.getElementById('header');
    const backToTopBtn = document.getElementById('back-to-top');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');
    const expandBtns = document.querySelectorAll('.expand-btn');
    const experienceToggle = document.getElementById('experience-toggle');
    const projectsToggle = document.getElementById('projects-toggle');
    const moreExperiences = document.getElementById('more-experiences');
    const moreProjects = document.getElementById('more-projects');
    const currentYearElem = document.getElementById('current-year');

    // Set current year for copyright
    if (currentYearElem) {
        currentYearElem.textContent = new Date().getFullYear();
    }

    // Navigation and scrolling
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    }

    hamburger.addEventListener('click', toggleMenu);

    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Scroll event listener
    window.addEventListener('scroll', () => {
        // Header scrolled effect
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top button
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        let scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-link[href*="${sectionId}"]`).classList.add('active');
            } else {
                document.querySelector(`.nav-link[href*="${sectionId}"]`).classList.remove('active');
            }
        });
    }

    // Skills expand/collapse
    expandBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const skillCard = this.closest('.skill-card');
            skillCard.classList.toggle('expanded');
            
            if (skillCard.classList.contains('expanded')) {
                this.innerHTML = '<i class="fas fa-minus"></i>';
                this.setAttribute('aria-label', 'Hide details');
            } else {
                this.innerHTML = '<i class="fas fa-plus"></i>';
                this.setAttribute('aria-label', 'Show details');
            }
        });
    });

    // Experience toggle
    if (experienceToggle && moreExperiences) {
        experienceToggle.addEventListener('click', function() {
            moreExperiences.classList.toggle('hidden');
            this.classList.toggle('active');
        });
    }

    // Projects toggle
    if (projectsToggle && moreProjects) {
        projectsToggle.addEventListener('click', function() {
            moreProjects.classList.toggle('hidden');
            this.classList.toggle('active');
        });
    }

    // Typing effect
    const typedTextElement = document.querySelector('.typed-text');
    if (typedTextElement) {
        const phrases = [
            'Full-Stack Developer',
            'Cybersecurity Enthusiast',
            'Tutor & Teacher',
            'Blockchain & Cloud Adventurer'
        ];
        
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function typeWriter() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentPhrase.length) {
                // Pause at end of typing
                isDeleting = true;
                typingSpeed = 1500;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                // Pause before typing next phrase
                typingSpeed = 500;
            }
            
            setTimeout(typeWriter, typingSpeed);
        }
        
        // Start the typing effect
        setTimeout(typeWriter, 1000);
    }

    // Intersection Observer for animations
    const fadeElements = document.querySelectorAll('.card, .skill-card, .achievement-item, .timeline-item');
    
    const appearOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('fade-in');
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);
    
    fadeElements.forEach(element => {
        element.classList.add('fade-element');
        appearOnScroll.observe(element);
    });

    // Add CSS for fade elements
    const style = document.createElement('style');
    style.innerHTML = `
    .fade-element {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }
    `;
    document.head.appendChild(style);
    

    // Gestione delle tab nella sezione Appunti Universitari
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    // Funzione per cambiare tab
    function changeTab(e) {
        // Rimuove classe active da tutti i bottoni
        tabBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Aggiunge classe active al bottone cliccato
        e.target.classList.add('active');
        
        // Nasconde tutte le tab
        tabPanes.forEach(pane => {
            pane.classList.remove('active');
        });
        
        // Mostra la tab selezionata
        const targetId = e.target.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    }

    // Event listener per i bottoni delle tab
    tabBtns.forEach(btn => {
        btn.addEventListener('click', changeTab);
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would send the form data to a server
            // For now, we'll just show a success message
            const name = document.getElementById('name').value;
            alert(`Thank you ${name} for your message! I'll get back to you soon.`);
            contactForm.reset();
        });
    }
    
    // Testimonials Slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonialCards.length && dots.length) {
        let currentSlide = 0;
        
        // Initially hide all testimonials except the first one
        testimonialCards.forEach((card, index) => {
            if (index !== 0) {
                card.style.display = 'none';
            }
        });
        
        // Function to show a specific slide
        const showSlide = (index) => {
            // Hide all testimonials
            testimonialCards.forEach(card => {
                card.style.display = 'none';
            });
            
            // Remove active class from all dots
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Show the current testimonial and activate its dot
            testimonialCards[index].style.display = 'block';
            dots[index].classList.add('active');
            
            // Add animation
            testimonialCards[index].style.animation = 'fadeIn 0.5s ease';
        };
        
        // Event listener for next button
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % testimonialCards.length;
            showSlide(currentSlide);
        });
        
        // Event listener for previous button
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
            showSlide(currentSlide);
        });
        
        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
        
        // Auto-scroll testimonials every 5 seconds
        setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonialCards.length;
            showSlide(currentSlide);
        }, 5000);
    }

    const languageBtn = document.getElementById('language-btn');
    const languageDropdown = document.getElementById('language-dropdown');
    const languageOptions = document.querySelectorAll('.language-option');
    
    // Toggle language dropdown
    languageBtn.addEventListener('click', () => {
        languageDropdown.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.language-selector')) {
            languageDropdown.classList.remove('show');
        }
    });
    
    // Change language
    languageOptions.forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.dataset.lang;
            const flagImg = option.querySelector('img').src;
            const langName = option.querySelector('span').textContent;
            
            // Update button UI
            document.getElementById('current-flag').src = flagImg;
            document.getElementById('current-lang').textContent = langName;
            
            // In a real implementation, you would load translations here
            // For demonstration, we'll just show an alert
            alert(`Changing language to ${langName}. In a real implementation, this would load the ${lang} version of the site.`);
            
            // Hide dropdown
            languageDropdown.classList.remove('show');
        });
    });

});