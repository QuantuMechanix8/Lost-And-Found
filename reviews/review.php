<!DOCTYPE html>
<html>
    <head>
    <title>Reviews</title>
    <link rel="stylesheet" type="text/css" href="./review.css">
    </head>
    <body>
    <h1>Reviews for 
        <?php
            $ID = $_GET["id"];
            $type = $_GET["type"];
            $sqlTitlePlace = "SELECT PlaceName FROM Place WHERE PlaceID = $ID";
            $sqlTitleRoute = "SELECT RouteName FROM Route WHERE RouteID = $ID";
            $database_host = "dbhost.cs.man.ac.uk";
            $database_user = "j22352sa";
            $database_pass = "cooldatabasepassword";
            $database_name = "2023_comp10120_cm7";

            $conn = new mysqli($database_host,$database_user,$database_pass,$database_name);
            if($conn->connect_error){
                echo 'Connection to Database Error';
            }
            if($type=="Place") { //choose correct query to use to get reviews of routes vs places
                $result = mysqli_query($conn, $sqlTitlePlace);
            } else {
                $result = mysqli_query($conn, $sqlTitleRoute);
            }
            $return = array();
            if (mysqli_num_rows($result) > 0) {
                foreach($result as $row) {
                    $return[] = $row;
                }
            } else {
                $return = 'Query Failed'; //this is not a good error message but
                echo "oops";
            }
            $conn->close();
            echo $return['PlaceName'];



        ?>

    </h1>  


<?php
$ID = $_GET["id"];
$type = $_GET["type"]; //allows the same page to be used for reviews of routes and of places - we love modularity!
$sqlPlace = "SELECT pr.ReviewDesc as ReviewDesc, u.Username as Username, pr.Rating as Rating, pr.DateCreated as DateCreated FROM PlaceReview pr JOIN User u ON pr.UserID = u.UserID WHERE pr.PlaceID = $ID ORDER BY Rating";
$sqlRoute = "SELECT rr.ReviewDesc as ReviewDesc, u.Username as Username, rr.Rating as Rating, rr.DateCreated as DateCreated FROM RouteReview rr JOIN User u ON rr.UserID = u.UserID WHERE rr.RouteID = $ID ORDER BY Rating";
$database_host = "dbhost.cs.man.ac.uk";
$database_user = "j22352sa";
$database_pass = "cooldatabasepassword";
$database_name = "2023_comp10120_cm7";

$conn = new mysqli($database_host,$database_user,$database_pass,$database_name);

if($conn->connect_error){
    echo 'Connection to Database Error';
}
if($type=="Place") { //choose correct query to use to get reviews of routes vs places
    $result = mysqli_query($conn, $sqlPlace);
} else {
    $result = mysqli_query($conn, $sqlRoute);
}
$return = array();
if (mysqli_num_rows($result) > 0) {
    foreach($result as $row) {
        $return[] = $row;
    }
} else {
    $return = 'Query Failed'; //this is not a good error message but
}
$conn->close();
//MAKE PAGE LOOK SIGNIFICANTLY NICER!

//echo $review["PlaceName"]; //need to get name of place/route with another query, sql joins suck ass
if (count($return)!=0) {
    foreach ($return as $review) {
        echo "<div class = 'container review'>";

        echo "<div class = 'usrnm_review' >";
        echo $review['Username'];
        echo "</div>";

        echo '<div class = "desc_review">';
        echo $review['ReviewDesc'];
        echo "</div>";

        echo '<div class = rating_review>';
        echo $review['Rating']; echo " Stars";
        echo "</div>";

        echo '<div class = date_review>';
        echo $review['DateCreated'];
        echo "</div>";

        echo "</div>";
    }
} else {
    echo "<div class = 'review' style = 'border: solid'>Sorry, there are no reviews here!</div>";
}

echo `

`;


?>
    </body>
</html>