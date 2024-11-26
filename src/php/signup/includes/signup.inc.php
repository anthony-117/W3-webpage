<?php

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $username = $_POST["username"];
    $pwd = $_POST["pwd"];
    $email = strtolower($_POST["email"]);

    try {
        require_once 'dbh.inc.php';

        require_once 'signup_model.inc.php';
        require_once 'signup_controller.inc.php';
        require_once 'signup_view.inc.php';

        // ERRORS HANDLERS

        $errors = [];

        if (is_empty_input($username, $pwd, $email)) {
            $errors["empty_inputs"] = "Fill in all fields";
        }
        if (is_invalid_email($email)) {
            $errors["invalid_email"] = "Invalid Email";
        }
        if (is_registered_email($pdo, $email)) {
            $errors["email_used"] = "The Email is in use";
        }


        require 'config_session.inc.php';

        if ($errors) {
            $_SESSION["errors_signup"] = $errors;
            echo "Eroor";
            header('Location: ../index.php');
            die();
        }
        header('Location: ../schedule.php');



        create_user($pdo, $username, $email, $pwd);


        $pdo = null;
        $stmt = null;
    } catch (Exception $e) {
        die("Query has failed: " . $e->getMessage());
    }
} else {
    header("Location: ../index.php");
    die();
}
