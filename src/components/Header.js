/**
 * Header Component
 * Minimal sticky header with brand identity and clean navigation.
 */

export function renderHeader(data) {
  const { profile, navigation } = data;

  const navItemsHtml = navigation
    .map(item => `<li><a href="${item.href}" class="nav-link" data-section="${item.href.replace('#', '')}">${item.label}</a></li>`)
    .join('');

  return `
    <header class="site-header" id="site-header">
      <div class="container">
        <a href="#" class="brand" aria-label="${profile.name} - Home">
          <span class="brand-name">${profile.name.toUpperCase()}</span>
          <span class="brand-descriptor">${profile.title}</span>
        </a>

        <button class="mobile-menu-btn" id="mobile-menu-toggle" aria-label="Toggle navigation menu" aria-expanded="false">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        <nav aria-label="Main Navigation">
          <ul class="nav-links" id="nav-links">
            ${navItemsHtml}
          </ul>
        </nav>
      </div>
    </header>
  `;
}

export function initHeader() {
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const links = document.querySelectorAll('.nav-link');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking a link
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active link scroll spy
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.dataset.section === current) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}
