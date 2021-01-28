<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
    require('../connection.php');

    $response=array();
    if($_SERVER["REQUEST_METHOD"]=="POST") {
        $email = $_POST['email'];
        $category = $_POST['category'];
        $sql = "select * from imageloc where user='$email' and category='$category';";
        $result = $conn->query($sql) or die($conn->error);
        while($row = $result->fetch_assoc()) {
            array_push($response,$row["filename"]);
        }
        echo json_encode($response);
    }
?>