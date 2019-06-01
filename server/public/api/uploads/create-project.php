<?php

    $output = ["error"=> "none", "upload"=>"Success"];

    $target_dir = 'image-uploads/';
    $target_file = $target_dir . $_FILES["imageToUpload"]["name"];

    // if (file_exists($target_file)) {
    //     $output["error"] = 'File already exists';
    //     $output["upload"] = 'Fail';
    //     echo json_encode($output);
    //     return;
    // }

    if (isset($_POST["hasUpload"])){
        
        $file = $_FILES["imageToUpload"];
        $pathExtension = strtolower(pathinfo($file["name"], PATHINFO_EXTENSION));

        if($file["size"] > 3000000) {
            $output["error"] = 'The file is too large';
            $output["upload"] = 'Fail';
            print $output["error"];

        } elseif(($pathExtension !== 'jpg') && ($pathExtension !== 'png') && ($pathExtension !== 'gif') && ($pathExtension !== 'jpeg')) {

            $output["error"] = 'Wrong File Name. Must be jpg, png, jpeg, or gif';
            $output["upload"] = 'Fail';
            print $output["error"];

        } else {
            
            if(move_uploaded_file($_FILES["imageToUpload"]["tmp_name"], $target_file)) {
                $output["filepath"] = stripslashes($target_file);
                $output["msg"] = "The file " . $_FILES["imageToUpload"]["name"] . " has been uploaded.";
            }
        }
    }

    echo json_encode($output);

?>
