document.addEventListener('DOMContentLoaded', () => {
    
    /* ==============================================
       1. Custom Glowing Cursor
       ============================================== */
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');
    
    // Only run if it's a non-touch device (desktop)
    if(window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });

        // Hover effect for links and buttons
        const hoverElements = document.querySelectorAll('a, button, input, textarea, .filter-btn');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
        });
    }

    /* ==============================================
       2. 3D Glass Card Tilt Effect
       ============================================== */
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    if(window.matchMedia("(pointer: fine)").matches) {
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; 
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Calculate tilt limits (max 10 degrees)
                const rotateX = ((y - centerY) / centerY) * -10; 
                const rotateY = ((x - centerX) / centerX) * 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                
                // Dynamic light reflection moving with the mouse
                const lightX = (x / rect.width) * 100;
                const lightY = (y / rect.height) * 100;
                card.style.background = `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255,255,255,0.1) 0%, var(--glass-bg) 60%)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                card.style.background = 'var(--glass-bg)';
            });
        });
    }

    /* ==============================================
       3. IT ADMIN TERMINAL (EASTER EGG)
       ============================================== */
    let keysPressed = '';
    const secretCode = 'admin';
    const terminalOverlay = document.getElementById('terminal-modal');
    const closeTerminalBtn = document.getElementById('close-terminal');
    const terminalInput = document.getElementById('terminal-input');
    const terminalBody = document.getElementById('terminal-body');

    // Trigger on typing "admin" anywhere on the screen
    window.addEventListener('keydown', (e) => {
        // Ignore if typing in the contact form
        if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            if(e.target.id !== 'terminal-input') return; 
        }

        keysPressed += e.key.toLowerCase();
        if (keysPressed.length > secretCode.length) {
            keysPressed = keysPressed.slice(-secretCode.length);
        }
        
        if (keysPressed === secretCode) {
            openTerminal();
            keysPressed = ''; // Reset
        }
    });

    function openTerminal() {
        terminalOverlay.classList.add('active');
        setTimeout(() => terminalInput.focus(), 300);
    }

    closeTerminalBtn.addEventListener('click', () => {
        terminalOverlay.classList.remove('active');
    });

    // Close if clicking outside the terminal window
    terminalOverlay.addEventListener('click', (e) => {
        if(e.target === terminalOverlay) {
            terminalOverlay.classList.remove('active');
        }
    });

    // Handle terminal commands
    terminalInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const command = this.value.trim().toLowerCase();
            if(command !== '') {
                processCommand(command);
            }
            this.value = ''; // Clear input
        }
    });

    function processCommand(cmd) {
        // Echo the command
        printLine(`<span class="prompt">admin@mjflores:~$</span> ${cmd}`);
        
        switch(cmd) {
            case 'help':
                printLine('Available system commands:');
                printLine('&nbsp;&nbsp;<span style="color:#38bdf8">whoami</span>    - Display profile information');
                printLine('&nbsp;&nbsp;<span style="color:#38bdf8">skills</span>    - List technical stack');
                printLine('&nbsp;&nbsp;<span style="color:#38bdf8">projects</span>  - List recent systems deployed');
                printLine('&nbsp;&nbsp;<span style="color:#38bdf8">clear</span>     - Wipe terminal screen');
                printLine('&nbsp;&nbsp;<span style="color:#38bdf8">exit</span>      - Terminate secure session');
                break;
            case 'whoami':
                printLine('Mark John Flores.');
                printLine('IT Specialist & Full-Stack Developer from Bambang, Nueva Vizcaya.');
                printLine('Currently executing BSIT protocols at Kings College of the Philippines.');
                break;
            case 'skills':
                printLine('Loading modules...');
                setTimeout(() => printLine('[OK] HTML5, CSS3, JS, PHP, C#, VB.NET, Python'), 300);
                setTimeout(() => printLine('[OK] MySQL, phpMyAdmin, XAMPP, Git'), 600);
                setTimeout(() => printLine('[OK] PC Assembly, Device Flashing, NFC Config, Hardware Support'), 900);
                break;
            case 'projects':
                printLine('Accessing deployed environments:');
                printLine('1. Inventory & Stock Management System');
                printLine('2. Campus Lost & Found Web Portal');
                printLine('3. Restaurant Point of Sale (POS)');
                printLine('4. Device Diagnostics Firmware Utility');
                break;
            case 'clear':
                terminalBody.innerHTML = '';
                break;
            case 'exit':
                printLine('Terminating connection...');
                setTimeout(() => {
                    terminalOverlay.classList.remove('active');
                    terminalBody.innerHTML = `<div class="terminal-line" style="color: var(--accent-color);">Welcome to MJOS v1.0.0.</div><div class="terminal-line">Authentication successful. Type 'help' for available commands.</div><br>`;
                }, 800);
                break;
            case 'sudo':
                printLine('Nice try. This incident will be reported.');
                break;
            default:
                printLine(`bash: ${cmd}: command not found. Type 'help' for available commands.`);
        }
        
        // Auto scroll to bottom
        setTimeout(() => {
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }, 100);
    }

    function printLine(text) {
        const div = document.createElement('div');
        div.className = 'terminal-line';
        div.innerHTML = text;
        terminalBody.appendChild(div);
    }

    /* ==============================================
       4. Mobile Menu Toggle
       ============================================== */
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    /* ==============================================
       5. Sticky Header & Back to Top
       ============================================== */
    const header = document.getElementById('header');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');

        if (window.scrollY > 500) backToTopBtn.classList.add('show');
        else backToTopBtn.classList.remove('show');
    });

    backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    /* ==============================================
       6. Dark/Light Mode Toggle
       ============================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    const savedTheme = localStorage.getItem('portfolio-theme');
    
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'light') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('portfolio-theme', 'dark');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('portfolio-theme', 'light');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    });

    /* ==============================================
       7. Typing Effect
       ============================================== */
    const textSpan = document.getElementById('typing-text');
    const textArray = ["Web Developer", "System Developer", "Hardware Tech", "Problem Solver"];
    let textIndex = 0; let charIndex = 0; let isDeleting = false;

    function type() {
        const currentText = textArray[textIndex];
        if (isDeleting) {
            textSpan.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textSpan.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false; textIndex = (textIndex + 1) % textArray.length; typeSpeed = 500;
        }
        setTimeout(type, typeSpeed);
    }
    setTimeout(type, 1000);

    /* ==============================================
       8. Scroll Reveal & Counters
       ============================================== */
    const revealElements = document.querySelectorAll('.reveal');
    let countersStarted = false;

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            
            if (entry.target.querySelector('.counter') && !countersStarted) {
                startCounters();
                countersStarted = true;
            }
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach(el => revealOnScroll.observe(el));

    function startCounters() {
        document.querySelectorAll('.counter').forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / 100;
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else counter.innerText = target + "+";
            };
            updateCount();
        });
    }

    /* ==============================================
       9. Project Filtering
       ============================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                card.classList.remove('fade-in');
                if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                    card.style.display = 'flex';
                    void card.offsetWidth; 
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else card.style.display = 'none';
            });
        });
    });

    /* ==============================================
       10. Scroll Spy (Active Nav)
       ============================================== */
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
            if(navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) navLink.classList.add('active');
                else navLink.classList.remove('active');
            }
        });
    });

    /* ==============================================
       11. Form Validation
       ============================================== */
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === "" || email === "" || subject === "" || message === "") {
                formMessage.textContent = "Please fill in all fields.";
                formMessage.className = "form-message error";
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                formMessage.textContent = "Message sent successfully! I will get back to you soon.";
                formMessage.className = "form-message success";
                contactForm.reset();
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                setTimeout(() => { formMessage.style.display = 'none'; }, 5000);
            }, 1500);
        });
    }
});