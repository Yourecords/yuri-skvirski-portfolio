/**
 * Contact Section Component
 * Direct professional inquiry channel with accessible form, validation, and direct credentials.
 */

export function renderContactSection(data) {
  const { contact } = data;

  const linksHtml = contact.links
    .map(link => `
      <a href="${link.url}" class="link-subtle" target="_blank" rel="noopener noreferrer" ${link.label.includes('CV') ? 'download="Yuri_Skvirski_CV.pdf"' : ''}>
        ${link.label}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="7" y1="17" x2="17" y2="7"/>
          <polyline points="7 7 17 7 17 17"/>
        </svg>
      </a>
    `)
    .join('');

  return `
    <section class="section" id="contact" aria-label="Contact Information">
      <div class="container">
        <header class="section-header">
          <div class="section-eyebrow">Direct Inquiries</div>
          <h2 class="section-title">${contact.title}</h2>
        </header>

        <div class="contact-grid">
          <!-- Direct Inquiry Info -->
          <div class="contact-info">
            <p>${contact.intro}</p>

            <div class="contact-direct-details">
              <div class="contact-detail-row">
                <span class="contact-detail-label">For Professional Inquiries</span>
                <a href="mailto:${contact.email}" class="contact-detail-val">${contact.email}</a>
              </div>

              <div class="contact-detail-row">
                <span class="contact-detail-label">Location</span>
                <span class="contact-detail-val">${contact.location}</span>
              </div>
            </div>

            <div class="contact-links-row">
              ${linksHtml}
            </div>
          </div>

          <!-- Professional Contact Form -->
          <div class="contact-form-wrapper">
            <form class="contact-form" id="portfolio-contact-form" novalidate>
              <!-- Honeypot for spam prevention -->
              <input type="text" name="_hp_security_check" style="display:none !important;" tabindex="-1" autocomplete="off" />

              <div class="form-group">
                <label for="contact-name" class="form-label">Name *</label>
                <input 
                  type="text" 
                  id="contact-name" 
                  name="name" 
                  class="form-input" 
                  placeholder="Your full name"
                  required
                />
              </div>

              <div class="form-group">
                <label for="contact-email" class="form-label">Email *</label>
                <input 
                  type="email" 
                  id="contact-email" 
                  name="email" 
                  class="form-input" 
                  placeholder="name@organization.com"
                  required
                />
              </div>

              <div class="form-group">
                <label for="contact-org" class="form-label">Organization</label>
                <input 
                  type="text" 
                  id="contact-org" 
                  name="organization" 
                  class="form-input" 
                  placeholder="Broadcaster, studio, media company or agency"
                />
              </div>

              <div class="form-group">
                <label for="contact-message" class="form-label">Message *</label>
                <textarea 
                  id="contact-message" 
                  name="message" 
                  class="form-textarea" 
                  rows="4" 
                  placeholder="Please describe the opportunity, project scope, or production context..."
                  required
                ></textarea>
                <div class="form-hint">${contact.formNote}</div>
              </div>

              <button type="submit" class="btn btn-primary" id="contact-submit-btn">
                SEND MESSAGE
              </button>

              <div class="form-feedback" id="form-feedback" role="alert"></div>
            </form>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  const feedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('contact-submit-btn');

  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Check honeypot
    const hp = form.querySelector('[name="_hp_security_check"]');
    if (hp && hp.value) {
      return; // Silent reject for spam bots
    }

    const name = form.querySelector('#contact-name').value.trim();
    const email = form.querySelector('#contact-email').value.trim();
    const message = form.querySelector('#contact-message').value.trim();

    // Basic Validation
    if (!name || !email || !message) {
      feedback.className = 'form-feedback error';
      feedback.textContent = 'Please fill in all required fields (Name, Email, Message).';
      return;
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      feedback.className = 'form-feedback error';
      feedback.textContent = 'Please provide a valid email address.';
      return;
    }

    // Submission Simulation
    submitBtn.disabled = true;
    submitBtn.textContent = 'TRANSMITTING...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'SEND MESSAGE';
      feedback.className = 'form-feedback success';
      feedback.textContent = 'Thank you for your message. Your inquiry has been logged, and Yuri will review your message shortly.';
      form.reset();
    }, 700);
  });
}
