# KNN Inventory & Client Management System

KNN ir tīmekļa lietotne, kas ļauj pievienot, rediģēt, filtrēt un pārvaldīt uzņēmuma inventāru un klientu informāciju. Projekts izstrādāts, izmantojot PHP, MySQL, HTML, CSS un JavaScript. Šajā README aprakstīts, kā lokāli uzstādīt un palaist projektu.

---

##  Instalācija lokāli

### 1. Lejupielādē vai noklonē projektu

git clone (https://github.com/BBMCC-stack/KNN-Prakse.git)

### 2. Izvieto projektu servera mapē

Ja izmanto XAMPP: C:/xampp/htdocs/knn

### 3. Startē Apache un MySQL

Atver XAMPP Control Panel → Start Apache un MySQL.

### 4. Izveido datubāzi

Atver phpMyAdmin: (http://localhost/phpmyadmin)
Izveido datubāzi: knn

### 5. Izpildi SQL tabulu izveides komandas

Tabula: klienti

CREATE TABLE klienti (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,  
    kl_nosi VARCHAR(30) DEFAULT NULL COMMENT 'klienta nosaukums',  
    adrese VARCHAR(100) DEFAULT NULL,  
    tel VARCHAR(20) DEFAULT NULL,  
    e_pasts VARCHAR(50) DEFAULT NULL,  
    ir_sak DATE DEFAULT NULL COMMENT 'īres sākums',  
    ir_beig DATE DEFAULT NULL COMMENT 'īres beigas'  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

Tabula: inventars

CREATE TABLE inventars (  
    id INT(11) AUTO_INCREMENT PRIMARY KEY COMMENT 'inventāra id',  
    liet_id INT(11) DEFAULT NULL COMMENT 'lietotāja id',  
    mod_nos VARCHAR(20) DEFAULT NULL COMMENT 'modeļa nosaukums',  
    mac VARCHAR(20) DEFAULT NULL COMMENT 'MAC adrese',  
    statuss SMALLINT(6) DEFAULT NULL COMMENT 'pieejamības statuss',  
    atr_viet VARCHAR(50) DEFAULT NULL COMMENT 'atrašanās vieta',  
    kl_id VARCHAR(30) DEFAULT NULL COMMENT 'klienta id'  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

tabula: lietotājs

CREATE TABLE lietotaji (  
    id INT(11) AUTO_INCREMENT PRIMARY KEY,  
    lietotajv VARCHAR(20) DEFAULT NULL COMMENT 'lietotājvārds',  
    parole VARCHAR(20) DEFAULT NULL COMMENT 'lietotāja parole'  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;  

### 6. Konfigurē PHP datubāzes pieslēgumu

Failos save_klienti.php un save_inventars.php iestati:

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "knn";

### 7. Palaid projektu

Atver pārlūkā:(http://localhost/knn)
