// Select the form and submit button
const submitButton = document.getElementById("submit-cv");

// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault();

  const fullName = document.getElementById("fullName").value;
  const jobTitle = document.getElementById("jobTitle").value;
  const introduction = document.getElementById("introduction").value;
  const imageSrc = document.getElementById("profileImage").src;

  const workExperienceElements = document
    .getElementById("workExperience")
    .querySelectorAll(".workeduc-content");
  const educationElements = document
    .getElementById("education")
    .querySelectorAll(".workeduc-content");

  // Create a wrapper div for all experiences
  const workExperienceBox = document.createElement("div");
  workExperienceBox.className = "workeduc-box";

  const educationBox = document.createElement("div");
  educationBox.className = "workeduc-box";

  const servicesElements = document.querySelectorAll(".services-content");
  const serviceBox = document.createElement("div");
  serviceBox.className = "services-box";

  const projectElements = document.querySelectorAll(".project-card");
  const projectBox = document.createElement("div");
  projectBox.className = "project-container";

  projectElements.forEach((element) => {
    const title = element.querySelector("#title").value;
    const description = element.querySelector("#description").value;
    const link = element.querySelector("#link").value;

    const transformedHTML = `
                <div class="project-card">

                <h3 class="project-title">
                  <a href="${link}"
                    >${title} <i class="bx bx-link-external"></i
                  ></a>
                </h3>
                <p class="project-description">
                ${description}
                </p>
              </div>
    `;
    projectBox.insertAdjacentHTML("beforeend", transformedHTML);
  });

  servicesElements.forEach((element) => {
    const title = element.querySelector("#service-title").value;
    const description = element.querySelector("#service-description").value;

    const transformedHTML = `
    <div class="services-content">
                <i class="bx bx-code-alt"></i>
                <h3>${title}</h3>
                <p>
                ${description}
                </p>
              </div>
    `;

    serviceBox.insertAdjacentHTML("beforeend", transformedHTML);
  });

  // Transform each work experience
  workExperienceElements.forEach((element) => {
    const fromYear = element.querySelector('input[placeholder="from"]').value;
    const toYear = element.querySelector('input[placeholder="present"]').value;
    const position = element.querySelector("#job-position").value;
    const company = element.querySelector("#job-company").value;
    const description = element.querySelector("#job-description").value;

    const transformedHTML = `
      <div class="workeduc-content">
        <span class="year">
          <i class="bx bx-calendar"></i>${fromYear} - ${toYear}
        </span>
        <h3>${position} - ${company}</h3>
        <p>${description}</p>
      </div>
    `;

    workExperienceBox.insertAdjacentHTML("beforeend", transformedHTML);
  });

  educationElements.forEach((element) => {
    const fromYear = element.querySelector('input[placeholder="from"]').value;
    const toYear = element.querySelector('input[placeholder="present"]').value;
    const position = element.querySelector("#degree").value;
    const company = element.querySelector("#institution").value;

    const transformedHTML = `
      <div class="workeduc-content">
        <span class="year">
          <i class="bx bx-calendar"></i>${fromYear} - ${toYear}
        </span>
        <h3>${position} - ${company}</h3>
      </div>
    `;

    educationBox.insertAdjacentHTML("beforeend", transformedHTML);
  });

  const skillTopicElement = document.querySelectorAll(".skill-content");
  console.log(skillTopicElement);
  const skillTopic = document.createElement("div");
  skillTopic.className = "skill-box";

  skillTopicElement.forEach((element) => {
    const title = element.querySelector("#skill-title").value;
    const description = element.querySelector("#skillContent").value;

    const transformedHTML = `
              <div class="skill-content">

                <h2 class="skill-title">
                  ${title}                 
                </h2>
                <p class="skill-description">
                ${description}
                </p>
              </div>
    `;
    skillTopic.insertAdjacentHTML("beforeend", transformedHTML);
  });

  const githubLink = document.getElementById("github-link").value;
  const linkedinLink = document.getElementById("linkedin-link").value;
  const gmailLink = document.getElementById("gmail-link").value;
  const dockerLink = document.getElementById("docker-link").value;

  // Create the HTML content for the new window
  const formHtml = `
   <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${fullName + "CV"}</title>
    <link rel="stylesheet" href="/src/css/book.css" />
    <link
      href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
      rel="stylesheet"
    />
    <link
      rel="shortcut icon"
      href="/public/portfolio.png"
      type="image/x-icon"
    />

    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
      integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
  </head>
  <body>
    <a href="cv-generator.html" class="button-90 new-cv btn"
      ><i class="bx bx-plus"></i
    ></a>
    <div class="wrapper">
      <div class="cover cover-left"></div>
      <div class="cover cover-right"></div>

      <div class="book">
        <div class="book-page page-left">
          <div class="profile-page">
            <img src="${imageSrc}" alt="smth" />
            <h1>${fullName}</h1>
            <h3>${jobTitle}</h3>

            <div class="social-media">
              <a href="${githubLink}" target="_blank">
                <i class="bx bxl-github"></i>
              </a>
              <a
                href="${linkedinLink}"
                target="_blank"
              >
                <i class="bx bxl-linkedin-square"></i>
              </a>
              <a href="mailto:${gmailLink}" target="_blank">
                <i class="bx bxl-gmail"></i>
              </a>
              <a href="${dockerLink}" target="_blank">
                <i class="bx bxl-docker"></i>
              </a>
            </div>

            <p>
             ${introduction}
            </p>
            <div class="btn-box">
              <a href="#" class="btn" id="download-cv">Download CV</a>
              <a href="#" class="btn contact-me">Contact Me</a>
            </div>
          </div>
        </div>

        <!-- page 1 & 2 -->
        <div class="book-page page-right turn" id="turn-1">
          <!-- page 1 (work experience) -->
          <div class="page-front">
            <h1 class="title">Work Experience</h1>

            ${workExperienceBox.outerHTML}
            
            <span class="number-page">1</span>

            <span class="nextprev-btn" data-page="turn-1">
              <i class="bx bx-chevron-right"></i>
            </span>
          </div>
          <!-- page 2 Education -->
          <div class="page-back">
            <h1 class="title">Education</h1>
           ${educationBox.outerHTML}

            <span class="number-page">2</span>

            <span class="nextprev-btn back" data-page="turn-1">
              <i class="bx bx-chevron-left"></i>
            </span>
          </div>
        </div>
        <!-- page 3 & 4 -->
        <div class="book-page page-right turn" id="turn-2">
          <!-- page 3 my serivces -->
          <div class="page-front">
            <h1 class="title">My Services</h1>
            ${serviceBox.outerHTML}

            <span class="number-page">3</span>

            <span class="nextprev-btn" data-page="turn-2">
              <i class="bx bx-chevron-right"></i>
            </span>
          </div>

          <!-- page 4 my skills -->
          <div class="page-back">
            <h1 class="title">My Skills</h1>
              ${skillTopic.outerHTML}

            <span class="number-page">4</span>

            <span class="nextprev-btn back" data-page="turn-2">
              <i class="bx bx-chevron-left"></i>
            </span>
          </div>
        </div>

        <!-- page 5 & 6 -->
        <div class="book-page page-right turn" id="turn-3">
          <!-- page 5 Latest Projects or my portfolio -->
          <div class="page-front">
            <h1 class="title">Projects</h1>

          

            ${projectBox.outerHTML}

            <span class="number-page">5</span>

            <span class="nextprev-btn" data-page="turn-3">
              <i class="bx bx-chevron-right"></i>
            </span>
          </div>

          <!-- page 6 contact me -->
          <div class="page-back">
            <h1 class="title">Contact Me</h1>

            <div class="contact-box">
              <form action="">
                <input
                  type="text"
                  class="field"
                  placeholder="Full Name"
                  required
                />
                <input
                  type="email"
                  class="field"
                  placeholder="Email Address"
                  required
                />
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  class="field"
                  placeholder="Subject"
                ></textarea>
                <input type="submit" value="Send Message" class="btn" />
              </form>
            </div>

            <span class="number-page">6</span>

            <span class="nextprev-btn back" data-page="turn-3">
              <i class="bx bx-chevron-left"></i>
            </span>
            <a href="#" class="back-profile">
              <p>Profile</p>
              <i class="bx bxs-user"></i>
            </a>
          </div>
        </div>
      </div>
    </div>

    <script type="module" src="/src/js/book.js"></script>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js"></script> -->
    <!-- <script>
      document
        .getElementById("download-cv")
        .addEventListener("click", function () {
          // Select the element you want to convert to PDF
          var element = document.querySelector(".profile-page");

          // Use html2pdf to convert the element to PDF and download it
          html2pdf()
            .from(element)
            .set({
              margin: 1,
              filename: "CV_Anthony_Abisaid.pdf",
              html2canvas: { scale: 2 },
              jsPDF: { format: "a4", orientation: "portrait" },
            })
            .save();
        });
    </script> -->
  </body>
</html>

  `;

  // Open a new window and write the HTML content
  const newWindow = window.open("", "_blank");
  newWindow.document.write(formHtml);
  newWindow.document.close();

  // Clear the original form
  contactForm.reset();
}

// Add event listener to the form
submitButton.addEventListener("click", handleSubmit);
