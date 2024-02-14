<?php

$database_host = "dbhost.cs.man.ac.uk";
$database_user = "j35393lo";
$database_pass = "filmclub";
$database_name = "2023_comp10120_cm7";

$username = $_POST["username"];
$passwordHash = $_POST["passwordHash"];
$email = $_POST["email"];
$userID = $_POST["userID"];
$salt = $_POST["salt"];

$conn = new mysqli($database_host, $database_user, $database_pass, $database_name);

if (!$conn) {
	die("Connection failed: " . $conn->connect_error);
}
echo ("Connected Successfully<br>");

$sql = "INSERT INTO User (Username, PasswordHash, Email, UserID, Salt)
VALUES ('" . $username . "', '" . $passwordHash . "', '" . $email . "', " . $userID . ", '" . $salt . "')";
$result = $conn->query($sql);

if ($result == TRUE) {
  echo "New record created successfully";
} else {
  echo "Error record not created";
}

$conn->close();

?>