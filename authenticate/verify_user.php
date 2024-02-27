<?php
// makes sure the script is only accessed via a POST request otherwise kills the script
if ($_SERVER["REQUEST_METHOD"] != "POST") {
  die("This script can only be accessed via a POST request");
}

$database_host = "dbhost.cs.man.ac.uk";
$database_user = "n23551sf";
$database_pass = "gEKn4ane6N62wovo";
$database_name = "2023_comp10120_cm7";

// check password hash of user
$username = $_POST["username"];
$passwordHash = $_POST["passwordHash"];

try {
  $conn = new mysqli($database_host, $database_user, $database_pass, $database_name);
} catch (PDOException $e) {
  die("Connection to database failed: " . $e->getMessage());
}

$sql = "SELECT PasswordHash FROM User WHERE Username = '$username'";
$result = $conn->query($sql);

echo $result->fetch_assoc()["PasswordHash"] == $passwordHash ? "true" : "false";
/*
if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc(); // store the first row
    if ($row["PasswordHash"] == $passwordHash) {
        echo "true";
    }
} else {
    echo("server error?")
    echo $conn->error;
    throw new Exception("No rows found");
}
*/
