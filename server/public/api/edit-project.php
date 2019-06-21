<?php
require_once './db_connection.php';
require_once './functions.php';

set_exception_handler("error_handler");
startup();

if (!$conn){
  throw new Exception('there is an error' . mysqli_connect_error());
}

$id = $_POST["id"];
$projName= addslashes($_POST["proj-name"]);
$projDesc= addslashes($_POST["proj-desc"]);
$projSecImages = '';
$projTimelineDesc= addslashes($_POST["proj-timeline-desc"]);
$projCategory = $_POST["proj-category"];
$targetProjMainImg = NULL;

if ($_POST["status"] === "published") {
    $projStatus = 1;
}
else{
    $projStatus = 2;
}

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
}

$query = "UPDATE `project` SET `title` = '{$projName}', `description` = '{$projDesc}', `primary_image` = '{$targetProjMainImg}', `secondary_images` = '{$projSecImages}', `timeline_description` = '{$projTimelineDesc}', `category` = '{$projCategory}', `status` = {$projStatus} WHERE `id` = {$id}";
$response = mysqli_query($conn, $query);
if($response){
    print("successfully edited the project");
}
else {
    throw new Exception("failed to edit project");
}
 ?>
