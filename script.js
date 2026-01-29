/**
 * GENUINE INTELLIGENCE 28 (GI28) - CORE SCRIPT
 * Version: 2.0.0
 * Description: Handles 3D rendering, UI interactions, animations, and logic.
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* ==========================================================================
       1. THREE.JS BACKGROUND SYSTEM (NEURAL NETWORK)
       ========================================================================== */
    const initThreeJS = () => {
        const container = document.getElementById('canvas-bg');
        if (!container) return;

        // Scene Setup
        const scene = new THREE.Scene();
        // Fog for depth
        scene.fog = new THREE.FogExp2(0x050505, 0.002);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Particle System
        const geometry = new THREE.BufferGeometry();
        const count = window.innerWidth < 768 ? 500 : 1200; // Performance optimization
        const positions = new Float32Array(count * 3);
        const velocities = [];

        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 20; // Spread
            if (i % 3 === 0) { // Store velocities per particle
                velocities.push({
                    x: (Math.random() - 0.5) * 0.005,
                    y: (Math.random() - 0.5) * 0.005,
                    z: (Math.random() - 0.5) * 0.005
                });
            }
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            size: 0.02,
            color: 0x00f0ff,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const particlesMesh = new THREE.Points(geometry, material);
        scene.add(particlesMesh);

        // Floating Ring (The "Halo")
        const ringGeo = new THREE.TorusGeometry(4, 0.01, 16, 100);
        const ringMat = new THREE.MeshBasicMaterial({ 
            color: 0xe92efb, 
            wireframe: true, 
            transparent: true, 
            opacity: 0.15 
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        scene.add(ring);

        camera.position.z = 5;

        // Interaction Variables
        let mouseX = 0;
        let mouseY = 0;

        // Event Listeners for Interaction
        const onMouseMove = (event) => {
            mouseX = event.clientX / window.innerWidth - 0.5;
            mouseY = event.clientY / window.innerHeight - 0.5;
        };
        
        // Gyroscope for Mobile
        const onDeviceOrientation = (event) => {
            mouseX = event.gamma / 50; 
            mouseY = event.beta / 50;
        };

        if (window.matchMedia("(pointer: coarse)").matches && window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', onDeviceOrientation);
        } else {
            document.addEventListener('mousemove', onMouseMove);
        }

        // Animation Loop
        const clock = new THREE.Clock();

        const animate = () => {
            const elapsedTime = clock.getElapsedTime();
            
            // Rotate entire system based on mouse
            particlesMesh.rotation.y = elapsedTime * 0.05 + (mouseX * 0.5);
            particlesMesh.rotation.x = mouseY * 0.5;

            // Animate individual particles (Neural Pulse)
            const positions = particlesMesh.geometry.attributes.position.array;
            for(let i = 0; i < count; i++) {
                const i3 = i * 3;
                positions[i3 + 1] += Math.sin(elapsedTime + positions[i3]) * 0.002;
            }
            particlesMesh.geometry.attributes.position.needsUpdate = true;

            // Ring Animation
            ring.rotation.x = elapsedTime * 0.1;
            ring.rotation.y = elapsedTime * 0.15;

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        animate();

        // Resize Handler
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    };

    /* ==========================================================================
       2. CUSTOM CURSOR LOGIC
       ========================================================================== */
    const initCursor = () => {
        // Only initialize on desktop
        if (!window.matchMedia("(pointer: fine)").matches) return;

        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        
        if (!cursorDot || !cursorOutline) return;

        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot moves instantly
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Outline moves with lag (smooth animation)
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Interactive States
        const interactables = document.querySelectorAll('a, button, .nav-trigger, .glass-card, input, textarea');
        
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)";
                cursorOutline.style.backgroundColor = "rgba(0, 240, 255, 0.1)";
                cursorOutline.style.borderColor = "transparent";
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
                cursorOutline.style.backgroundColor = "transparent";
                cursorOutline.style.borderColor = "var(--neon-magenta)";
            });
        });
    };

    /* ==========================================================================
       3. NAVIGATION SYSTEM
       ========================================================================== */
    const initNavigation = () => {
        const nav = document.querySelector('.glass-nav');
        const menuToggle = document.getElementById('menuToggle');
        const menuOverlay = document.getElementById('menuOverlay');
        const burgerIcon = document.querySelector('.burger-icon');
        const mobileLinks = document.querySelectorAll('.mobile-link');
        let isMenuOpen = false;

        // Scroll Effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.style.background = 'rgba(5, 5, 5, 0.95)';
                nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
            } else {
                nav.style.background = 'rgba(5, 5, 5, 0.7)';
                nav.style.boxShadow = 'none';
            }
        });

        // Mobile Menu Toggle
        menuToggle.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                menuOverlay.classList.add('active');
                burgerIcon.classList.remove('fa-bars');
                burgerIcon.classList.add('fa-xmark');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            } else {
                menuOverlay.classList.remove('active');
                burgerIcon.classList.remove('fa-xmark');
                burgerIcon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                isMenuOpen = false;
                menuOverlay.classList.remove('active');
                burgerIcon.classList.remove('fa-xmark');
                burgerIcon.classList.add('fa-bars');
                document.body.style.overflow = '';
            });
        });
    };

    /* ==========================================================================
       4. 3D HERO CARD (CUSTOM TILT)
       ========================================================================== */
    const initHeroCard = () => {
        const card = document.getElementById('heroCard');
        const wrapper = document.querySelector('.hero-visual');
        
        if (!card || !wrapper) return;

        let bounds;
        
        const rotateToMouse = (e) => {
            bounds = wrapper.getBoundingClientRect();
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const leftX = mouseX - bounds.x;
            const topY = mouseY - bounds.y;
            const center = {
                x: leftX - bounds.width / 2,
                y: topY - bounds.height / 2
            }
            const distance = Math.sqrt(center.x**2 + center.y**2);
            
            card.style.transform = `
                scale3d(1.05, 1.05, 1.05)
                rotate3d(
                    ${center.y / 100},
                    ${-center.x / 100},
                    0,
                    ${Math.log(distance) * 2}deg
                )
            `;
            
            // Lighting effect
            card.querySelector('.card-inner').style.backgroundImage = `
                radial-gradient(
                    circle at ${center.x * 2 + bounds.width/2}px ${center.y * 2 + bounds.height/2}px,
                    rgba(255,255,255,0.1),
                    transparent
                )
            `;
        };

        const stopRotate = () => {
            card.style.transform = 'scale3d(1, 1, 1) rotate3d(0,0,0,0deg)';
            card.querySelector('.card-inner').style.backgroundImage = 'none';
        };

        wrapper.addEventListener('mousemove', rotateToMouse);
        wrapper.addEventListener('mouseleave', stopRotate);
    };

    /* ==========================================================================
       5. STATISTICS COUNTER
       ========================================================================== */
    const initCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200; // The lower the slower

        const animateCount = (counter) => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(() => animateCount(counter), 20);
            } else {
                counter.innerText = target;
            }
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    animateCount(counter);
                    observer.unobserve(counter); // Only run once
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    };

    /* ==========================================================================
       6. LEGAL TABS SYSTEM
       ========================================================================== */
    const initLegalTabs = () => {
        const tabs = document.querySelectorAll('.legal-tab');
        const contents = document.querySelectorAll('.legal-text');

        if (tabs.length === 0) return;

        // Function exposed to window for footer links
        window.switchLegalTab = (tabName) => {
            // Remove active classes
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            // Add active class to target
            const selectedTab = document.querySelector(`.legal-tab[data-target="${tabName}"]`);
            const selectedContent = document.getElementById(tabName);

            if(selectedTab) selectedTab.classList.add('active');
            if(selectedContent) selectedContent.classList.add('active');

            // Scroll to section
            document.getElementById('legal').scrollIntoView({ behavior: 'smooth' });
        };

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.getAttribute('data-target');
                window.switchLegalTab(target);
            });
        });
    };

    /* ==========================================================================
       7. COOKIE CONSENT
       ========================================================================== */
    const initCookies = () => {
        const cookieBox = document.getElementById('cookieConsent');
        const acceptBtn = document.getElementById('acceptAll');
        const necessaryBtn = document.getElementById('acceptNecessary');

        // Check Local Storage
        if (!localStorage.getItem('gi28_consent')) {
            // Delay showing slightly for UX
            setTimeout(() => {
                cookieBox.style.display = 'block';
                // Small animation
                cookieBox.animate([
                    { transform: 'translateY(100%)', opacity: 0 },
                    { transform: 'translateY(0)', opacity: 1 }
                ], { duration: 500, easing: 'ease-out' });
            }, 2000);
        }

        const closeCookie = (type) => {
            localStorage.setItem('gi28_consent', type);
            cookieBox.animate([
                { opacity: 1 },
                { opacity: 0 }
            ], { duration: 300 }).onfinish = () => {
                cookieBox.style.display = 'none';
            };
        };

        if(acceptBtn) acceptBtn.addEventListener('click', () => closeCookie('all'));
        if(necessaryBtn) necessaryBtn.addEventListener('click', () => closeCookie('necessary'));
    };

    /* ==========================================================================
       8. FAQ TOGGLE
       ========================================================================== */
    const initFAQ = () => {
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all others
                faqItems.forEach(i => {
                    i.classList.remove('active');
                    i.querySelector('.faq-answer').style.maxHeight = null;
                });

                if (!isActive) {
                    item.classList.add('active');
                    const answer = item.querySelector('.faq-answer');
                    answer.style.maxHeight = answer.scrollHeight + "px";
                }
            });
        });
    };

    /* ==========================================================================
       9. FORM HANDLING (MOCK)
       ========================================================================== */
    const initForms = () => {
        const form = document.getElementById('contactForm');
        if(!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = 'Sending...';
            btn.style.opacity = '0.7';

            // Simulate API call
            setTimeout(() => {
                btn.innerText = 'Message Sent!';
                btn.style.background = 'var(--neon-green)'; // Assumes CSS var or fallback
                btn.style.color = '#fff';
                
                setTimeout(() => {
                    form.reset();
                    btn.innerText = originalText;
                    btn.style.background = '';
                    btn.style.opacity = '1';
                }, 3000);
            }, 1500);
        });
    };

    /* ==========================================================================
       INITIALIZATION CALLS
       ========================================================================== */
    try {
        initThreeJS();
        initCursor();
        initNavigation();
        initHeroCard();
        initCounters();
        initLegalTabs();
        initCookies();
        initFAQ();
        initForms();

        // VanillaTilt initialization for elements with data-tilt (Hero Text)
        // Ensure vanilla-tilt.js is loaded in HTML
        if (typeof VanillaTilt !== 'undefined') {
            VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
                max: 15,
                speed: 400,
                glare: true,
                "max-glare": 0.2
            });
        }

    } catch (error) {
        console.warn('GI28: Initialization Warning', error);
    }
});



/* ==========================================================================
   9. FORM HANDLING (WEB3FORMS - REAL SUBMISSION)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default submission

        const btn = form.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'Redirecting...';
        btn.style.opacity = '0.7';
        btn.disabled = true;

        // Redirect to /Contact/ page
        setTimeout(() => {
            window.location.href = '/Contact/';
        }, 500); // Small delay for UX
    });
});



 
