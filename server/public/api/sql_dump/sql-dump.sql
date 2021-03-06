-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 09, 2019 at 08:54 PM
-- Server version: 5.7.26-0ubuntu0.18.04.1
-- PHP Version: 7.2.17-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kronostory_template`
--

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `title` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` mediumint(8) UNSIGNED NOT NULL,
  `primary_image` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `secondary_images` text COLLATE utf8_unicode_ci NOT NULL,
  `timeline_description` varchar(140) COLLATE utf8_unicode_ci NOT NULL,
  `category` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `status` enum('published','deleted') COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`id`, `title`, `description`, `date_created`, `user_id`, `primary_image`, `secondary_images`, `timeline_description`, `category`, `status`) VALUES
(1, 'Tomato Growing', 'I have been a tomato grower since 2008 when I grew my first tomatoes from seed. Growing tomatoes from seed takes time and care, but ultimately it is not hard and the results are well worth it. You will need either a grow light setup (cheap shop lights) or a south-facing window that gets plenty of sun (if you live in the southern hemisphere, you will need a north-facing window).', '2019-06-27 17:43:02', 1, 'https://bit.ly/2MN5S19', '[\'https://bit.ly/2I3x8CZ\', \'https://bit.ly/2I3x8CZ\']', 'My tomato growing timeline', 'gardening', 'published');

-- --------------------------------------------------------

--
-- Table structure for table `project_items`
--

CREATE TABLE `project_items` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `title` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `project_id` mediumint(8) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `project_items`
--

INSERT INTO `project_items` (`id`, `title`, `image`, `project_id`) VALUES
(1, 'Shovel', 'https://bit.ly/2EGK0hp', 1),
(2, 'Miracle Gro', 'https://bit.ly/2HLcp8a', 1),
(3, 'Trimmer', 'https://bit.ly/2XflJGN', 1),
(4, 'Tomato Seeds', 'https://bit.ly/2XkCT5K', 1),
(5, 'Bug Spray', 'https://bit.ly/2Zm1d7R', 1);

-- --------------------------------------------------------

--
-- Table structure for table `timeline_entries`
--

CREATE TABLE `timeline_entries` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `primary_image` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `project_id` mediumint(8) UNSIGNED NOT NULL,
  `secondary_images` text COLLATE utf8_unicode_ci NOT NULL,
  `date` varchar(40) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `timeline_entries`
--

INSERT INTO `timeline_entries` (`id`, `title`, `description`, `primary_image`, `project_id`, `secondary_images`, `date`) VALUES
(1, 'Week 1 - Getting the Seeds', 'First, you need to get your seeds from a good source. I prefer online seed stores that accept PayPal, but this is just my personal preference. You can find tomato seeds in the garden center at places like Wal-Mart and Lowes. I buy mine from Tomatobob.com, who sells only heirloom seeds.', 'https://bit.ly/2WGmcAs', 1, '[\'https://bit.ly/2Kb1VR9\', \'https://bit.ly/2Kb1VR9\']', '01/31/19'),
(2, 'Week 2 - When to Plant', 'Tomatoes are typically sown 6 to 8 weeks before the last anticipated frost. Some say to sow them later, more like 5 weeks before the last frost, but either will work. Keep in mind that the earlier you start, the larger the plants will be when you plant them out.', 'https://bit.ly/2IdGvBg', 1, '[\'https://bit.ly/2KbeRX4\', \'https://bit.ly/2KbeRX4\']', '03/14/19'),
(3, 'Week 3 - Start the Seeds', '\"Use seed starting mix, such as Miracle Gro or Jiffy Mix, to start your seeds. Fill a bowl with some mix and knead in some water till the mix is saturated but not soggy. I use egg cartons to start my seeds in. You can use either the clear plastic or Styrofoam cartons; do NOT use the paper ones. Fill the trays with seed mix and firm the mix down into the cells.', 'https://bit.ly/2HLCjsB', 1, '', '06/11/19'),
(4, 'Week 4 - Germination', 'Keep your trays moist and warm to speed germination. Loosely fit plastic wrap over the tops of the trays, to keep water in but still allow for air circulation. Light is not required to germinate seeds. In anywhere from 3 to 15 days, you should start to see tiny seedlings emerge.', 'https://bit.ly/2YYetj1', 1, '', '06/18/19'),
(5, 'Week 5 - Growing', 'The tomatoes are finally growing. My hard work paid off. As the plants grow, I trim all the lower leaves off the bottom 12 inches of the stem. This helps to keep diseases from spreading from the soil to foliage.\r\n', 'https://bit.ly/2wNGjCv', 1, '', '7/02/19');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `first_name` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(65) COLLATE utf8_unicode_ci NOT NULL,
  `date_joined` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `email` varchar(64) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `first_name`, `last_name`, `username`, `password`, `date_joined`, `email`) VALUES
(1, 'John', 'Doe', 'guest', 'pass', '2019-06-11 19:36:21', 'guest@guest.guest');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `project_items`
--
ALTER TABLE `project_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `timeline_entries`
--
ALTER TABLE `timeline_entries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `project_items`
--
ALTER TABLE `project_items`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `timeline_entries`
--
ALTER TABLE `timeline_entries`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
