<?php

require_once './db_connection.php';
require_once './functions.php';

set_exception_handler("error_handler");

startup();

if (!$conn){
  throw new Exception('there is an error' . mysqli_connect_error());
}

$email = $_GET['email'];
$password = $_GET['password'];
$invalidEmailFormat = "";
$empty = "";

$password = hash('sha256', $password);

if($email === ""){
    $empty = $empty."#email";
}
if($password === ""){
    $empty = $empty."#password";
}
if(preg_match('/@.*\./',$email) === 0){
    $invalidEmailFormat = "The email is invalid. ";
}
if($empty || $invalidEmailFormat){
    print($invalidEmailFormat.$empty);
    exit();
}

$query = "SELECT * FROM `user`
    WHERE `email` = '{$email}' AND 'password' = '{$password}'";

if ($result = mysqli_query($conn, $query)) {
    $numRows = mysqli_num_rows($result);
} else {
    throw new Exception('there is an error' . mysqli_connect_error());
}

if ($numRows === 0) {
    print("Username or password is incorrect/does not exist");
    exit();
}

$output = [];

while ($row = mysqli_fetch_assoc($result)) {
    $output[] = $row;
}

if ($output[0]["password"] !== $password) {
    print("Username or password is incorrect/does not exist");
    exit();
}
session_start();
$_SESSION["userId"] = $output[0]["id"];
$_SESSION["userName"] = $output[0]["username"];

$json_output = json_encode($output);

print $json_output;

?>
