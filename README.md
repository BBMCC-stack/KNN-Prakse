# KNN inventāra un klientu ievadīšanas sistēma

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

---

##  KNN sistēmas instalācijas pamācība uz Azure Linux Ubuntu 22.04 virtuālās mašīnas

### 1.1. Pieslēgšanās Azure portālam

Atver https://portal.azure.com

Pieslēdzies ar savu Microsoft kontu.

### 1.2. Jaunas virtuālās mašīnas izveide

Kreisajā izvēlnē izvēlies "Virtual Machines".

Spied "Create" → "Azure Virtual Machine".

Aizpildi laukus:  
Resource Group – izveido jaunu vai izvēlies esošu.  
VM Name – piemēram, knn-server.  
Region – izvēlies tuvāko reģionu.  
Image – Ubuntu Server 22.04 LTS.  
Size – pietiek ar B1s vai B2s.  
Authentication type – izvēlies:  
Password (vienkāršāk)  
Izveido lietotāju:  
Username: admin  
Password: (stipra parole)  
Spied Next: Disks, atstāj pēc noklusējuma.  
Spied Next: Networking un pārliecinies, ka:  
NIC firewall: SSH (22) ir atvērts  
vēlāk pievienosim arī HTTP (80) un HTTPS (443)  
Spied Review + Create, un tad Create.  
VM izveide aizņem ~1 minūti.

### 2. Pieslēgšanās VM caur SSH

Pēc izveides:

1. Atver savu VM Azure portālā.  
2. Skaties Public IP Address.  
3. Windows komandā/PowerShell ievadi: ssh admin@YOUR_PUBLIC_IP  
Ja tiek jautāts — apstiprini yes.

### 3. Sistēmas atjaunināšana un sagatavošana

Palaid: sudo apt update && sudo apt upgrade -y

### 4. Apache Web servera instalēšana

sudo apt install apache2 -y

Pārbaude pārlūkā: http://TAVS_PUBLIC_IP  
Jāparādās Apache Default Page.

### 5. PHP instalēšana

KNN sistēmai nepieciešams PHP + papildu moduļi:  
sudo apt install php php-mysql php-cli php-curl php-xml php-mbstring -y

Pārbaude: php -v

### 6. MySQL servera instalēšana

Instalē MySQL: sudo apt install mysql-server -y

Drošības konfigurācija: sudo mysql_secure_installation

### 7. Datubāzes izveide KNN sistēmai

Ieej MySQL konsolē: sudo mysql  
Izveido DB: CREATE DATABASE knn;  

### 8. Tabulu izveide datubāzē "knn"

Iekopē visu šo kodu lai izveidotu nepieciešamās tabulas:  
----------------------------------------------------------------  
USE knn;

CREATE TABLE lietotaji (  
    id INT(11) AUTO_INCREMENT PRIMARY KEY,  
    lietotajv VARCHAR(20) DEFAULT NULL COMMENT 'lietotājvārds',  
    parole VARCHAR(20) DEFAULT NULL COMMENT 'lietotāja parole'  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE klienti (  
    id INT(11) AUTO_INCREMENT PRIMARY KEY,  
    kl_nosi VARCHAR(30) DEFAULT NULL COMMENT 'klienta nosaukums',  
    adrese VARCHAR(100) DEFAULT NULL,  
    tel VARCHAR(20) DEFAULT NULL,  
    e_pasts VARCHAR(50) DEFAULT NULL,  
    ir_sak DATE DEFAULT NULL COMMENT 'īres sākums',  
    ir_beig DATE DEFAULT NULL COMMENT 'īres beigas'  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE inventars (  
    id INT(11) AUTO_INCREMENT PRIMARY KEY COMMENT 'inventāra id',  
    liet_id INT(11) DEFAULT NULL COMMENT 'lietotāja id',  
    mod_nos VARCHAR(20) DEFAULT NULL COMMENT 'modeļa nosaukums',  
    mac VARCHAR(20) DEFAULT NULL COMMENT 'MAC adrese',  
    statuss SMALLINT(6) DEFAULT NULL COMMENT 'pieejamības statuss',  
    atr_viet VARCHAR(50) DEFAULT NULL COMMENT 'atrašanās vieta',  
    kl_id VARCHAR(30) DEFAULT NULL COMMENT 'klienta id'  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-----------------------------------------------------------------------

pēctam uzraksti: exit

### 9. Apache direktorijas sagatavošana projektam

Pārejam uz web servera mapi: cd /var/www/html  

Izdzēšam noklusējuma index failu: sudo rm index.html

### Ja izmanto Git (ieteicams):

sudo apt install git -y  
sudo git clone https://github.com/BBMCC-stack/KNN-Prakse.git 
sudo mv knn/* /var/www/html/  

Piešķir Apache tiesības:  
sudo chown -R www-data:www-data /var/www/html  
sudo chmod -R 755 /var/www/html

### 10. PHP–MySQL savienojuma konfigurācija

Failos:  
save_klienti.php  
save_inventars.php  
login.php

jāiestata:
$servername = "localhost";  
$username = "root";  
$password = "TAVA_PAROLE";  
$dbname = "knn";

### 11. Ugunsmūra atļauju konfigurēšana

Atver HTTP un HTTPS portus:  
sudo ufw allow 'Apache'  
sudo ufw allow 22  
sudo ufw enable

### 12. Apache restartēšana

sudo systemctl restart apache2

### 13. Projekta palaišana

Atver pārlūkā: http://TAVS_PUBLIC_IP
