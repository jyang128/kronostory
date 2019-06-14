<?php
    require_once '../db_connection.php';
    require_once '../functions.php';

    set_exception_handler("error_handler");
    
    startup();

    if(!$conn){
        throw new Exception('there is an error' . mysqli_connect_error());
    }

    $output = ["error"=> "none", "upload"=>"Success"];

    $userId = $_POST["user-id"];
    $userId = json_decode($userId, true);
    $projName= addslashes($_POST["proj-name"]);
    $projDesc= addslashes($_POST["proj-desc"]);
    $projSecImages = '';
    $projTimelineDesc= addslashes($_POST["proj-timeline-desc"]);
    $projCategory = $_POST["proj-category"];

    if ($_POST["status"] === "published") {
        $projStatus = 1;
    }

    $targetProjMainImg = NULL;

    $target_dir = '../../image-uploads/' . $userId . '/';

    //file upload
    if (!(is_dir($target_dir))) {
        mkdir($target_dir);
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

    $postQuery = "INSERT INTO `project` (`title`, `description`, `user_id`, `primary_image`, `secondary_images`, `timeline_description`, `category`, `status`) 
        VALUES ('{$projName}','{$projDesc}',{$userId},'{$targetProjMainImg}','{$projSecImages}','{$projTimelineDesc}','{$projCategory}', {$projStatus})";

    $response = mysqli_query($conn, $postQuery);

    if ($response) {
    
        $lastId = mysqli_insert_id($conn);
        $getQuery = "SELECT p.`*`, u.`username`
            FROM `project` AS p 
            JOIN `user` AS u
            ON u.`id` = p.`user_id`
            WHERE p.`id` = {$lastId}";
        $result = mysqli_query($conn, $getQuery);

        if ($result) {
            $numRows = mysqli_num_rows($result);
        } else {
            throw new Exception('there is an error' . mysqli_error($conn));
        }
        if ($numRows === 0) {
          throw new Exception("no projects!");
        }

        $outputResult = [];

        while ($row = mysqli_fetch_assoc($result)) {   
          $outputResult[] = $row;
        }

    } else {
        throw new Exception("failed to create project: " . mysqli_error($conn));
    }
    $json_output = json_encode($outputResult);
    print $json_output;
?>