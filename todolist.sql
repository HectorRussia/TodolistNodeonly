-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 12, 2023 at 03:06 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `todolist`
--

-- --------------------------------------------------------

--
-- Table structure for table `exercise`
--

CREATE TABLE `exercise` (
  `id` int(10) NOT NULL,
  `Day` varchar(30) COLLATE utf8_bin NOT NULL,
  `name` varchar(50) COLLATE utf8_bin NOT NULL,
  `number_time` varchar(30) COLLATE utf8_bin NOT NULL,
  `number_set` varchar(30) COLLATE utf8_bin NOT NULL,
  `start` time NOT NULL,
  `finish` time NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `exercise`
--

INSERT INTO `exercise` (`id`, `Day`, `name`, `number_time`, `number_set`, `start`, `finish`, `date`) VALUES
(3, 'tuesday', 'push-up', '10', '5 set', '10:00:00', '12:00:00', '2023-09-12 10:48:35');

-- --------------------------------------------------------

--
-- Table structure for table `food_health`
--

CREATE TABLE `food_health` (
  `id` int(10) NOT NULL,
  `Day` varchar(30) COLLATE utf8_bin NOT NULL,
  `morning` varchar(100) COLLATE utf8_bin NOT NULL,
  `noon` varchar(100) COLLATE utf8_bin NOT NULL,
  `evening` varchar(100) COLLATE utf8_bin NOT NULL,
  `total_kcal` varchar(40) COLLATE utf8_bin NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `food_health`
--

INSERT INTO `food_health` (`id`, `Day`, `morning`, `noon`, `evening`, `total_kcal`, `date`) VALUES
(1, 'monday', 'spaketti', 'pizza', 'water', '2400 kcal', '2023-08-28 10:07:16'),
(6, 'wednesday', 'nooddle', 'pizza', 'noodle,shabu', '2400 kcal', '2023-09-12 10:48:03');

-- --------------------------------------------------------

--
-- Table structure for table `height_weight`
--

CREATE TABLE `height_weight` (
  `id` int(11) NOT NULL,
  `Day` varchar(30) COLLATE utf8_bin NOT NULL,
  `weight` varchar(30) COLLATE utf8_bin NOT NULL COMMENT 'หน่วยเป็น kg',
  `height` varchar(30) COLLATE utf8_bin NOT NULL COMMENT 'หน่วยเป็น cm',
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `height_weight`
--

INSERT INTO `height_weight` (`id`, `Day`, `weight`, `height`, `date`) VALUES
(7, '12/9/2023', '80', '170', '2023-09-12 10:48:57');

-- --------------------------------------------------------

--
-- Table structure for table `money`
--

CREATE TABLE `money` (
  `id` int(11) NOT NULL,
  `Day` varchar(100) COLLATE utf8_bin NOT NULL,
  `income` double NOT NULL,
  `expenses` double NOT NULL,
  `investment` double NOT NULL,
  `extrajob` double NOT NULL,
  `savings` double NOT NULL,
  `note` varchar(100) COLLATE utf8_bin NOT NULL,
  `Time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `money`
--

INSERT INTO `money` (`id`, `Day`, `income`, `expenses`, `investment`, `extrajob`, `savings`, `note`, `Time`) VALUES
(1, '31/8/2023', 30000, 10000, 2000, 1000, 19000, '1.travel 5000 2.shopping 5000 3.cypto 2000 4.freelance', '2023-08-31 14:16:52');

-- --------------------------------------------------------

--
-- Table structure for table `personal_g`
--

CREATE TABLE `personal_g` (
  `id` int(10) NOT NULL,
  `goals` varchar(100) COLLATE utf8_bin NOT NULL,
  `namebook` varchar(50) COLLATE utf8_bin NOT NULL,
  `positive` enum('Yes','No') COLLATE utf8_bin NOT NULL,
  `dreams` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `show_bmi`
--

CREATE TABLE `show_bmi` (
  `id` int(10) NOT NULL,
  `weight` double NOT NULL COMMENT 'หน่วย kg',
  `height` double NOT NULL COMMENT 'หน่วย cm',
  `bmi` float NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `show_bmi`
--

INSERT INTO `show_bmi` (`id`, `weight`, `height`, `bmi`, `date`) VALUES
(15, 53, 174, 17.51, '2023-09-12 10:49:17');

-- --------------------------------------------------------

--
-- Table structure for table `success_bmi`
--

CREATE TABLE `success_bmi` (
  `id` int(11) NOT NULL,
  `weight` double NOT NULL,
  `height` double NOT NULL,
  `bmi` float NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `success_bmi`
--

INSERT INTO `success_bmi` (`id`, `weight`, `height`, `bmi`, `date`) VALUES
(6, 80, 174, 26.42, '2023-09-10 14:00:06');

-- --------------------------------------------------------

--
-- Table structure for table `success_exercise`
--

CREATE TABLE `success_exercise` (
  `id` int(11) NOT NULL,
  `Day` varchar(30) COLLATE utf8_bin NOT NULL,
  `name` varchar(50) COLLATE utf8_bin NOT NULL,
  `number_time` varchar(30) COLLATE utf8_bin NOT NULL,
  `number_set` varchar(30) COLLATE utf8_bin NOT NULL,
  `start` time NOT NULL,
  `finish` time NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `success_exercise`
--

INSERT INTO `success_exercise` (`id`, `Day`, `name`, `number_time`, `number_set`, `start`, `finish`, `date`) VALUES
(1, 'tuesday', 'pull-up', '10', '2', '10:00:00', '12:00:00', '2023-09-08 14:07:44'),
(4, 'tuesday', 'pull-up', '10', '2', '10:00:00', '12:00:00', '2023-09-08 14:41:13'),
(5, 'friday', 'pull-up', '10', '5 set', '12:00:00', '13:30:00', '2023-09-08 14:48:04');

-- --------------------------------------------------------

--
-- Table structure for table `success_meal`
--

CREATE TABLE `success_meal` (
  `id` int(11) NOT NULL,
  `Day` varchar(30) COLLATE utf8_bin NOT NULL,
  `morning` varchar(100) COLLATE utf8_bin NOT NULL,
  `noon` varchar(100) COLLATE utf8_bin NOT NULL,
  `evening` varchar(100) COLLATE utf8_bin NOT NULL,
  `total_kcal` varchar(40) COLLATE utf8_bin NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `success_meal`
--

INSERT INTO `success_meal` (`id`, `Day`, `morning`, `noon`, `evening`, `total_kcal`, `date`) VALUES
(11, 'tuesday', 'nooddle', 'cake', 'water', '1100 kcal', '2023-09-05 11:31:36'),
(12, 'tuesday', 'nooddle', 'cake', 'water', '1100 kcal', '2023-09-05 11:35:29'),
(13, 'wednesday', 'kfc', 'mk', 'shabu', '5000 kcal', '2023-09-05 11:37:45');

-- --------------------------------------------------------

--
-- Table structure for table `success_money`
--

CREATE TABLE `success_money` (
  `id` int(10) NOT NULL,
  `Day` varchar(50) COLLATE utf8_bin NOT NULL,
  `income` double NOT NULL,
  `expenses` double NOT NULL,
  `investment` double NOT NULL,
  `extrajob` double NOT NULL,
  `savings` double NOT NULL,
  `note` varchar(100) COLLATE utf8_bin NOT NULL,
  `Time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `success_money`
--

INSERT INTO `success_money` (`id`, `Day`, `income`, `expenses`, `investment`, `extrajob`, `savings`, `note`, `Time`) VALUES
(1, '31/8/2023', 30000, 10000, 9000, 20000, 31000, '1.shoppig 2. buy  food', '2023-09-12 10:28:29');

-- --------------------------------------------------------

--
-- Table structure for table `success_personal`
--

CREATE TABLE `success_personal` (
  `id` int(11) NOT NULL,
  `goals` varchar(100) COLLATE utf8_bin NOT NULL,
  `namebook` varchar(50) COLLATE utf8_bin NOT NULL,
  `positive` enum('Yes','No') COLLATE utf8_bin NOT NULL,
  `dreams` varchar(100) COLLATE utf8_bin NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `success_personal`
--

INSERT INTO `success_personal` (`id`, `goals`, `namebook`, `positive`, `dreams`, `date`) VALUES
(2, 'go to bangkok', 'rich rich', 'Yes', 'i\'m will live  in EU', '2023-09-12 09:04:24');

-- --------------------------------------------------------

--
-- Table structure for table `success_travel`
--

CREATE TABLE `success_travel` (
  `id` int(11) NOT NULL,
  `name_place` varchar(100) COLLATE utf8_bin NOT NULL,
  `start_tip` varchar(30) COLLATE utf8_bin NOT NULL,
  `end_tip` varchar(30) COLLATE utf8_bin NOT NULL,
  `vehicles` varchar(50) COLLATE utf8_bin NOT NULL,
  `plan_tip` varchar(100) COLLATE utf8_bin NOT NULL,
  `money_tip` varchar(40) COLLATE utf8_bin NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `success_travel`
--

INSERT INTO `success_travel` (`id`, `name_place`, `start_tip`, `end_tip`, `vehicles`, `plan_tip`, `money_tip`, `date`) VALUES
(1, 'bangkok', 'january 21 , 2023', 'january 27 , 2023', 'private car', 'sleep only because i\'m lazy', '800 bath', '2023-09-10 14:37:52'),
(2, 'bangkok', 'january 20 , 2023', 'january 27 , 2023', 'private car', '1.sleep 2.paty babeq 3.go to the mall', '2000 bath', '2023-09-12 08:09:24');

-- --------------------------------------------------------

--
-- Table structure for table `success_weight`
--

CREATE TABLE `success_weight` (
  `id` int(11) NOT NULL,
  `Day` varchar(30) COLLATE utf8_bin NOT NULL,
  `weight` varchar(30) COLLATE utf8_bin NOT NULL,
  `height` varchar(30) COLLATE utf8_bin NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `success_weight`
--

INSERT INTO `success_weight` (`id`, `Day`, `weight`, `height`, `date`) VALUES
(4, '25/8/2023', '80', '170', '2023-09-08 16:45:40'),
(5, '23/4/2023', '80', '174', '2023-09-10 13:57:39');

-- --------------------------------------------------------

--
-- Table structure for table `success_work`
--

CREATE TABLE `success_work` (
  `id` int(11) NOT NULL,
  `Topic` varchar(50) COLLATE utf8_bin NOT NULL,
  `Start` varchar(30) COLLATE utf8_bin NOT NULL,
  `deadline` varchar(30) COLLATE utf8_bin NOT NULL,
  `content` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `success_work`
--

INSERT INTO `success_work` (`id`, `Topic`, `Start`, `deadline`, `content`) VALUES
(1, 'meeting about back-end', '6/5/2023', '2/5/2023', 'Tell everyone to come to an urgent meeting.');

-- --------------------------------------------------------

--
-- Table structure for table `travel`
--

CREATE TABLE `travel` (
  `id` int(10) NOT NULL,
  `name_place` varchar(100) COLLATE utf8_bin NOT NULL,
  `start_tip` varchar(30) COLLATE utf8_bin NOT NULL,
  `end_tip` varchar(30) COLLATE utf8_bin NOT NULL,
  `vehicles` varchar(50) COLLATE utf8_bin NOT NULL,
  `plan_tip` varchar(100) COLLATE utf8_bin NOT NULL,
  `money_tip` varchar(50) COLLATE utf8_bin NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `travel`
--

INSERT INTO `travel` (`id`, `name_place`, `start_tip`, `end_tip`, `vehicles`, `plan_tip`, `money_tip`, `date`) VALUES
(6, 'pattaya', 'september 20 , 2023', 'september 26 , 2023', 'private car', '1.go to sea 2.party 3.sleep', '3000 bath', '2023-09-12 08:11:22');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_thai_520_w2 NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_thai_520_w2 NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_thai_520_w2 NOT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_thai_520_w2 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`) VALUES
(11, 'catcat', 'bigcat@hotmail.com', 'Nl9itap9PAIAHZqcEIn3wSmGVUQspmNZH80C0ev5O/M=', '0877665454'),
(12, 'Ponkrit', 'mango@hotmail.com', 'nW8XaBHbAq6Kz+3uAePrIIr6OMnBkqQaU6/pEHnne7Y=', '0834356273'),
(13, 'Ponkrit_LoveCat&Dog', 'Horneiei@hotmail.com', 'Qc8KivW3K6evXE5O9RO/31FHRIvLF5L0+8Z8ZrY8Oag=', '086435925');

-- --------------------------------------------------------

--
-- Table structure for table `working`
--

CREATE TABLE `working` (
  `id` int(11) NOT NULL,
  `Topic` varchar(50) COLLATE utf8_bin NOT NULL,
  `Start` varchar(50) COLLATE utf8_bin NOT NULL,
  `deadline` varchar(50) COLLATE utf8_bin NOT NULL,
  `content` varchar(200) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `working`
--

INSERT INTO `working` (`id`, `Topic`, `Start`, `deadline`, `content`) VALUES
(6, 'test_RESTAPI', '6/5/2023', '27/8/2023', 'test web and tell team'),
(8, 'test_RESTAPI', '22/8/2023', '27/8/2023', 'dsadsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `exercise`
--
ALTER TABLE `exercise`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `food_health`
--
ALTER TABLE `food_health`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `height_weight`
--
ALTER TABLE `height_weight`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `money`
--
ALTER TABLE `money`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_g`
--
ALTER TABLE `personal_g`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `show_bmi`
--
ALTER TABLE `show_bmi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `success_bmi`
--
ALTER TABLE `success_bmi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `success_exercise`
--
ALTER TABLE `success_exercise`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `success_meal`
--
ALTER TABLE `success_meal`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `success_money`
--
ALTER TABLE `success_money`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `success_personal`
--
ALTER TABLE `success_personal`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `success_travel`
--
ALTER TABLE `success_travel`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `success_weight`
--
ALTER TABLE `success_weight`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `success_work`
--
ALTER TABLE `success_work`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `travel`
--
ALTER TABLE `travel`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `working`
--
ALTER TABLE `working`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `exercise`
--
ALTER TABLE `exercise`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `food_health`
--
ALTER TABLE `food_health`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `height_weight`
--
ALTER TABLE `height_weight`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `money`
--
ALTER TABLE `money`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `personal_g`
--
ALTER TABLE `personal_g`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `show_bmi`
--
ALTER TABLE `show_bmi`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `success_bmi`
--
ALTER TABLE `success_bmi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `success_exercise`
--
ALTER TABLE `success_exercise`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `success_meal`
--
ALTER TABLE `success_meal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `success_money`
--
ALTER TABLE `success_money`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `success_personal`
--
ALTER TABLE `success_personal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `success_travel`
--
ALTER TABLE `success_travel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `success_weight`
--
ALTER TABLE `success_weight`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `success_work`
--
ALTER TABLE `success_work`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `travel`
--
ALTER TABLE `travel`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `working`
--
ALTER TABLE `working`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
