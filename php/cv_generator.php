<?php
require_once('cv_generator.inc.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $cvGenerator = new CVGenerator();

    $data = [
        'profile_image' => $_POST['profile_image'] ?? '',
        'fullname' => $_POST['fullName'] ?? '',
        'jobTitle' => $_POST['jobTitle'] ?? '',
        'introduction' => $_POST['introduction'] ?? '',
        'social_media' => [
            'github' => $_POST['github-link'] ?? '',
            'linkedin' => $_POST['linkedin-link'] ?? '',
            'gmail' => $_POST['gmail-link'] ?? '',
            'docker' => $_POST['docker-link'] ?? ''
        ],
        'workExperience' => json_decode($_POST['workExperienceData'] ?? '[]', true),
        'education' => json_decode($_POST['educationData'] ?? '[]', true),
        'services' => json_decode($_POST['servicesData'] ?? '[]', true),
        'skills' => json_decode($_POST['skillsData'] ?? '[]', true),
        'projects' => json_decode($_POST['projectsData'] ?? '[]', true)
    ];

    $cvGenerator->generatePDF($data);
}
// Handle non-POST requests
else {
    header('Location: cv_form.php');
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CV Generator</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
        }

        .form-container {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .form-section {
            margin-bottom: 20px;
        }

        .form-section h2 {
            margin-bottom: 10px;
            color: #333;
        }

        .form-group {
            margin-bottom: 15px;
        }

        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }

        input[type="text"],
        input[type="email"],
        input[type="url"],
        textarea {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
        }

        textarea {
            height: 100px;
            resize: vertical;
        }

        button {
            background: #007bff;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }

        button:hover {
            background: #0056b3;
        }

        .error {
            color: red;
            margin-bottom: 10px;
        }
    </style>
</head>

<body>
    <div class="form-container">
        <h1>CV Generator</h1>

        <?php if (isset($error)): ?>
            <div class="error"><?php echo htmlspecialchars($error); ?></div>
        <?php endif; ?>

        <form method="POST" action="">
            <!-- Personal Information Section -->
            <div class="form-section">
                <h2>Personal Information</h2>

                <div class="form-group">
                    <label for="profile_image">Profile Image URL:</label>
                    <input type="url" id="profile_image" name="profile_image" required>
                </div>

                <div class="form-group">
                    <label for="fullname">Full Name:</label>
                    <input type="text" id="fullname" name="fullname" required>
                </div>

                <div class="form-group">
                    <label for="jobTitle">Job Title:</label>
                    <input type="text" id="jobTitle" name="jobTitle" required>
                </div>

                <div class="form-group">
                    <label for="introduction">Introduction:</label>
                    <textarea id="introduction" name="introduction" required></textarea>
                </div>
            </div>

            <!-- Social Media Section -->
            <div class="form-section">
                <h2>Social Media Links</h2>

                <div class="form-group">
                    <label for="github">GitHub Profile:</label>
                    <input type="url" id="github" name="github">
                </div>

                <div class="form-group">
                    <label for="linkedin">LinkedIn Profile:</label>
                    <input type="url" id="linkedin" name="linkedin">
                </div>

                <div class="form-group">
                    <label for="gmail">Email Address:</label>
                    <input type="email" id="gmail" name="gmail">
                </div>

                <div class="form-group">
                    <label for="docker">Docker Profile:</label>
                    <input type="url" id="docker" name="docker">
                </div>
            </div>

            <!-- Work Experience Section -->
            <div class="form-section">
                <h2>Work Experience</h2>
                <div class="form-group">
                    <label for="workExperience">Work Experience (HTML format):</label>
                    <textarea id="workExperience" name="workExperience"></textarea>
                </div>
            </div>

            <!-- Education Section -->
            <div class="form-section">
                <h2>Education</h2>
                <div class="form-group">
                    <label for="education">Education (HTML format):</label>
                    <textarea id="education" name="education"></textarea>
                </div>
            </div>

            <!-- Services Section -->
            <div class="form-section">
                <h2>Services</h2>
                <div class="form-group">
                    <label for="services">Services (HTML format):</label>
                    <textarea id="services" name="services"></textarea>
                </div>
            </div>

            <!-- Skills Section -->
            <div class="form-section">
                <h2>Skills</h2>
                <div class="form-group">
                    <label for="skills">Skills (HTML format):</label>
                    <textarea id="skills" name="skills"></textarea>
                </div>
            </div>

            <!-- Projects Section -->
            <div class="form-section">
                <h2>Projects</h2>
                <div class="form-group">
                    <label for="projects">Projects (HTML format):</label>
                    <textarea id="projects" name="projects"></textarea>
                </div>
            </div>

            <button type="submit">Generate PDF CV</button>
        </form>
    </div>
</body>

</html>