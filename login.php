<?php
// Check if POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die("Error 405: Method not allowed. Please submit the form.");
}

// Database connection
$servername = "48.222.11.29";
$username = "example_user";
$password = "h!JmM3Sygu9Sj!J";
$dbname = "knn";

echo "Attempting to connect to database...<br>";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

echo "Connected successfully!<br>";

// Get form data
if (!isset($_POST['lietotajv']) || !isset($_POST['parole'])) {
    die("Error: Missing form data.");
}

$lietotajv = $_POST['lietotajv'];
$parole = $_POST['parole'];

echo "Processing login for user: " . htmlspecialchars($lietotajv) . "<br>";

// Check if user exists in database
$sql = "SELECT id FROM lietotajs WHERE lietotajv = '$lietotajv' AND parole = '$parole'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // User found - redirect to inventory page
    header("Location: inventars.php");
    exit();
} else {
    // User not found - show error and redirect back
    echo "<script>
        alert('Nepareizs lietotājvārds vai parole!');
        window.location.href = 'index.html';
    </script>";
}

$conn->close();
?>
