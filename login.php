<?php
// Database connection
$servername = "48.222.11.29";
$username = "example_user";
$password = "h!JmM3Sygu9Sj!J";
$dbname = "knn";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$lietotajv = $_POST['lietotajv'];
$parole = $_POST['parole'];

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

