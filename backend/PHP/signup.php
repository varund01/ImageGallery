<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
    require('connection.php');

    if($_SERVER["REQUEST_METHOD"]=="POST"){
        
        $email = $_POST['email'];
        $password = $_POST['password'];
        $sql = "INSERT INTO `users` (`email`, `password`) VALUES ('$email', '$password');";

        $response = array();
        if($conn->query($sql)) {
            $response["message"] = "Success";
            $response["email"] = $email;
            $response["password"] = $password;
        }
        else {
            $response["message"] = $conn->error;
            $response["email"] = $email;
            $response["password"] = $password;
        }

        echo json_encode($response);

    }


?>