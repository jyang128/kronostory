<?php
require_once './db_connection.php';
require_once './functions.php';

set_exception_handler("error_handler");

startup();

if(!$conn){
  throw new Exception('there is an error' . mysqli_connect_error());
}

$data = file_get_contents('php://input');
$data = json_decode($data, true);

$query = "UPDATE `project` SET `status` = 'deleted' WHERE `id`={$data['id']}";


if ($result = mysqli_query($conn, $query)) {
} else {
    throw new Exception('there is an error' . mysqli_connect_error());
}
?>
