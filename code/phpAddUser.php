<?php
    $database_host = "dbhost.cs.man.ac.uk";
    $database_user = "j22352sa";
    $database_pass = "cooldatabasepassword";
    $database_name = "2023_comp10120_cm7";


    $usr_email = $_GET["email"];
    $usr_username = $_GET["username"];
    $usr_password = $_GET["password"];

    $conn = new mysqli($database_host,$database_user,$database_pass,$database_name);

    if($conn->connect_error){
        die("Connection failed ".$conn->connect_error);
    }

    $sql = "INSERT INTO Users VALUES ('$usr_username','$usr_password','$usr_email')";


    $conn->query($sql)

    


?>