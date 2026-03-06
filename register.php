<?php
require_once 'db_connect.php';
require_once 'upload_resume.php'; 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $student_id = trim($_POST['student_id']);
    $full_name = htmlspecialchars(trim($_POST['full_name']), ENT_QUOTES, 'UTF-8');
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $pass = $_POST['password'];
    $cnic = trim($_POST['cnic']);
    $phone = trim($_POST['phone']);
    $cgpa = floatval($_POST['cgpa']);
    $department = htmlspecialchars(trim($_POST['department']), ENT_QUOTES, 'UTF-8');

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) die("Invalid Email Format.");
    if ($cgpa < 0.00 || $cgpa > 4.00) die("CGPA must be between 0.00 and 4.00.");
    if (!preg_match("/^[a-zA-Z]{2}\d{2}-[a-zA-Z]{3}-\d{3}$/", $student_id)) die("Invalid Student ID.");
    if (!preg_match("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/", $pass)) die("Password does not meet strength requirements.");
    if (!preg_match("/^\d{5}-\d{7}-\d{1}$/", $cnic)) die("Invalid CNIC.");
    if (!preg_match("/^03\d{9}$/", $phone)) die("Invalid Phone.");

    $resume_path = process_resume_upload($_FILES['resume']);
    $hashed_password = password_hash($pass, PASSWORD_BCRYPT);

    try {
        $sql = "INSERT INTO students 
                (student_id, full_name, email, password, cnic, phone, cgpa, department, resume_path) 
                VALUES (:student_id, :full_name, :email, :password, :cnic, :phone, :cgpa, :department, :resume_path)";
        
        $stmt = $pdo->prepare($sql);
        
        $stmt->execute([
            ':student_id' => $student_id,
            ':full_name' => $full_name,
            ':email' => $email,
            ':password' => $hashed_password,
            ':cnic' => $cnic,
            ':phone' => $phone,
            ':cgpa' => $cgpa,
            ':department' => $department,
            ':resume_path' => $resume_path
        ]);

        echo "<div style='text-align:center; padding-top: 50px; font-family: sans-serif;'>";
        echo "<h2 style='color: green;'>Registration Successful!</h2>";
        echo "<a href='index.html' style='text-decoration: none; padding: 10px 20px; background: #0056b3; color: white; border-radius: 5px;'>Go Back</a>";
        echo "</div>";
        
    } catch(PDOException $e) {
        if ($e->getCode() == 23000) {
            die("<h2 style='color: red; text-align:center;'>Error: Student ID, Email, or CNIC is already registered.</h2>");
        }
        die("Database error occurred during registration.");
    }
} else {
    header("Location: index.html");
    exit();
}
?>
