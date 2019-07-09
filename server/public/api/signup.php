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
$firstName = addslashes($user['first_name']);
$lastName = addslashes($user['last_name']);
$username = $user['username'];
$password = $user['password'];
$repassword = $user['repassword'];
$email = $user['email'];

$usernameValidationQuery = "SELECT * FROM `user` WHERE `username` = '{$username}'";
$emailValidationQuery = "SELECT * FROM `user` WHERE `email` = '{$email}'";

$invalidUsernameResponse = mysqli_query($conn, $usernameValidationQuery);
$invalidEmailResponse = mysqli_query($conn, $emailValidationQuery);
$invalidUsername = "";
$invalidEmail = "";
$mismatchPassword = "";
$invalidUppercase = "";
$invalidNumber = "";
$invalidEmailFormat = "";
$usernameLower = strtolower($username);
$keyword = "";
$dashes = "";
$empty = "";

if($firstName === ""){
    $empty = $empty."#firstname ";
}
if($lastName === ""){
    $empty = $empty."#lastname ";
}
if($username === ""){
    $empty = $empty."#username ";
}
if($password === ""){
    $empty = $empty."#password ";
}
if($email === ""){
    $empty = $empty."#email ";
}
if(preg_match('/-/',$username) === 1){
    $dashes = "The username can't contain dashes. ";
}
if($usernameLower === "dashboard" || $usernameLower === "about" || $usernameLower === "contact" || $usernameLower === "user" ){
    $keyword = $username." can't be used as a username. ";
}
if(preg_match('/@.*\./',$email) === 0){
    $invalidEmailFormat = "The email is invalid. ";
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
if(mysqli_num_rows($invalidUsernameResponse) > 0){
    $row = mysqli_fetch_assoc($invalidUsernameResponse);
    $invalidUsername = $row['username']." is taken. ";
}
if(mysqli_num_rows($invalidEmailResponse) > 0){
    $row = mysqli_fetch_assoc($invalidEmailResponse);
    $invalidEmail = $row['email']." is already being used by another user. ";
}
if($invalidUsername || $invalidEmail || $mismatchPassword || $invalidUppercase || $invalidNumber || $invalidEmailFormat || $keyword || $dashes || $empty){
    print($invalidUsername.$invalidEmail.$mismatchPassword.$invalidUppercase.$invalidNumber.$invalidEmailFormat.$keyword.$dashes.$empty);
    exit();
}

$password = hash('sha256', $password);

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
