<?php
require_once './db_connection.php';
require_once './functions.php';

set_exception_handler("error_handler");

startup();

if(!$conn){
  throw new Exception('there is an error' . mysqli_connect_error());
}

$query = "DELETE FROM `project_items` WHERE `id`={$_GET['id']}";

if ($result = mysqli_query($conn, $query)) {
} else {
    throw new Exception('there is an error.' . mysqli_connect_error());
}
 ?>
