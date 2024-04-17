<?php

$database_host = "dbhost.cs.man.ac.uk";
$database_user = "s89990lo"; // use own username
$database_pass = "Immortal1"; // use own password
$database_name = "2023_comp10120_cm7";

$conn = mysqli_connect($database_host, $database_user, $database_pass, $database_name);

if (!$conn) {
	die("Connection failed: " . mysqli_connect_error());
}

echo ("Connected Successfully<br>");

$sql = "SELECT Username, UserID FROM User";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
  while($row = mysqli_fetch_assoc($result)) {
    echo "Username: " . $row["Username"]. " - UserID: " . $row["UserID"]. " " . "<br>";
  }
} else {
  echo "0 Results";
}

mysqli_close($conn);

?>