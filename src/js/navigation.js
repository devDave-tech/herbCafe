/**
 * Navigation Module
 * Herb Café Website
 * 
 * Handles mobile menu toggle, scroll effects on navbar,
 * and smooth scrolling for anchor links.
 */

let isMobileMenuOpen = false;

/**
 * Initialize navigation functionality
 */
export function initNavigation() {
    initMobileMenu();
    initScrollEffects();
    initSmoothScroll();
    highlightActiveLink();
}

/**
 * Mobile menu toggle functionality
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (!menuToggle || !mobileMenu) return;

    // Toggle menu on hamburger click
    menuToggle.addEventListener('click', () => {
        toggleMobileMenu();
    });

    // Close on overlay click
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', () => {
            closeMobileMenu();
        });
    }

    // Close on X button click
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', () => {
            closeMobileMenu();
        });
    }

    // Close when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMobileMenuOpen) {
            closeMobileMenu();
        }
    });
}

/**
 * Toggle mobile menu open/closed
 */
function toggleMobileMenu() {
    if (isMobileMenuOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

/**
 * Open mobile menu
 */
function openMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const menuToggle = document.getElementById('mobile-menu-toggle');

    if (mobileMenu) {
        mobileMenu.classList.add('open');
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.classList.add('open');
    }

    if (menuToggle) {
        menuToggle.innerHTML = '✕';
    }

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    isMobileMenuOpen = true;
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const menuToggle = document.getElementById('mobile-menu-toggle');

    if (mobileMenu) {
        mobileMenu.classList.remove('open');
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.classList.remove('open');
    }

    if (menuToggle) {
        menuToggle.innerHTML = '☰';
    }

    // Restore body scroll
    document.body.style.overflow = '';
    isMobileMenuOpen = false;
}

/**
 * Navbar scroll effects (background opacity change)
 */
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class when past 50px
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide scroll indicator after first scroll
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator && currentScroll > 100) {
            scrollIndicator.style.opacity = '0';
        }

        lastScroll = currentScroll;
    });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Highlight active navigation link based on current page
 */
function highlightActiveLink() {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.nav-link, .mobile-nav-link');

    links.forEach(link => {
        const href = link.getAttribute('href');

        // Check if link matches current page
        if (href === currentPath ||
            (currentPath === '/' && href === '/') ||
            (currentPath.includes(href) && href !== '/')) {
            link.classList.add('active');
        }
    });
}
