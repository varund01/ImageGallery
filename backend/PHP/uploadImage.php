<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
    require('./connection.php');

    $response = array();
    if($_SERVER["REQUEST_METHOD"]=="POST") {
        //$email = $_POST["email"];
        //$filename = $_POST["file"]["name"];
        echo "this is ".implode("",$_POST);
        // $target = "../../frontend/public/assets/"
        // $targetpath = $target.$filename;
        // if(move_uploaded_file($_FILES["file"]["tmp_name"],$targetpath)){
        //     echo "sucess";
        // }
        // else {
        //     echo "no no";
        // }
        // $sql = "insert into imageloc values(null,'$filename','$email','');";
        // $conn->query($sql);
        // array_push($response,$filename);
        // echo json_encode($response);
    }
?>