<?php
$database_host = "dbhost.cs.man.ac.uk";
$database_user = "n23551sf";
$database_pass = "gEKn4ane6N62wovo";
$database_name = "2023_comp10120_cm7";

$conn = new mysqli($database_host, $database_user, $database_pass, $database_name);

// check password hash of user
$username = $_POST["username"];
$passwordHash = $_POST["passwordHash"];

$sql = "SELECT PasswordHash FROM User WHERE Username = '$username'";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc(); // store the first row
    if ($row["PasswordHash"] == $passwordHash) {
        echo "true";
    } else {
        echo "false";
    }
} else {
    echo $conn->error;
    throw new Exception("No rows found");
}
?>