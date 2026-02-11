/**
 * Loader Animation Module
 * Herb Café Website
 * 
 * Creates a loading animation where the cup logo fills up with color 
 * based on the loading percentage (simulated).
 */

/**
 * Creates and displays the loader animation
 * @returns {Promise} Resolves when loader animation completes
 */
export function initLoader() {
    return new Promise((resolve) => {
        // Create loader container
        const loader = document.createElement('div');
        loader.id = 'herb-loader';
        loader.innerHTML = `
            <style>
                #herb-loader {
                    position: fixed;
                    inset: 0;
                    z-index: 9999;
                    background-color: #1a1a1a;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap: 2rem;
                }
                
                .loader-cup-wrapper {
                    position: relative;
                    width: 200px;
                    height: 200px;
                }
                
                .loader-cup-grey {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    filter: grayscale(100%) brightness(0.5);
                }
                
                .loader-cup-color {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    transition: clip-path 0.1s linear;
                    clip-path: inset(100% 0 0 0); /* Start completely hidden from top */
                }
                
                .loader-progress {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 1.5rem;
                    color: #A4D65E;
                    margin-top: 1rem;
                }
                
                .loader-text {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 3rem;
                    color: #A4D65E;
                    letter-spacing: 0.2em;
                    opacity: 0;
                    transform: translateY(20px);
                    transition: opacity 0.5s ease-out, transform 0.5s ease-out;
                }
                
                .loader-text.visible {
                    opacity: 1;
                    transform: translateY(0);
                }
                
                .loader-fade-out {
                    animation: fadeOut 0.5s ease-out forwards;
                }
                
                @keyframes fadeOut {
                    to {
                        opacity: 0;
                    }
                }
            </style>
            
            <div class="loader-cup-wrapper">
                <img src="/images/logo/cup_logo.png" alt="" class="loader-cup-grey">
                <img src="/images/logo/cup_logo.png" alt="" class="loader-cup-color" id="loader-fill">
            </div>
            <div class="loader-progress" id="loader-percent">0%</div>
            <div class="loader-text" id="loader-text">HERB CAFÉ</div>
        `;

        // Add to body
        document.body.appendChild(loader);

        const fillEl = document.getElementById('loader-fill');
        const percentEl = document.getElementById('loader-percent');
        const textEl = document.getElementById('loader-text');

        // Simulate loading progress
        let progress = 0;
        const totalDuration = 2500; // 2.5 seconds to fill
        const intervalTime = 20; // update every 20ms
        const increment = 100 / (totalDuration / intervalTime);

        const interval = setInterval(() => {
            progress += increment;

            // Add some randomness to naturalize the loading
            if (Math.random() > 0.7) progress += 1;

            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);

                // Final state
                fillEl.style.clipPath = `inset(0% 0 0 0)`;
                percentEl.textContent = '100%';

                // Show text
                textEl.classList.add('visible');

                // Fade out percent
                percentEl.style.opacity = '0';

                // Complete
                setTimeout(() => {
                    loader.classList.add('loader-fade-out');
                    setTimeout(() => {
                        loader.remove();
                        resolve();
                    }, 500);
                }, 800);
            } else {
                // Update fill
                // inset(top right bottom left)
                // We want to reveal from bottom, so we clip from top
                // 100% = fully clipped (hidden)
                // 0% = fully visible
                const clipValue = 100 - progress;
                fillEl.style.clipPath = `inset(${clipValue}% 0 0 0)`;
                percentEl.textContent = `${Math.floor(progress)}%`;
            }
        }, intervalTime);
    });
}
