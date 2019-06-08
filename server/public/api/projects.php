<?php
require_once './db_connection.php';
require_once './functions.php';

set_exception_handler("error_handler");

session_start();
startup();

if(!$conn){
    throw new Exception('there is an error' . mysqli_connect_error());
}

if (empty($_GET['userId'])) {
    $targetUser = "p.`*`, u.`username` 
        FROM `project` AS p 
        JOIN `user` AS u 
        ON u.`id` = p.`user_id` 
        WHERE `status` = 'published'";
} else {
    $user = $_GET['userId'];
    $targetUser = "p.`*`, u.`username`
        FROM `project` AS p
        JOIN `user` AS u
        ON p.`user_id` = u.`id`
        WHERE p.`user_id` = '{$user}' AND `status` = 'published'";
}

$query = "SELECT {$targetUser}";

if ($result = mysqli_query($conn, $query)) {
        $numRows = mysqli_num_rows($result);
} else {
        throw new Exception('there is an error' . mysqli_connect_error());
}

if ($numRows === 0) {
    throw new Exception("no projects!");
}

$output = [];
$sessionArray = [];
$projectsArray = [];

while ($row = mysqli_fetch_assoc($result)) {
    $projectsArray[] = $row;
}

$output[] = $sessionArray;
$output[] = $projectsArray;

if(!empty($_SESSION['userId']) && !empty($_SESSION['userName'])){
	$output[0] = [
		"id" => $_SESSION["userId"],
		"username" => $_SESSION["userName"]
	];
} else {
	$output[0] = [
		"id" => null,
		"username" => null
	];
}

$json_output=json_encode($output);
print $json_output;

?>