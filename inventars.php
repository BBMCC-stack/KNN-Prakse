<?php
// Database connection
$servername = "localhost";
$username = "example_user";
$password = "h!JmM3Sygu9Sj!J";
$dbname = "knn";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$conn->set_charset("utf8");
?>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="styles.css">
<title>Inventara pārvaldības sistēma</title>
<meta charset="UTF-8">
</head>
<body>
<header>
    <h1>Inventāra pārvaldības sistēma</h1>
</header>

<div class="augseja-sadala">
    <button class="button button1">Inventārs</button>
    <button onclick="location.href='klienti.php'" class="button button1">Klienti</button>
    <button class="button button1" id="openFilterBtn">Filtrēšana</button>

    <div class="meklesana">
        <input type="text" id="searchInput" placeholder="Meklēt...">
    </div>

    <div class="statuss">
        <select name="statuss" id="statuss-select">
            <option value="all">Visi statusi</option>
            <option value="0">Pieejams</option>
            <option value="1">Izīrēts</option>
            <option value="2">Norakstīts</option>
        </select>
    </div>

    <div class="lejas-sadala">
        <button class="button button3" id="openFormBtn">Pievienot ierīci</button>
    </div>

    <div id="filterPanel" class="side-panel">
        <div class="panel-content">
            <h2>Filtrēšana</h2>

            <label>Modeļa nosaukums</label>
            <input type="text" id="filterModel" placeholder="Modelis">

            <label>MAC adrese</label>
            <input type="text" id="filterMac" placeholder="MAC adrese">

            <label>Statuss</label>
            <select id="filterStatus">
                <option value="">Visi</option>
                <option value="0">Pieejams</option>
                <option value="1">Izīrēts</option>
                <option value="2">Norakstīts</option>
            </select>
            
            <label>Atrašanās vieta</label>
            <input type="text" id="filterLocation" placeholder="Atrašanās vieta">

            <label>Klients</label>
            <input type="text" id="filterClient" placeholder="Klients">

            <div class="panel-buttons">
                <button class="button button1" id="applyFilterBtn">Filtrēt</button>
                <button class="button button3" id="closeFilterBtn">Atcelt</button>
                <button class="button button1" id="clearFilterBtn">Notīrīt filtru</button>
            </div>
        </div>
    </div>

    <table id="inventoryTable">
        <tr>
            <th>Modelis</th>
            <th>MAC</th>
            <th>Statuss</th>
            <th>Atrašanās vieta</th>
            <th>Klients</th>
            <th></th>
        </tr>
        <?php
        $sql = "SELECT id, mod_nos, mac, statuss, atr_viet, kl_id 
                FROM inventars 
                ORDER BY id DESC";
        
        $result = $conn->query($sql);

        if (!$result) {
            echo "<tr><td colspan='6'>Error: " . $conn->error . "</td></tr>";
        } elseif ($result->num_rows == 0) {
            echo "<tr><td colspan='6'>No data found in inventars table</td></tr>";
        }
        
        if ($result && $result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $status_text = ($row['statuss'] == 0) ? 'Pieejams' : (($row['statuss'] == 1) ? 'Izīrēts' : 'Norakstīts');
                
                echo "<tr data-id='" . $row['id'] . "'>";
                echo "<td>" . htmlspecialchars($row['mod_nos']) . "</td>";
                echo "<td>" . htmlspecialchars($row['mac']) . "</td>";
                echo "<td data-status='" . $row['statuss'] . "'>" . htmlspecialchars($status_text) . "</td>";
                echo "<td>" . htmlspecialchars($row['atr_viet']) . "</td>";
                echo "<td>" . htmlspecialchars($row['kl_id'] ?? '') . "</td>";
                echo "<td><button class='button button3 edit-btn' style='padding: 8px 16px; font-size: 14px;'>✎</button></td>";
                echo "</tr>";
            }
        }
        ?>
    </table>

<div id="sidePanel" class="side-panel">
    <div class="panel-content">
        <h2>Pievienot inventāru</h2>

        <input type="hidden" id="edit_id" value="">

        <label>Modeļa nosaukums</label>
        <input type="text" id="modelis" placeholder="Modelis">

        <label>MAC adrese</label>
        <input type="text" id="mac" placeholder="MAC adrese">

        <label>Statuss</label>
        <select id="statuss">
            <option value="0">Pieejams</option>
            <option value="1">Izīrēts</option>
            <option value="2">Norakstīts</option>
        </select>

        <label>Atrašanās vieta</label>
        <input type="text" id="vieta" placeholder="Atrašanās vieta">

        <label>Klients</label>
        <input type="text" id="klients" placeholder="Klients">

        <div class="panel-buttons">
            <button class="button button1" id="saveBtn">Saglabāt</button>
            <button class="button button3" id="closeFormBtn">Atcelt</button>
        </div>
    </div>
</div>
<script src="script.js"></script>
</body>
</html>
<?php
$conn->close();
?>



