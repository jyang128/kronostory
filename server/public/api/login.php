<?php

require_once './db_connection.php';
require_once './functions.php';

set_exception_handler("error_handler");

startup();

if (!$conn){
  throw new Exception('there is an error' . mysqli_connect_error());
}

$email = $_GET['email'];

$query = "SELECT * FROM `user` 
    WHERE `email` = '{$email}'";

if ($result = mysqli_query($conn, $query)) {
    $numRows = mysqli_num_rows($result);
} else {
    throw new Exception('there is an error' . mysqli_connect_error());
}

if ($numRows === 0) {
    throw new Exception("Username is incorrect/does not exist");
}

$output = [];

while ($row = mysqli_fetch_assoc($result)) {   
    $output[] = $row;
}

session_start();
$_SESSION["userId"] = $output[0]["id"];
$_SESSION["userName"] = $output[0]["username"];

$json_output = json_encode($output);

print $json_output;

?>