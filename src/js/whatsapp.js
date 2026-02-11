/**
 * WhatsApp Floating Button Module
 * Herb Café Website
 * 
 * Fixed-position WhatsApp button with delayed appearance
 * and periodic pulse animation.
 */

// PLACEHOLDER: Replace with actual WhatsApp number
const WHATSAPP_NUMBER = '27XXXXXXXXX';
const DEFAULT_MESSAGE = 'Hi Herb Café! 🌿 I\'d like to place an order.';

/**
 * Initialize the WhatsApp floating button
 */
export function initWhatsAppButton() {
    const whatsappBtn = document.getElementById('whatsapp-btn');

    if (!whatsappBtn) return;

    // Set WhatsApp link
    const encodedMessage = encodeURIComponent(DEFAULT_MESSAGE);
    whatsappBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Show button after delay (2 seconds)
    setTimeout(() => {
        whatsappBtn.classList.add('visible');
    }, 2000);

    // Pulse animation every 4 seconds
    setInterval(() => {
        whatsappBtn.classList.add('pulse');
        setTimeout(() => {
            whatsappBtn.classList.remove('pulse');
        }, 1000);
    }, 4000);
}

/**
 * Generate WhatsApp order link for a specific item
 * @param {string} itemName - Name of the item to order
 * @returns {string} WhatsApp URL with pre-filled message
 */
export function getWhatsAppOrderLink(itemName) {
    const message = `Hi Herb Café! 🌿 I'd like to order: ${itemName}`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

/**
 * Generate WhatsApp inquiry link
 * @param {string} subject - Subject of inquiry
 * @returns {string} WhatsApp URL with pre-filled message
 */
export function getWhatsAppInquiryLink(subject) {
    const message = `Hi Herb Café! I have a question about: ${subject}`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}
