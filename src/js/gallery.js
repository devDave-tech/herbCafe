/**
 * Gallery Module - Flowing Auto-Scroll
 * Herb Café Website
 *
 * Creates a full-viewport flowing gallery with multiple rows
 * of images auto-scrolling horizontally at different speeds.
 * Images flow continuously through the section — no page scrolling.
 */

import GLightbox from 'glightbox';

let lightbox = null;

/**
 * Initialize the flowing gallery
 */
export async function initGallery() {
    const galleryContainer = document.getElementById('gallery-flow-container');

    if (!galleryContainer) return;

    try {
        // Fetch gallery data
        const response = await fetch('/src/data/gallery.json');
        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            console.warn('No gallery items found');
            return;
        }

        // Filter to images only for flowing gallery
        const images = data.items.filter(item => item.type === 'image');

        // Split images into 3 rows
        const rowCount = 3;
        const rows = splitIntoRows(images, rowCount);

        const rowConfigs = [
            { heightClass: 'row-tall', direction: 'scroll-left', speed: 45 },
            { heightClass: 'row-medium', direction: 'scroll-right', speed: 55 },
            { heightClass: 'row-short', direction: 'scroll-left', speed: 35 },
        ];

        rows.forEach((rowImages, index) => {
            const config = rowConfigs[index % rowConfigs.length];
            const rowEl = createFlowRow(rowImages, config);
            galleryContainer.appendChild(rowEl);
        });

        // Initialize lightbox for click-to-fullscreen
        initLightbox();

        console.log('Flowing gallery initialized with', images.length, 'images');

    } catch (error) {
        console.error('Failed to initialize gallery:', error);
    }
}

/**
 * Split images into N rows, distributing evenly
 */
function splitIntoRows(images, count) {
    const rows = Array.from({ length: count }, () => []);
    images.forEach((img, i) => {
        rows[i % count].push(img);
    });
    return rows;
}

/**
 * Create a single flowing row with duplicated images for seamless loop
 */
function createFlowRow(images, config) {
    const row = document.createElement('div');
    row.className = `gallery-flow-row ${config.heightClass} ${config.direction}`;
    row.style.setProperty('--scroll-duration', `${config.speed}s`);

    // Aspect ratio classes to assign variety
    const aspects = ['aspect-wide', 'aspect-standard', 'aspect-portrait', 'aspect-square', 'aspect-standard', 'aspect-wide'];

    // Build items twice for seamless infinite scroll
    for (let duplicate = 0; duplicate < 2; duplicate++) {
        images.forEach((item, index) => {
            const div = document.createElement('div');
            const aspectClass = aspects[index % aspects.length];
            div.className = `gallery-flow-item ${aspectClass}`;

            div.innerHTML = `
                <a href="${item.src}" class="glightbox" data-gallery="main-gallery" data-description="${item.alt || ''}">
                    <img
                        src="${item.src}"
                        alt="${item.alt || 'Gallery image'}"
                        loading="lazy"
                        onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22><rect fill=%22%232D2D2D%22 width=%22400%22 height=%22300%22/><text fill=%22%23A4D65E%22 x=%2250%%22 y=%2250%%22 text-anchor=%22middle%22 dy=%22.3em%22 font-size=%2220%22>Image</text></svg>'"
                    >
                </a>
            `;

            row.appendChild(div);
        });
    }

    return row;
}

/**
 * Initialize GLightbox for fullscreen viewing
 */
function initLightbox() {
    lightbox = GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
        closeOnOutsideClick: true,
        skin: 'clean',
        cssEfects: {
            slide: { in: 'fadeIn', out: 'fadeOut' }
        }
    });
}
