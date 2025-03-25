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
        const phrases = {
            en: [
                'Full-Stack Developer',
                'Cybersecurity Enthusiast',
                'Tutor & Teacher',
                'Blockchain & Cloud Adventurer'
            ],
            it: [
                'Sviluppatore Full-Stack',
                'Appassionato di Cybersecurity',
                'Tutor & Insegnante',
                'Esploratore di Blockchain & Cloud'
            ],
            fr: [
                'Développeur Full-Stack',
                'Passionné de Cybersécurité',
                'Tuteur & Enseignant',
                'Explorateur Blockchain & Cloud'
            ],
            es: [
                'Desarrollador Full-Stack',
                'Entusiasta de Ciberseguridad',
                'Tutor & Profesor',
                'Aventurero de Blockchain & Cloud'
            ]
        };
        
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        let currentLang = getCurrentLanguage();

        function typeWriter() {
            const currentPhrases = phrases[currentLang] || phrases.en;
            const currentPhrase = currentPhrases[phraseIndex];
            
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
                phraseIndex = (phraseIndex + 1) % currentPhrases.length;
                // Pause before typing next phrase
                typingSpeed = 500;
            }
            
            setTimeout(typeWriter, typingSpeed);
        }
        
        // Start the typing effect
        setTimeout(typeWriter, 1000);

        // Update typing effect when language changes
        document.addEventListener('languageChanged', (e) => {
            currentLang = e.detail.language;
            if (isDeleting) {
                // Keep deleting if we're in the middle of deleting
                // The phrase will change once fully deleted
            } else {
                // If in the middle of typing, reset and start with new language
                isDeleting = true;
                charIndex = typedTextElement.textContent.length;
            }
        });
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
            const currentLang = getCurrentLanguage();
            const translations = {
                en: `Thank you ${name} for your message! I'll get back to you soon.`,
                it: `Grazie ${name} per il tuo messaggio! Ti risponderò presto.`,
                fr: `Merci ${name} pour votre message! Je vous répondrai bientôt.`,
                es: `¡Gracias ${name} por tu mensaje! Te responderé pronto.`
            };

            alert(translations[currentLang] || translations.en);
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

    // ==========================================
    // MULTI-LANGUAGE SYSTEM
    // ==========================================

    // Translation dictionaries for all supported languages
    const translations = {
        // English (default)
        en: {
            nav: {
                home: "Home",
                about: "About",
                experience: "Experience",
                skills: "Skills",
                projects: "Projects",
                education: "Education",
                certifications: "Certifications",
                achievements: "Achievements",
                notes: "Notes",
                contact: "Contact"
            },
            hero: {
                greeting: "Hi, I'm Gabriel",
                subtitle: "M.Sc. Computer Science Student",
                caption: "Bridging academic excellence with real-world innovation.",
                description: "From reactive systems to blockchain-based security, I build robust, scalable, and user-centric solutions.",
                cta: "Get in Touch",
                scroll: "Scroll Down"
            },
            about: {
                title: "About Me",
                intro1: "I'm a Full-Stack Developer and Educator with expertise in cybersecurity, software engineering, and emerging tech.",
                intro2: "I love exploring innovative solutions—from real-time reactive systems to blockchain applications—and thrive on empowering others through teaching and mentorship.",
                focus: "Focus Areas",
                areas: {
                    area1: "Cybersecurity & Cloud Computing",
                    area2: "DevOps & CI/CD",
                    area3: "Blockchain & Decentralized Apps",
                    area4: "Software Architecture & Engineering", 
                    area5: "Inclusive Teaching & Mentorship"
                },
                cv: {
                    title: "Curriculum Vitae",
                    text: "Download my CV in PDF format:",
                    btn: "Download CV"
                }
            },
            experience: {
                title: "Experience",
                teacher: {
                    title: "Teacher of Systems and Networks",
                    place: "ITI Galileo Ferraris",
                    desc: "Taught theoretical and practical lessons on network architectures, protocols, and security for high school students (3rd and 4th year)."
                },
                tutor: {
                    title: "Coordination & Didactic Tutor (Formal Languages)",
                    place: "University of Padua",
                    desc: "Led a team of tutors and supported the \"Formal Languages and Automata\" course through lectures, exercises, and student mentoring."
                },
                computability: {
                    title: "Didactic Tutor of Computability",
                    place: "University of Padua",
                    desc: "Assisted in teaching the Computability course for the M.Sc. in Computer Science, entirely in English, including lectures and project guidance."
                },
                inclusion: {
                    title: "Tutor for Inclusion",
                    place: "University of Padua",
                    desc: "Provided specialized tutoring and managed exam arrangements for students with special needs, ensuring personalized learning."
                },
                other: {
                    private: {
                        title: "Private Teacher & IT Assistant",
                        place: "Freelance",
                        desc: "Conducted private tutoring (elementary to university) in programming, math, languages. Built WordPress sites and provided general IT support."
                    },
                    intern: {
                        title: "Curricular Intern",
                        place: "Sync Lab S.r.l.",
                        desc: "Created a DApp proof-of-concept on Ethereum using EthersJS/Web3JS, integrating Self-Sovereign Identity (SSI) and Zero-Knowledge Proofs."
                    },
                    manager: {
                        title: "Customer Service Manager",
                        place: "Clesp S.r.l.",
                        desc: "Oversaw customer service for supermarket chains and affiliated stores, including front office, team coordination, and database operations."
                    },
                    configurator: {
                        title: "IT Applications Configurator",
                        place: "Digife S.r.l.",
                        desc: "Customized WordPress sites, integrated e-commerce plugins, designed newsletters, and supported digital marketing campaigns."
                    },
                    assistant: {
                        title: "Administrative Assistant",
                        place: "CIERRE Elettronica",
                        desc: "Provided administrative support during an internship, including document archiving and managing equipment."
                    }
                },
                showMore: "Show More",
                showLess: "Show Less"
            },
            skills: {
                title: "Skills",
                programming: "Programming Languages",
                frontend: "Frontend Development",
                backend: "Backend & Database",
                devops: "DevOps & Cloud",
                details: "Details",
                hideDetails: "Hide details"
            },
            projects: {
                title: "Projects",
                viewGitHub: "View on GitHub",
                viewReport: "View Report",
                showMore: "Show More",
                showLess: "Show Less"
            },
            education: {
                title: "Education",
                msc: {
                    title: "M.Sc. in Computer Science",
                    place: "University of Padua",
                    desc: "Major in Internet, Mobile and Security – courses include Mobile Application Security, Advanced Cryptography, Secure App Development, and Big Data Management."
                },
                bsc: {
                    title: "B.Sc. in Computer Science",
                    place: "University of Padua",
                    desc: "Focused on algorithms, object-oriented programming (C++/Qt), concurrent programming with Java, SQL-based database management, and accessible web development.",
                    grade: "Grade: 98/110"
                },
                diploma: {
                    title: "Computer Science Diploma",
                    place: "I.I.S. Polo Tecnico di Adria",
                    desc: "Specialized in programming (C, Java), network design, HTML/CSS/JS/PHP, and IT project management.",
                    grade: "Grade: 100/100"
                }
            },
            testimonials: {
                title: "Testimonials",
                testimonial1: {
                    text: "Very professional and knowledgeable! Great empathy and education in the approach with pupils! Definitely great satisfaction in learning with such a competent person, professional and also with great availability! Thank you Gabriel.",
                    author: "Stefano I.",
                    position: "Ex CEO and entrepreneur, collabs to teach him Internet and Computer Science (elder instruction) - public review on Superprof"
                },
                testimonial2: {
                    text: "Gabriel empathized with my son and helped him catch up in computer science with just a few lessons, avoiding the risk of debt in September! Highly recommended!",
                    author: "Angela G.",
                    position: "Mum of Niccolò, one of the many students in Computer Science I've had overtime, lessons in Math and Computer Science - public review on Superprof"
                },
                prev: "Previous",
                next: "Next"
            },
            certifications: {
                title: "Certifications"
            },
            achievements: {
                title: "Achievements",
                achievement1: {
                    title: "Top 50 STEM Students at UniPD",
                    desc: "Awarded 39th place out of 300 students in 2024/2025"
                },
                achievement2: {
                    title: "Second Place in \"Accattivante ed Accessibile\" Competition",
                    desc: "Recognition for web accessibility design (December 2022)"
                },
                achievement3: {
                    title: "Multiple Academic Merit Scholarships",
                    desc: "Recognized for excellence in academic performance"
                },
                achievement4: {
                    title: "Bronze Medals in Karate",
                    desc: "Bronze medals and a cup in interregional karate competitions"
                },
                achievement5: {
                    title: "Top GitHub Committer",
                    desc: "Recognized among top committers during college years"
                }
            },
            notes: {
                title: "University Notes",
                intro: "Here you can find notes from the courses I attended during my university studies. They are organized by academic year and subject.",
                note: "Note: All material is my original creation and does not violate any copyright. It is provided free of charge for educational purposes.",
                tabs: {
                    tab1: "1° Year Bachelor",
                    tab2: "2° Year Bachelor",
                    tab3: "3° Year Bachelor",
                    tab4: "Master's - Mandatory",
                    tab5: "Master's - Major",
                    tab6: "Master's - Minor",
                    tab7: "Master's - Free Choice",
                    tab8: "Optional Courses"
                },
                message: {
                    p1: "Over the years, I've had the privilege of helping hundreds of students in their academic journeys. From high school students struggling with basic programming concepts to university graduates tackling complex algorithms, each interaction has enriched my teaching experience and reinforced my passion for education.",
                    p2: "What started as simple study notes evolved into a comprehensive collection that has reached far beyond my initial expectations. The countless messages of gratitude I've received are a testament to the value of knowledge sharing and collaborative learning.",
                    p3: "To every student who has trusted me with their education, to every peer who has recommended my materials, and to every professor who has supported my teaching methods - thank you. Your feedback and success stories continue to inspire my work.",
                    signature: "— Gabriel Rovesti"
                },
                copyright: "All this material is an original creation in concept. Given this is student material, it's expected to find references to web material, images or copies. So the material in itself is more of a combination of things. Free distribution is authorized for educational and study purposes only, since as said I do not own the complete portions of every present material. But overtime it became a documented resource used by many students, who still thank me to this day. So an impact they made.",
                support: {
                    text: "If you find these notes useful and want to support my work:",
                    btn: "Support this project"
                }
            },
            contact: {
                title: "Get In Touch",
                text: "For collaborations, tutoring opportunities, or project inquiries, feel free to reach out through any of the channels below.",
                form: {
                    title: "Send Me a Message",
                    name: "Your Name",
                    email: "Your Email",
                    subject: "Subject",
                    message: "Your Message",
                    send: "Send Message",
                    thanks: "Thank you {name} for your message! I'll get back to you soon."
                }
            },
            footer: {
                copyright: "All rights reserved."
            }
        },
        // Italian translation
        it: {
            nav: {
                home: "Home",
                about: "Chi Sono",
                experience: "Esperienza",
                skills: "Competenze",
                projects: "Progetti",
                education: "Formazione",
                certifications: "Certificazioni",
                achievements: "Riconoscimenti",
                notes: "Appunti",
                contact: "Contatti"
            },
            hero: {
                greeting: "Ciao, sono Gabriel",
                subtitle: "Studente di Laurea Magistrale in Informatica",
                caption: "Collegando l'eccellenza accademica con l'innovazione del mondo reale.",
                description: "Dai sistemi reattivi alla sicurezza basata su blockchain, costruisco soluzioni robuste, scalabili e incentrate sull'utente.",
                cta: "Contattami",
                scroll: "Scorri Giù"
            },
            about: {
                title: "Chi Sono",
                intro1: "Sono uno Sviluppatore Full-Stack e un Educatore con competenze in cybersecurity, ingegneria del software e tecnologie emergenti.",
                intro2: "Amo esplorare soluzioni innovative—dai sistemi reattivi in tempo reale alle applicazioni blockchain—e prospero nell'aiutare gli altri attraverso l'insegnamento e il tutoraggio.",
                focus: "Aree di Specializzazione",
                areas: {
                    area1: "Cybersecurity & Cloud Computing",
                    area2: "DevOps & CI/CD",
                    area3: "Blockchain & App Decentralizzate",
                    area4: "Architettura & Ingegneria del Software", 
                    area5: "Insegnamento Inclusivo & Tutoraggio"
                },
                cv: {
                    title: "Curriculum Vitae",
                    text: "Scarica il mio CV in formato PDF:",
                    btn: "Scarica CV"
                }
            },
            experience: {
                title: "Esperienza",
                teacher: {
                    title: "Docente di Sistemi e Reti",
                    place: "ITI Galileo Ferraris",
                    desc: "Insegnamento teorico e pratico sulle architetture di rete, protocolli e sicurezza per studenti di scuola superiore (3° e 4° anno)."
                },
                tutor: {
                    title: "Tutor di Coordinamento e Didattico (Automi e Linguaggi Formali)",
                    place: "Università di Padova",
                    desc: "Guida di un team di tutor e supporto al corso \"Automi e Linguaggi Formali\" attraverso lezioni, esercitazioni e tutoraggio degli studenti."
                },
                computability: {
                    title: "Tutor Didattico di Computability",
                    place: "Università di Padova",
                    desc: "Assistenza nell'insegnamento del corso di Computability per la Laurea Magistrale in Informatica, interamente in inglese, incluse lezioni e guida per i progetti."
                },
                inclusion: {
                    title: "Tutor per l'Inclusione",
                    place: "Università di Padova",
                    desc: "Tutoraggio specializzato e gestione delle prove d'esame per studenti con esigenze speciali, garantendo un apprendimento personalizzato."
                },
                other: {
                    private: {
                        title: "Insegnante Privato & Assistente IT",
                        place: "Freelance",
                        desc: "Ho condotto tutoraggio privato (dalle elementari all'università) in programmazione, matematica, lingue. Ho creato siti WordPress e fornito supporto IT generale."
                    },
                    intern: {
                        title: "Stagista Curriculare",
                        place: "Sync Lab S.r.l.",
                        desc: "Creazione di una proof-of-concept DApp su Ethereum utilizzando EthersJS/Web3JS, integrando Self-Sovereign Identity (SSI) e Zero-Knowledge Proofs."
                    },
                    manager: {
                        title: "Responsabile Servizio Clienti",
                        place: "Clesp S.r.l.",
                        desc: "Supervisione del servizio clienti per catene di supermercati e negozi affiliati, incluso front office, coordinamento del team e operazioni di database."
                    },
                    configurator: {
                        title: "Configuratore di Applicazioni IT",
                        place: "Digife S.r.l.",
                        desc: "Personalizzazione di siti WordPress, integrazione di plugin e-commerce, progettazione di newsletter e supporto alle campagne di marketing digitale."
                    },
                    assistant: {
                        title: "Assistente Amministrativo",
                        place: "CIERRE Elettronica",
                        desc: "Supporto amministrativo durante un tirocinio, inclusa l'archiviazione di documenti e la gestione delle attrezzature."
                    }
                },
                showMore: "Mostra Altro",
                showLess: "Mostra Meno"
            },
            skills: {
                title: "Competenze",
                programming: "Linguaggi di Programmazione",
                frontend: "Sviluppo Frontend",
                backend: "Backend & Database",
                devops: "DevOps & Cloud",
                details: "Dettagli",
                hideDetails: "Nascondi dettagli"
            },
            projects: {
                title: "Progetti",
                viewGitHub: "Vedi su GitHub",
                viewReport: "Vedi Report",
                showMore: "Mostra Altro",
                showLess: "Mostra Meno"
            },
            education: {
                title: "Formazione",
                msc: {
                    title: "Laurea Magistrale in Informatica",
                    place: "Università di Padova",
                    desc: "Major in Internet, Mobile and Security – corsi includono Sicurezza delle Applicazioni Mobili, Crittografia Avanzata, Sviluppo di App Sicure e Gestione di Big Data."
                },
                bsc: {
                    title: "Laurea in Informatica",
                    place: "Università di Padova",
                    desc: "Focus su algoritmi, programmazione orientata agli oggetti (C++/Qt), programmazione concorrente con Java, gestione database SQL e sviluppo web accessibile.",
                    grade: "Voto: 98/110"
                },
                diploma: {
                    title: "Diploma in Informatica",
                    place: "I.I.S. Polo Tecnico di Adria",
                    desc: "Specializzazione in programmazione (C, Java), progettazione di reti, HTML/CSS/JS/PHP e gestione di progetti IT.",
                    grade: "Voto: 100/100"
                }
            },
            testimonials: {
                title: "Testimonianze",
                testimonial1: {
                    text: "Molto professionale e competente! Grande empatia e formazione nell'approccio con gli allievi! Sicuramente grande soddisfazione nell'apprendere con una persona così competente, professionale e anche con grande disponibilità! Grazie Gabriel.",
                    author: "Stefano I.",
                    position: "Ex CEO e imprenditore, collaborazioni per insegnargli Internet e Informatica (istruzione per anziani) - recensione pubblica su Superprof"
                },
                testimonial2: {
                    text: "Gabriel ha empatizzato con mio figlio e lo ha aiutato a recuperare in informatica con poche lezioni, evitando il rischio di debito a settembre! Altamente raccomandato!",
                    author: "Angela G.",
                    position: "Mamma di Niccolò, uno dei tanti studenti di Informatica che ho avuto nel tempo, lezioni di Matematica e Informatica - recensione pubblica su Superprof"
                },
                prev: "Precedente",
                next: "Successivo"
            },
            certifications: {
                title: "Certificazioni"
            },
            achievements: {
                title: "Riconoscimenti",
                achievement1: {
                    title: "Top 50 Studenti STEM all'UniPD",
                    desc: "Premiato 39° posto su 300 studenti nel 2024/2025"
                },
                achievement2: {
                    title: "Secondo Posto nel Concorso \"Accattivante ed Accessibile\"",
                    desc: "Riconoscimento per il design dell'accessibilità web (Dicembre 2022)"
                },
                achievement3: {
                    title: "Multiple Borse di Studio per Merito Accademico",
                    desc: "Riconosciuto per l'eccellenza nei risultati accademici"
                },
                achievement4: {
                    title: "Medaglie di Bronzo nel Karate",
                    desc: "Medaglie di bronzo e una coppa in competizioni interregionali di karate"
                },
                achievement5: {
                    title: "Top Contributor GitHub",
                    desc: "Riconosciuto tra i migliori collaboratori durante gli anni universitari"
                }
            },
            notes: {
                title: "Appunti Universitari",
                intro: "Qui puoi trovare appunti dei corsi che ho frequentato durante i miei studi universitari. Sono organizzati per anno accademico e materia.",
                note: "Nota: Tutto il materiale è una mia creazione originale e non viola alcun copyright. È fornito gratuitamente per scopi educativi.",
                tabs: {
                    tab1: "1° Anno Triennale",
                    tab2: "2° Anno Triennale",
                    tab3: "3° Anno Triennale",
                    tab4: "Magistrale - Obbligatori",
                    tab5: "Magistrale - Major",
                    tab6: "Magistrale - Minor",
                    tab7: "Magistrale - Scelta Libera",
                    tab8: "Opzionali e Libera Scelta"
                },
                message: {
                    p1: "Nel corso degli anni, ho avuto il privilegio di aiutare centinaia di studenti nei loro percorsi accademici. Dagli studenti delle superiori che affrontano concetti base di programmazione ai laureati che affrontano algoritmi complessi, ogni interazione ha arricchito la mia esperienza di insegnamento e rafforzato la mia passione per l'educazione.",
                    p2: "Ciò che è iniziato come semplici appunti di studio si è evoluto in una collezione completa che ha raggiunto ben oltre le mie aspettative iniziali. I numerosi messaggi di gratitudine che ho ricevuto sono una testimonianza del valore della condivisione della conoscenza e dell'apprendimento collaborativo.",
                    p3: "A ogni studente che ha riposto fiducia nella mia educazione, a ogni collega che ha raccomandato i miei materiali e a ogni professore che ha supportato i miei metodi di insegnamento - grazie. Il vostro feedback e le vostre storie di successo continuano a ispirare il mio lavoro.",
                    signature: "— Gabriel Rovesti"
                },
                copyright: "Tutto questo materiale è una creazione originale in concetto. Dato che si tratta di materiale di uno studente, è normale trovare riferimenti a materiale web, immagini o copie. Quindi il materiale in sé è più una combinazione di cose. La distribuzione gratuita è autorizzata solo a fini educativi e di studio, poiché come detto non possiedo le porzioni complete di ogni materiale presente. Ma nel tempo è diventata una risorsa documentata utilizzata da molti studenti, che ancora oggi mi ringraziano. Quindi un impatto l'hanno fatto.",
                support: {
                    text: "Se trovi questi appunti utili e vuoi supportare il mio lavoro:",
                    btn: "Supporta questo progetto"
                }
            },
            contact: {
                title: "Contatti",
                text: "Per collaborazioni, opportunità di tutoraggio o domande sui progetti, sentiti libero di contattarmi attraverso uno dei canali qui sotto.",
                form: {
                    title: "Inviami un Messaggio",
                    name: "Il tuo Nome",
                    email: "La tua Email",
                    subject: "Oggetto",
                    message: "Il tuo Messaggio",
                    send: "Invia Messaggio",
                    thanks: "Grazie {name} per il tuo messaggio! Ti risponderò presto."
                }
            },
            footer: {
                copyright: "Tutti i diritti riservati."
            }
        },
        // French translation
        fr: {
            nav: {
                home: "Accueil",
                about: "À Propos",
                experience: "Expérience",
                skills: "Compétences",
                projects: "Projets",
                education: "Formation",
                certifications: "Certifications",
                achievements: "Réalisations",
                notes: "Notes",
                contact: "Contact"
            },
            hero: {
                greeting: "Bonjour, je suis Gabriel",
                subtitle: "Étudiant en Master Informatique",
                caption: "Associer l'excellence académique à l'innovation concrète.",
                description: "Des systèmes réactifs à la sécurité basée sur la blockchain, je construis des solutions robustes, évolutives et centrées sur l'utilisateur.",
                cta: "Me Contacter",
                scroll: "Défiler vers le bas"
            },
            about: {
                title: "À Propos de Moi",
                intro1: "Je suis un Développeur Full-Stack et Éducateur avec une expertise en cybersécurité, ingénierie logicielle et technologies émergentes.",
                intro2: "J'aime explorer des solutions innovantes—des systèmes réactifs en temps réel aux applications blockchain—et je m'épanouis en aidant les autres grâce à l'enseignement et au mentorat.",
                focus: "Domaines de Spécialisation",
                areas: {
                    area1: "Cybersécurité & Cloud Computing",
                    area2: "DevOps & CI/CD",
                    area3: "Blockchain & Applications Décentralisées",
                    area4: "Architecture & Ingénierie Logicielle", 
                    area5: "Enseignement Inclusif & Mentorat"
                },
                cv: {
                    title: "Curriculum Vitae",
                    text: "Téléchargez mon CV au format PDF:",
                    btn: "Télécharger CV"
                }
            },
            experience: {
                title: "Expérience",
                teacher: {
                    title: "Professeur de Systèmes et Réseaux",
                    place: "ITI Galileo Ferraris",
                    desc: "Enseignement théorique et pratique sur les architectures réseau, les protocoles et la sécurité pour les lycéens (3ème et 4ème année)."
                },
                tutor: {
                    title: "Tuteur de Coordination et Didactique (Langages Formels)",
                    place: "Université de Padoue",
                    desc: "Direction d'une équipe de tuteurs et soutien au cours \"Langages Formels et Automates\" à travers des cours, des exercices et du mentorat étudiant."
                },
                computability: {
                    title: "Tuteur Didactique de Calculabilité",
                    place: "Université de Padoue",
                    desc: "Assistance à l'enseignement du cours de Calculabilité pour le Master en Informatique, entièrement en anglais, y compris les cours et l'orientation des projets."
                },
                inclusion: {
                    title: "Tuteur pour l'Inclusion",
                    place: "Université de Padoue",
                    desc: "Tutorat spécialisé et gestion des examens pour les étudiants ayant des besoins spécifiques, assurant un apprentissage personnalisé."
                },
                other: {
                    private: {
                        title: "Professeur Particulier & Assistant IT",
                        place: "Freelance",
                        desc: "Tutorat privé (du primaire à l'université) en programmation, mathématiques, langues. Création de sites WordPress et support IT général."
                    },
                    intern: {
                        title: "Stagiaire",
                        place: "Sync Lab S.r.l.",
                        desc: "Création d'une preuve de concept DApp sur Ethereum en utilisant EthersJS/Web3JS, intégrant Self-Sovereign Identity (SSI) et Zero-Knowledge Proofs."
                    },
                    manager: {
                        title: "Responsable Service Client",
                        place: "Clesp S.r.l.",
                        desc: "Supervision du service client pour les chaînes de supermarchés et les magasins affiliés, y compris l'accueil, la coordination d'équipe et les opérations de base de données."
                    },
                    configurator: {
                        title: "Configurateur d'Applications IT",
                        place: "Digife S.r.l.",
                        desc: "Personnalisation de sites WordPress, intégration de plugins e-commerce, conception de newsletters et soutien aux campagnes de marketing digital."
                    },
                    assistant: {
                        title: "Assistant Administratif",
                        place: "CIERRE Elettronica",
                        desc: "Support administratif durant un stage, incluant l'archivage de documents et la gestion d'équipements."
                    }
                },
                showMore: "Voir Plus",
                showLess: "Voir Moins"
            },
            skills: {
                title: "Compétences",
                programming: "Langages de Programmation",
                frontend: "Développement Frontend",
                backend: "Backend & Base de Données",
                devops: "DevOps & Cloud",
                details: "Détails",
                hideDetails: "Masquer les détails"
            },
            projects: {
                title: "Projets",
                viewGitHub: "Voir sur GitHub",
                viewReport: "Voir le Rapport",
                showMore: "Voir Plus",
                showLess: "Voir Moins"
            },
            education: {
                title: "Formation",
                msc: {
                    title: "Master en Informatique",
                    place: "Université de Padoue",
                    desc: "Spécialisation en Internet, Mobile et Sécurité – les cours incluent la Sécurité des Applications Mobiles, la Cryptographie Avancée, le Développement d'Applications Sécurisées et la Gestion des Big Data."
                },
                bsc: {
                    title: "Licence en Informatique",
                    place: "Université de Padoue",
                    desc: "Accent sur les algorithmes, la programmation orientée objet (C++/Qt), la programmation concurrente avec Java, la gestion de bases de données SQL et le développement web accessible.",
                    grade: "Note: 98/110"
                },
                diploma: {
                    title: "Diplôme en Informatique",
                    place: "I.I.S. Polo Tecnico di Adria",
                    desc: "Spécialisation en programmation (C, Java), conception de réseaux, HTML/CSS/JS/PHP et gestion de projets IT.",
                    grade: "Note: 100/100"
                }
            },
            testimonials: {
                title: "Témoignages",
                testimonial1: {
                    text: "Très professionnel et compétent ! Grande empathie et éducation dans l'approche avec les élèves ! Satisfaction garantie d'apprendre avec une personne aussi compétente, professionnelle et disponible ! Merci Gabriel.",
                    author: "Stefano I.",
                    position: "Ex PDG et entrepreneur, collaborations pour lui enseigner Internet et Informatique (instruction pour seniors) - avis public sur Superprof"
                },
                testimonial2: {
                    text: "Gabriel a fait preuve d'empathie avec mon fils et l'a aidé à rattraper son retard en informatique avec seulement quelques leçons, évitant le risque d'échec en septembre ! Hautement recommandé !",
                    author: "Angela G.",
                    position: "Mère de Niccolò, l'un des nombreux étudiants en informatique que j'ai eu au fil du temps, cours de mathématiques et d'informatique - avis public sur Superprof"
                },
                prev: "Précédent",
                next: "Suivant"
            },
            certifications: {
                title: "Certifications"
            },
            achievements: {
                title: "Réalisations",
                achievement1: {
                    title: "Top 50 des Étudiants STEM à l'UniPD",
                    desc: "Classé 39ème sur 300 étudiants en 2024/2025"
                },
                achievement2: {
                    title: "Deuxième Place au Concours \"Accattivante ed Accessibile\"",
                    desc: "Reconnaissance pour la conception d'accessibilité web (Décembre 2022)"
                },
                achievement3: {
                    title: "Multiples Bourses au Mérite Académique",
                    desc: "Reconnu pour l'excellence dans les performances académiques"
                },
                achievement4: {
                    title: "Médailles de Bronze en Karaté",
                    desc: "Médailles de bronze et une coupe dans des compétitions interrégionales de karaté"
                },
                achievement5: {
                    title: "Top Contributeur GitHub",
                    desc: "Reconnu parmi les meilleurs contributeurs pendant les années universitaires"
                }
            },
            notes: {
                title: "Notes Universitaires",
                intro: "Vous pouvez trouver ici les notes des cours que j'ai suivis pendant mes études universitaires. Elles sont organisées par année académique et par matière.",
                note: "Note: Tout ce matériel est ma création originale et ne viole aucun droit d'auteur. Il est fourni gratuitement à des fins éducatives.",
                tabs: {
                    tab1: "1ère Année Licence",
                    tab2: "2ème Année Licence",
                    tab3: "3ème Année Licence",
                    tab4: "Master - Obligatoires",
                    tab5: "Master - Majeure",
                    tab6: "Master - Mineure",
                    tab7: "Master - Choix Libre",
                    tab8: "Cours Optionnels"
                },
                message: {
                    p1: "Au fil des années, j'ai eu le privilège d'aider des centaines d'étudiants dans leurs parcours académiques. Des lycéens luttant avec les concepts de base de la programmation aux diplômés universitaires abordant des algorithmes complexes, chaque interaction a enrichi mon expérience d'enseignement et renforcé ma passion pour l'éducation.",
                    p2: "Ce qui a commencé comme de simples notes d'étude a évolué en une collection complète qui a atteint bien au-delà de mes attentes initiales. Les innombrables messages de gratitude que j'ai reçus témoignent de la valeur du partage des connaissances et de l'apprentissage collaboratif.",
                    p3: "À chaque étudiant qui a fait confiance à mon enseignement, à chaque pair qui a recommandé mes documents et à chaque professeur qui a soutenu mes méthodes d'enseignement - merci. Vos retours et vos histoires de réussite continuent d'inspirer mon travail.",
                    signature: "— Gabriel Rovesti"
                },
                copyright: "Tout ce matériel est une création originale en concept. Étant donné qu'il s'agit de matériel étudiant, il est normal de trouver des références à du matériel web, des images ou des copies. Donc le matériel en soi est plus une combinaison de choses. La distribution gratuite est autorisée uniquement à des fins éducatives et d'étude, car comme indiqué, je ne possède pas les portions complètes de chaque matériel présent. Mais au fil du temps, c'est devenu une ressource documentée utilisée par de nombreux étudiants, qui me remercient encore aujourd'hui. Donc ils ont eu un impact.",
                support: {
                    text: "Si vous trouvez ces notes utiles et souhaitez soutenir mon travail:",
                    btn: "Soutenir ce projet"
                }
            },
            contact: {
                title: "Contact",
                text: "Pour des collaborations, des opportunités de tutorat ou des questions sur les projets, n'hésitez pas à me contacter via l'un des canaux ci-dessous.",
                form: {
                    title: "Envoyez-moi un Message",
                    name: "Votre Nom",
                    email: "Votre Email",
                    subject: "Sujet",
                    message: "Votre Message",
                    send: "Envoyer le Message",
                    thanks: "Merci {name} pour votre message ! Je vous répondrai bientôt."
                }
            },
            footer: {
                copyright: "Tous droits réservés."
            }
        },
        // Spanish translation
        es: {
            nav: {
                home: "Inicio",
                about: "Sobre Mí",
                experience: "Experiencia",
                skills: "Habilidades",
                projects: "Proyectos",
                education: "Educación",
                certifications: "Certificaciones",
                achievements: "Logros",
                notes: "Apuntes",
                contact: "Contacto"
            },
            hero: {
                greeting: "Hola, soy Gabriel",
                subtitle: "Estudiante de Maestría en Informática",
                caption: "Conectando la excelencia académica con la innovación del mundo real.",
                description: "Desde sistemas reactivos hasta seguridad basada en blockchain, construyo soluciones robustas, escalables y centradas en el usuario.",
                cta: "Contáctame",
                scroll: "Desplázate hacia abajo"
            },
            about: {
                title: "Sobre Mí",
                intro1: "Soy un Desarrollador Full-Stack y Educador con experiencia en ciberseguridad, ingeniería de software y tecnologías emergentes.",
                intro2: "Me encanta explorar soluciones innovadoras—desde sistemas reactivos en tiempo real hasta aplicaciones blockchain—y prospero ayudando a otros a través de la enseñanza y la tutoría.",
                focus: "Áreas de Especialización",
                areas: {
                    area1: "Ciberseguridad & Cloud Computing",
                    area2: "DevOps & CI/CD",
                    area3: "Blockchain & Aplicaciones Descentralizadas",
                    area4: "Arquitectura & Ingeniería de Software", 
                    area5: "Enseñanza Inclusiva & Tutoría"
                },
                cv: {
                    title: "Currículum Vitae",
                    text: "Descarga mi CV en formato PDF:",
                    btn: "Descargar CV"
                }
            },
            experience: {
                title: "Experiencia",
                teacher: {
                    title: "Profesor de Sistemas y Redes",
                    place: "ITI Galileo Ferraris",
                    desc: "Enseñanza teórica y práctica sobre arquitecturas de red, protocolos y seguridad para estudiantes de secundaria (3er y 4to año)."
                },
                tutor: {
                    title: "Tutor de Coordinación y Didáctico (Lenguajes Formales)",
                    place: "Universidad de Padua",
                    desc: "Liderazgo de un equipo de tutores y apoyo al curso \"Lenguajes Formales y Autómatas\" a través de clases, ejercicios y tutoría estudiantil."
                },
                computability: {
                    title: "Tutor Didáctico de Computabilidad",
                    place: "Universidad de Padua",
                    desc: "Asistencia en la enseñanza del curso de Computabilidad para la Maestría en Informática, completamente en inglés, incluyendo clases y orientación de proyectos."
                },
                inclusion: {
                    title: "Tutor para la Inclusión",
                    place: "Universidad de Padua",
                    desc: "Tutoría especializada y gestión de exámenes para estudiantes con necesidades especiales, asegurando un aprendizaje personalizado."
                },
                other: {
                    private: {
                        title: "Profesor Particular & Asistente IT",
                        place: "Freelance",
                        desc: "Tutoría privada (desde primaria hasta universidad) en programación, matemáticas, idiomas. Creación de sitios WordPress y soporte IT general."
                    },
                    intern: {
                        title: "Pasante Curricular",
                        place: "Sync Lab S.r.l.",
                        desc: "Creación de una prueba de concepto DApp en Ethereum utilizando EthersJS/Web3JS, integrando Self-Sovereign Identity (SSI) y Zero-Knowledge Proofs."
                    },
                    manager: {
                        title: "Gerente de Atención al Cliente",
                        place: "Clesp S.r.l.",
                        desc: "Supervisión del servicio al cliente para cadenas de supermercados y tiendas afiliadas, incluyendo recepción, coordinación de equipos y operaciones de bases de datos."
                    },
                    configurator: {
                        title: "Configurador de Aplicaciones IT",
                        place: "Digife S.r.l.",
                        desc: "Personalización de sitios WordPress, integración de plugins de comercio electrónico, diseño de boletines y apoyo a campañas de marketing digital."
                    },
                    assistant: {
                        title: "Asistente Administrativo",
                        place: "CIERRE Elettronica",
                        desc: "Soporte administrativo durante una pasantía, incluyendo archivo de documentos y gestión de equipos."
                    }
                },
                showMore: "Mostrar Más",
                showLess: "Mostrar Menos"
            },
            skills: {
                title: "Habilidades",
                programming: "Lenguajes de Programación",
                frontend: "Desarrollo Frontend",
                backend: "Backend & Base de Datos",
                devops: "DevOps & Cloud",
                details: "Detalles",
                hideDetails: "Ocultar detalles"
            },
            projects: {
                title: "Proyectos",
                viewGitHub: "Ver en GitHub",
                viewReport: "Ver Informe",
                showMore: "Mostrar Más",
                showLess: "Mostrar Menos"
            },
            education: {
                title: "Educación",
                msc: {
                    title: "Maestría en Informática",
                    place: "Universidad de Padua",
                    desc: "Especialización en Internet, Mobile y Seguridad – los cursos incluyen Seguridad de Aplicaciones Móviles, Criptografía Avanzada, Desarrollo de Aplicaciones Seguras y Gestión de Big Data."
                },
                bsc: {
                    title: "Licenciatura en Informática",
                    place: "Universidad de Padua",
                    desc: "Enfoque en algoritmos, programación orientada a objetos (C++/Qt), programación concurrente con Java, gestión de bases de datos SQL y desarrollo web accesible.",
                    grade: "Nota: 98/110"
                },
                diploma: {
                    title: "Diploma en Informática",
                    place: "I.I.S. Polo Tecnico di Adria",
                    desc: "Especialización en programación (C, Java), diseño de redes, HTML/CSS/JS/PHP y gestión de proyectos IT.",
                    grade: "Nota: 100/100"
                }
            },
            testimonials: {
                title: "Testimonios",
                testimonial1: {
                    text: "¡Muy profesional y conocedor! ¡Gran empatía y educación en el enfoque con los alumnos! ¡Definitivamente gran satisfacción en aprender con una persona tan competente, profesional y también con gran disponibilidad! Gracias Gabriel.",
                    author: "Stefano I.",
                    position: "Ex CEO y empresario, colaboraciones para enseñarle Internet e Informática (instrucción para personas mayores) - reseña pública en Superprof"
                },
                testimonial2: {
                    text: "¡Gabriel empatizó con mi hijo y lo ayudó a ponerse al día en informática con solo unas pocas lecciones, evitando el riesgo de deuda en septiembre! ¡Altamente recomendado!",
                    author: "Angela G.",
                    position: "Madre de Niccolò, uno de los muchos estudiantes en Informática que he tenido a lo largo del tiempo, lecciones en Matemáticas e Informática - reseña pública en Superprof"
                },
                prev: "Anterior",
                next: "Siguiente"
            },
            certifications: {
                title: "Certificaciones"
            },
            achievements: {
                title: "Logros",
                achievement1: {
                    title: "Top 50 Estudiantes STEM en UniPD",
                    desc: "Premiado 39º lugar de 300 estudiantes en 2024/2025"
                },
                achievement2: {
                    title: "Segundo Lugar en el Concurso \"Accattivante ed Accessibile\"",
                    desc: "Reconocimiento por diseño de accesibilidad web (Diciembre 2022)"
                },
                achievement3: {
                    title: "Múltiples Becas por Mérito Académico",
                    desc: "Reconocido por la excelencia en rendimiento académico"
                },
                achievement4: {
                    title: "Medallas de Bronce en Karate",
                    desc: "Medallas de bronce y una copa en competiciones interregionales de karate"
                },
                achievement5: {
                    title: "Top Colaborador de GitHub",
                    desc: "Reconocido entre los mejores colaboradores durante los años universitarios"
                }
            },
            notes: {
                title: "Apuntes Universitarios",
                intro: "Aquí puedes encontrar apuntes de los cursos a los que asistí durante mis estudios universitarios. Están organizados por año académico y asignatura.",
                note: "Nota: Todo el material es mi creación original y no viola ningún derecho de autor. Se proporciona de forma gratuita con fines educativos.",
                tabs: {
                    tab1: "1er Año Licenciatura",
                    tab2: "2º Año Licenciatura",
                    tab3: "3er Año Licenciatura",
                    tab4: "Maestría - Obligatorios",
                    tab5: "Maestría - Especialidad",
                    tab6: "Maestría - Menor",
                    tab7: "Maestría - Libre Elección",
                    tab8: "Cursos Opcionales"
                },
                message: {
                    p1: "A lo largo de los años, he tenido el privilegio de ayudar a cientos de estudiantes en sus trayectorias académicas. Desde estudiantes de secundaria que luchan con conceptos básicos de programación hasta graduados universitarios que abordan algoritmos complejos, cada interacción ha enriquecido mi experiencia de enseñanza y reforzado mi pasión por la educación.",
                    p2: "Lo que comenzó como simples apuntes de estudio evolucionó hasta convertirse en una colección integral que ha llegado mucho más allá de mis expectativas iniciales. Los innumerables mensajes de gratitud que he recibido son un testimonio del valor del intercambio de conocimientos y el aprendizaje colaborativo.",
                    p3: "A cada estudiante que ha confiado en mi educación, a cada compañero que ha recomendado mis materiales y a cada profesor que ha apoyado mis métodos de enseñanza - gracias. Sus comentarios e historias de éxito continúan inspirando mi trabajo.",
                    signature: "— Gabriel Rovesti"
                },
                copyright: "Todo este material es una creación original en concepto. Dado que es material de estudiante, es normal encontrar referencias a material web, imágenes o copias. Así que el material en sí es más una combinación de cosas. La distribución gratuita está autorizada solo con fines educativos y de estudio, ya que como se dijo, no poseo las porciones completas de todo el material presente. Pero con el tiempo se convirtió en un recurso documentado utilizado por muchos estudiantes, que todavía me agradecen hasta el día de hoy. Así que un impacto hicieron.",
                support: {
                    text: "Si encuentras útiles estos apuntes y quieres apoyar mi trabajo:",
                    btn: "Apoyar este proyecto"
                }
            },
            contact: {
                title: "Contacto",
                text: "Para colaboraciones, oportunidades de tutoría o consultas sobre proyectos, no dudes en comunicarte a través de cualquiera de los canales a continuación.",
                form: {
                    title: "Envíame un Mensaje",
                    name: "Tu Nombre",
                    email: "Tu Email",
                    subject: "Asunto",
                    message: "Tu Mensaje",
                    send: "Enviar Mensaje",
                    thanks: "¡Gracias {name} por tu mensaje! Te responderé pronto."
                }
            },
            footer: {
                copyright: "Todos los derechos reservados."
            }
        }
    };

    // Define selectors for translatable elements
    const translatableSelectors = {
        nav: {
            home: '.nav-link[href="#home"], a[href*="home"]',
            about: '.nav-link[href="#about"], a[href*="about"]',
            experience: '.nav-link[href="#experience"], a[href*="experience"]',
            skills: '.nav-link[href="#skills"], a[href*="skills"]',
            projects: '.nav-link[href="#projects"], a[href*="projects"]',
            education: '.nav-link[href="#education"], a[href*="education"]',
            certifications: '.nav-link[href="#certifications"], a[href*="certifications"]',
            achievements: '.nav-link[href="#achievements"], a[href*="achievements"]',
            notes: '.nav-link[href="#notes"], a[href*="notes"]',
            contact: '.nav-link[href="#contact"], a[href*="contact"]'
        },
        hero: {
            greeting: '.hero-text h1',
            subtitle: '.hero-text .subtitle',
            caption: '.hero-text .caption',
            description: '.hero-text .description',
            cta: '.hero-text .btn-primary',
            scroll: '.scroll-indicator p'
        },
        about: {
            title: '#about .section-title',
            intro1: '#about .about-text p:first-child',
            intro2: '#about .about-text p:last-child',
            focus: '#about .about-focus h3',
            areas: {
                area1: '#about .focus-list li:nth-child(1)',
                area2: '#about .focus-list li:nth-child(2)',
                area3: '#about .focus-list li:nth-child(3)',
                area4: '#about .focus-list li:nth-child(4)',
                area5: '#about .focus-list li:nth-child(5)'
            },
            cv: {
                title: '#about .cv-download h3',
                text: '#about .cv-download p',
                btn: '#about .cv-download .btn'
            }
        },
        titles: {
            projects: '#projects .section-title',
            certifications: '#certifications .section-title',
            achievements: '#achievements .section-title',
            notes: '#notes .section-title',
            contact: '#contact .section-title'
        },
        experience: {
            title: '#experience .section-title',
            teacher: {
                title: '#experience-grid .experience-card:nth-child(1) h3',
                place: '#experience-grid .experience-card:nth-child(1) .workplace',
                desc: '#experience-grid .experience-card:nth-child(1) p'
            },
            tutor: {
                title: '#experience-grid .experience-card:nth-child(2) h3',
                place: '#experience-grid .experience-card:nth-child(2) .workplace',
                desc: '#experience-grid .experience-card:nth-child(2) p'
            },
            computability: {
                title: '#experience-grid .experience-card:nth-child(3) h3',
                place: '#experience-grid .experience-card:nth-child(3) .workplace',
                desc: '#experience-grid .experience-card:nth-child(3) p'
            },
            inclusion: {
                title: '#experience-grid .experience-card:nth-child(4) h3',
                place: '#experience-grid .experience-card:nth-child(4) .workplace',
                desc: '#experience-grid .experience-card:nth-child(4) p'
            },
            other: {
                private: {
                    title: '#more-experiences .experience-card:nth-child(1) h3',
                    place: '#more-experiences .experience-card:nth-child(1) .workplace',
                    desc: '#more-experiences .experience-card:nth-child(1) p'
                },
                intern: {
                    title: '#more-experiences .experience-card:nth-child(2) h3',
                    place: '#more-experiences .experience-card:nth-child(2) .workplace',
                    desc: '#more-experiences .experience-card:nth-child(2) p'
                },
                manager: {
                    title: '#more-experiences .experience-card:nth-child(3) h3',
                    place: '#more-experiences .experience-card:nth-child(3) .workplace',
                    desc: '#more-experiences .experience-card:nth-child(3) p'
                },
                configurator: {
                    title: '#more-experiences .experience-card:nth-child(4) h3',
                    place: '#more-experiences .experience-card:nth-child(4) .workplace',
                    desc: '#more-experiences .experience-card:nth-child(4) p'
                },
                assistant: {
                    title: '#more-experiences .experience-card:nth-child(5) h3',
                    place: '#more-experiences .experience-card:nth-child(5) .workplace',
                    desc: '#more-experiences .experience-card:nth-child(5) p'
                }
            },
            showMore: '#experience-toggle .show-text',
            showLess: '#experience-toggle .hide-text'
        },
        skills: {
            title: '#skills .section-title',
            programming: '#skills .skill-category:nth-child(1) h3',
            frontend: '#skills .skill-category:nth-child(2) h3',
            backend: '#skills .skill-category:nth-child(3) h3',
            devops: '#skills .skill-category:nth-child(4) h3'
        },
        projects: {
            title: '#projects .section-title',
            viewGitHub: '#projects .btn-outline',
            viewReport: '#projects .btn-outline[href*="Report"]',
            showMore: '#projects-toggle .show-text',
            showLess: '#projects-toggle .hide-text'
        },
        education: {
            title: '#education .section-title',
            msc: {
                title: '#education .timeline-item:nth-child(1) h3',
                place: '#education .timeline-item:nth-child(1) .institution',
                desc: '#education .timeline-item:nth-child(1) p'
            },
            bsc: {
                title: '#education .timeline-item:nth-child(2) h3',
                place: '#education .timeline-item:nth-child(2) .institution',
                desc: '#education .timeline-item:nth-child(2) p',
                grade: '#education .timeline-item:nth-child(2) .grade'
            },
            diploma: {
                title: '#education .timeline-item:nth-child(3) h3',
                place: '#education .timeline-item:nth-child(3) .institution',
                desc: '#education .timeline-item:nth-child(3) p',
                grade: '#education .timeline-item:nth-child(3) .grade'
            }
        },
        testimonials: {
            title: '#testimonials .section-title',
            testimonial1: {
                text: '#testimonials .testimonial-card:nth-child(1) .testimonial-text p',
                author: '#testimonials .testimonial-card:nth-child(1) .author-info h4',
                position: '#testimonials .testimonial-card:nth-child(1) .author-info p'
            },
            testimonial2: {
                text: '#testimonials .testimonial-card:nth-child(2) .testimonial-text p',
                author: '#testimonials .testimonial-card:nth-child(2) .author-info h4',
                position: '#testimonials .testimonial-card:nth-child(2) .author-info p'
            },
            prev: '.prev-btn',
            next: '.next-btn'
        },
        certifications: {
            title: '#certifications .section-title'
        },
        achievements: {
            title: '#achievements .section-title',
            achievement1: {
                title: '#achievements .achievement-item:nth-child(1) h3',
                desc: '#achievements .achievement-item:nth-child(1) p'
            },
            achievement2: {
                title: '#achievements .achievement-item:nth-child(2) h3',
                desc: '#achievements .achievement-item:nth-child(2) p'
            },
            achievement3: {
                title: '#achievements .achievement-item:nth-child(3) h3',
                desc: '#achievements .achievement-item:nth-child(3) p'
            },
            achievement4: {
                title: '#achievements .achievement-item:nth-child(4) h3',
                desc: '#achievements .achievement-item:nth-child(4) p'
            },
            achievement5: {
                title: '#achievements .achievement-item:nth-child(5) h3',
                desc: '#achievements .achievement-item:nth-child(5) p'
            }
        },
        notes: {
            title: '#notes .section-title',
            intro: '#notes .notes-intro',
            note: '#notes .notes-intro strong',
            tabs: {
                tab1: '.tab-btn[data-target="triennale-1"]',
                tab2: '.tab-btn[data-target="triennale-2"]',
                tab3: '.tab-btn[data-target="triennale-3"]',
                tab4: '.tab-btn[data-target="magistrale-mandatory"]',
                tab5: '.tab-btn[data-target="magistrale-major"]',
                tab6: '.tab-btn[data-target="magistrale-minor"]',
                tab7: '.tab-btn[data-target="magistrale-free"]',
                tab8: '.tab-btn[data-target="opzionali"]'
            },
            message: {
                p1: '.testimonial-message p:nth-child(1)',
                p2: '.testimonial-message p:nth-child(2)',
                p3: '.testimonial-message p:nth-child(3)',
                signature: '.testimonial-author-signature'
            },
            copyright: '.copyright-notice p',
            support: {
                text: '.donation-section p',
                btn: '.donation-section .donation-btn'
            }
        },
        contact: {
            title: '#contact .section-title',
            text: '#contact .contact-text p',
            form: {
                title: '.contact-form-container h3',
                name: '#contact #name',
                email: '#contact #email',
                subject: '#contact #subject', 
                message: '#contact #message',
                send: '#contact .contact-form button'
            }
        },
        footer: {
            copyright: '.copyright'
        }
    };

    // Language selector elements
    const languageBtn = document.getElementById('language-btn');
    const languageDropdown = document.getElementById('language-dropdown');
    const languageOptions = document.querySelectorAll('.language-option');
    const currentLangElement = document.getElementById('current-lang');
    const currentFlagElement = document.getElementById('current-flag');
    
    // Get current language from localStorage or default to English
    function getCurrentLanguage() {
        return localStorage.getItem('preferredLanguage') || 'en';
    }
    
    // Set current language in UI
    function setCurrentLanguageUI(language) {
        const option = document.querySelector(`.language-option[data-lang="${language}"]`);
        if (option) {
            const flagSrc = option.querySelector('img').src;
            const langName = option.querySelector('span').textContent;
            
            // Update button text and flag
            currentLangElement.textContent = langName;
            currentFlagElement.src = flagSrc;
            currentFlagElement.alt = langName;
            
            // Update active class
            languageOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
        }
    }
    
    // Save language preference
    function saveLanguagePreference(language) {
        localStorage.setItem('preferredLanguage', language);
    }
    
    // Helper function for the deep traversal of translation objects
    function getNestedValue(obj, path) {
        return path.reduce((prev, curr) => prev && prev[curr] ? prev[curr] : null, obj);
    }
    
    // Helper function to get the path array from dot notation
    function getPathFromDotNotation(dotNotation) {
        return dotNotation.split('.');
    }
    
    // Translate a single element
    function translateElement(element, translation) {
        if (!element) return;
        
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            // For inputs and textareas, translate the placeholder
            element.placeholder = translation;
        } else {
            // For regular elements, translate the content
            element.innerHTML = translation;
        }
    }
    
    // Translate all elements based on the language
    function translatePage(language) {
        // Get the translations for the selected language
        const languageTranslations = translations[language];
        if (!languageTranslations) return;
        
        // Add transition class to body for smooth fade effect
        document.body.classList.add('language-transition');
        
        // Add class to all text elements for transition effect
        const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, button, li, input, textarea');
        textElements.forEach(el => el.classList.add('animated-text-change', 'changing'));
        
        // Apply translations after a short delay for transition effect
        setTimeout(() => {
            // Loop through all translatable selectors
            for (const section in translatableSelectors) {
                const sectionSelectors = translatableSelectors[section];
                const sectionTranslations = languageTranslations[section];
                
                if (!sectionTranslations) continue;
                
                // Process section
                for (const key in sectionSelectors) {
                    const selector = sectionSelectors[key];
                    const translation = sectionTranslations[key];
                    
                    // Skip if translation is not available
                    if (!translation) continue;
                    
                    // If the selector is a string, it's a direct DOM element
                    if (typeof selector === 'string') {
                        const element = document.querySelector(selector);
                        translateElement(element, translation);
                    } 
                    // If the selector is an object, it's a nested structure
                    else if (typeof selector === 'object') {
                        // Recursively process nested structures
                        for (const nestedKey in selector) {
                            const nestedSelector = selector[nestedKey];
                            const nestedTranslation = translation[nestedKey];
                            
                            if (!nestedTranslation) continue;
                            
                            if (typeof nestedSelector === 'string') {
                                const element = document.querySelector(nestedSelector);
                                translateElement(element, nestedTranslation);
                            } else {
// Per semplicità, non gestisco livelli di nesting più profondi
                            }
                        }
                    }
                }
            }
            
            // Remove transition classes after translations are applied
            textElements.forEach(el => el.classList.remove('changing'));
            document.body.classList.remove('language-transition');
            
            // Create custom event to notify other components that language has changed
            const event = new CustomEvent('languageChanged', { detail: { language: language } });
            document.dispatchEvent(event);
            
        }, 300); // Delay for the animation effect
    }
    
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
    
    // Change language when option is selected
    languageOptions.forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.dataset.lang;
            
            // Update UI
            setCurrentLanguageUI(lang);
            
            // Save preference
            saveLanguagePreference(lang);
            
            // Apply translations
            translatePage(lang);
            
            // Hide dropdown
            languageDropdown.classList.remove('show');
        });
    });
    
    // Initialize language on page load
    function initializeLanguage() {
        const preferredLanguage = getCurrentLanguage();
        setCurrentLanguageUI(preferredLanguage);
        translatePage(preferredLanguage);
    }
    
    // Initialize language system on page load
    initializeLanguage();

    // Update expand button text
    document.addEventListener('languageChanged', (e) => {
        const language = e.detail.language;
        const expandBtns = document.querySelectorAll('.expand-btn');
        
        const translations = {
            en: {
                show: "Show details",
                hide: "Hide details"
            },
            it: {
                show: "Mostra dettagli",
                hide: "Nascondi dettagli"
            },
            fr: {
                show: "Voir détails",
                hide: "Masquer détails"
            },
            es: {
                show: "Ver detalles",
                hide: "Ocultar detalles"
            }
        };
        
        expandBtns.forEach(btn => {
            const skillCard = btn.closest('.skill-card');
            if (skillCard) {
                if (skillCard.classList.contains('expanded')) {
                    btn.setAttribute('aria-label', translations[language]?.hide || translations.en.hide);
                } else {
                    btn.setAttribute('aria-label', translations[language]?.show || translations.en.show);
                }
            }
        });
    });
});