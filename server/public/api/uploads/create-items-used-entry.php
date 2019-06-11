<?php
    require_once('../db_connection.php');
    require_once('../functions.php');
    set_exception_handler("error_handler");
    startup();

    if(!$conn){
        throw new Exception('there is an error' . mysqli_connect_error());
    }

    $user_id = json_decode($_POST['user-id'], true);
    $projItemName = $_POST["inputTitle"];
    $project_id = json_decode($_POST['project-id'], true); 
    $target_dir = '../../image-uploads/' . $user_id . '/';

    $output = ["error"=> "none", "upload"=>"Success"];

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

    $postQuery = "INSERT INTO `project_items`(`title`, `image`, `project_id`) 
        VALUES ('{$projItemName}','{$targetProjItemImg}','{$project_id}')";

    $response = mysqli_query($conn, $postQuery);

    if ($response) {
        if (($projItemName != 'undefined') || $_POST["projImgHasUpload"] != 'false') {
            $lastId = mysqli_insert_id($conn);
            $itemUsedQuery = "SELECT pi.`id` AS project_item_id, pi.`image` AS project_item_image, pi.`title` AS project_item_title FROM `project_items` AS pi
                WHERE `id` = {$lastId}";

            $result = mysqli_query($conn, $itemUsedQuery);
            $output = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $output[] = $row;    
            }
        }    
    } else {
        throw new Exception("failed to create project: " . mysqli_error($conn));
    }
    print (json_encode($output));

?>