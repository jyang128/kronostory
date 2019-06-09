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
    $projName= $_POST["proj-name"];
    $projDesc= $_POST["proj-desc"];
    $projSecImages = '';
    $projTimelineDesc= $_POST["proj-timeline-desc"];
    $projCategory = $_POST["proj-category"];

    if ($_POST["status"] === "published") {
        $projStatus = 1;
    }

    $targetProjMainImg = NULL;
    $targetProjItemImg = NULL;

    $target_dir = '../../image-uploads/' . $userId . '/';
    print($target_dir);
    //    ../../image-uploads/1/

    // USE THIS FOR THE SERVER:
    // $uploadDir = dirname(__DIR__, 2);
    // $target_dir = $uploadDir . '/image-uploads/' . $userId . '/';
    // print($uploadDir);
    // print($target_dir);
    //    /home/dev/lfz/c319_DIYblogging_tracker/server/public
    //    home/dev/lfz/c319_DIYblogging_tracker/server/public/image-uploads/1/

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
            $output["error"] = 'The file is too large';
            $output["upload"] = 'Fail';
        } elseif(($pathExtension !== 'jpg') && ($pathExtension !== 'png') && ($pathExtension !== 'gif') && ($pathExtension !== 'jpeg')) {
            $output["error"] = 'Wrong File Name. Must be jpg, png, jpeg, or gif';
            $output["upload"] = 'Fail';
        } else {
            if(move_uploaded_file($projMainImgFile["tmp_name"], $targetProjMainImg)) {
                $output["filepath"] = stripslashes($targetProjMainImg);
                $output["msg"] = "The file " . $projMainImgName . " has been uploaded.";
            }
        }
    }

    if ($_POST["projImgHasUpload"] != 'false') {
        $projItemImgFile = $_FILES["proj-item-img"];
        $projItemImgName = $projItemImgFile["name"];
        $targetProjItemImg = $target_dir . $projItemImgName;
        $pathExtension = strtolower(pathinfo($projItemImgName, PATHINFO_EXTENSION));

        if($projItemImgFile["size"] > 4000000) {
            $output["error"] = 'The file is too large';
            $output["upload"] = 'Fail';
        } elseif(($pathExtension !== 'jpg') && ($pathExtension !== 'png') && ($pathExtension !== 'gif') && ($pathExtension !== 'jpeg')) {
            $output["error"] = 'Wrong File Name. Must be jpg, png, jpeg, or gif';
            $output["upload"] = 'Fail';
        } else {
            if(move_uploaded_file($projItemImgFile["tmp_name"], $targetProjItemImg)) {
                $output["itemFilepath"] = stripslashes($targetProjItemImg);
                $output["itemMsg"] = "The file " . $projItemImgName . " has been uploaded.";
            }
        }
    }

    $postQuery = "INSERT INTO `project` (`title`, `description`, `user_id`, `primary_image`, `secondary_images`, `timeline_description`, `category`, `status`) 
        VALUES ('{$projName}','{$projDesc}',{$userId},'{$targetProjMainImg}','{$projSecImages}','{$projTimelineDesc}','{$projCategory}', {$projStatus})";


    $response = mysqli_query($conn, $postQuery);

    if ($response) {
        $lastId = mysqli_insert_id($conn);
        $getQuery = "SELECT * FROM `project` WHERE `id` = {$lastId}";
        $result = mysqli_query($conn, $getQuery);

        if ($result) {
            $numRows = mysqli_num_rows($result);
        } else {
            throw new Exception('there is an error' . mysqli_connect_error());
        }
        if ($numRows === 0) {
          throw new Exception("no projects!");
        }

        $outputResult = [];

        while ($row = mysqli_fetch_assoc($result)) {   
          $outputResult[] = $row;
        }

        $projItemName = $_POST["proj-item-name"];

        if (($projItemName != 'undefined') || $_POST["projImgHasUpload"] != 'false') {
            $postProdItemQuery = "INSERT INTO `project_items` (`title`, `image`, `project_id`) VALUES ('{$projItemName}', '{$targetProjItemImg}', $lastId)";


            $postProdItemResult = mysqli_query($conn, $postProdItemQuery);

            if ($postProdItemResult) {
                $prodItemNumRows = mysqli_affected_rows($conn);
            } else {
                throw new Exception('there is an error' . mysqli_connect_error());
            }
            if ($prodItemNumRows === 0) {
                throw new Exception("no project items!");
            }
        }    
    } else {
        throw new Exception("failed to create project: " . mysqli_connect_error());
    }
    $json_output = json_encode($outputResult);
    print $json_output;
?>
