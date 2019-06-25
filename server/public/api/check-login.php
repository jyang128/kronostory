<?php
session_start();

if(!empty($_SESSION['userId']) && !empty($_SESSION['userName'])){
	$output = [
		"id" => $_SESSION["userId"],
		"username" => $_SESSION["userName"]
    ];
} else {
	$output = [
		"id" => null,
		"username" => null
	];
}

print( json_encode($output) );

?>