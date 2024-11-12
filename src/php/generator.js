document.addEventListener("DOMContentLoaded", function () {
  let date = new Date().getFullYear();
  // Work Experience
  document
    .getElementById("addWorkExperience")
    .addEventListener("click", function () {
      const workExperience = document.getElementById("workExperience");
      const newEntry = document.createElement("div");
      newEntry.innerHTML = `
            <div class="workeduc-content">
              <span class="year">
                <i class="bx bx-calendar"></i>
                <input type="number" name="work_from[]" placeholder="from" class="work-year-from" min="1900" max="${date}" required> - 
                <input type="number" name="work_to[]" placeholder="present"  class="work-year-to" max="${date} min="1900"  required>
              </span>
              <span>
                  <input type="text" name="job_position[]" class="job-position" placeholder="Position" required>
                   - 
                  <input type="text" name="job_company[]" class="job-company" placeholder="Company Name" required>
              </span>
             <textarea name="job_description[]" rows="3" placeholder="add your work description here" class="job-description textarea-field"></textarea>
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
                     <i class="bx bx-calendar"></i>
                     <input type="number" name="edu_from[]" placeholder="from" required class="edu-year-from"> - 
                     <input type="number" name="edu_to[]" placeholder="present" required class="edu-year-to">
                   </span>
                   <span>
                     <input type="text" name="degree[]" class="degree" placeholder="Degree">
                     <input type="text" name="institution[]" class="institution" placeholder="Education Institution Name">
                   </span>
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
                  <input type="text" name="service_title[]" placeholder="Service Title" class="service-title input-field">
                  <textarea name="service_description[]" placeholder="Add a brief Description to your Service" rows="3" class="service-description textarea-field"></textarea>
      `;
    services.appendChild(newEntry);
  });

  // Skills
  document
    .getElementById("addSkillTopic")
    .addEventListener("click", function () {
      const skillBox = document.getElementById("skillTopic");
      const newEntry = document.createElement("div");
      newEntry.innerHTML = `
            <div class="skill-content">
              <input type="text" name="skill_title[]" placeholder="Skill Title" class="skill-title input-field">
              <div class="content">
                <input type="text" name="skill_description[]" class="skill-description input-field" placeholder="Add description to your skill">
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
          <input type="text" name="project_title[]" class="project-title input-field" placeholder="Project Title">
          <textarea name="project_description[]" class="project-description textarea-field" placeholder="Project Description"></textarea>
          <input type="text" name="project_link[]" class="project-link input-field" placeholder="Project Link">
        `;
    projectContainer.appendChild(newEntry);
  });

  // Form submission handling
  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default submission

    // Collect work experience data
    const workExperience = Array.from(
      document.querySelectorAll(".workeduc-content")
    ).map((exp) => ({
      from: exp.querySelector(".work-year-from").value,
      to: exp.querySelector(".work-year-to").value,
      position: exp.querySelector(".job-position").value,
      company: exp.querySelector(".job-company").value,
      description: exp.querySelector(".job-description").value,
    }));

    // Collect education data
    const education = Array.from(document.querySelectorAll(".workeduc-content"))
      .map((edu) => ({
        from: edu.querySelector(".edu-year-from")?.value,
        to: edu.querySelector(".edu-year-to")?.value,
        degree: edu.querySelector(".degree")?.value,
        institution: edu.querySelector(".institution")?.value,
      }))
      .filter((edu) => edu.degree); // Filter out null entries

    // Collect services data
    const services = Array.from(
      document.querySelectorAll(".services-content")
    ).map((service) => ({
      title: service.querySelector(".service-title").value,
      description: service.querySelector(".service-description").value,
    }));

    // Collect skills data
    const skills = Array.from(document.querySelectorAll(".skill-content")).map(
      (skill) => ({
        title: skill.querySelector(".skill-title").value,
        description: skill.querySelector(".skill-description").value,
      })
    );

    // Collect projects data
    const projects = Array.from(document.querySelectorAll(".project-card")).map(
      (project) => ({
        title: project.querySelector(".project-title").value,
        description: project.querySelector(".project-description").value,
        link: project.querySelector(".project-link").value,
      })
    );

    // Set values to hidden fields
    document.getElementById("workExperienceData").value =
      JSON.stringify(workExperience);
    document.getElementById("educationData").value = JSON.stringify(education);
    document.getElementById("servicesData").value = JSON.stringify(services);
    document.getElementById("skillsData").value = JSON.stringify(skills);
    document.getElementById("projectsData").value = JSON.stringify(projects);

    // Submit the form
    this.submit();
  });

  // Image upload preview
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

  // Book page navigation
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
  };

  // Social links handling
  const socialLinks = document.querySelectorAll(".social-link");
  const socialIcons = document.querySelectorAll(".social-icon");

  socialLinks.forEach((input, index) => {
    input.addEventListener("input", function () {
      const icon = socialIcons[index];
      icon.href = this.value;
    });
  });
});
