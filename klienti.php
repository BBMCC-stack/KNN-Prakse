<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "knn";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="styles.css">
<title>Klientu pārvaldības sistēma</title>
<meta charset="UTF-8">

</head>
<body class="klienti-page">
<header>
    <h1>Klientu pārvaldības sistēma</h1>
</header>

<div class="augseja-sadala">
    <button onclick="location.href='inventars.php'" class="button button1">Inventārs</button>
    <button class="button button1">Klienti</button>
    <button class="button button1">Filtrēšana</button>

    <div class="meklesana">
        <input type="text" id="searchInput" placeholder="Meklēt...">
    </div>


    <div class="lejas-sadala">
        <button class="button button3" id="openFormBtn">Pievienot klientu</button>
    </div>

    <table id="klientuTable">
        <tr>
            <th>Vārds</th>
            <th>Adrese</th>
            <th>Telefons</th>
            <th>E-pasts</th>
            <th>Īres sāk. dat.</th>
            <th>Īres beig. dat.</th>
            <th>Darbības</th>
        </tr>
        <?php
        $sql = "SELECT id, kl_nosi, adrese, tel, e_pasts, ir_sak, ir_beig 
                FROM klienti 
                ORDER BY id DESC";
        
        $result = $conn->query($sql);
        
        if ($result && $result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                echo "<tr data-id='" . $row['id'] . "'>";
                echo "<td>" . htmlspecialchars($row['kl_nosi']) . "</td>";
                echo "<td>" . htmlspecialchars($row['adrese']) . "</td>";
                echo "<td>" . htmlspecialchars($row['tel']) . "</td>";
                echo "<td>" . htmlspecialchars($row['e_pasts']) . "</td>";
                echo "<td>" . htmlspecialchars($row['ir_sak']) . "</td>";
                echo "<td>" . htmlspecialchars($row['ir_beig']) . "</td>";
                echo "<td><button class='button button3 edit-btn' style='padding: 8px 16px; font-size: 14px;'>✎</button></td>";
                echo "</tr>";
            }
        }
        ?>
    </table>

<div id="sidePanel" class="side-panel">
    <div class="panel-content">
        <h2>Pievienot klientu</h2>
        
        <input type="hidden" id="edit_id" value="">

        <label>Klienta vārds</label>
        <input type="text" id="vards" placeholder="Vārds/Nosaukums">

        <label>Klienta adrese</label>
        <input type="text" id="adrese" placeholder="Klienta adrese">

        <label>Klienta telefona nr</label>
        <input type="text" id="telefons" placeholder="Telefona nr">

        <label>Klienta e-pasts</label>
        <input type="text" id="epasts" placeholder="E-pasts">

        <label>Īres sākuma datums</label>
        <input type="date" id="irsakdat" placeholder="Īres sākuma datums">
        
        <label>Īres beigu datums</label>
        <input type="date" id="irbeigdat" placeholder="Īres beigu datums">

        <div class="panel-buttons">
            <button class="button button1" id="saveBtn">Saglabāt</button>
            <button class="button button3" id="closeFormBtn">Atcelt</button>
        </div>
    </div>
</div>

<div id="filterPanel" class="side-panel">
    <div class="panel-content">
        <h2>Filtrēšana</h2>

        <label>Klienta vārds</label>
        <input type="text" id="filterVards" placeholder="Vārds/Nosaukums">

        <label>Klienta adrese</label>
        <input type="text" id="filterAdrese" placeholder="Klienta adrese">

        <label>Klienta telefona nr</label>
        <input type="text" id="filterTelefons" placeholder="Telefona nr">

        <label>Klienta e-pasts</label>
        <input type="text" id="filterEpasts" placeholder="E-pasts">

        <label>Īres sākuma datums</label>
        <input type="date" id="filterIrsakdat" placeholder="Īres sākuma datums">
        
        <label>Īres beigu datums</label>
        <input type="date" id="filterIrbeigdat" placeholder="Īres beigu datums">

        <div class="panel-buttons">
            <button class="button button1" id="applyFilterBtn">Filtrēt</button>
            <button class="button button3" id="closeFilterBtn">Atcelt</button>
            <button class="button button1" id="clearFilterBtn">Notīrīt filtru</button>
        </div>
    </div>
</div>
<script src="klscript.js?v=<?php echo time(); ?>"></script>
</body>
</html>
<?php
$conn->close();
?>
