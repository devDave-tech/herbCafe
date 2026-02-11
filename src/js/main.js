/**
 * Main JavaScript Entry Point
 * Herb Café Website
 * 
 * This file initializes all modules and coordinates the page load sequence.
 */

// Import CSS
import '../css/main.css';
import '../css/animations.css';
import '../css/components.css';

// Import Splide CSS
import '@splidejs/splide/css';

// Import GLightbox CSS
import 'glightbox/dist/css/glightbox.min.css';

// Import modules
import { initLoader } from './loader.js';
import { initAgeGate } from './age-gate.js';
import { initNavigation } from './navigation.js';
import { initScrollAnimations } from './scroll-animations.js';
import { initWhatsAppButton } from './whatsapp.js';

// Initialize global state
window.herbCafe = {
    isAgeVerified: false,
    isLoaded: false,
};

/**
 * Main initialization function
 * Runs when DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🌿 Herb Café - Initializing...');

    // Check if age is already verified
    const isVerified = localStorage.getItem('herbCafeAgeVerified') === 'true';

    if (isVerified) {
        // Skip loader and age gate, initialize page directly
        window.herbCafe.isAgeVerified = true;
        initPage();
    } else {
        // Show loader first
        await initLoader();

        // Then show age gate
        initAgeGate(onAgeVerified);
    }
});

/**
 * Callback when age is successfully verified
 */
function onAgeVerified() {
    window.herbCafe.isAgeVerified = true;
    initPage();
}

/**
 * Initialize all page functionality
 */
function initPage() {
    console.log('🌿 Herb Café - Page initializing...');

    // Initialize navigation
    initNavigation();

    // Initialize scroll animations
    initScrollAnimations();

    // Initialize WhatsApp button
    initWhatsAppButton();

    // Mark as loaded
    window.herbCafe.isLoaded = true;
    document.body.classList.add('loaded');

    console.log('🌿 Herb Café - Ready!');
}

// Export for use in other modules
export { onAgeVerified };
