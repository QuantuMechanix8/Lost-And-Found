<?php
// gets the userID sent to the script from the form
$username = $_POST["username"];

// Info needed to access database
$database_host = "dbhost.cs.man.ac.uk";
$database_user = "n23551sf"; // use own username
$database_pass = "gEKn4ane6N62wovo"; // use own password
$database_name = "2023_comp10120_cm7";

$conn = new mysqli($database_host, $database_user, $database_pass, $database_name);

if (!$conn) {
    die("Connection failed: " . $conn->connect_error);
}

// Find the UserID for the user and store as $result
$sql = "SELECT UserID FROM User WHERE Username = '$username'";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc(); // store the first row
    $userID = $row["UserID"];
    $SESSION_LENGTH = 1800; // 30 minutes
    setcookie("userID", $userID, time() + $SESSION_LENGTH, "/"); // add cookie to remember UserID
    echo $row["UserID"];
} else {
    // if no rows are found throw an error - not optimal but will do for now
    echo $conn->error;
    throw new Exception("No rows found");
}
$conn->close();
?>