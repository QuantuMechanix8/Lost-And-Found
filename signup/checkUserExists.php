<?php
session_start();

function userExists($username)
{
    $database_host = "dbhost.cs.man.ac.uk";
    $database_user = "j35393lo";
    $database_pass = "filmclub";
    $database_name = "2023_comp10120_cm7";
    $conn = new mysqli($database_host, $database_user, $database_pass, $database_name);


    $sql = "SELECT * FROM User WHERE Username='" . $username . "'";
    $result = $conn->query($sql);

    if (mysqli_num_rows($result) > 0) {
        return true;
    } else {
        return false;
    }
    $conn->close();
}

$username = $_POST["username"];
echo userExists($username);
