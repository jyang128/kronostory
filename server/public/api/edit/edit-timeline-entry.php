<?php
require_once '../db_connection.php';
require_once '../functions.php';

set_exception_handler("error_handler");
startup();

if (!$conn){
  throw new Exception('there is an error' . mysqli_connect_error());
}

$id = $_POST['id'];
$user_id = json_decode($_POST['user-id'], true);
$title = addslashes($_POST['inputTitle']);
$description = addslashes($_POST['inputDescription']);
$primary_image = null;
$secondary_images = '';
$date = addslashes($_POST['inputDate']);
$target_dir = '../../image-uploads/' . $user_id . '/';

if (!(is_dir($target_dir))) {
    mkdir($target_dir);
}

if ($_POST['imgAttached'] !== 'false') {
    $imageFile = $_FILES['entry-img'];
    $imageName = $imageFile['name'];
    $primary_image = $target_dir . $imageName;
    $pathExtension = strtolower(pathinfo($imageName, PATHINFO_EXTENSION));
    if($imageFile['size'] > 4000000) {
        throw new Exception('The file is too large.');
    } else if (($pathExtension !== 'jpg') && ($pathExtension !== 'png') && ($pathExtension !== 'gif') && ($pathExtension !== 'jpeg')) {
        throw new Exception('File extension must be jpg, png, jpeg, or gif');
    } else {
        if(move_uploaded_file($imageFile['tmp_name'], $primary_image)) {
            $output['filepath'] = stripslashes($primary_image);
            $output['msg'] = "The file " . $imageName . " has been uploaded.";
        }
    }
}

$query = "UPDATE `timeline_entries` SET `title` = '{$title}', `description` = '{$description}', `primary_image` = '{$primary_image}', `secondary_images` = '{$secondary_images}', `date` = '{$date}' WHERE `id` = {$id}";
$response = mysqli_query($conn, $query);
if($response){
    print("successfully edited the timeline");
}
else {
    throw new Exception("failed to edit timeline");
}
 ?>
