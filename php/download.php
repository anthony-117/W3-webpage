<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
         * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }
        
        .page {
          background: white;
          page-break-after: always;
          position: relative;
          width: 210mm;  /* A4 width */
          height: 297mm; /* A4 height */
          padding: 20mm;
          margin: 0 auto;
        }
        
        /* Remove page break for last page */
        .page:last-child {
          page-break-after: avoid;
        }
        
        .profile-page {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .profile-section {
          text-align: center;
          width: 100%;
        }
        
        .profile-section img {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          margin-bottom: 20px;
        }
        
        .profile-section h1 {
          color: #333;
          margin-bottom: 10px;
          font-size: 2.5em;
        }
        
        .profile-section h3 {
          color: #666;
          margin-bottom: 20px;
          font-size: 1.5em;
        }
        
        .social-media {
          margin-bottom: 20px;
        }
        
        .social-media a {
          color: #333;
          font-size: 24px;
          margin: 0 10px;
          text-decoration: none;
        }
        
        .section {
          height: 100%;
        }
        
        .section h2 {
          color: #333;
          border-bottom: 2px solid #333;
          padding-bottom: 10px;
          margin-bottom: 20px;
          font-size: 2em;
        }
        
        .work-experience-item, 
        .education-item, 
        .service-item, 
        .project-item {
          margin-bottom: 20px;
        }
        
        .skills-container {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
  
        /* Ensure content doesn't overflow pages */
        p, div {
          max-width: 100%;
          word-wrap: break-word;
        }
        
        @media print {
          .page {
            margin: 0;
            border: initial;
            border-radius: initial;
            width: initial;
            min-height: initial;
            box-shadow: initial;
            background: initial;
            page-break-after: always;
          }
        }
    </style>
</head>
<body>
<div class="page profile-page">
          <section class="profile-section">
            <img src="${content.imageSrc}" alt="${content.fullName}" />
            <h1>${content.fullName}</h1>
            <h3>${content.jobTitle}</h3>
            
            <div class="social-media">
              <a href="${content.githubLink}" target="_blank"><i class="bx bxl-github"></i></a>
              <a href="${content.linkedinLink}" target="_blank"><i class="bx bxl-linkedin-square"></i></a>
              <a href="mailto:${content.gmailLink}"><i class="bx bxl-gmail"></i></a>
              <a href="${content.dockerLink}" target="_blank"><i class="bx bxl-docker"></i></a>
            </div>
            
            <p>${content.introduction}</p>
          </section>
        </div>
  
        <!-- Work Experience Section -->
        <div class="page">
          <section class="section">
            <h2>Work Experience</h2>
            ${content.workExperience}
          </section>
        </div>
  
        <!-- Education Section -->
        <div class="page">
          <section class="section">
            <h2>Education</h2>
            ${content.education}
          </section>
        </div>
  
        <!-- Services Section -->
        <div class="page">
          <section class="section">
            <h2>My Services</h2>
            ${content.services}
          </section>
        </div>
  
        <!-- Skills Section -->
        <div class="page">
          <section class="section">
            <h2>My Skills</h2>
            ${content.skills}
          </section>
        </div>
  
        <!-- Projects Section -->
        <div class="page">
          <section class="section">
            <h2>Projects</h2>
            ${content.projects}
          </section>
        </div>
</body>
</html>