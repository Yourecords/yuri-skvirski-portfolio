/**
 * Application Entry Point
 * Orchestrates portfolio components, event bindings, and design system.
 */

import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/responsive.css';

import { portfolioData } from './data/portfolio-data.js';

import { renderHeader, initHeader } from './components/Header.js';
import { renderHero } from './components/Hero.js';
import { renderSelectedWork, initSelectedWork } from './components/SelectedWork.js';
import { renderStudioCapability } from './components/StudioCapability.js';
import { renderExperienceTimeline } from './components/ExperienceTimeline.js';
import { renderAboutSection } from './components/AboutSection.js';
import { renderTechnicalMatrix } from './components/TechnicalMatrix.js';
import { renderContactSection, initContactForm } from './components/ContactSection.js';
import { renderFooter } from './components/Footer.js';
import { renderVideoModal, initVideoModal } from './components/VideoModal.js';
import { renderDevGuideControl, initDevGuideControl } from './components/DevGuideOverlay.js';

function initApp() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    ${renderHeader(portfolioData)}
    <main id="main-content">
      ${renderHero(portfolioData)}
      <hr class="section-divider" />
      ${renderSelectedWork(portfolioData)}
      <hr class="section-divider" />
      ${renderStudioCapability(portfolioData)}
      <hr class="section-divider" />
      ${renderExperienceTimeline(portfolioData)}
      <hr class="section-divider" />
      ${renderAboutSection(portfolioData)}
      <hr class="section-divider" />
      ${renderTechnicalMatrix(portfolioData)}
      <hr class="section-divider" />
      ${renderContactSection(portfolioData)}
    </main>
    ${renderFooter(portfolioData)}
    ${renderVideoModal()}
    ${renderDevGuideControl()}
  `;

  // Initialize interactive behaviors
  initHeader();
  initSelectedWork(portfolioData);
  initContactForm();
  initVideoModal();
  initDevGuideControl();
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
