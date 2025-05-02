<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "awaaz360";

// Create DB connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check DB connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch POST values
$role = $_POST['role'] ?? null;
$email = $_POST['email'] ?? null;
$aadhaar = $_POST['aadhaar'] ?? null;

if ($role && $email && $aadhaar) {
    $sql = "SELECT * FROM users WHERE role='$role' AND email='$email' AND aadhaar='$aadhaar'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        if ($role == "villager") {
            header("Location: ../HTML/dashboard.html");
        } else {
            header("Location: ../HTML/dashboard1.html");
        }
        exit();
    } else {
        echo "Invalid credentials or role!";
    }
} else {
    echo "Please fill in all fields!";
}

$conn->close();
?>
