<?php
$servername = "localhost";
$username = "example_user";
$password = "h!JmM3Sygu9Sj!J";
$dbname = "knn";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'error' => 'Connection failed']));
}

$conn->set_charset("utf8");

$action = $_POST['action'] ?? '';

if ($action == 'add') {
    $modelis = $conn->real_escape_string($_POST['modelis']);
    $mac = $conn->real_escape_string($_POST['mac']);
    $statuss = intval($_POST['statuss']);
    $vieta = $conn->real_escape_string($_POST['vieta']);
    $klients = $conn->real_escape_string($_POST['klients'] ?? '');
    
    $sql = "INSERT INTO inventars (liet_id, mod_nos, mac, statuss, atr_viet, kl_id) 
            VALUES (1, '$modelis', '$mac', $statuss, '$vieta', '$klients')";
    
    if ($conn->query($sql) === TRUE) {
        $new_id = $conn->insert_id;
        $status_text = ($statuss == 0) ? 'Pieejams' : (($statuss == 1) ? 'Izīrēts' : 'Norakstīts');
        
        echo json_encode([
            'success' => true,
            'id' => $new_id,
            'modelis' => $modelis,
            'mac' => $mac,
            'statuss' => $status_text,
            'statuss_num' => $statuss,
            'vieta' => $vieta,
            'klients' => $klients
        ]);
    } else {
        echo json_encode(['success' => false, 'error' => $conn->error]);
    }
    
} elseif ($action == 'update') {
    $id = intval($_POST['id']);
    $modelis = $conn->real_escape_string($_POST['modelis']);
    $mac = $conn->real_escape_string($_POST['mac']);
    $statuss = intval($_POST['statuss']);
    $vieta = $conn->real_escape_string($_POST['vieta']);
    $klients = $conn->real_escape_string($_POST['klients'] ?? '');
    
    $sql = "UPDATE inventars SET mod_nos='$modelis', mac='$mac', statuss=$statuss, atr_viet='$vieta', kl_id='$klients' 
            WHERE id=$id";
    
    if ($conn->query($sql) === TRUE) {
        $status_text = ($statuss == 0) ? 'Pieejams' : (($statuss == 1) ? 'Izīrēts' : 'Norakstīts');
        
        echo json_encode([
            'success' => true,
            'modelis' => $modelis,
            'mac' => $mac,
            'statuss' => $status_text,
            'statuss_num' => $statuss,
            'vieta' => $vieta,
            'klients' => $klients
        ]);
    } else {
        echo json_encode(['success' => false, 'error' => $conn->error]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid action']);
}

$conn->close();
?>


