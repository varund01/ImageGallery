<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
    require('../connection.php');

    $response=array();
    if($_SERVER["REQUEST_METHOD"]=="POST") {
        $email = $_POST['email'];
        $sql = "select * from Category where user='$email';";
        $result = $conn->query($sql) or die($conn->error);
        while($row = $result->fetch_assoc()) {
            array_push($response,$row["category_name"]);
        }
        echo json_encode($response);
    }
?>