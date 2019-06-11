<?php
require_once './db_connection.php';
require_once './functions.php';

set_exception_handler("error_handler");

startup();

if(!$conn){
  throw new Exception('there is an error' . mysqli_connect_error());
}
$body = file_get_contents('php://input');
$user = json_decode($body, true);
$firstName = $user['first_name'];
$lastName = $user['last_name'];
$username = $user['username'];
$password = $user['password'];
$repassword = $user['repassword'];
$email = $user['email'];

$usernameValidationQuery = "SELECT * FROM `user` WHERE `username` = '{$username}'";
$emailValidationQuery = "SELECT * FROM `user` WHERE `email` = '{$email}'";
$invalidUsername = mysqli_query($conn, $usernameValidationQuery);
$invalidEmail = mysqli_query($conn, $emailValidationQuery);
$mismatchPassword = "";
$invalidUppercase = "";
$invalidNumber = "";
$invalidEmailFormat = "";

if(preg_match('/@.*\./',$email) === 0){
    $invalidEmailFormat = "The email is invalid.";
}
if($password !== $repassword){
    $mismatchPassword = "The passwords do not match. ";
}
if(preg_match('/[A-Z]/', $password) === 0){
    $invalidUppercase = "The password needs an uppercase letter. ";
}
if(preg_match('/[0-9]/', $password) === 0){
    $invalidNumber = "The password needs a number. ";
}
if(mysqli_num_rows($invalidUsername) > 0 && mysqli_num_rows($invalidEmail) > 0){
    $row1 = mysqli_fetch_assoc($invalidUsername);
    $row2 = mysqli_fetch_assoc($invalidEmail);
    print($row1['username']." is taken and ".$row2['email']." is already being used by another user. ".$mismatchPassword.$invalidUppercase.$invalidNumber.$invalidEmailFormat);
    exit();
}
else if(mysqli_num_rows($invalidUsername) > 0){
    $row = mysqli_fetch_assoc($invalidUsername);
    print($row['username']." is taken. ".$mismatchPassword.$invalidUppercase.$invalidNumber.$invalidEmailFormat);
    exit();
}
else if(mysqli_num_rows($invalidEmail) > 0){
    $row = mysqli_fetch_assoc($invalidEmail);
    print($row['email']." is already being used by another user. ".$mismatchPassword.$invalidUppercase.$invalidNumber.$invalidEmailFormat);
    exit();
}
if($invalidUppercase || $invalidNumber){
    print($invalidUppercase.$invalidNumber);
    exit();
}
if($invalidEmailFormat){
    print($invalidEmailFormat);
    exit();
}
$postQuery = "INSERT INTO `user`(`first_name`, `last_name`, `username`, `password`, `email`)
    VALUES ('{$firstName}','{$lastName}','{$username}','{$password}','{$email}')";

$response = mysqli_query($conn, $postQuery);

if ($response) {
    $lastId = mysqli_insert_id($conn);
    $getQuery = "SELECT * FROM `user` WHERE `id` = {$lastId}";
    $result = mysqli_query($conn, $getQuery);

    if ($result) {
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

} else {
    throw new Exception("failed to create  user: " . mysqli_connect_error());
}

?>
