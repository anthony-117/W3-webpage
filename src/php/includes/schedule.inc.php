<?php
session_start();
require_once 'dbh.inc.php';

// Get database connection
$db = Database::getInstance();
$pdo = $db->getConnection();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        // Validate form data
        if (
            empty($_POST['event_name']) || empty($_POST['event-days']) ||
            empty($_POST['from']) || empty($_POST['to'])
        ) {
            throw new Exception("All required fields must be filled out");
        }

        $name = $_POST['event_name'];
        $days = json_encode($_POST['event-days']);
        $startTime = $_POST['from'];
        $endTime = $_POST['to'];
        $location = $_POST['location'] ?? '';

        if (strtotime($endTime) <= strtotime($startTime)) {
            throw new Exception("End time must be after start time");
        }

        $sql = "INSERT INTO events (name, days, start_time, end_time, location) 
                VALUES (?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$name, $days, $startTime, $endTime, $location]);

        $_SESSION['success_message'] = "Event added successfully!";
        http_response_code(200);
    } catch (Exception $e) {
        $_SESSION['error_message'] = $e->getMessage();
        http_response_code(500);
    }

    // // Redirect back to the calendar page
    // header("Location: ../schedule.php");
    // exit();
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    try {
        $stmt = $pdo->query("SELECT * FROM events");
        $events = $stmt->fetchAll();

        // Transform the data to match your JavaScript format
        $formattedEvents = array_map(function ($event) {
            return [
                'name' => $event['name'],
                'days' => json_decode($event['days']),
                'startTime' => substr($event['start_time'], 0, 5), // Format: HH:mm
                'endTime' => substr($event['end_time'], 0, 5),
                'location' => $event['location']
            ];
        }, $events);

        echo json_encode($formattedEvents);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
    exit();
}
if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    // Parse incoming JSON data
    $data = json_decode(file_get_contents('php://input'), true);

    // Validate event ID
    if (!isset($data['id']) || empty($data['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Event ID is required']);
        exit();
    }

    try {
        // Prepare and execute delete query
        $sql = "DELETE FROM events WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':id' => $data['id']]);

        // Check if any rows were affected
        if ($stmt->rowCount() > 0) {
            http_response_code(200);
            echo json_encode([
                'success' => true,
                'message' => 'Event deleted successfully'
            ]);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Event not found']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
    exit();
}
