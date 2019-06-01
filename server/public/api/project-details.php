<?php
require_once './db_connection.php';
require_once './functions.php';

set_exception_handler("error_handler");

startup();

if(!$conn){
  throw new Exception('there is an error' . mysqli_connect_error());
}

$query = "SELECT te.title AS 'timeline entry title', te.description AS 'timeline entries description', te.primary_image AS 'timeline primary image', pi.title AS 'project item title', pi.image AS 'project item image', p.title AS 'project title', p.description AS 'project description', u.username, p.primary_image AS 'project primary image', p.secondary_images AS 'project secondary image', p.timeline_description AS 'timeline description' FROM `project` AS p JOIN `user` AS u ON p.user_id=u.id JOIN `project_items` AS pi ON pi.project_id=p.id JOIN `timeline_entries` AS te`";

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
