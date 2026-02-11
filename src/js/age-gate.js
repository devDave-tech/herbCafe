/**
 * Age Gate Module
 * Herb Café Website
 * 
 * Handles age verification with localStorage persistence.
 * Users must confirm they are 18+ to access the site.
 */

const AGE_KEY = 'herbCafeAgeVerified';

/**
 * Check if user has already verified their age
 * @returns {boolean}
 */
export function isAgeVerified() {
  return localStorage.getItem(AGE_KEY) === 'true';
}

/**
 * Initialize and display the age verification gate
 * @param {Function} onVerified - Callback when age is verified
 */
export function initAgeGate(onVerified) {
  // Already verified? Skip gate
  if (isAgeVerified()) {
    if (onVerified) onVerified();
    return;
  }

  // Create age gate modal
  const gate = document.createElement('div');
  gate.id = 'age-gate';
  gate.className = 'modal-overlay animate-fade-in';

  gate.innerHTML = `
    <div class="modal-content animate-scale-in">
      <div class="text-center">
        <!-- Logo placeholder -->
        <div class="w-48 h-20 mx-auto mb-6 flex items-center justify-center">
          <img 
            src="/images/logo/herb-cafe-logo-no-bg.png" 
            alt="Herb Café" 
            class="max-w-full max-h-full"
            onerror="this.style.display='none'; this.parentElement.innerHTML='<span class=\\'font-bebas text-4xl text-herb-green\\'>HERB CAFÉ</span>';"
          >
        </div>
        
        <h2 class="text-3xl md:text-4xl font-bebas text-herb-green mb-2 tracking-wider">
          AGE VERIFICATION
        </h2>
        
        <p class="text-white mb-4 font-inter text-lg">
          You must be 18 or older to enter this site.
        </p>
        
        <p class="text-gray-400 text-sm mb-8">
          By entering, you confirm you are of legal age to view cannabis-related content.
        </p>
        
        <div class="flex gap-4 justify-center">
          <button 
            id="age-verify-yes" 
            class="btn btn-primary flex-1 max-w-[140px] text-xl py-4 hover:scale-105 transition-transform"
          >
            I'M 18+
          </button>
          <button 
            id="age-verify-no" 
            class="btn btn-danger flex-1 max-w-[140px] text-xl py-4 hover:scale-105 transition-transform"
          >
            EXIT
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(gate);

  // Handle "I'm 18+" click
  document.getElementById('age-verify-yes').addEventListener('click', () => {
    // Save verification to localStorage
    localStorage.setItem(AGE_KEY, 'true');

    // Animate out
    gate.classList.remove('animate-fade-in');
    gate.classList.add('animate-fade-out');

    setTimeout(() => {
      gate.remove();
      if (onVerified) onVerified();
    }, 300);
  });

  // Handle "Exit" click
  document.getElementById('age-verify-no').addEventListener('click', () => {
    // Redirect to Google
    window.location.href = 'https://www.google.com';
  });
}

/**
 * Clear age verification (for testing/admin purposes)
 */
export function clearAgeVerification() {
  localStorage.removeItem(AGE_KEY);
}
