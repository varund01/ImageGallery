<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
    require('../connection.php');

    if($_SERVER["REQUEST_METHOD"]=="POST"){
        
        $category = $_POST['category'];
        $email = $_POST['email'];
        $sql = "DELETE FROM `Category` where `Category`.`category_name` = '$category' and `Category`.`user` = '$email';";

        $response = array();
        if($conn->query($sql)) {
            $response["message"] = "Success";
            $sql = "DELETE FROM `imageloc` where `imageloc`.`category` = '$category' and `imageloc`.`user` = '$email';";
            $conn->query($sql);
        }
        else {
            $response["message"] = $conn->error;
            echo $conn->error;
        }

        echo json_encode($response);

    }


?>