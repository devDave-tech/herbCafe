/**
 * Community membership sign-up form handler
 * Sends form data to a Google Apps Script web app that writes to a Google Sheet.
 */

// ⚠️ REPLACE THIS with your deployed Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';

export function initCommunityForm() {
    const form = document.getElementById('community-form');
    if (!form) return;

    form.addEventListener('submit', handleSubmit);

    // Live validation — clear errors on input
    form.querySelectorAll('.form-input').forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('error');
            const errorEl = input.parentElement.querySelector('.form-error');
            if (errorEl) errorEl.textContent = '';
        });
    });
}

function validate(form) {
    const fields = {
        firstName: form.querySelector('#cf-first-name'),
        surname: form.querySelector('#cf-surname'),
        email: form.querySelector('#cf-email'),
        cell: form.querySelector('#cf-cell'),
    };

    let valid = true;

    // First Name
    if (!fields.firstName.value.trim()) {
        setError(fields.firstName, 'First name is required');
        valid = false;
    }

    // Surname
    if (!fields.surname.value.trim()) {
        setError(fields.surname, 'Surname is required');
        valid = false;
    }

    // Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(fields.email.value.trim())) {
        setError(fields.email, 'Please enter a valid email');
        valid = false;
    }

    // Cell Number (SA format: 10 digits starting with 0, or +27 with 11-12 chars)
    const cellValue = fields.cell.value.trim().replace(/\s/g, '');
    const cellPattern = /^(\+27|0)\d{9}$/;
    if (!cellPattern.test(cellValue)) {
        setError(fields.cell, 'Enter a valid SA number (e.g. 071 234 5678)');
        valid = false;
    }

    return valid ? {
        firstName: fields.firstName.value.trim(),
        surname: fields.surname.value.trim(),
        email: fields.email.value.trim(),
        cell: cellValue
    } : null;
}

function setError(input, message) {
    input.classList.add('error');
    const errorEl = input.parentElement.querySelector('.form-error');
    if (errorEl) errorEl.textContent = message;
}

async function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector('.community-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.spinner');
    const errorBox = form.querySelector('.community-error');

    // Clear previous error
    if (errorBox) errorBox.remove();

    // Validate
    const data = validate(form);
    if (!data) return;

    // Check if script URL is configured
    if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL') {
        showFormError(form, 'Sign-up is not configured yet. Please contact the site admin.');
        return;
    }

    // Set loading state
    submitBtn.disabled = true;
    btnText.textContent = 'JOINING...';
    spinner.style.display = 'block';

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Google Apps Script requires no-cors
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        // no-cors returns opaque response, so we trust it went through
        showSuccess(form);
    } catch (err) {
        console.error('Community sign-up error:', err);
        showFormError(form, 'Something went wrong. Please try again or reach out on WhatsApp.');

        // Reset button
        submitBtn.disabled = false;
        btnText.textContent = 'JOIN THE COMMUNITY';
        spinner.style.display = 'none';
    }
}

function showSuccess(form) {
    const card = form.closest('.community-card');
    card.innerHTML = `
    <div class="community-success">
      <div class="community-success__icon">🌿</div>
      <h3 class="community-success__title">WELCOME TO THE FAMILY!</h3>
      <p class="community-success__text">
        You're now a Herb Café community member.<br>
        Stay tuned for exclusive updates, events, and offers!
      </p>
    </div>
  `;
}

function showFormError(form, message) {
    // Remove existing error if any
    const existing = form.querySelector('.community-error');
    if (existing) existing.remove();

    const errorDiv = document.createElement('div');
    errorDiv.className = 'community-error';
    errorDiv.textContent = message;
    form.appendChild(errorDiv);
}
