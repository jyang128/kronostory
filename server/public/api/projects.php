<?php
require_once './db_connection.php';
require_once './functions.php';

set_exception_handler("error_handler");

startup();

if(!$conn){
  throw new Exception('there is an error' . mysqli_connect_error());
}

if (empty($_GET['user'])) {
  $targetUser = "* FROM `project` WHERE `status` = 'published'";
} else {
  $user = $_GET['user'];
  $targetUser = "p.`*`, u.`username`
    FROM `project` AS p
    JOIN `user` AS u
    ON p.`user_id` = u.`id`
    WHERE u.`username` = '{$user}'";
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

while ($row = mysqli_fetch_assoc($result)) {
  $output[] = $row;
}

$json_output = json_encode($output);
print $json_output;

?>
