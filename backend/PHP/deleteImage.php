<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
    require('connection.php');

    if($_SERVER["REQUEST_METHOD"]=="POST"){
        
        $imageUrl = $_POST['imageUrl'];
        $imageUrl = substr($imageUrl,7);
        echo $imageUrl;
        $sql = "DELETE FROM `imageloc` where `imageloc`.`filename` = '$imageUrl';";

        $response = array();
        if($conn->query($sql)) {
            $response["message"] = "Success";
        }
        else {
            $response["message"] = $conn->error;
            echo $conn->error;
        }

        echo json_encode($response);

    }


?>