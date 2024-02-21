<?php






function getPlaces() {
    $database_host = "dbhost.cs.man.ac.uk";
    $database_user = "j22352sa";
    $database_pass = "<the password you set>";
    $database_name = "2023_comp10120_cm7";
    $conn = new mysqli($database_host,$database_user, $database_pass, $database_name);
    if($conn->connect_error){
        die("Connection failed ".$conn->connect_error);
    }

    $sqlGetPlaces = "SELECT Name,Location FROM Place";
    $result = $conn->query($sqlGetPlaces);

}



?>