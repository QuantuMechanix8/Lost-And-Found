<?php
    $database_host = "dbhost.cs.man.ac.uk";
    $database_user = "j22352sa";
    $database_pass = "cooldatabasepassword";
    $database_name = "2023_comp10120_cm7";

    $conn = new mysqli($database_host,$database_user,$database_pass,$database_name);

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    
    echo ("Connected Successfully<br>");

    function make_id(mysqli $conn) {
        /**
         * This function makes ids. Provide the connection to the database and it returns a unique id, unless every id is already taken. (DO NOT USE IF ALL IDS ARE TAKEN)
         */
    $id_in_use = TRUE;
    while ($id_in_use != FALSE){
        $id = rand(0,99999999);
        $sql = "SELECT PlaceID FROM Place WHERE PlaceID='$id'" ;
        $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) > 0) {
            $id_in_use = TRUE;
        } else {
            $id_in_use = FALSE;
        }
        }
    return $id;
    }

    $id = make_id($conn);
    mysqli_close($conn);
?>