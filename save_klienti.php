<?php
$servername = "localhost";
$username = "example_user";
$password = "h!JmM3Sygu9Sj!J";
$dbname = "knn";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'error' => 'Connection failed: ' . $conn->connect_error]));
}

$action = $_POST['action'] ?? '';

if ($action == 'add') {
    $vards = $conn->real_escape_string($_POST['vards']);
    $adrese = $conn->real_escape_string($_POST['adrese'] ?? '');
    $telefons = $conn->real_escape_string($_POST['telefons'] ?? '');
    $epasts = $conn->real_escape_string($_POST['epasts'] ?? '');
    $irsakdat = $conn->real_escape_string($_POST['irsakdat'] ?? '');
    $irbeigdat = $conn->real_escape_string($_POST['irbeigdat'] ?? '');
    
    $sql = "INSERT INTO klienti (kl_nosi, adrese, tel, e_pasts, ir_sak, ir_beig) 
            VALUES ('$vards', '$adrese', '$telefons', '$epasts', " . 
            ($irsakdat ? "'$irsakdat'" : "NULL") . ", " . 
            ($irbeigdat ? "'$irbeigdat'" : "NULL") . ")";
    
    if ($conn->query($sql) === TRUE) {
        $new_id = $conn->insert_id;
        
        echo json_encode([
            'success' => true,
            'id' => $new_id,
            'vards' => $vards,
            'adrese' => $adrese,
            'telefons' => $telefons,
            'epasts' => $epasts,
            'irsakdat' => $irsakdat,
            'irbeigdat' => $irbeigdat
        ]);
    } else {
        echo json_encode(['success' => false, 'error' => $conn->error]);
    }
    
} elseif ($action == 'update') {
    $id = intval($_POST['id']);
    $vards = $conn->real_escape_string($_POST['vards']);
    $adrese = $conn->real_escape_string($_POST['adrese'] ?? '');
    $telefons = $conn->real_escape_string($_POST['telefons'] ?? '');
    $epasts = $conn->real_escape_string($_POST['epasts'] ?? '');
    $irsakdat = $conn->real_escape_string($_POST['irsakdat'] ?? '');
    $irbeigdat = $conn->real_escape_string($_POST['irbeigdat'] ?? '');
    
    $sql = "UPDATE klienti SET kl_nosi='$vards', adrese='$adrese', tel='$telefons', 
            e_pasts='$epasts', ir_sak=" . ($irsakdat ? "'$irsakdat'" : "NULL") . ", 
            ir_beig=" . ($irbeigdat ? "'$irbeigdat'" : "NULL") . " 
            WHERE id=$id";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode([
            'success' => true,
            'vards' => $vards,
            'adrese' => $adrese,
            'telefons' => $telefons,
            'epasts' => $epasts,
            'irsakdat' => $irsakdat,
            'irbeigdat' => $irbeigdat
        ]);
    } else {
        echo json_encode(['success' => false, 'error' => $conn->error]);
    }
}

$conn->close();
?>


