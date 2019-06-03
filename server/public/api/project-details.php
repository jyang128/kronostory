<?php
require_once './db_connection.php';
require_once './functions.php';

set_exception_handler("error_handler");

startup();

if(!$conn){
  throw new Exception('there is an error' . mysqli_connect_error());
}


$projectId = $_GET['id'];

$query = "SELECT p.`id`, p.`title` AS project_title, p.`description` AS project_description, p.`date_created`, p.`primary_image`, p.`secondary_images`, p.`category`, u.`username` 
FROM `project` AS p 
JOIN `user` AS u 
ON p.`user_id` = u.`id`
WHERE p.`id` = {$projectId}";

$itemQuery = "SELECT pi.`id` AS project_item_id, pi.`title` AS project_item_title, pi.`image` AS project_item_image 
FROM `project_items` AS pi
WHERE `project_id` = $projectId";

$timelineQuery = "SELECT te.`id` AS timeline_id, te.`title` AS timeline_entry_title, te.`date`, te.`description` AS timeline_description, te.`primary_image` AS timeline_primary_image
FROM `timeline_entries` AS te
WHERE `project_id` = $projectId
ORDER BY `date` ASC";

if ($result = mysqli_query($conn, $query)) {
    $numRows = mysqli_num_rows($result);
    $itemResult = mysqli_query($conn, $itemQuery);
    $timelineResult = mysqli_query($conn, $timelineQuery);

} else {
    throw new Exception('there is an error' . mysqli_connect_error());
}

if ($numRows === 0) {
  throw new Exception("no projects!");
}

$output = [];

while ($row = mysqli_fetch_assoc($result)) {
  
  $row['items_used'] = [];
  $row['timeline_entry'] = [];
  while ($itemRow = mysqli_fetch_assoc($itemResult)) {
    array_push($row['items_used'], $itemRow);
  }
  while ($timelineRow = mysqli_fetch_assoc($timelineResult)) {
    array_push($row['timeline_entry'], $timelineRow);
  }

  $output[] = $row;
}

$json_output = json_encode($output);
print $json_output;

?>

