<?php
    require_once '../db_connection.php';
    require_once '../functions.php';

    set_exception_handler("error_handler");

    if(!$conn){
        throw new Exception('there is an error' . mysqli_connect_error());
    }

    $output = ["error"=> "none", "upload"=>"Success"];

    $userId = $_POST["user-id"];
    $userId = json_decode($userId, true);
    $projName= $_POST["proj-name"];
    $projDesc= $_POST["proj-desc"];
    $projMainImg = $_FILES["main-proj-img"]["name"];
    $projSecImages = '';
    $projItemName = $_POST["proj-item-name"];
    $projItemImg = $_FILES["proj-item-img"]["name"];
    $projCheckArt = $_FILES["proj-item-img"]["name"];
    $projTimelineDesc= $_POST["proj-timeline-desc"];
    $projCategory = $_POST["proj-category"];

    $target_dir = 'image-uploads/' . $userId . '/';
    $targetProjMainImg = $target_dir . $projMainImg;

    // if (is_dir($target_dir)) {
    //     if (file_exists($target_dir . $projMainImg)) {
    //         $output["error"] = 'File already exists';
    //         $output["upload"] = 'Fail';
    //         echo json_encode($output);
    //         return;
    //     }
    // } else {
    //     mkdir($target_dir);
    // }

    // if (isset($_POST["hasUpload"])){
        
    //     $file = $_FILES["main-proj-img"];
    //     $pathExtension = strtolower(pathinfo($file["name"], PATHINFO_EXTENSION));

    //     if($file["size"] > 3000000) {
    //         $output["error"] = 'The file is too large';
    //         $output["upload"] = 'Fail';

    //     } elseif(($pathExtension !== 'jpg') && ($pathExtension !== 'png') && ($pathExtension !== 'gif') && ($pathExtension !== 'jpeg')) {

    //         $output["error"] = 'Wrong File Name. Must be jpg, png, jpeg, or gif';
    //         $output["upload"] = 'Fail';

    //     } else {
            
    //         if(move_uploaded_file($_FILES["main-proj-img"]["tmp_name"], $target_dir . $projMainImg)) {
    //             $output["filepath"] = stripslashes($target_dir . $projMainImg);
    //             $output["msg"] = "The file " . $_FILES["main-proj-img"]["name"] . " has been uploaded.";
    //         }
    //     }
    // }


    // print_r("$userId - $projName - $projDesc - $projMainImg - $projSecImages - $projItemName - $projItemImg - $projTimelineDesc - $targetProjMainImg - $projCategory");
    $postQuery = "INSERT INTO `project` (`title`, `description`, `user_id`, `primary_image`, `secondary_images`, `timeline_description`, `category`) VALUES ('{$projName}','{$projDesc}',{$userId},'{$projMainImg}','{$projSecImages}','{$projTimelineDesc}','{$projCategory}')";

    $response = mysqli_query($conn, $postQuery);

    echo $response;

    // if ($response) {
    //     $lastId = mysqli_insert_id($conn);
    //     $getQuery = "SELECT * FROM `project` WHERE `id` = {$lastId}";
    //     $result = mysqli_query($conn, $getQuery);
    
    //     if ($result) {
    //         $numRows = mysqli_num_rows($result);
    //     } else {
    //         throw new Exception('there is an error' . mysqli_connect_error());
    //     }
        
    //     if ($numRows === 0) {
    //       throw new Exception("no projects!");
    //     }

    //     $outputResult = [];

    //     while ($row = mysqli_fetch_assoc($result)) {   
    //       $outputResult[] = $row;
    //     }
        
    //     $json_output = json_encode($outputResult);
    //     print $json_output;
    
    // } else {
    //     throw new Exception("failed to create project: " . mysqli_connect_error());
    // }


    // echo json_encode($output);

?>
