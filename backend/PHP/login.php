<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
    require('connection.php');

    if($_SERVER["REQUEST_METHOD"]=="POST"){
        
        $email = $_POST['email'];
        $password = $_POST['password'];
        $sql = "select * from users where email='$email' and password='$password';";
        $res = $conn->query($sql);
        $res = $res->fetch_assoc();

        $response = array();

        if(!(is_null($res) || $res == false)) {
            $response["message"] = "Success";
            $response["email"] = $email;
            $response["password"] = $password;
        }
        else {
            $sqla = "select * from users where email='$email';";
            $resa = $conn->query($sqla);
            $resa = $resa->fetch_assoc();
            if(!(is_null($resa) || $resa == false)) {
                $response["message"] = "Password didn't match. Please try again!";
            }
            else {
                $response["message"] = "User did not exist! Please sign up";
            }
            $response["email"] = $email;
            $response["password"] = $password;
        }

        echo json_encode($response);

    }


?>