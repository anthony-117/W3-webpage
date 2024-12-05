<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fillable CV Template</title>
    <link rel="stylesheet" href="/src/css/book.css" />
    <link rel="stylesheet" href="/src/css/cv-generator.css" />
    <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
    <link rel="shortcut icon" href="/public/portfolio.png" type="image/x-icon" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" />
    <style>
        .button-90 {
            position: fixed;
            right: 10vw;
            bottom: 10vh;
            color: #fff;
            padding: 15px 25px;
            border-radius: 50%;
            background-color: #4c43cd;
            background-image: radial-gradient(93% 87% at 87% 89%,
                    rgba(0, 0, 0, 0.23) 0%,
                    transparent 86.18%),
                radial-gradient(66% 87% at 26% 20%,
                    rgba(255, 255, 255, 0.41) 0%,
                    rgba(255, 255, 255, 0) 69.79%,
                    rgba(255, 255, 255, 0) 100%);
            box-shadow: 2px 19px 31px rgba(0, 0, 0, 0.2);
            font-weight: bold;
            font-size: 16px;
            border: 0;
            cursor: pointer;
            z-index: 100;
        }

        .input-field {
            width: 100%;
            padding: 5px;
            margin-bottom: 10px;
        }

        .textarea-field {
            width: 100%;
            padding: 5px;
            margin-bottom: 10px;
            height: 100px;
        }

        .message {
            padding: 10px;
            margin: 10px 0;
            border-radius: 5px;
        }

        .success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }

        .error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
    </style>
</head>

