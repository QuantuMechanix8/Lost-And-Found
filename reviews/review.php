<?php
$placeID = $_GET["id"];

$sql = "SELECT pr.ReviewDesc as ReviewDesc, u.Username as Username, pr.Rating as Rating, pr.DateCreated as DateCreated FROM PlaceReview pr JOIN User u ON pr.UserID = u.UserID WHERE pr.PlaceID = $placeID ORDER BY Rating";

$database_host = "dbhost.cs.man.ac.uk";
$database_user = "j22352sa";
$database_pass = "cooldatabasepassword";
$database_name = "2023_comp10120_cm7";

$conn = new mysqli($database_host,$database_user,$database_pass,$database_name);

if($conn->connect_error){
    echo 'Connection to Database Error';
}
$result = mysqli_query($conn, $sql);
$return = array();
if (mysqli_num_rows($result) > 0) {
    foreach($result as $row) {
        $return[] = $row;
        //echo $row['LocationLatLng']; //checking LocationLatLng actually returned; 
    }
} else {
    $return = 'Query Failed'; //this is not a good error message but
}
$conn->close();

echo `
<html>
    <head>
    </head>
    <body>
    <h1>Reviews for 
`;
//echo $review["PlaceName"];
echo "</h1>";

foreach ($return as $review) {
    echo "<div class = 'review' style = 'border: solid'>";
    echo $review['ReviewDesc'];
    echo "<br>";
    echo $review['Username'];
    echo "<br>";
    echo $review['Rating']; echo " Stars";
    echo "<br>";
    echo $review['DateCreated'];
    echo "</div>";
};

echo `
    </body>
</html>
`;


?>