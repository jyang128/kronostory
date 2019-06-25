<?php
require_once '../db_connection.php';
require_once '../functions.php';

set_exception_handler("error_handler");
startup();

if (!$conn){
  throw new Exception('there is an error' . mysqli_connect_error());
}

$userId = $_POST["user-id"];
$projId = $_POST["proj-id"];
$projName= addslashes($_POST["proj-name"]);
$projDesc= addslashes($_POST["proj-desc"]);
$projSecImages = '';
$projTimelineDesc= addslashes($_POST["proj-timeline-desc"]);
$targetProjMainImg = NULL;

if ($_POST["status"] === "published") {
    $projStatus = 1;
}

$targetProjMainImg = NULL;

$target_dir = '../../image-uploads/' . $userId . '/';

$projectImg = '';

if ($_POST["mainImgHasUpload"] != 'false') {
    $projMainImgFile = $_FILES["proj-main-img"];
    $projMainImgName = $projMainImgFile["name"];
    $targetProjMainImg = $target_dir . $projMainImgName;
    $pathExtension = strtolower(pathinfo($projMainImgName, PATHINFO_EXTENSION));

    if($projMainImgFile["size"] > 4000000) {
        throw new Exception('the file is too large');
    } elseif(($pathExtension !== 'jpg') && ($pathExtension !== 'png') && ($pathExtension !== 'gif') && ($pathExtension !== 'jpeg')) {
        throw new Exception('Wrong File Name. Must be jpg, png, jpeg, or gif');
    } else {
        if(move_uploaded_file($projMainImgFile["tmp_name"], $targetProjMainImg)) {
            $output["filepath"] = stripslashes($targetProjMainImg);
            $output["msg"] = "The file " . $projMainImgName . " has been uploaded.";
        }
    }
    $projectImg = "`primary_image` = '{$targetProjMainImg}',";
}

$query = "UPDATE `project` SET `title` = '{$projName}', `description` = '{$projDesc}', {$projectImg} `secondary_images` = '{$projSecImages}', `timeline_description` = '{$projTimelineDesc}', `status` = {$projStatus} WHERE `id` = {$projId}";
$response = mysqli_query($conn, $query);
if($response){
    $query = "SELECT p.`id`, p.`title` AS project_title, p.`description` AS project_description, p.`date_created`, p.`primary_image`, p.`secondary_images`, p.`category`, u.`username`, u.`id` AS `user_id`, p.`timeline_description`
        FROM `project` AS p 
        JOIN `user` AS u 
        ON p.`user_id` = u.`id`
        WHERE p.`id` = {$projId}";
    
    $result = mysqli_query($conn, $query);
    $output2 = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $output2[] = $row;    
    }
    print (json_encode($output2));
}
else {
    throw new Exception("failed to edit project");
}
 ?>
