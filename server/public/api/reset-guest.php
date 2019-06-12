<?php 
    require_once './db_connection.php';
    require_once './functions.php';

    set_exception_handler("error_handler");

    startup();

    if(!$conn){
        throw new Exception('there is an error' . mysqli_connect_error());
    };

    $findGuestProjects = "SELECT `id` FROM `project` WHERE `user_id` = 1";
    $guestProjectIds = mysqli_query($conn, $findGuestProjects);
    
    if($guestProjectIds) {
        while($row = mysqli_fetch_assoc($guestProjectIds)) {
            $rowId = $row['id'];
            $deleteGuestItems = "DELETE FROM `project_items` WHERE `project_id` = {$rowId}";
            $deleteGuestTimeline = "DELETE FROM `timeline_entries` WHERE `project_id` = {$rowId}";
            mysqli_query($conn, $deleteGuestItems);
            mysqli_query($conn, $deleteGuestTimeline);
        };

        $deleteGuestProjects = "DELETE FROM `project` WHERE `user_id` = 1";
        $deleteResponse = mysqli_query($conn, $deleteGuestProjects);

        if ($deleteResponse) {
            $postGuestProjectQuery = "INSERT INTO `project` (`id`, `title`, `description`, `date_created`, `user_id`, `primary_image`, `secondary_images`, `timeline_description`, `category`, `status`) VALUES
            (1, 'Tomato Growing', 'I have been a tomato grower since 2008 when I grew my first tomatoes from seed. Growing tomatoes from seed takes time and care, but ultimately it is not hard and the results are well worth it. You will need either a grow light setup (cheap shop lights) or a south-facing window that gets plenty of sun (if you live in the southern hemisphere, you will need a north-facing window).', '2019-06-05 21:36:36', 1, 'https://bit.ly/2I3x8CZ', '[\'https://bit.ly/2I3x8CZ\', \'https://bit.ly/2I3x8CZ\']', 'checkout our images', 'Gardening', 'published')";

            $postGuestItemsQuery = "INSERT INTO `project_items` (`id`, `title`, `image`, `project_id`) VALUES
            (1, 'Shovel', 'https://bit.ly/2EGK0hp', 1),
            (2, 'Miracle Gro', 'https://bit.ly/2HLcp8a', 1),
            (3, 'Trimmer', 'https://bit.ly/2XflJGN', 1),
            (4, 'Tomato Seeds', 'https://bit.ly/2XkCT5K', 1)";

            $postGuestTimelineQuery = "INSERT INTO `timeline_entries` (`id`, `title`, `description`, `primary_image`, `project_id`, `secondary_images`, `date`) VALUES
            (1, 'Week 1 - Getting the Seeds', 'First, you need to get your seeds from a good source. I prefer online seed stores that accept PayPal, but this is just my personal preference. You can find tomato seeds in the garden center at places like Wal-Mart and Lowes. I buy mine from Tomatobob.com, who sells only heirloom seeds.', 'https://bit.ly/2Kb1VR9', 1, '[\'https://bit.ly/2Kb1VR9\', \'https://bit.ly/2Kb1VR9\']', '01/31/19'),
            (2, 'Week 2 - When to Plant', 'Tomatoes are typically sown 6 to 8 weeks before the last anticipated frost. Some say to sow them later, more like 5 weeks before the last frost, but either will work. Keep in mind that the earlier you start, the larger the plants will be when you plant them out.', 'https://bit.ly/2KbeRX4', 1, '[\'https://bit.ly/2KbeRX4\', \'https://bit.ly/2KbeRX4\']', '03/14/19'),
            (6, 'Week 3 - Start the Seeds', '\"Use seed starting mix, such as Miracle Gro or Jiffy Mix, to start your seeds. Fill a bowl with some mix and knead in some water till the mix is saturated but not soggy. I use egg cartons to start my seeds in. You can use either the clear plastic or Styrofoam cartons; do NOT use the paper ones. Fill the trays with seed mix and firm the mix down into the cells.', 'https://bit.ly/2HLCjsB', 1, '', '06/11/19'),
            (7, 'Week 4 - Germination', 'Keep your trays moist and warm to speed germination. Loosely fit plastic wrap over the tops of the trays, to keep water in but still allow for air circulation. Light is not required to germinate seeds. In anywhere from 3 to 15 days, you should start to see tiny seedlings emerge.', 'https://bit.ly/2YYetj1', 1, '', '06/18/19')";

            mysqli_query($conn, $postGuestProjectQuery);
            mysqli_query($conn, $postGuestItemsQuery);
            mysqli_query($conn, $postGuestTimelineQuery);
        }
    }
?>