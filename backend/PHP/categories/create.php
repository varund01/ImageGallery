<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
    require('../connection.php');

    if($_SERVER["REQUEST_METHOD"]=="POST"){
        
        $email = $_POST['email'];
        $category = $_POST['category'];
        $sql = "INSERT INTO `Category` (`user`, `category_name`) VALUES ('$email', '$category');";

        $response = array();
        if($conn->query($sql)) {
            $response["message"] = "Success";
            $response["email"] = $email;
            $response["category"] = $category;
        }
        else {
            $response["message"] = $conn->error;
            $response["email"] = $email;
            $response["category"] = $category;
        }

        echo json_encode($response);

    }


?>