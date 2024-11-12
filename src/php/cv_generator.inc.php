<?php
class CVGenerator
{
    private $content;

    public function generatePDF($data)
    {
        require_once('vendor/tecnickcom/tcpdf/tcpdf.php');

        // Sanitize and validate input data
        $this->content = $this->sanitizeData($data);

        // Create HTML content
        $html = $this->getPDFStyles();
        $html .= $this->createPDFTemplate($this->content);

        // Create new PDF document
        $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

        // Set document information
        $pdf->SetCreator(PDF_CREATOR);
        $pdf->SetAuthor($this->content['fullName']);
        $pdf->SetTitle($this->content['fullName'] . ' - CV');

        // Remove default header/footer
        $pdf->setPrintHeader(false);
        $pdf->setPrintFooter(false);

        // Set margins
        $pdf->SetMargins(15, 15, 15);

        // Add a page
        $pdf->AddPage();

        // Write HTML content
        $pdf->writeHTML($html, true, false, true, false, '');

        // Close and output PDF document
        $pdf->Output($this->content['fullName'] . '_CV.pdf', 'D');
    }

    private function sanitizeData($data)
    {
        return [
            'fullName' => htmlspecialchars($data['fullname'] ?? ''),
            'jobTitle' => htmlspecialchars($data['jobTitle'] ?? ''),
            'introduction' => htmlspecialchars($data['introduction'] ?? ''),
            'imageSrc' => filter_var($data['profile_image'] ?? '', FILTER_SANITIZE_URL),
            'social_media' => [
                'github' => filter_var($data['social_media']['github'] ?? '#', FILTER_SANITIZE_URL),
                'linkedin' => filter_var($data['social_media']['linkedin'] ?? '#', FILTER_SANITIZE_URL),
                'gmail' => filter_var($data['social_media']['gmail'] ?? '#', FILTER_SANITIZE_EMAIL),
                'docker' => filter_var($data['social_media']['docker'] ?? '#', FILTER_SANITIZE_URL)
            ],
            'workExperience' => $this->sanitizeHTML($data['workExperience'] ?? ''),
            'education' => $this->sanitizeHTML($data['education'] ?? ''),
            'services' => $this->sanitizeHTML($data['services'] ?? ''),
            'skills' => $this->sanitizeHTML($data['skills'] ?? ''),
            'projects' => $this->sanitizeHTML($data['projects'] ?? '')
        ];
    }

    private function sanitizeHTML($html)
    {
        if (is_array($html)) {
            // Recursively apply htmlspecialchars to each array element
            return array_map([$this, 'sanitizeHTML'], $html);
        } elseif (is_string($html)) {
            return htmlspecialchars($html, ENT_QUOTES, 'UTF-8');
        }
        // Return non-string, non-array data unchanged
        return $html;
    }

    private function getPDFStyles()
    {
        return "
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                }
                .page {
                    margin: 0 20px;
                }
                .profile-section {
                    text-align: center;
                    margin-bottom: 30px;
                }
                .profile-section img {
                    max-width: 150px;
                    border-radius: 50%;
                    margin-bottom: 15px;
                }
                .profile-section h1 {
                    color: #333;
                    margin-bottom: 5px;
                }
                .profile-section h3 {
                    color: #666;
                    margin-bottom: 15px;
                }
                .social-links {
                    margin: 20px 0;
                }
                .section {
                    margin-bottom: 20px;
                }
                .section h2 {
                    color: #333;
                    border-bottom: 2px solid #333;
                    padding-bottom: 5px;
                    margin-bottom: 15px;
                }
                .work-item, .education-item, .project-item {
                    margin-bottom: 15px;
                }
                .skills-container {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 15px;
                }
            </style>
        ";
    }

    private function createPDFTemplate($content)
    {
        // Helper function to generate work experience HTML
        $workExperienceHTML = function ($experiences) {
            $html = '';
            foreach ($experiences as $exp) {
                $html .= "
                    <div class='work-item'>
                        <h3>{$exp['position']}</h3>
                        <h4>{$exp['company']} | {$exp['period']}</h4>
                        <p>{$exp['description']}</p>
                    </div>";
            }
            return $html;
        };

        // Helper function to generate education HTML
        $educationHTML = function ($education) {
            $html = '';
            foreach ($education as $edu) {
                $html .= "
                    <div class='education-item'>
                        <h3>{$edu['degree']}</h3>
                        <h4>{$edu['institution']} | {$edu['year']}</h4>
                        <p>{$edu['description']}</p>
                    </div>";
            }
            return $html;
        };

        // Helper function to generate services HTML
        $servicesHTML = function ($services) {
            $html = '';
            foreach ($services as $service) {
                $html .= "
                    <div class='service-item'>
                        <h3>{$service['title']}</h3>
                        <p>{$service['description']}</p>
                    </div>";
            }
            return $html;
        };

        // Helper function to generate skills HTML
        $skillsHTML = function ($skills) {
            $html = '<div class="skills-container">';
            foreach ($skills as $category => $skillList) {
                $html .= "
                    <div class='skill-category'>
                        <h3>{$category}</h3>
                        <ul>";
                foreach ($skillList as $skill) {
                    $html .= "<li>{$skill}</li>";
                }
                $html .= "</ul></div>";
            }
            $html .= '</div>';
            return $html;
        };

        // Helper function to generate projects HTML
        $projectsHTML = function ($projects) {
            $html = '';
            foreach ($projects as $project) {
                $html .= "
                    <div class='project-item'>
                        <h3>{$project['name']}</h3>
                        <p><strong>Technologies:</strong> {$project['technologies']}</p>
                        <p>{$project['description']}</p>
                        " . (isset($project['link']) ? "<p><a href='{$project['link']}'>Project Link</a></p>" : "") . "
                    </div>";
            }
            return $html;
        };

        return "
            <div class='page'>
                <div class='profile-section'>
                    <img src='{$content['imageSrc']}' alt='Profile Photo'>
                    <h1>{$content['fullName']}</h1>
                    <h3>{$content['jobTitle']}</h3>
                    <p>{$content['introduction']}</p>
                    
                    <div class='social-links'>
                        <p>
                            GitHub: {$content['social_media']['github']}<br>
                            LinkedIn: {$content['social_media']['linkedin']}<br>
                            Email: {$content['social_media']['gmail']}<br>
                            Docker: {$content['social_media']['docker']}
                        </p>
                    </div>
                </div>

                <div class='section'>
                    <h2>Work Experience</h2>
                    " . $workExperienceHTML($content['workExperience']) . "
                </div>

                <div class='section'>
                    <h2>Education</h2>
                    " . $educationHTML($content['education']) . "
                </div>

                <div class='section'>
                    <h2>Services</h2>
                    " . $servicesHTML($content['services']) . "
                </div>

                <div class='section'>
                    <h2>Skills</h2>
                    " . $skillsHTML($content['skills']) . "
                </div>

                <div class='section'>
                    <h2>Projects</h2>
                    " . $projectsHTML($content['projects']) . "
                </div>
            </div>
        ";
    }
}
