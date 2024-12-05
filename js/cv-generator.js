document.addEventListener("DOMContentLoaded", function () {
  // Work Experience
  document
    .getElementById("addWorkExperience")
    .addEventListener("click", function () {
      const workExperience = document.getElementById("workExperience");
      const newEntry = document.createElement("div");
      //     newEntry.innerHTML = `
      //   <input type="text" class="input-field" placeholder="Company Name">
      //   <input type="text" class="input-field" placeholder="Job Title">
      //   <input type="text" class="input-field" placeholder="Start Date">
      //   <input type="text" class="input-field" placeholder="End Date">
      //   <textarea class="textarea-field" placeholder="Job Description"></textarea>
      // `;
      newEntry.innerHTML = `
          <div class="workeduc-content">
            <span class="year">
              <i class="bx bx-calendar"></i><input type="number" placeholder="from"  > - <input type="number" placeholder="present" required>
            </span>
            <span>
                <input type="text" id="job-position" placeholder="Position">
                 - 
                <input type="text" id="job-company"  placeholder="Company Name">
            </span>
           <textarea id="job-description" rows="3" placeholder="add your work description here" class="textarea-field" ></textarea>
          </div>
          `;
      workExperience.appendChild(newEntry);
    });

  // Education
  document
    .getElementById("addEducation")
    .addEventListener("click", function () {
      const education = document.getElementById("education");
      const newEntry = document.createElement("div");
      newEntry.innerHTML = `
               <div class="workeduc-content">
                 <span class="year">
              <i class="bx bx-calendar"></i><input type="number" placeholder="from" required> - <input type="number" placeholder="present" required>
            </span>
            <span>
                <input id="degree" type="text" placeholder="Degree" name="degree">
                <input id="institution" type="text" placeholder="Education Institution Name" name="institution">
              </div>
    `;
      education.appendChild(newEntry);
    });

  // Services
  document.getElementById("addService").addEventListener("click", function () {
    const services = document.getElementById("services");
    const newEntry = document.createElement("div");
    newEntry.classList.add("services-content");
    newEntry.innerHTML = `
                <i class="bx bx-code-alt"></i>
                <input id="service-title" type="text" placeholder="Serivce Title" class="input-field" >
                <textarea id="service-description" placeholder="Add a brief Description to your Service" rows="3" class="textarea-field" ></textarea>
              
    `;
    services.appendChild(newEntry);
  });

  //   document
  //     .getElementById("addWebDevSkill")
  //     .addEventListener("click", addSkill("WebDev"));
  //   document
  //     .getElementById("addProgLangSkill")
  //     .addEventListener("click", addSkill("ProgLang"));
  document
    .getElementById("addSkillTopic")
    .addEventListener("click", function () {
      const skillBox = document.getElementById("skillTopic");
      const newEntry = document.createElement("div");
      newEntry.innerHTML = `
        <div class="skill-content" >
                <!-- Topics are Added here -->
                <input id="skill-title" type="text" placeholder="Skill Title" class="input-field">
                <div class="content">
                  <input
                    type="text"
                    class="input-field"
                    id="skillContent"
                    placeholder="Add description to your skill"
                  />
                </div>
               
              </div>
    `;
      skillBox.appendChild(newEntry);
    });
  // Projects
  document.getElementById("addProject").addEventListener("click", function () {
    const projectContainer = document.getElementById("projectContainer");
    const newEntry = document.createElement("div");
    newEntry.className = "project-card";
    newEntry.innerHTML = `
      <input id="title"type="text" class="input-field" placeholder="Project Title">
      <textarea id="description" class="textarea-field" placeholder="Project Description"></textarea>
      <input id="link" type="text" class="input-field" placeholder="Project Link">
    `;
    projectContainer.appendChild(newEntry);
  });

  // Finish CV
  //   document.getElementById("finish-cv").addEventListener("click", function () {
  //     // Collect all the data from the form
  //     const cvData = {
  //       personalInfo: {
  //         fullName: document.getElementById("fullName").value,
  //         jobTitle: document.getElementById("jobTitle").value,
  //         introduction: document.getElementById("introduction").value,
  //       },
  //       workExperience: Array.from(
  //         document.getElementById("workExperience").children
  //       ).map((exp) => ({
  //         companyName: exp.querySelector("input:nth-child(1)").value,
  //         jobTitle: exp.querySelector("input:nth-child(2)").value,
  //         startDate: exp.querySelector("input:nth-child(3)").value,
  //         endDate: exp.querySelector("input:nth-child(4)").value,
  //         description: exp.querySelector("textarea").value,
  //       })),
  //       education: Array.from(document.getElementById("education").children).map(
  //         (edu) => ({
  //           institution: edu.querySelector("input:nth-child(1)").value,
  //           degree: edu.querySelector("input:nth-child(2)").value,
  //           fieldOfStudy: edu.querySelector("input:nth-child(3)").value,
  //           graduationYear: edu.querySelector("input:nth-child(4)").value,
  //         })
  //       ),
  //       services: Array.from(document.getElementById("services").children).map(
  //         (service) => ({
  //           title: service.querySelector("input").value,
  //           description: service.querySelector("textarea").value,
  //         })
  //       ),
  //       skills: {
  //         webDev: Array.from(
  //           document.getElementById("webDevSkills").children
  //         ).map((skill) => skill.textContent),
  //         progLang: Array.from(
  //           document.getElementById("progLangSkills").children
  //         ).map((skill) => skill.textContent),
  //         devOps: Array.from(
  //           document.getElementById("devOpsSkills").children
  //         ).map((skill) => skill.textContent),
  //       },
  //       projects: Array.from(
  //         document.getElementById("projectContainer").children
  //       ).map((project) => ({
  //         title: project.querySelector("input:nth-child(1)").value,
  //         description: project.querySelector("textarea").value,
  //         link: project.querySelector("input:nth-child(3)").value,
  //       })),
  //     };

  //     // Here you would typically send this data to a server or process it further
  //     console.log("CV Data:", cvData);
  //     alert("CV Completed! You can now download or submit your CV.");

  //     // You could add code here to generate a PDF, send the data to a server, etc.
  //   });
  document
    .getElementById("imageUpload")
    .addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
          document.getElementById("profileImage").src = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please select an image file.");
      }
    });
});

const pages = document.querySelectorAll(".book-page.page-right");

let totalPages = pages.length;
let pageNumber = 0;

function reverseIndex() {
  pageNumber--;
  if (pageNumber < 0) {
    pageNumber = totalPages - 1;
  }
}

const returnButton = document.getElementById("returnButton");
returnButton.onclick = () => {
  pages.forEach((_, index) => {
    setTimeout(() => {
      reverseIndex();
      pages[pageNumber].classList.remove("turn");

      setTimeout(() => {
        reverseIndex();
        pages[pageNumber].style.zIndex = 10 + index;
      }, 500);
    }, (index + 1) * 200 + 100);
  });

  const socialLinks = document.querySelectorAll(".social-link");
  const socialIcons = document.querySelectorAll(".social-icon");

  socialLinks.forEach((input, index) => {
    input.addEventListener("input", function () {
      const icon = socialIcons[index];
      icon.href = this.value;
    });
  });
};
