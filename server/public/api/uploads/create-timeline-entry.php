<?php
require_once('../db_connection.php');
require_once('../functions.php');
set_exception_handler("error_handler");
startup();
date_default_timezone_set('America/Los_Angeles');
if(!$conn){
    throw new Exception('there is an error' . mysqli_connect_error());
}

$user_id = json_decode($_POST['user-id'], true);
$title = $_POST['inputTitle'];
$description = $_POST['inputDescription'];
$primary_image = null;
$secondary_images = '';
$project_id = json_decode($_POST['project-id'], true); 
$date = date("m/d/y");
$target_dir = 'image-uploads/' . $user_id . '/';

//image file handling
$output = ['error'=> 'none', 'upload'=>'Success'];
if ($_POST['imgAttached'] !== 'false') {
    $imageFile = $_FILES['entry-img'];
    $imageName = $imageFile['name'];
    $primary_image = $target_dir . $imageName;
    $pathExtension = strtolower(pathinfo($imageName, PATHINFO_EXTENSION));
    if($imageFile['size'] > 4000000) {
        $output['error'] = 'The file is too large';
        $output['upload'] = 'Fail';
    } elseif(($pathExtension !== 'jpg') && ($pathExtension !== 'png') && ($pathExtension !== 'gif') && ($pathExtension !== 'jpeg')) {
        $output['error'] = 'File extension must be jpg, png, jpeg, or gif';
        $output['upload'] = 'Fail';
    } else {
        if(move_uploaded_file($imageFile['tmp_name'], $primary_image)) {
            $output['filepath'] = stripslashes($primary_image);
            $output['msg'] = "The file " . $imageName . " has been uploaded.";
        }
    }
}

$query = "INSERT INTO `timeline_entries` (`title`, `description`, `primary_image`, `secondary_images`, `project_id`, `date`) VALUES ('{$title}','{$description}','{$primary_image}','{$secondary_images}','{$project_id}','{$date}')";

$result = mysqli_query($conn, $query);
if($result){
    $lastId = mysqli_insert_id($conn);
    $projectQuery = "SELECT te.`id` AS timeline_id, te.`title` AS timeline_entry_title, te.`date`, te.`description` AS timeline_entry_description, te.`primary_image` AS timeline_primary_image FROM `timeline_entries` AS te
    WHERE `id` = {$lastId}
    ORDER BY `date` ASC";

    $result = mysqli_query($conn, $projectQuery);
    $output = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $row['date'] = stripslashes($row['date']);
        $output[] = $row;
    }
} else {
    throw new Exception('error with result');
}
print (json_encode($output));
?>