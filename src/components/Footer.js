/**
 * Footer Component
 * Minimal, understated closing section with location and professional credentials.
 */

export function renderFooter(data) {
  const { footer } = data;

  const linksHtml = footer.links
    .map(link => `<a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label}</a>`)
    .join('');

  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-identity">
            <span class="footer-name">${footer.name}</span>
            <span class="footer-title">${footer.title}</span>
            <span class="footer-location">${footer.location}</span>
          </div>

          <nav class="footer-links" aria-label="Footer navigation">
            ${linksHtml}
          </nav>

          <div class="footer-copyright">
            © ${footer.copyrightYear} ${footer.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  `;
}
