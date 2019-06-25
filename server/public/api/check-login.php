<?php
require_once('functions.php');
require_once('db_connection.php');

set_exception_handler("error_handler");

session_start();
startup();

if (!$conn){
  throw new Exception('there is an error' . mysqli_connect_error());
}

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

print( json_encode($output) );

?>