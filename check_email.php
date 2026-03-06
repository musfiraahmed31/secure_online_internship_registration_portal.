<?php
header('Content-Type: application/json');
require_once 'db_connect.php';

if (isset($_GET['email'])) {
    $email = trim($_GET['email']);
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['error' => 'Invalid email format']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM students WHERE email = :email");
        $stmt->execute([':email' => $email]);
        $count = $stmt->fetchColumn();
        echo json_encode(['exists' => $count > 0]);
    } catch(PDOException $e) {
        echo json_encode(['error' => 'Database query failed']);
    }
} else {
    echo json_encode(['error' => 'No email provided']);
}
?>
