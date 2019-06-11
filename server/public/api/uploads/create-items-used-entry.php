<?php
require_once('../db_connection.php');
require_once('../functions.php');
set_exception_handler("error_handler");
startup();

if(!$conn){
    throw new Exception('there is an error' . mysqli_connect_error());
}

$output = ["error"=> "none", "upload"=>"Success"];






$projItemName = $_POST["proj-item-name"];

if ($_POST["projImgHasUpload"] != 'false') {
    $projItemImgFile = $_FILES["proj-item-img"];
    $projItemImgName = $projItemImgFile["name"];
    $targetProjItemImg = $target_dir . $projItemImgName;
    $pathExtension = strtolower(pathinfo($projItemImgName, PATHINFO_EXTENSION));

    if($projItemImgFile["size"] > 4000000) {
        throw new Exception('the file is too large');
    } elseif(($pathExtension !== 'jpg') && ($pathExtension !== 'png') && ($pathExtension !== 'gif') && ($pathExtension !== 'jpeg')) {
        throw new Exception('Wrong File Name. Must be jpg, png, jpeg, or gif');
    } else {
        move_uploaded_file($projItemImgFile["tmp_name"], $targetProjItemImg);
    }
}

$postQuery = "INSERT INTO `project` (`title`, `description`, `user_id`, `primary_image`, `secondary_images`, `timeline_description`, `category`, `status`) 
        VALUES ('{$projName}','{$projDesc}',{$userId},'{$targetProjMainImg}','{$projSecImages}','{$projTimelineDesc}','{$projCategory}', {$projStatus})";

    $response = mysqli_query($conn, $postQuery);


?>