// Custom Cursor Logic
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const links = document.querySelectorAll('a, button, .product-card');

document.addEventListener('mousemove', (e) => {
    // Standard cursor
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Follower cursor with slight delay
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 50);
});

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-active');
    });
    link.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-active');
    });
});

// Mobile Navigation
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const closeBtn = document.querySelector('.close-btn');
const mobileNav = document.querySelector('.mobile-nav');
const mobileLinks = document.querySelectorAll('.mobile-nav a');

mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.add('open');
});

closeBtn.addEventListener('click', () => {
    mobileNav.classList.remove('open');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
    });
});

// Header Scroll Effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Counter Animation for Stats
const counters = document.querySelectorAll('.counter');
const speed = 200; // The lower the slower

// Wait for GSAP and ScrollTrigger to load
document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Parallax Hero Image
    gsap.to('.hero-bg', {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top", 
            end: "bottom top",
            scrub: true
        } 
    });

    // Reveal Elements
    const revealElements = document.querySelectorAll('.gs-reveal');
    revealElements.forEach((el, i) => {
        gsap.from(el, {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: i * 0.1,
            ease: "power3.out"
        });
    });

    // Fade Up animations
    const fadeUpElements = document.querySelectorAll('.gs-fade-up');
    fadeUpElements.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 95%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: parseFloat(el.dataset.delay || 0)
        });
    });
    
    // Refresh ScrollTrigger after images load
    window.addEventListener('load', () => {
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 500);
    });

    // Fade Left animations
    const fadeLeftElements = document.querySelectorAll('.gs-fade-left');
    fadeLeftElements.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 80%",
            },
            x: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // Fade Right animations
    const fadeRightElements = document.querySelectorAll('.gs-fade-right');
    fadeRightElements.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 80%",
            },
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });
    
    // Counter Animation triggered on scroll
    ScrollTrigger.create({
        trigger: ".stats-container",
        start: "top 80%",
        onEnter: () => {
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.innerText.replace('+','');
                    let count = 0;
                    
                    const targetVal = target;
                    
                    // Hacky way to reset and animate
                    counter.innerText = '0';
                    
                    const timer = setInterval(() => {
                        count += Math.ceil(targetVal / 50);
                        if(count > targetVal) {
                            counter.innerText = targetVal;
                            clearInterval(timer);
                        } else {
                            counter.innerText = count;
                        }
                    }, 30);
                };
                updateCount();
            });
        },
        once: true
    });
});

// Form Submission Prevention for Demo
document.getElementById('demo-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const originalText = btn.innerText;
    
    btn.innerText = 'Sending...';
    btn.style.opacity = '0.7';
    
    setTimeout(() => {
        btn.innerText = 'Message Sent!';
        btn.style.background = '#27c93f';
        btn.style.color = '#fff';
        btn.style.opacity = '1';
        e.target.reset();
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = '';
            btn.style.color = '';
        }, 3000);
    }, 1500);
});
