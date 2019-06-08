<?php
    require_once './functions.php';

    set_exception_handler("error_handler");

    startup();
    session_start();
    if(session_destroy()){
        print("the user was logged out.");
    }
    else{
        throw new Exception('The user could not be logged out.' . mysqli_connect_error());
    }
 ?>
