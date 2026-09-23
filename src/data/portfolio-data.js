/**
 * Centralized Portfolio Data for Yuri Skvirski
 * Single source of truth for all content, projects, media specifications, and metadata.
 * Update content here without touching component or layout code.
 */

export const portfolioData = {
  meta: {
    siteTitle: "Yuri Skvirski — Video Production Director",
    siteDescription: "Accomplished Video Production Director and Head of Video Production based in Jerusalem, Israel. Leading broadcast, promotional, studio, and digital video production from concept to delivery.",
    author: "Yuri Skvirski",
    roleTitle: "Video Production Director",
    location: "Jerusalem, Israel",
    canonicalUrl: "https://yuriskvirski.com",
    ogImage: "/og-preview.jpg"
  },

  profile: {
    name: "Yuri Skvirski",
    title: "VIDEO PRODUCTION DIRECTOR",
    location: "Jerusalem, Israel",
    email: "contact@yuriskvirski.com", // Replace with real email address
    socialLinks: [
      { name: "LinkedIn", url: "https://linkedin.com/in/yuriskvirski", icon: "linkedin" },
      { name: "Vimeo / YouTube", url: "https://vimeo.com", icon: "video" },
      { name: "Download CV", url: "/Yuri_Skvirski_CV.pdf", icon: "download", isCv: true }
    ],
    coreStatement: "I lead video production from concept to delivery—with a director’s eye, a technician’s understanding, and the experience to build teams and systems that consistently produce strong work."
  },

  navigation: [
    { label: "Work", href: "#work" },
    { label: "Studio", href: "#studio" },
    { label: "Experience", href: "#experience" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" }
  ],

  hero: {
    headline: "VIDEO PRODUCTION\nFROM CONCEPT TO DELIVERY",
    subtext: [
      "I’m Yuri Skvirski, a video production director and department leader with more than a decade of experience in broadcast, promotional, studio, and digital production.",
      "I combine creative direction with a practical understanding of cameras, lighting, sound, editing, live production, workflows, and the people behind every successful production."
    ],
    ctaPrimary: { label: "VIEW SELECTED WORK", href: "#work" },
    ctaSecondary: { label: "ABOUT MY EXPERIENCE", href: "#experience" },
    media: {
      type: "video_placeholder",
      aspectRatio: "16:9",
      recommendedSpec: "Recommended final media: a 10–15 second silent showreel combining studio direction, camera operation, live control-room footage, lighting setups, and finished productions. Use a poster image for mobile and reduced-motion users.",
      posterImage: "/images/hero-studio-poster.svg",
      videoUrl: "", // Add self-hosted .mp4 or Vimeo background reel
      caption: "Broadcast Production Floor — Live Studio Multi-Camera Setup"
    }
  },

  selectedWork: {
    title: "SELECTED WORK",
    intro: "A selection of broadcast promos, studio productions, program launches, and production systems developed across i24NEWS and JNS.",
    projects: [
      {
        id: "i24news-promo",
        title: "i24NEWS Promotional Work",
        organization: "i24NEWS",
        period: "2017–2024",
        role: "Creative direction / Promo production / Editing supervision",
        description: "Promotional campaigns, program launches, channel branding, and editorial promos created and supervised for an international television news network.",
        mediaType: "video",
        videoEmbedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ", // Replace with real YouTube/Vimeo embed
        aspectRatio: "16:9",
        devSpec: {
          assetType: "YouTube or Vimeo embed",
          aspectRatio: "16:9",
          recommendedDuration: "60–90 second curated showreel",
          contentRequirement: "Open with the strongest visually recognizable promo. Include different styles and formats. Avoid a long chronological compilation. Use only work created, directed, edited, or directly supervised."
        },
        posterImage: "/images/project-i24news-poster.svg",
        tags: ["Channel Branding", "Campaign Promos", "Broadcast Design", "Supervision"]
      },
      {
        id: "jns-studio-productions",
        title: "JNS Studio Productions",
        organization: "JNS – Jewish News Syndicate",
        period: "2024–Present",
        role: "Head of Video Production / Production direction / Team and workflow leadership",
        description: "Interviews, panel discussions, podcasts, commentary programs, and multilingual productions created in the JNS Jerusalem studio.",
        mediaType: "video_playlist",
        videoEmbedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ", // Replace with primary episode or montage
        aspectRatio: "16:9",
        devSpec: {
          assetType: "YouTube playlist or selected-video embed",
          aspectRatio: "16:9",
          recommendedDuration: "45–75 second montage or strong primary episode",
          contentRequirement: "Show different camera angles, screen graphics, lighting setups, and program formats. Include selected episode thumbnails below the main video."
        },
        posterImage: "/images/project-jns-productions.svg",
        episodes: [
          { title: "Foreign Policy Briefing", format: "Multi-camera Panel", duration: "28 min", thumb: "/images/thumb-panel.svg" },
          { title: "Jerusalem Weekly Analysis", format: "1-on-1 Studio Interview", duration: "18 min", thumb: "/images/thumb-interview.svg" },
          { title: "Middle East Perspectives Podcast", format: "Studio Broadcast Podcast", duration: "42 min", thumb: "/images/thumb-podcast.svg" },
          { title: "Special Field Report", format: "Studio & Location Hybrid", duration: "12 min", thumb: "/images/thumb-field.svg" }
        ],
        tags: ["Multi-Camera Broadcast", "Format Development", "Live Stream", "Multilingual"]
      },
      {
        id: "building-jns-studio",
        title: "Building the JNS Studio",
        organization: "JNS – Jewish News Syndicate",
        period: "2024",
        role: "Studio Planning / Infrastructure / Technical Direction",
        description: "The planning and development of a flexible production studio built for interviews, panels, monologues, podcasts, live production, and digital-first programming.",
        caseStudy: {
          summary: "The studio was developed as a flexible production environment rather than a single fixed set. It supports multiple program formats while maintaining a consistent visual standard and an efficient production workflow.\n\nMy responsibilities included production requirements, technical planning, equipment selection, camera and lighting approach, set functionality, workflow development, staffing, and ongoing production supervision.",
          note: "Technical planning and production supervision focused on functional media infrastructure and workflows.",
          stages: [
            {
              id: "stage-wide",
              title: "1. Studio Space & Screen Layout",
              caption: "Wide studio photograph showing the complete space, acoustic treatment, and modular backdrop screen layout.",
              devGuidance: "Wide studio photograph showing the complete space and screen layout.",
              image: "/images/studio-stage-wide.svg"
            },
            {
              id: "stage-bts",
              title: "2. Behind-the-Scenes Production",
              caption: "Working production setup with active cameras, key lighting, sound operators, and talent on set.",
              devGuidance: "Behind-the-scenes image with cameras, lighting, crew, and talent visible.",
              image: "/images/studio-stage-bts.svg"
            },
            {
              id: "stage-rig",
              title: "3. Camera Rig & Optic Setup",
              caption: "Cinema camera rig configured with teleprompter, wireless monitoring, and studio floor positioning.",
              devGuidance: "Detailed camera-rig photograph with the studio visible in the background.",
              image: "/images/studio-stage-rig.svg"
            },
            {
              id: "stage-multiview",
              title: "4. Control-Room Multiview",
              caption: "Live production multiview interface displaying synchronized ISO camera feeds, graphics keying, and audio mix.",
              devGuidance: "Control-room or multiview image showing a live multi-camera production.",
              image: "/images/studio-stage-control.svg"
            },
            {
              id: "stage-on-air",
              title: "5. Finished Broadcast Output",
              caption: "Live program frame demonstrating final lighting contrast, color grade, lower-thirds, and broadcast presentation.",
              devGuidance: "Finished broadcast frame demonstrating how the studio appears on screen.",
              image: "/images/studio-stage-onair.svg"
            }
          ]
        },
        tags: ["Studio Engineering", "Lighting Grid", "Live Switcher", "Acoustics & Sets"]
      },
      {
        id: "production-leadership",
        title: "Production Leadership & Workflow",
        organization: "Cross-functional Operations",
        period: "Ongoing",
        role: "Head of Production / Department Systems",
        description: "A look behind the finished videos: planning, crews, workflows, technical decisions, and the systems required to produce consistent work.",
        mediaType: "process_visual",
        devSpec: {
          assetType: "Authentic documentary behind-the-scenes photography",
          contentRequirement: "Authentic images of Yuri directing, working with crew, reviewing a monitor, operating a camera, planning lighting, or supervising an edit. Avoid posed corporate portraits."
        },
        processStages: [
          { step: "01", name: "Editorial & Creative Concept", desc: "Establishing narrative goal, format rules, tone, visual reference, and editorial guidelines." },
          { step: "02", name: "Production Planning", desc: "Resource allocation, crew assignments, scheduling, set staging, and budget boundaries." },
          { step: "03", name: "Technical Preparation", desc: "Camera package calibration, lens selection, lighting design, audio routing, and comms testing." },
          { step: "04", name: "Studio or Location Production", desc: "Directing multi-camera feeds, talent blocking, lighting control, and technical supervision." },
          { step: "05", name: "Post-Production", desc: "Editing supervision, motion graphics integration, color grading, sound design, and loudness compliance." },
          { step: "06", name: "Review & Delivery", desc: "Quality assurance across broadcast master codecs, digital cutdowns, and archival distribution." }
        ],
        tags: ["Systems Design", "Crew Supervision", "Resource Planning", "Quality Assurance"]
      }
    ],
    // Schema definition for future projects
    schemaGuide: {
      fields: [
        "Project title",
        "Organization",
        "Year or date range",
        "Short description",
        "My role",
        "Hero image / poster",
        "YouTube or Vimeo link",
        "Image gallery",
        "Optional credits",
        "Optional technical details",
        "Optional short case study"
      ]
    }
  },

  studioCapability: {
    title: "BUILDING PRODUCTION CAPABILITY",
    paragraphs: [
      "Strong productions depend on more than cameras and sets. They require a clear workflow, the right crew, reliable technical systems, realistic schedules, and a shared understanding of what the final product should be.",
      "My role is to connect these parts: creative direction, people, technology, budget, and delivery."
    ],
    capabilities: [
      "Studio design and development",
      "Multi-camera production",
      "Live switching and streaming",
      "Camera and lens planning",
      "Lighting design",
      "Sound workflows",
      "Post-production systems",
      "Graphics integration",
      "Team structure and supervision",
      "Production scheduling and budgeting"
    ],
    media: {
      caption: "Studio Floor Supervision — Live Multicamera Production",
      devGuidance: "A wide, natural behind-the-scenes photograph of Yuri inside a functioning studio, reviewing the production through a monitor while the crew is working. The image should communicate leadership and technical involvement without looking staged.",
      image: "/images/studio-capability-bts.svg"
    }
  },

  experience: {
    title: "EXPERIENCE",
    subtitle: "Over a decade directing broadcast, promo, and digital video production environments.",
    timeline: [
      {
        period: "September 2024–Present",
        role: "Head of Video Production",
        company: "JNS – Jewish News Syndicate",
        location: "Jerusalem, Israel",
        summary: "Lead video production and organizational video capability development. Built and operate a dedicated Jerusalem broadcast studio producing multi-camera interviews, panel discussions, podcasts, commentary shows, live streams, and field reports. Direct workflows, technical infrastructure, staffing, and end-to-end delivery."
      },
      {
        period: "2017–2024",
        role: "Head of Promo",
        company: "i24NEWS",
        location: "Tel Aviv, Israel",
        summary: "Directed promo production across an international 24/7 multilingual television news network. Supervised promotional campaigns, channel branding, program launches, and high-turnaround broadcast promos, bridging editorial storytelling, visual directing, and fast-paced live broadcast operations."
      },
      {
        period: "2013–2017",
        role: "Head of Video Editing",
        company: "i24NEWS",
        location: "Tel Aviv, Israel",
        summary: "Managed the video editing department for international news broadcasting. Supervised editing teams, post-production workflows, storage infrastructure, and high-stress delivery under breaking news deadlines."
      }
    ],
    cvDownload: {
      label: "DOWNLOAD CV",
      url: "/Yuri_Skvirski_CV.pdf",
      note: "PDF Document • Yuri Skvirski CV"
    }
  },

  about: {
    title: "A DIRECTOR WHO UNDERSTANDS THE WHOLE PROCESS",
    content: [
      "I have spent more than a decade working across the creative, technical, and operational sides of professional video production.",
      "I can discuss the story and visual direction, but I can also evaluate the camera setup, lighting, sound, edit, graphics, workflow, schedule, and resources required to deliver it properly.",
      "That practical understanding shapes the way I lead. I know what to expect from a professional crew, what they need from their director, and where production problems are likely to appear before they become expensive.",
      "My work has included international television news, promotional production, studio development, live and recorded programs, multilingual content, and digital video operations."
    ],
    portraitSpec: {
      caption: "Yuri Skvirski — Production Director",
      devGuidance: "Use an environmental portrait rather than a standard corporate headshot. Photograph Yuri in a real studio or control-room environment with soft directional light. Keep the background recognizable but out of focus. The wardrobe should be professional but not formal—a dark overshirt, jacket, or clean solid-color shirt. The expression should feel calm, confident, and approachable."
    },
    portraitImage: "/images/portrait-placeholder.svg"
  },

  technicalMatrix: {
    title: "CREATIVE DIRECTION, GROUNDED IN PRODUCTION",
    subtitle: "A disciplined balance between aesthetic storytelling and deep hands-on technical execution.",
    columns: [
      {
        id: "direction",
        category: "Direction",
        skills: "Concept development, visual language, performance, storytelling, editorial judgment"
      },
      {
        id: "production",
        category: "Production",
        skills: "Crews, scheduling, budgeting, studio operations, location filming, multi-camera workflows"
      },
      {
        id: "technical",
        category: "Technical",
        skills: "Cinema and broadcast cameras, lenses, lighting, sound, live switching, streaming"
      },
      {
        id: "post-production",
        category: "Post-production",
        skills: "Editing, color workflow, audio finishing, motion graphics, review, delivery"
      }
    ]
  },

  contact: {
    title: "CONTACT",
    intro: "I’m always interested in serious conversations about video leadership, studio development, broadcast production, and ambitious media projects.",
    email: "contact@yuriskvirski.com",
    location: "Jerusalem, Israel",
    links: [
      { label: "LinkedIn", url: "https://linkedin.com/in/yuriskvirski" },
      { label: "Vimeo / YouTube", url: "https://vimeo.com" },
      { label: "Download CV", url: "/Yuri_Skvirski_CV.pdf" }
    ],
    formNote: "Please include a short description of the opportunity or project."
  },

  footer: {
    name: "YURI SKVIRSKI",
    title: "VIDEO PRODUCTION DIRECTOR",
    location: "Jerusalem, Israel",
    copyrightYear: "2026",
    links: [
      { label: "LinkedIn", url: "https://linkedin.com/in/yuriskvirski" },
      { label: "Email", url: "mailto:contact@yuriskvirski.com" },
      { label: "Vimeo / YouTube", url: "https://vimeo.com" }
    ]
  }
};
