<?php
    //require_once '../db_connection.php';
    require_once '../functions.php';

    set_exception_handler("error_handler");

    //r$output = ["error"=> "none", "upload"=>"Success"];

    $userId = $_POST["user-id"];
    $userId = json_decode($userId, true);

    $target_dir = 'image-uploads/' . $userId . '/';
    $target_file = $target_dir . $_FILES["main-proj-img"]["name"];

    if (is_dir($target_dir)) {
        if (file_exists($target_file)) {
            $output["error"] = 'File already exists';
            $output["upload"] = 'Fail';
            echo json_encode($output);
            return;
        }
    } else {
        mkdir($target_dir);
    }

    if (isset($_POST["hasUpload"])){
        
        $file = $_FILES["main-proj-img"];
        $pathExtension = strtolower(pathinfo($file["name"], PATHINFO_EXTENSION));

        if($file["size"] > 3000000) {
            $output["error"] = 'The file is too large';
            $output["upload"] = 'Fail';

        } elseif(($pathExtension !== 'jpg') && ($pathExtension !== 'png') && ($pathExtension !== 'gif') && ($pathExtension !== 'jpeg')) {

            $output["error"] = 'Wrong File Name. Must be jpg, png, jpeg, or gif';
            $output["upload"] = 'Fail';
            //throw new Exception('Wrong file name');

        } else {
            
            if(move_uploaded_file($_FILES["main-proj-img"]["tmp_name"], $target_file)) {
                $output["filepath"] = stripslashes($target_file);
                $output["msg"] = "The file " . $_FILES["main-proj-img"]["name"] . " has been uploaded.";
            }
        }
    }


    echo json_encode($output);

?>
