/**
 * Gabriel Rovesti - Portfolio
 * Main JavaScript file with Multi-language System
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
    const certificationsToggle = document.getElementById('certifications-toggle');
    const moreExperiences = document.getElementById('more-experiences');
    const moreProjects = document.getElementById('more-projects');
    const currentYearElem = document.getElementById('current-year');

    // Crea overlay per il menu
    const menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    document.body.appendChild(menuOverlay);

    // Funzione per aprire/chiudere il menu
    function toggleMenu(event) {
        // Previeni comportamento predefinito se è un evento
        if (event && event.preventDefault) event.preventDefault();
        
        // Toggle delle classi
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Gestione dello scrolling quando il menu è aperto
        if (document.body.classList.contains('menu-open')) {
            document.body.setAttribute('data-scroll-position', window.pageYOffset);
            document.body.style.position = 'fixed';
            document.body.style.top = `-${window.pageYOffset}px`;
            document.body.style.width = '100%';
        } else {
            const scrollPosition = document.body.getAttribute('data-scroll-position');
            if (scrollPosition) {
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                window.scrollTo(0, parseInt(scrollPosition));
                document.body.removeAttribute('data-scroll-position');
            }
        }
    }

    // Assicurati di chiamare questa funzione al caricamento della pagina
    document.addEventListener('DOMContentLoaded', function() {
        // Altre inizializzazioni
        updateActiveNavLink();
        
        // Migliora la gesture touch per mobile
        if ('ontouchstart' in window) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('touchstart', function(e) {
                    this.click();
                    e.preventDefault();
                });
            });
        }
    });

    // Event listener per hamburger
    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu(e);
        });
    }

    // Chiudi il menu quando si fa clic sull'overlay
    menuOverlay.addEventListener('click', toggleMenu);

    // Chiudi il menu quando si clicca su un link
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            if (hamburger.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Set current year for copyright
    if (currentYearElem) {
        currentYearElem.textContent = new Date().getFullYear();
    }

    // Navigation and scrolling
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            menuOverlay.style.display = 'block';
            setTimeout(() => {
                menuOverlay.style.opacity = '1';
            }, 10);
        } else {
            document.body.style.overflow = '';
            menuOverlay.style.opacity = '0';
            setTimeout(() => {
                menuOverlay.style.display = 'none';
            }, 300);
        }
    }

    // Gestisci il resize della finestra
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && hamburger.classList.contains('active')) {
            // Reset a desktop view
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
            document.body.style.top = '';
        }
    });

    // Soluzione per problemi di touch su mobile
    function handleTouchMove(e) {
        // Consenti lo scorrimento all'interno del menu, ma non del body
        if (document.body.classList.contains('menu-open')) {
            const target = e.target;
            const isInsideMenu = navLinks.contains(target) || navLinks === target;
            
            if (!isInsideMenu) {
                e.preventDefault();
            }
        }
    }

    // Aggiungi gli event listener touch
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

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
        
        // Prima rimuoviamo la classe active da tutti i links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Poi determiniamo quale sezione è attualmente visibile
        // e attiviamo il link corrispondente
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // Utilizziamo un selettore più specifico e preciso
                // che corrisponde esattamente all'href della sezione
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
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

    // Experience toggle - show 6 more at a time
    let visibleExperiencesCount = 3;
    if (experienceToggle) {
        const allExperienceCards = document.querySelectorAll('.experience-card');

        // Hide all experiences beyond the first 3
        allExperienceCards.forEach((card, index) => {
            if (index >= visibleExperiencesCount) {
                card.style.display = 'none';
            }
        });

        experienceToggle.addEventListener('click', function() {
            const hiddenExperiences = Array.from(allExperienceCards).filter(card => card.style.display === 'none');

            if (hiddenExperiences.length > 0) {
                // Show next 6 experiences
                const toShow = hiddenExperiences.slice(0, 6);
                toShow.forEach(card => {
                    card.style.display = 'block';
                });
                visibleExperiencesCount += toShow.length;

                // Hide button if all are visible
                if (visibleExperiencesCount >= allExperienceCards.length) {
                    this.style.display = 'none';
                }
            }
        });
    }

    // Projects toggle - show 6 more at a time
    let visibleProjectsCount = 6; // Start with 6 visible
    if (projectsToggle) {
        const allProjectCards = document.querySelectorAll('.project-card');

        // Hide all projects beyond the first 6
        allProjectCards.forEach((card, index) => {
            if (index >= visibleProjectsCount) {
                card.style.display = 'none';
            }
        });

        projectsToggle.addEventListener('click', function() {
            const hiddenProjects = Array.from(allProjectCards).filter(card => card.style.display === 'none');

            if (hiddenProjects.length > 0) {
                // Show next 6 projects
                const toShow = hiddenProjects.slice(0, 6);
                toShow.forEach(card => {
                    card.style.display = 'flex';
                    card.classList.add('fade-in');
                });
                visibleProjectsCount += toShow.length;

                // Hide button if all are visible
                if (visibleProjectsCount >= allProjectCards.length) {
                    this.style.display = 'none';
                }
            }
        });
    }

    // Certifications toggle - show 6 more at a time
    let visibleCertificationsCount = 3;
    if (certificationsToggle) {
        const allCertificationCards = document.querySelectorAll('.certification-card');

        // Hide all certifications beyond the first 3
        allCertificationCards.forEach((card, index) => {
            if (index >= visibleCertificationsCount) {
                card.style.display = 'none';
            }
        });

        certificationsToggle.addEventListener('click', function() {
            const hiddenCertifications = Array.from(allCertificationCards).filter(card => card.style.display === 'none');

            if (hiddenCertifications.length > 0) {
                // Show next 6 certifications
                const toShow = hiddenCertifications.slice(0, 6);
                toShow.forEach(card => {
                    card.style.display = 'block';
                });
                visibleCertificationsCount += toShow.length;

                // Hide button if all are visible
                if (visibleCertificationsCount >= allCertificationCards.length) {
                    this.style.display = 'none';
                }
            }
        });
    }

    // Spotlight Effect for Cards
    const cards = document.querySelectorAll('.card, .skill-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

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
    const mainTabBtns = document.querySelectorAll('.main-tab');
    const subTabBtns = document.querySelectorAll('.sub-tab');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const bachelorSubtabs = document.getElementById('bachelor-subtabs');
    const masterSubtabs = document.getElementById('master-subtabs');

    // Handle main category tabs
    mainTabBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Remove active class from all main tabs
            mainTabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked tab
            e.target.classList.add('active');

            const category = e.target.getAttribute('data-category');

            // Show/hide subtabs based on category
            if (category === 'bachelor') {
                bachelorSubtabs.classList.remove('hidden');
                masterSubtabs.classList.add('hidden');
                // Activate first bachelor subtab
                const firstBachelorTab = bachelorSubtabs.querySelector('.sub-tab');
                if (firstBachelorTab) {
                    firstBachelorTab.click();
                }
            } else if (category === 'master') {
                bachelorSubtabs.classList.add('hidden');
                masterSubtabs.classList.remove('hidden');
                // Activate first master subtab
                const firstMasterTab = masterSubtabs.querySelector('.sub-tab');
                if (firstMasterTab) {
                    firstMasterTab.click();
                }
            } else if (category === 'tutorings') {
                bachelorSubtabs.classList.add('hidden');
                masterSubtabs.classList.add('hidden');
                // Show tutorings content
                tabPanes.forEach(pane => pane.classList.remove('active'));
                const tutoratiPane = document.getElementById('tutorati');
                if (tutoratiPane) tutoratiPane.classList.add('active');
            } else if (category === 'thesis') {
                bachelorSubtabs.classList.add('hidden');
                masterSubtabs.classList.add('hidden');
                // Show thesis content
                tabPanes.forEach(pane => pane.classList.remove('active'));
                const tesiPane = document.getElementById('tesi');
                if (tesiPane) tesiPane.classList.add('active');
            }
        });
    });

    // Handle sub-tabs
    subTabBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Remove active from all sub-tabs
            subTabBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked sub-tab
            e.target.classList.add('active');

            // Hide all tab panes
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Show selected tab pane
            const targetId = e.target.getAttribute('data-target');
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            
            // Simulate sending (success)
            showNotification(`Thanks ${name}! Message sent successfully.`, 'success');
            contactForm.reset();
        });
    }

    // Custom Notification System
    function showNotification(message, type = 'success') {
        // Create element
        const notification = document.createElement('div');
        notification.className = `notification-toast ${type}`;
        
        // Icon based on type
        const iconClass = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
        
        notification.innerHTML = `
            <i class="fas ${iconClass}"></i>
            <span>${message}</span>
        `;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
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
    }

    // Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectsToggleBtn = document.getElementById('projects-toggle');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                // When filtering, show all matching projects and hide the "Show More" button
                if (projectsToggleBtn) projectsToggleBtn.style.display = 'none';

                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'flex';
                        // Re-trigger animation
                        card.classList.remove('fade-in');
                        void card.offsetWidth; // trigger reflow
                        card.classList.add('fade-in');
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
});
