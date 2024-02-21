<? 
$database_host = "dbhost.cs.man.ac.uk";
$database_user = "n23551sf";
$database_pass = "gEKn4ane6N62wovo";
$database_name = "2023_comp10120_cm7";

$conn = new mysqli($database_host, $database_user, $database_pass, $database_name);
function get_salt(mysqli $conn, $username) {
  $sql = "SELECT Salt FROM User WHERE Username='$username'";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    return $row["Salt"];
  } else {
    return "Error: User not found";
  }
}
?>