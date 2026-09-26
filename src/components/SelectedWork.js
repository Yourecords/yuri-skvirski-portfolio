/**
 * Selected Work Component
 * Editorial showcase of broadcast promos, studio productions, studio engineering, and workflows.
 */

export function renderSelectedWork(data) {
  const { selectedWork } = data;
  const [i24Project, jnsStudioProject, jnsBuildProject, leadershipProject] = selectedWork.projects;

  return `
    <section class="section" id="work" aria-label="Selected Work">
      <div class="container">
        <header class="section-header">
          <div class="section-eyebrow">Portfolio</div>
          <h2 class="section-title">${selectedWork.title}</h2>
          <p class="section-intro">${selectedWork.intro}</p>
        </header>

        <div class="work-grid">
          <!-- PROJECT 1: i24NEWS Promotional Work -->
          <article class="project-card" id="project-${i24Project.id}">
            <div class="project-info">
              <div class="project-meta-row">
                <span class="project-org">${i24Project.organization}</span>
                <span>•</span>
                <span>${i24Project.period}</span>
              </div>
              <div class="project-role-badge">${i24Project.role}</div>
              <h3 class="project-title">${i24Project.title}</h3>
              <p class="project-desc">${i24Project.description}</p>
              
              <div class="project-tags">
                ${i24Project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
              </div>
            </div>

            <div class="project-media-wrapper">
              <div class="cinematic-frame">
                <img 
                  src="${i24Project.posterImage}" 
                  alt="${i24Project.title} showreel preview poster" 
                  loading="lazy"
                  width="1920" 
                  height="1080"
                />
                
                <button 
                  class="play-action-btn"
                  data-video-type="embed"
                  data-video-url="${i24Project.videoEmbedUrl}"
                  data-title="${i24Project.title}"
                  aria-label="Play ${i24Project.title} showreel"
                >
                  <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </button>
              </div>

              <div class="dev-spec-panel">
                <div class="dev-spec-badge">Media Specification • ${i24Project.devSpec.assetType}</div>
                <p><strong>Aspect Ratio:</strong> ${i24Project.devSpec.aspectRatio} | <strong>Duration:</strong> ${i24Project.devSpec.recommendedDuration}</p>
                <p>${i24Project.devSpec.contentRequirement}</p>
              </div>
            </div>
          </article>

          <!-- PROJECT 2: JNS Studio Productions -->
          <article class="project-card" id="project-${jnsStudioProject.id}">
            <div class="project-info">
              <div class="project-meta-row">
                <span class="project-org">${jnsStudioProject.organization}</span>
                <span>•</span>
                <span>${jnsStudioProject.period}</span>
              </div>
              <div class="project-role-badge">${jnsStudioProject.role}</div>
              <h3 class="project-title">${jnsStudioProject.title}</h3>
              <p class="project-desc">${jnsStudioProject.description}</p>
              
              <div class="project-tags">
                ${jnsStudioProject.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
              </div>
            </div>

            <div class="project-media-wrapper">
              <div class="cinematic-frame">
                <img 
                  src="${jnsStudioProject.posterImage}" 
                  alt="${jnsStudioProject.title} featured production frame" 
                  loading="lazy"
                  width="1920" 
                  height="1080"
                />
                
                <button 
                  class="play-action-btn"
                  data-video-type="embed"
                  data-video-url="${jnsStudioProject.videoEmbedUrl}"
                  data-title="${jnsStudioProject.title}"
                  aria-label="Play JNS Studio Production montage"
                >
                  <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </button>
              </div>

              <!-- Episode Thumbnails Grid -->
              <div class="episodes-container">
                <div class="episodes-grid">
                  ${jnsStudioProject.episodes.map(ep => `
                    <div class="episode-card" data-title="${ep.title}" data-video-url="${ep.videoUrl || ''}">
                      <div class="episode-thumb-frame">
                        <img src="${ep.thumb}" alt="${ep.title}" loading="lazy"/>
                        <span class="episode-duration">${ep.duration}</span>
                      </div>
                      <div class="episode-details">
                        <h4 class="episode-title">${ep.title}</h4>
                        <span class="episode-format">${ep.format}</span>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <div class="dev-spec-panel">
                <div class="dev-spec-badge">Media Specification • ${jnsStudioProject.devSpec.assetType}</div>
                <p><strong>Aspect Ratio:</strong> ${jnsStudioProject.devSpec.aspectRatio} | <strong>Duration:</strong> ${jnsStudioProject.devSpec.recommendedDuration}</p>
                <p>${jnsStudioProject.devSpec.contentRequirement}</p>
              </div>
            </div>
          </article>

          <!-- PROJECT 3: Building the JNS Studio (Interactive Expandable Case Study) -->
          <article class="project-card" id="project-${jnsBuildProject.id}">
            <div class="project-info">
              <div class="project-meta-row">
                <span class="project-org">${jnsBuildProject.organization}</span>
                <span>•</span>
                <span>${jnsBuildProject.period}</span>
              </div>
              <div class="project-role-badge">${jnsBuildProject.role}</div>
              <h3 class="project-title">${jnsBuildProject.title}</h3>
              <p class="project-desc">${jnsBuildProject.description}</p>
              
              <div class="project-tags">
                ${jnsBuildProject.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
              </div>
            </div>

            <!-- Case Study Container -->
            <div class="case-study-box">
              <p class="case-study-text">${jnsBuildProject.caseStudy.summary}</p>
              
              <!-- Tabbed Stage Selector -->
              <nav class="stage-nav" aria-label="Studio stages navigation">
                ${jnsBuildProject.caseStudy.stages.map((stage, idx) => `
                  <button 
                    class="stage-nav-btn ${idx === 0 ? 'active' : ''}" 
                    data-stage-idx="${idx}"
                  >
                    ${stage.title}
                  </button>
                `).join('')}
              </nav>

              <!-- Active Stage Display -->
              <div class="stage-display" id="studio-stage-display">
                <div class="cinematic-frame">
                  <img 
                    id="stage-active-img" 
                    src="${jnsBuildProject.caseStudy.stages[0].image}" 
                    alt="${jnsBuildProject.caseStudy.stages[0].title}"
                    loading="lazy"
                  />
                </div>
                <div class="stage-caption" id="stage-active-caption">
                  ${jnsBuildProject.caseStudy.stages[0].caption}
                </div>
                <div class="dev-spec-panel">
                  <div class="dev-spec-badge">Stage Photo Guidance</div>
                  <p id="stage-active-guidance">${jnsBuildProject.caseStudy.stages[0].devGuidance}</p>
                </div>
              </div>
            </div>
          </article>

          <!-- PROJECT 4: Production Leadership & Workflow -->
          <article class="project-card" id="project-${leadershipProject.id}">
            <div class="project-info">
              <div class="project-meta-row">
                <span class="project-org">${leadershipProject.organization}</span>
                <span>•</span>
                <span>${leadershipProject.period}</span>
              </div>
              <div class="project-role-badge">${leadershipProject.role}</div>
              <h3 class="project-title">${leadershipProject.title}</h3>
              <p class="project-desc">${leadershipProject.description}</p>
              
              <div class="project-tags">
                ${leadershipProject.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
              </div>
            </div>

            <!-- 6-Stage Process Timeline Visualization -->
            <div class="process-timeline">
              ${leadershipProject.processStages.map(step => `
                <div class="process-step-card">
                  <div class="process-step-num">STAGE ${step.step}</div>
                  <h4 class="process-step-name">${step.name}</h4>
                  <p class="process-step-desc">${step.desc}</p>
                </div>
              `).join('')}
            </div>

            <div class="dev-spec-panel">
              <div class="dev-spec-badge">Media Specification • ${leadershipProject.devSpec.assetType}</div>
              <p>${leadershipProject.devSpec.contentRequirement}</p>
            </div>
          </article>

          <!-- Extensible Future Project Template Notice -->
          <div class="dev-spec-panel" style="margin-top: 0;">
            <div class="dev-spec-badge">Extensible Project Architecture</div>
            <p>New projects can be added directly to <code>src/data/portfolio-data.js</code> using the standardized schema (Title, Organization, Role, Hero/Poster, Video URL, Gallery, Credits, and Case Study details). The component automatically renders responsive cards without altering template code.</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initSelectedWork(data) {
  const stages = data.selectedWork.projects.find(p => p.id === 'building-jns-studio')?.caseStudy.stages;
  if (!stages) return;

  const stageBtns = document.querySelectorAll('.stage-nav-btn');
  const stageImg = document.getElementById('stage-active-img');
  const stageCaption = document.getElementById('stage-active-caption');
  const stageGuidance = document.getElementById('stage-active-guidance');

  stageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      stageBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const idx = parseInt(btn.dataset.stageIdx, 10);
      const activeStage = stages[idx];
      if (activeStage && stageImg && stageCaption && stageGuidance) {
        stageImg.src = activeStage.image;
        stageImg.alt = activeStage.title;
        stageCaption.textContent = activeStage.caption;
        stageGuidance.textContent = activeStage.devGuidance;
      }
    });
  });
}
