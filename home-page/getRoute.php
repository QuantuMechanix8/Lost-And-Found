<?php

$database_host = "dbhost.cs.man.ac.uk";
$database_user = "x24185cl"; 
$database_pass = "dD1!dD1!"; 
$database_name = "2023_comp10120_cm7";

$conn = new mysqli($database_host, $database_user, $database_pass, $database_name);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$searchCriteria = $_POST['searchCriteria']; 
$sql = "SELECT * FROM Route WHERE RouteDesc LIKE ? OR UserID = ? OR TagID = ?";

$stmt = $conn->prepare($sql);
$searchPattern = "%" . $searchCriteria . "%";
$stmt->bind_param("sis", $searchPattern, $searchCriteria, $searchCriteria); // s for string, i for integer

if ($stmt->execute()) {
    $result = $stmt->get_result();
    $routes = [];
    while ($row = $result->fetch_assoc()) {
        $routes[] = $row;
    }
    // Output the routes as JSON
    echo json_encode($routes);
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
