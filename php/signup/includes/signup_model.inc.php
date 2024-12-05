<?php

declare(strict_types=1);
require 'dbh.inc.php';

function get_username(object $pdo, string $username)
{
    $query = "SElect username from users where username = :username;";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":username", $username);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    return $result;
}


function get_email(object $pdo, string $email)
{
    $query = "Select email from users where email = :email";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":email", $email);

    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    return $result;
}
function create_user(object $pdo, string $username, string $email, string $password)
{
    $query = "Insert into users (username, password, email) values (:username, :password, :email);";
    $stmt = $pdo->prepare($query);

    $options = ['cost' => 12];
    $hashed_password = password_hash($password, PASSWORD_BCRYPT, $options);

    $stmt->bindParam(":username", $username);
    $stmt->bindParam(":email", $email);
    $stmt->bindParam(":password", $hashed_password);

    $stmt->execute();
}
