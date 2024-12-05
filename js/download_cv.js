function transformAndDownloadCV() {
  // Get all the necessary content from the book layout
  const getContent = () => {
    return {
      imageSrc: document.getElementById("profile_image")?.src || "",
      fullName: document.getElementById("fullname")?.textContent || "",
      jobTitle: document.getElementById("jobTitle")?.textContent || "",
      introduction: document.getElementById("introduction")?.textContent || "",
      // Social links
      githubLink:
        document.querySelector(".social-media a:nth-child(1)")?.href || "#",
      linkedinLink:
        document.querySelector(".social-media a:nth-child(2)")?.href || "#",
      gmailLink:
        document.querySelector(".social-media a:nth-child(3)")?.href || "#",
      dockerLink:
        document.querySelector(".social-media a:nth-child(4)")?.href || "#",
      // Content sections
      workExperience:
        document.getElementById("workExperience")?.innerHTML || "",
      education: document.getElementById("education")?.innerHTML || "",
      services: document.getElementById("services")?.innerHTML || "",
      skills: document.getElementById("skills")?.innerHTML || "",
      projects: document.getElementById("projects")?.innerHTML || "",
    };
  };

  // Create the PDF-friendly template
  const createPDFTemplate = (content) => {
    return `
        <!-- Profile Section -->
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
      `;
  };

  // Add the PDF styles
  const addPDFStyles = () => {
    const styleElement = document.createElement("style");
    styleElement.textContent = `
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
      `;
    return styleElement;
  };

  // Main function to transform and download
  const downloadCV = () => {
    // Get content from current book layout
    const content = getContent();

    // Create a new container for the PDF content
    const downloadable = document.createElement("div");
    downloadable.className = "cv-container";

    // Add styles to the document
    document.head.appendChild(addPDFStyles());

    // Add PDF template with content
    downloadable.innerHTML = createPDFTemplate(content);

    // Configure PDF options
    const opt = {
      margin: 0,
      filename: `${content.fullName}_CV.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
      pagebreak: { mode: "avoid-all" },
    };

    // Generate and download PDF
    html2pdf().set(opt).from(downloadable).save();
  };

  // Load html2pdf if not already loaded
  if (typeof html2pdf === "undefined") {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js";
    script.onload = downloadCV;
    document.head.appendChild(script);
  } else {
    downloadCV();
  }
}

// Add click event listener to download button
document
  .getElementById("download-cv")
  ?.addEventListener("click", transformAndDownloadCV);
1;
