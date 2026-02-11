/**
 * Partner Carousel Module
 * Herb Café Website
 * 
 * Uses Splide.js for an infinite-scroll partner logo carousel.
 * Logos display grayscale by default, full color on hover.
 */

import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

/**
 * Initialize partner carousel
 */
export async function initCarousel() {
    const carouselElement = document.getElementById('partner-carousel');
    const partnerList = document.getElementById('partner-list');

    if (!carouselElement || !partnerList) return;

    try {
        // Fetch partner data
        const response = await fetch('/src/data/partners.json');
        const data = await response.json();

        if (!data.partners || data.partners.length === 0) {
            console.warn('No partners data found');
            return;
        }

        // Populate carousel with partner logos
        // Duplicate for seamless infinite loop
        const allPartners = [...data.partners, ...data.partners];

        allPartners.forEach(partner => {
            const li = document.createElement('li');
            li.className = 'splide__slide';
            li.innerHTML = `
        <div class="flex items-center justify-center h-full px-4">
          <img 
            src="${partner.logo}" 
            alt="${partner.name}" 
            class="partner-logo"
            loading="lazy"
            onerror="this.style.display='none'"
          >
        </div>
      `;
            partnerList.appendChild(li);
        });

        // Initialize Splide with auto-scroll
        const splide = new Splide('#partner-carousel', {
            type: 'loop',
            drag: 'free',
            focus: 'center',
            perPage: 6,
            perMove: 1,
            gap: '2rem',
            arrows: false,
            pagination: false,
            autoWidth: false,
            breakpoints: {
                1024: {
                    perPage: 4,
                },
                768: {
                    perPage: 3,
                },
                480: {
                    perPage: 2,
                },
            },
        });

        // Mount with AutoScroll extension
        splide.mount({ AutoScroll });

        // Configure auto-scroll
        splide.Components.AutoScroll?.Options?.({
            speed: 1,
            pauseOnHover: true,
            pauseOnFocus: false,
        });

        console.log('Partner carousel initialized');

    } catch (error) {
        console.error('Failed to initialize partner carousel:', error);
    }
}

/**
 * Alternative: Simple CSS-based marquee fallback
 * Use this if Splide has issues loading
 */
export function initMarqueeFallback() {
    const carouselElement = document.getElementById('partner-carousel');
    if (!carouselElement) return;

    carouselElement.innerHTML = `
    <div class="overflow-hidden">
      <div class="flex animate-marquee gap-8">
        <!-- Partner logos will be inserted here -->
      </div>
    </div>
  `;
}