<body>

    <a href="#" id="returnButton" class="button-90 btn">
        <i class="bx bx-left-arrow-alt"></i>
    </a>

    <div class="wrapper">
        <div class="cover cover-left"></div>
        <div class="cover cover-right"></div>

        <div class="book">
            <!-- < form method="POST" action="cv_generator.php" enctype="multipart/form-data"> -->
            <form method="POST" action="cv_generator.php">

                <div class="book-page page-left">
                    <div class="profile-page">
                        <div class="image-upload-container">
                            <img src="<?php echo !empty($profileImage) ? $profileImage : '/public/arabic_favicon.png'; ?>"
                                alt="Profile Picture"
                                id="profileImage" />
                            <input type="file"
                                name="imageUpload"
                                id="imageUpload"
                                accept="image/*"
                                style="display: none" />
                            <button type="button"
                                class="upload-button"
                                onclick="document.getElementById('imageUpload').click()">
                                <i class="bx bxs-camera"></i>
                            </button>
                        </div>

                        <input type="text"
                            class="input-field"
                            placeholder="Full Name"
                            name="fullName"
                            id="fullName"
                            required />

                        <input type="text"
                            class="input-field"
                            placeholder="Job Title"
                            name="jobTitle"
                            id="jobTitle"
                            required />

                        <div class="social-media">
                            <div class="social-item">
                                <a href="#" target="_blank" class="social-icon">
                                    <i class="bx bxl-github"></i>
                                </a>
                                <input type="text"
                                    name="github-link"
                                    id="github-link"
                                    class="social-link"
                                    placeholder="GitHub URL"
                                    data-social="github" />
                            </div>
                            <div class="social-item">
                                <a href="#" target="_blank" class="social-icon">
                                    <i class="bx bxl-linkedin-square"></i>
                                </a>
                                <input type="text"
                                    name="linkedin-link"
                                    id="linkedin-link"
                                    class="social-link"
                                    placeholder="LinkedIn URL"
                                    data-social="linkedin" />
                            </div>
                            <div class="social-item">
                                <a href="#" target="_blank" class="social-icon">
                                    <i class="bx bxl-gmail"></i>
                                </a>
                                <input type="text"
                                    name="gmail-link"
                                    id="gmail-link"
                                    class="social-link"
                                    placeholder="Email address"
                                    data-social="gmail" />
                            </div>
                            <div class="social-item">
                                <a href="#" target="_blank" class="social-icon">
                                    <i class="bx bxl-docker"></i>
                                </a>
                                <input type="text"
                                    name="docker-link"
                                    id="docker-link"
                                    class="social-link"
                                    placeholder="Docker URL"
                                    data-social="docker" />
                            </div>
                        </div>

                        <textarea class="textarea-field"
                            placeholder="Write a brief introduction about yourself"
                            name="introduction"
                            id="introduction"
                            required></textarea>

                        <!-- Hidden fields for JSON data -->
                        <input type="hidden" name="workExperienceData" id="workExperienceData" />
                        <input type="hidden" name="educationData" id="educationData" />
                        <input type="hidden" name="servicesData" id="servicesData" />
                        <input type="hidden" name="skillsData" id="skillsData" />
                        <input type="hidden" name="projectsData" id="projectsData" />

                        <div class="btn-box">
                            <!-- <button type="submit" class="btn" id="submit-cv">Submit</button> -->
                            <input type="submit" value="Submit" class="btn" id="submit-cv">
                            <a href="#" class="btn contact-me" id="download-cv" disabled>Contact Me</a>
                        </div>
                    </div>
                </div>

                <!-- Work Experience Page -->
                <div class="book-page page-right turn" id="turn-1">
                    <div class="page-front">
                        <h1 class="title">Work Experience</h1>
                        <div id="workExperience" class="workeduc-box">
                            <!-- Work experience entries will be added here -->
                        </div>
                        <button type="button" id="addWorkExperience" class="add-button">
                            Add Work Experience <i class="bx bx-plus"></i>
                        </button>
                        <span class="number-page">1</span>
                        <span class="nextprev-btn" data-page="turn-1">
                            <i class="bx bx-chevron-right"></i>
                        </span>
                    </div>

                    <!-- Education Page -->
                    <div class="page-back">
                        <h1 class="title">Education</h1>
                        <div id="education" class="workeduc-box">
                            <!-- Education entries will be added here -->
                        </div>
                        <button type="button" id="addEducation" class="add-button">
                            Add Education <i class="bx bx-plus"></i>
                        </button>
                        <span class="number-page">2</span>
                        <span class="nextprev-btn back" data-page="turn-1">
                            <i class="bx bx-chevron-left"></i>
                        </span>
                    </div>
                </div>

                <!-- Services Page -->
                <div class="book-page page-right turn" id="turn-2">
                    <div class="page-front">
                        <h1 class="title">My Services</h1>
                        <div id="services" class="services-box">
                            <!-- Services will be added here -->
                        </div>
                        <button type="button" id="addService" class="add-button">
                            Add Service <i class="bx bx-plus"></i>
                        </button>
                        <span class="number-page">3</span>
                        <span class="nextprev-btn" data-page="turn-2">
                            <i class="bx bx-chevron-right"></i>
                        </span>
                    </div>
                    <div class="page-back">
                        <h1 class="title">My Skills</h1>
                        <div id="skillTopic" class="skill-box">
                            <!-- skills will be added here -->
                        </div>
                        <button type="button" id="addSkillTopic" class="add-button">
                            Add Skill <i class="bx bx-plus"></i>
                        </button>
                        <span class="number-page">4</span>
                        <span class="nextprev-btn back" data-page="turn-2">
                            <i class="bx bx-chevron-left"></i>
                        </span>
                    </div>

                </div>

                <!-- Projects Page -->
                <div class="book-page page-right turn" id="turn-3">
                    <div class="page-front">
                        <h1 class="title">My Projects</h1>
                        <button type="button" id="addProject" class="add-button">
                            Add Project <i class="bx bx-plus"></i>
                        </button>
                        <div id="projectContainer" class="project-container">
                            <!-- Services will be added here -->
                        </div>
                        <span class="number-page">5</span>
                        <span class="nextprev-btn" data-page="turn-3">
                            <i class="bx bx-chevron-right"></i>
                        </span>
                    </div>


                    <div class="page-back">
                        <h1 class="title">Contact Me</h1>

                        <div class="contact-box">
                            <div>
                                <input
                                    type="text"
                                    class="field"
                                    placeholder="Full Name"
                                    required
                                    disabled />
                                <input
                                    type="email"
                                    class="field"
                                    placeholder="Email Address"
                                    required
                                    disabled />
                                <textarea
                                    name=""
                                    id=""
                                    cols="30"
                                    rows="10"
                                    class="field"
                                    placeholder="Subject"
                                    disabled></textarea>
                                <input
                                    type="submit"
                                    value="Send Message"
                                    class="btn"
                                    disabled />
                            </div>
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

            </form>
        </div>
    </div>
    <script type="module" src="/src/js/book.js"></script>
    <script type="module" src="/src/php/generator.js"></script>
</body>

</html>