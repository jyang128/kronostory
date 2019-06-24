<?php
require_once('../db_connection.php');
require_once('../functions.php');
set_exception_handler("error_handler");
startup();

if(!$conn){
    throw new Exception('there is an error' . mysqli_connect_error());
}

$id = $_POST['id'];
$user_id = json_decode($_POST['user-id'], true);
$projItemName = addslashes($_POST["inputTitle"]);
$target_dir = '../../image-uploads/' . $user_id . '/';
$targetProjItemImg = null;

if (!(is_dir($target_dir))) {
    mkdir($target_dir);
}

if ($_POST["imgAttached"] != 'false') {
    $projItemImgFile = $_FILES["entry-img"];
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

$query = "UPDATE `project_items` SET `title` = '{$projItemName}', `image` = '{$targetProjItemImg}' WHERE `id` = {$id}";
$response = mysqli_query($conn, $query);
if($response){
    print("successfully edited the item");
}
else {
    throw new Exception("failed to edit item");
}
 ?>
