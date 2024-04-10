<?php


header('Content-Type: application/json');

$aResult = array();

if( !isset($_POST['functionname']) ) { $aResult['error'] = 'No function name!'; }

//echo $_POST['functionname'];

if( !isset($aResult['error']) ) {

    switch($_POST['functionname']) { //using switch case in case i ever want to call different functions with this code
        case 'getPlaces':
            $aResult['result'] = getPlaces();
            //echo $aResult; //just check if it's working; we really want to send back a json
            break;
        case 'searchPlace':
            if( !isset($_POST['arguments']) ) { $aResult['error'] = 'No function arguments!'; }
            else if (count($_POST['arguments'])!=1) { $aResult['error'] = 'Wrong number of arguments!';}
            $aResult['result'] = searchPlace($_POST['arguments'][0]);
            break;
        case 'getReviews':
            if( !isset($_POST['arguments']) ) { $aResult['error'] = 'No function arguments!'; }
            else if (count($_POST['arguments'])!=1) { $aResult['error'] = 'Wrong number of arguments!';}
            $aResult['result'] = getReviews($_POST['arguments'][0]);
            break;
        case 'submitReview':
            if( !isset($_POST['arguments']) ) { $aResult['error'] = 'No function arguments!'; }
            else if (count($_POST['arguments'])!=3) { $aResult['error'] = 'Wrong number of arguments!';}
            $aResult['result'] = submitReview($_POST['arguments'][0],$_POST['arguments'][1],$_POST['arguments'][2]);
            break;
        default:
            $aResult['error'] = 'Not found function '.$_POST['functionname'].'!';
            break;
    }

}

echo json_encode($aResult);

function getPlaces() { 
    $database_host = "dbhost.cs.man.ac.uk";
    $database_user = "j22352sa";
    $database_pass = "cooldatabasepassword";
    $database_name = "2023_comp10120_cm7";
    $conn = new mysqli($database_host,$database_user, $database_pass, $database_name);
    if($conn->connect_error){
        echo 'Connection to Database Error';
    }

    $sqlGetPlaces = "SELECT PlaceName, ST_X(Location) as longitude, ST_Y(Location) as latitude, PlaceDesc, TagID, PlaceID FROM Place"; //best not to change this too much - especially any column aliases

    $result = mysqli_query($conn, $sqlGetPlaces); //returns mysqli_result object not array ! (im a fool)
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
    return $return;
}

function searchPlace($name) {
    $sqlSearchPlace = "SELECT ST_X(Location) as longitude, ST_Y(Location) as latitude FROM Place WHERE PlaceName='$name';";
    $database_host = "dbhost.cs.man.ac.uk";
    $database_user = "j22352sa";
    $database_pass = "cooldatabasepassword";
    $database_name = "2023_comp10120_cm7";
    $connSearch = new mysqli($database_host,$database_user, $database_pass, $database_name);
    if($connSearch->connect_error){
        echo 'Connection to Database Error';
    }
    $resultSearch = mysqli_query($connSearch, $sqlSearchPlace);
    $returnSearch = array();
    if (mysqli_num_rows($resultSearch) > 0) {
        foreach($resultSearch as $row) {
            $returnSearch[] = $row;
            //echo $row['LocationLatLng']; //checking LocationLatLng actually returned; 
        }
    } else {
        $returnSearch = 'Query Failed'; //this is not a good error message but
    }
    $connSearch->close();
    return $returnSearch;

}

function getReviews($ID) {
    $database_host = "dbhost.cs.man.ac.uk";
    $database_user = "j22352sa";
    $database_pass = "cooldatabasepassword";
    $database_name = "2023_comp10120_cm7";
    $sqlReview = "SELECT pr.ReviewDesc as ReviewDesc, u.Username as Username, pr.Rating as Rating, pr.DateCreated as DateCreated FROM PlaceReview pr JOIN User u ON pr.UserID = u.UserID WHERE pr.PlaceID = $ID ORDER BY Rating";
    $conn = new mysqli($database_host,$database_user, $database_pass, $database_name);
    if($conn->connect_error){
        echo 'Connection to Database Error';
    }
    $result = mysqli_query($conn, $sqlReview); 
    if (mysqli_num_rows($result) > 0) {
        foreach($result as $row) {
            $returnSearch[] = $row;
            //echo $row['LocationLatLng']; //checking LocationLatLng actually returned; 
        }
    } else {
        $returnSearch = 'Query Failed'; //this is not a good error message but
    }
    $conn->close();
    return $returnSearch;
}

function submitReview($reviewDesc,$reviewPlaceID,$reviewRating) {
    //$reviewUserID = $_COOKIE['UserID'];
    //$reviewDateCreated = date('Y/m/d');
    $reviewUserID = 3;
    $reviewDateCreated = '2024-04-10';
    $database_host = "dbhost.cs.man.ac.uk";
    $database_user = "j22352sa";
    $database_pass = "cooldatabasepassword";
    $database_name = "2023_comp10120_cm7";
    $conn = new mysqli($database_host,$database_user, $database_pass, $database_name);
    if($conn->connect_error){
        echo 'Connection to Database Error';
    }
    echo "$reviewPlaceID,$reviewUserID,$reviewDesc,$reviewRating,$reviewDateCreated";
    $sql = "INSERT INTO PlaceReview VALUES ($reviewPlaceID,$reviewUserID,'$reviewDesc',$reviewRating,'$reviewDateCreated')";
    $conn->query($sql);
    echo $conn->error;
    $conn->close();
    echo 'success';
    $return = array(); 
    return $return;
}
// (PlaceID,UserID,ReviewDesc,Rating,DateCreated)

?>