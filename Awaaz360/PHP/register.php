<?php
// Database connection details
$servername = "localhost";
$username = "root";//default username for MySQL
$password = "";
$dbname = "awaaz360"; 

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form data is received
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Collect and sanitize input data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $gender = $_POST['gender'];
    $age = $_POST['age'];
    $mobile = $_POST['mobile'];
    $aadhaar = $_POST['aadhaar'];
    $role = $_POST['role'];
    $village = $_POST['village'];
    $ward = $_POST['ward'];
    $district = $_POST['district'];
    $state = $_POST['state'];
    $pincode = $_POST['pincode'];
    $address = $_POST['address'];

    // Insert into database
    $sql = "INSERT INTO users (name, email, gender, age, mobile, aadhaar, role, village, ward, district, state, pincode, address)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssisssssssss", $name, $email, $gender, $age, $mobile, $aadhaar, $role, $village, $ward, $district, $state, $pincode, $address);

    if ($stmt->execute()) {
        echo "Registration successful!";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
} else {
    echo "Please fill out the form!";
}

$conn->close();
?>
