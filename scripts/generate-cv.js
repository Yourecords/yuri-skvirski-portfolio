import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function createCV() {
  const pdfDoc = await PDFDocument.create();
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const PAGE_WIDTH = 595.28; // Standard A4 width in points
  const PAGE_HEIGHT = 841.89; // Standard A4 height in points
  const MARGIN_LEFT = 60;
  const MARGIN_RIGHT = 60;
  const MARGIN_TOP = 65;
  const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT;

  const colorBlack = rgb(0.08, 0.09, 0.11);
  const colorGray = rgb(0.35, 0.38, 0.42);
  const colorDark = rgb(0.15, 0.17, 0.2);

  // Helper to add a page
  function createPage() {
    const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    return {
      page,
      cursorY: PAGE_HEIGHT - MARGIN_TOP
    };
  }

  function drawText(pageObj, text, { font = fontRegular, size = 10, color = colorDark, lineHeight = 15, indent = 0 } = {}) {
    pageObj.page.drawText(text, {
      x: MARGIN_LEFT + indent,
      y: pageObj.cursorY,
      size,
      font,
      color
    });
    pageObj.cursorY -= lineHeight;
  }

  function drawParagraph(pageObj, text, { font = fontRegular, size = 10, color = colorDark, lineHeight = 14, spacingAfter = 10, indent = 0 } = {}) {
    const words = text.split(' ');
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const testWidth = font.widthOfTextAtSize(testLine, size);

      if (testWidth > (CONTENT_WIDTH - indent)) {
        drawText(pageObj, currentLine, { font, size, color, lineHeight, indent });
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }

    if (currentLine) {
      drawText(pageObj, currentLine, { font, size, color, lineHeight, indent });
    }

    pageObj.cursorY -= spacingAfter;
  }

  function drawBullet(pageObj, text, { font = fontRegular, size = 9.5, color = colorDark, lineHeight = 13.5, spacingAfter = 4 } = {}) {
    const bulletIndent = 16;
    const bulletX = MARGIN_LEFT + 4;
    const bulletY = pageObj.cursorY + 3;

    // Draw bullet dot
    pageObj.page.drawCircle({
      x: bulletX,
      y: bulletY,
      size: 2.2,
      color: colorBlack
    });

    const words = text.split(' ');
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const testWidth = font.widthOfTextAtSize(testLine, size);

      if (testWidth > (CONTENT_WIDTH - bulletIndent)) {
        drawText(pageObj, currentLine, { font, size, color, lineHeight, indent: bulletIndent });
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }

    if (currentLine) {
      drawText(pageObj, currentLine, { font, size, color, lineHeight, indent: bulletIndent });
    }

    pageObj.cursorY -= spacingAfter;
  }

  function drawSectionHeading(pageObj, title, { spacingBefore = 18, spacingAfter = 10 } = {}) {
    pageObj.cursorY -= spacingBefore;
    drawText(pageObj, title.toUpperCase(), {
      font: fontBold,
      size: 13,
      color: colorBlack,
      lineHeight: 16
    });
    pageObj.cursorY -= spacingAfter;
  }

  // ==========================================
  // PAGE 1
  // ==========================================
  let p1 = createPage();

  // Name & Subtitle
  drawText(p1, 'YURI SKVIRSKI', { font: fontBold, size: 22, color: colorBlack, lineHeight: 26 });
  drawText(p1, 'Senior Video Production & Broadcast Professional', { font: fontBold, size: 11, color: colorDark, lineHeight: 18 });
  drawText(p1, 'Jerusalem, Israel', { font: fontRegular, size: 10, color: colorDark, lineHeight: 14 });
  drawText(p1, 'Hebrew • Russian • English', { font: fontRegular, size: 10, color: colorDark, lineHeight: 18 });

  // Professional Profile
  drawSectionHeading(p1, 'PROFESSIONAL PROFILE', { spacingBefore: 12, spacingAfter: 6 });

  drawParagraph(p1, 'Senior video production and broadcast professional with more than 15 years of experience across television, digital media, news, branded content, studio production, post-production and creative development.', { size: 9.8, lineHeight: 14.5, spacingAfter: 8 });

  drawParagraph(p1, 'Experienced in both hands-on production and team leadership, with a background spanning filming, editing, studio operations, live production, promotional content, post-production management and the development of complete video workflows.', { size: 9.8, lineHeight: 14.5, spacingAfter: 8 });

  drawParagraph(p1, "Currently Head of Video Production at JNS, responsible for the organization's video production operation, including multiple recurring programs, studio productions, field productions, live broadcasts, remote productions, technical workflows, personnel and production resources.", { size: 9.8, lineHeight: 14.5, spacingAfter: 8 });

  drawParagraph(p1, 'Previously spent more than a decade at i24NEWS, including seven years as Head of Promo and four years as Head of Video Editing.', { size: 9.8, lineHeight: 14.5, spacingAfter: 8 });

  drawParagraph(p1, 'Combines strong creative judgment with practical technical knowledge and extensive experience managing people, deadlines and high-volume production environments.', { size: 9.8, lineHeight: 14.5, spacingAfter: 12 });

  // Professional Experience
  drawSectionHeading(p1, 'PROFESSIONAL EXPERIENCE', { spacingBefore: 10, spacingAfter: 6 });

  drawText(p1, 'JNS (Jewish News Syndicate) — Jerusalem, Israel', { font: fontBold, size: 11, color: colorBlack, lineHeight: 15 });
  drawText(p1, 'Head of Video Production', { font: fontBold, size: 10, color: colorDark, lineHeight: 14 });
  drawText(p1, 'September 2024 – Present', { font: fontRegular, size: 9.5, color: colorDark, lineHeight: 16 });

  drawParagraph(p1, 'Lead the video production department and oversee the development and production of JNS video content across studio, digital, field and live formats.', { size: 9.8, lineHeight: 14.5, spacingAfter: 8 });

  drawBullet(p1, 'Manage the complete video production workflow from concept and pre-production through filming, post-production and delivery.');
  drawBullet(p1, 'Oversee a regular slate of news, interview, analysis and podcast-style programs.');

  // ==========================================
  // PAGE 2
  // ==========================================
  let p2 = createPage();

  // JNS Bullets Continued
  drawBullet(p2, 'Manage producers, video editors, studio operators, freelancers and other production personnel.');
  drawBullet(p2, 'Plan production schedules, staffing and department resources.');
  drawBullet(p2, 'Supervise studio recordings, multi-camera productions, remote interviews and live broadcasts.');
  drawBullet(p2, 'Develop and improve production and post-production workflows.');
  drawBullet(p2, 'Oversee technical studio operations, including cameras, lighting, audio, switching, recording, teleprompters and production systems.');
  drawBullet(p2, 'Develop new programs, pilots and video formats.');
  drawBullet(p2, 'Coordinate with editorial, management, marketing and external partners.');
  drawBullet(p2, 'Manage external production services and studio projects.');
  drawBullet(p2, 'Plan equipment purchases and production infrastructure.');
  drawBullet(p2, 'Maintain production quality and consistency across multiple programs and platforms.');
  drawBullet(p2, 'Support field productions and special projects from planning through final delivery.');
  drawBullet(p2, 'Work with international contributors, hosts and production teams.');

  p2.cursorY -= 14;

  // i24NEWS Head of Promo
  drawText(p2, 'i24NEWS — Tel Aviv-Jaffa, Israel', { font: fontBold, size: 11, color: colorBlack, lineHeight: 15 });
  drawText(p2, 'Head of Promo', { font: fontBold, size: 10, color: colorDark, lineHeight: 14 });
  drawText(p2, '2017 – 2024', { font: fontRegular, size: 9.5, color: colorDark, lineHeight: 16 });

  drawParagraph(p2, 'Led the promotional and creative video operation for an international television news network.', { size: 9.8, lineHeight: 14.5, spacingAfter: 8 });

  drawBullet(p2, 'Managed the creation of promotional content for television, digital and social platforms.');
  drawBullet(p2, 'Developed creative concepts and visual approaches for programs, campaigns and network branding.');
  drawBullet(p2, 'Produced and supervised promos, trailers, image campaigns and branded video content.');
  drawBullet(p2, 'Managed editors and creative production workflows.');
  drawBullet(p2, 'Worked closely with programming, editorial, marketing, graphics and broadcast teams.');
  drawBullet(p2, 'Supervised projects from concept and scripting through editing, sound design, graphics and final delivery.');
  drawBullet(p2, 'Produced content under demanding broadcast deadlines.');
  drawBullet(p2, 'Maintained visual and editorial consistency across network promotional output.');
  drawBullet(p2, 'Contributed to the development of channel identity and on-air presentation.');

  p2.cursorY -= 14;

  // i24NEWS Head of Video Editing
  drawText(p2, 'i24NEWS — Tel Aviv-Jaffa, Israel', { font: fontBold, size: 11, color: colorBlack, lineHeight: 15 });
  drawText(p2, 'Head of Video Editing', { font: fontBold, size: 10, color: colorDark, lineHeight: 14 });
  drawText(p2, '2013 – 2017', { font: fontRegular, size: 9.5, color: colorDark, lineHeight: 16 });

  drawParagraph(p2, 'Managed video editing operations in a fast-paced international television news environment.', { size: 9.8, lineHeight: 14.5, spacingAfter: 8 });

  drawBullet(p2, 'Led and supervised video editors working across news and production departments.');
  drawBullet(p2, 'Managed editing schedules, assignments and daily workflow.');

  // ==========================================
  // PAGE 3
  // ==========================================
  let p3 = createPage();

  // i24NEWS Head of Video Editing Bullets Continued
  drawBullet(p3, 'Edited and supervised news packages, interviews, features, promotional material and other broadcast content.');
  drawBullet(p3, 'Established and maintained post-production workflows.');
  drawBullet(p3, 'Coordinated between editors, journalists, producers and technical departments.');
  drawBullet(p3, 'Maintained technical and editorial standards for broadcast delivery.');
  drawBullet(p3, 'Worked extensively in deadline-driven breaking-news environments.');
  drawBullet(p3, 'Trained and supported editors and production staff.');

  // Core Expertise
  drawSectionHeading(p3, 'CORE EXPERTISE', { spacingBefore: 16, spacingAfter: 8 });

  drawText(p3, 'Video Production', { font: fontBold, size: 10.5, color: colorBlack, lineHeight: 14 });
  drawParagraph(p3, 'Studio Production • Field Production • Multi-Camera Production • Interviews • News • Podcasts • Promotional Content • Branded Content • Digital & Social Video • Live Production • Remote Production', { size: 9.5, lineHeight: 14, spacingAfter: 8 });

  drawText(p3, 'Post-Production', { font: fontBold, size: 10.5, color: colorBlack, lineHeight: 14 });
  drawParagraph(p3, 'Video Editing • Post-Production Supervision • Creative Editing • Workflow Design • Media Management • Graphics Integration • Sound & Music • Delivery & Quality Control', { size: 9.5, lineHeight: 14, spacingAfter: 8 });

  drawText(p3, 'Production Management', { font: fontBold, size: 10.5, color: colorBlack, lineHeight: 14 });
  drawParagraph(p3, 'Team Leadership • Production Planning • Scheduling • Resource Management • Freelancer Management • Budget Awareness • Vendor Coordination • Production Workflow Development • Equipment Planning', { size: 9.5, lineHeight: 14, spacingAfter: 8 });

  drawText(p3, 'Studio & Broadcast', { font: fontBold, size: 10.5, color: colorBlack, lineHeight: 14 });
  drawParagraph(p3, 'Camera Systems • Studio Lighting • Audio • Teleprompters • Video Switching • Recording • Streaming • Remote Contribution • Live Broadcast Workflows', { size: 9.5, lineHeight: 14, spacingAfter: 8 });

  drawText(p3, 'Creative', { font: fontBold, size: 10.5, color: colorBlack, lineHeight: 14 });
  drawParagraph(p3, 'Creative Direction • Concept Development • Promo Production • Storytelling • Visual Communication • Branding • Script Development', { size: 9.5, lineHeight: 14, spacingAfter: 12 });

  // Technical Skills
  drawSectionHeading(p3, 'TECHNICAL SKILLS', { spacingBefore: 12, spacingAfter: 8 });

  drawText(p3, 'Editing & Creative', { font: fontBold, size: 10.5, color: colorBlack, lineHeight: 15 });
  drawBullet(p3, 'Adobe Premiere Pro');
  drawBullet(p3, 'Adobe Creative Cloud');
  drawBullet(p3, 'Professional video editing and post-production workflows');
  drawBullet(p3, 'Graphics and motion-graphics integration');
  drawBullet(p3, 'Audio editing and sound design');
  drawBullet(p3, 'Color correction and finishing workflows');

  // ==========================================
  // PAGE 4
  // ==========================================
  let p4 = createPage();

  drawText(p4, 'Cameras & Production', { font: fontBold, size: 10.5, color: colorBlack, lineHeight: 15 });
  drawParagraph(p4, 'Experience with professional cinema, broadcast and mirrorless camera systems, including:', { size: 9.5, lineHeight: 14, spacingAfter: 4 });

  drawBullet(p4, 'Sony cinema and Alpha camera systems');
  drawBullet(p4, 'Blackmagic Design studio and production cameras');
  drawBullet(p4, 'Multi-camera studio configurations');
  drawBullet(p4, 'Interview and field-production camera setups');
  drawBullet(p4, 'Lens selection, framing and exposure');
  drawBullet(p4, 'Professional lighting setups');
  drawBullet(p4, 'Wireless and studio audio systems');

  p4.cursorY -= 12;

  drawText(p4, 'Broadcast & Studio Technology', { font: fontBold, size: 10.5, color: colorBlack, lineHeight: 16 });
  drawBullet(p4, 'vMix');
  drawBullet(p4, 'Blackmagic Design production systems');
  drawBullet(p4, 'ATEM video switchers');
  drawBullet(p4, 'Live streaming and recording workflows');
  drawBullet(p4, 'SRT and remote contribution workflows');
  drawBullet(p4, 'Teleprompter systems');
  drawBullet(p4, 'DMX-controlled studio lighting');
  drawBullet(p4, 'Professional media storage and shared production environments');
  drawBullet(p4, 'Remote interview and recording platforms including Zoom and Riverside');

  p4.cursorY -= 12;

  // Selected Production Experience
  drawSectionHeading(p4, 'SELECTED PRODUCTION EXPERIENCE', { spacingBefore: 10, spacingAfter: 8 });
  drawParagraph(p4, 'Experience across a wide range of formats, including:', { size: 9.5, lineHeight: 14, spacingAfter: 6 });

  drawBullet(p4, 'Television news');
  drawBullet(p4, 'Current-affairs programming');
  drawBullet(p4, 'Studio interviews');
  drawBullet(p4, 'Panel discussions');
  drawBullet(p4, 'Podcasts');
  drawBullet(p4, 'Live broadcasts');
  drawBullet(p4, 'Remote productions');
  drawBullet(p4, 'Field reports');
  drawBullet(p4, 'Promotional campaigns');
  drawBullet(p4, 'Commercial and branded video');
  drawBullet(p4, 'Social-media content');
  drawBullet(p4, 'Corporate video');
  drawBullet(p4, 'Event coverage');
  drawBullet(p4, 'Multi-camera studio productions');

  // ==========================================
  // PAGE 5
  // ==========================================
  let p5 = createPage();

  drawSectionHeading(p5, 'LEADERSHIP & MANAGEMENT', { spacingBefore: 0, spacingAfter: 8 });
  drawBullet(p5, 'More than a decade of experience leading video and post-production teams.');
  drawBullet(p5, 'Recruitment, onboarding and training of production personnel.');
  drawBullet(p5, 'Management of staff and freelance production teams.');
  drawBullet(p5, 'Production scheduling and workload planning.');
  drawBullet(p5, 'Development of efficient production workflows.');
  drawBullet(p5, 'Coordination between creative, editorial and technical teams.');
  drawBullet(p5, 'Technical and production problem-solving.');
  drawBullet(p5, 'Equipment and infrastructure planning.');
  drawBullet(p5, 'Managing simultaneous productions and tight deadlines.');
  drawBullet(p5, 'Maintaining quality standards in high-volume production environments.');

  p5.cursorY -= 14;

  drawSectionHeading(p5, 'EDUCATION', { spacingBefore: 8, spacingAfter: 8 });
  drawText(p5, 'Chavat HaNoar HaTzioni — Jerusalem, Israel', { font: fontBold, size: 10.5, color: colorBlack, lineHeight: 15 });
  drawText(p5, 'High School Diploma — Film & Television Track', { font: fontRegular, size: 10, color: colorDark, lineHeight: 14 });
  drawText(p5, '1995–1998', { font: fontRegular, size: 9.5, color: colorDark, lineHeight: 16 });

  p5.cursorY -= 14;

  drawSectionHeading(p5, 'LANGUAGES', { spacingBefore: 8, spacingAfter: 8 });
  drawText(p5, 'Russian — Native', { font: fontBold, size: 10, color: colorDark, lineHeight: 15 });
  drawText(p5, 'Hebrew — Fluent', { font: fontBold, size: 10, color: colorDark, lineHeight: 15 });
  drawText(p5, 'English — Professional working proficiency', { font: fontBold, size: 10, color: colorDark, lineHeight: 16 });

  p5.cursorY -= 14;

  drawSectionHeading(p5, 'ADDITIONAL', { spacingBefore: 8, spacingAfter: 8 });
  drawBullet(p5, 'Extensive experience in international and multilingual media environments.');
  drawBullet(p5, 'Strong combination of creative, technical and managerial experience.');
  drawBullet(p5, 'Comfortable working both independently and as part of large production teams.');
  drawBullet(p5, 'Experienced in building production processes and solving practical technical challenges.');
  drawBullet(p5, 'Hands-on understanding of the complete video production chain, from camera and studio through post-production and final distribution.');

  // Save PDF
  const pdfBytes = await pdfDoc.save();

  const outPath1 = path.join(process.cwd(), 'public', 'Yuri_Skvirski_CV.pdf');
  const outPath2 = path.join(process.cwd(), 'public', 'cv-placeholder.pdf');

  fs.writeFileSync(outPath1, pdfBytes);
  fs.writeFileSync(outPath2, pdfBytes);

  console.log(`CV PDF successfully generated: ${outPath1} (${pdfBytes.length} bytes)`);
}

createCV().catch(err => {
  console.error('Error creating CV PDF:', err);
  process.exit(1);
});
