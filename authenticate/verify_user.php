<?php
session_start();
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
// select statement is case insensitive
$result = $conn->query($sql);

// if result is empty return false
if ($result->num_rows == 0) {
  echo false;
  die();
}

$valid_login = $result->fetch_assoc()["PasswordHash"] == $passwordHash ? true : false;
$SESSION_LENGTH = 1800; // 30 minutes
$logoutTime = time() + $SESSION_LENGTH;

// add user and logout time to session
if ($valid_login) {
  $_SESSION[$username] = true; // add user to session
  $_SESSION[$username . "logoutTime"] = $logoutTime; // add logout time to session
  setcookie("username", $username, $logoutTime, "/"); // add cookie to remember user
}
echo $valid_login;
