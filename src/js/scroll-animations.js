/**
 * Scroll Animations Module
 * Herb Café Website
 * 
 * Uses GSAP ScrollTrigger for smooth parallax effects,
 * fade-in animations, and scroll-triggered reveals.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Initialize all scroll-based animations
 */
export function initScrollAnimations() {
    initParallax();
    initFadeInAnimations();
    initRevealOnScroll();
    initStaggerAnimations();
}

/**
 * Parallax effect for hero video/background
 */
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    parallaxElements.forEach(element => {
        gsap.to(element, {
            yPercent: 30,
            ease: 'none',
            scrollTrigger: {
                trigger: element.closest('section') || element,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        });
    });
}

/**
 * Fade-in-up animations for content elements
 */
function initFadeInAnimations() {
    // Hero content fade-in (on page load, not scroll)
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const heroElements = heroContent.querySelectorAll('.animate-fade-in-up');

        heroElements.forEach((element, index) => {
            gsap.from(element, {
                y: 60,
                opacity: 0,
                duration: 1,
                delay: index * 0.2,
                ease: 'power3.out',
            });
        });
    }

    // Section headings fade-in on scroll
    const sectionTitles = document.querySelectorAll('.section-title');

    sectionTitles.forEach(title => {
        gsap.from(title, {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                end: 'top 50%',
                toggleActions: 'play none none reverse',
            },
        });
    });
}

/**
 * Reveal elements on scroll using Intersection Observer
 */
function initRevealOnScroll() {
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optionally unobserve after revealing
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Staggered animations for card grids
 */
function initStaggerAnimations() {
    // Product/Menu cards
    const cardGrids = document.querySelectorAll('.product-grid, .gallery-grid');

    cardGrids.forEach(grid => {
        const cards = grid.querySelectorAll('.card, .gallery-item');

        gsap.from(cards, {
            y: 40,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: grid,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            },
        });
    });

    // Footer columns
    const footerColumns = document.querySelectorAll('.footer-grid > div');

    if (footerColumns.length > 0) {
        gsap.from(footerColumns, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.footer',
                start: 'top 90%',
                toggleActions: 'play none none reverse',
            },
        });
    }
}

/**
 * Utility: Refresh ScrollTrigger (call after dynamic content loads)
 */
export function refreshScrollTrigger() {
    ScrollTrigger.refresh();
}
