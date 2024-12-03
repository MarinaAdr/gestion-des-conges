-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 03, 2024 at 01:10 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gestion_conge`
--

-- --------------------------------------------------------

--
-- Table structure for table `conges`
--

CREATE TABLE `conges` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date_debut` date NOT NULL,
  `date_fin` date NOT NULL,
  `motif` text NOT NULL,
  `statut` enum('en_attente','approuve','refuse') DEFAULT 'en_attente',
  `date_creation` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `conges`
--

INSERT INTO `conges` (`id`, `user_id`, `date_debut`, `date_fin`, `motif`, `statut`, `date_creation`) VALUES
(7, 37, '2024-11-15', '2024-11-22', '', 'refuse', '2024-11-29 06:29:34'),
(8, 37, '2024-11-14', '2024-11-18', '', 'en_attente', '2024-11-29 06:30:49'),
(10, 37, '2024-11-22', '2024-11-23', 'test', 'en_attente', '2024-11-29 06:32:57'),
(11, 37, '2024-11-08', '2024-11-16', 'test', 'en_attente', '2024-11-29 06:35:22'),
(12, 37, '2024-11-30', '2024-12-02', 'test', 'approuve', '2024-11-29 06:55:10'),
(13, 37, '2024-11-01', '2024-11-04', '', 'approuve', '2024-11-29 07:04:19'),
(14, 37, '2024-11-12', '2024-11-14', 'rdv médical', 'approuve', '2024-11-29 07:05:34'),
(16, 60, '2024-11-13', '2024-11-20', 'rdv', 'en_attente', '2024-11-29 09:01:58'),
(17, 37, '2024-12-03', '2024-12-05', 'perso', 'refuse', '2024-12-02 07:32:52'),
(18, 37, '2024-12-02', '2024-12-04', 'test mail', 'approuve', '2024-12-02 08:23:15'),
(19, 37, '2024-12-20', '2024-12-20', 'test mail', 'en_attente', '2024-12-02 08:26:24'),
(20, 37, '2024-12-11', '2024-12-13', 'test', 'en_attente', '2024-12-02 09:28:38'),
(21, 37, '2024-12-03', '2024-12-05', 'test', 'en_attente', '2024-12-03 11:11:16'),
(22, 37, '2024-12-03', '2024-12-05', 'test mail', 'en_attente', '2024-12-03 11:18:31'),
(23, 37, '2024-12-05', '2024-12-06', 'calcul de date', 'en_attente', '2024-12-03 11:28:09'),
(24, 37, '2024-12-05', '2024-12-09', 'calcul', 'en_attente', '2024-12-03 11:28:46'),
(25, 37, '2024-12-10', '2024-12-16', 'test hors weekend', 'en_attente', '2024-12-03 11:30:53'),
(26, 37, '2024-12-03', '2024-12-06', 'test', 'en_attente', '2024-12-03 11:33:09'),
(27, 37, '2024-12-10', '2024-12-17', 'test', 'approuve', '2024-12-03 11:33:42');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('ADMIN','EMPLOYEE') DEFAULT 'EMPLOYEE',
  `date_embauche` date NOT NULL,
  `poste` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `solde_conge` decimal(10,2) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `contact` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nom`, `prenom`, `email`, `password`, `role`, `date_embauche`, `poste`, `created_at`, `updated_at`, `solde_conge`, `image`, `contact`) VALUES
(10, 'test', 'test', 'test3@gmail.com', '$2a$10$VU1NoIB6QOcEhq5k7f7e7.g0NLVvIZIIW4B9f5DrPCCDQoOmi6fkm', 'EMPLOYEE', '2024-10-31', 'testeur', '2024-11-21 05:50:58', '2024-11-21 05:50:58', NULL, NULL, NULL),
(26, 'Claudia', 'test', 'claude@gmail.com', '$2a$10$vDPYtLYnVQ77hovNvaAbXu5AXsspOMWMx4NQB/WgvMlCIvgBnEGJK', 'EMPLOYEE', '2024-11-12', 'testeur', '2024-11-21 06:00:51', '2024-11-29 12:53:43', NULL, NULL, '0359425201'),
(28, 'test', 'tes', 'marinaclaudia003@gm.com', '$2a$10$/tekP5O5znqbui.d8qjVL.OxlJGWhKks6abWAH7W93GIwNMp0cyEi', 'EMPLOYEE', '2024-11-07', 'testeur', '2024-11-21 06:01:35', '2024-11-21 06:01:35', NULL, NULL, NULL),
(31, 'test', 'test', 'test12@gmail.com', '$2a$10$lvLAcongR2vUHAyttZY2luNNpH0os2h3Xqp7dYmlFhABRcBHmiy5i', 'EMPLOYEE', '2024-10-31', 'testeur', '2024-11-21 06:08:18', '2024-11-21 06:08:18', NULL, NULL, NULL),
(32, 'Claudia', 'ANDRIA', 'test@gmail.com', '$2a$10$nquqQxz3JhuG6QE4XYpgB.HYzzuD3V8ZuLQZOK6qnOwbr4E.5bwLS', 'ADMIN', '2024-11-05', 'testeur', '2024-11-21 06:10:25', '2024-11-29 12:55:14', 25.00, NULL, '0341586462'),
(37, 'Claudia', 'Marina', 'claudia@gmail.com', '$2a$10$tUmRPyu.Gn7S0tHQ7pngZej9pBVjSOsa1LDmPiN6LqBsy3wmfsQCa', 'EMPLOYEE', '2024-10-26', 'dev', '2024-11-21 06:11:29', '2024-12-03 12:06:53', 22.00, '1732858407528-158755423.jfif', '0359425208'),
(38, 'Inscription test ', 'tes', 'mlaudia003@gmail.com', '$2a$10$dfDFcJeyNDZbsfMMAaiftuiYE3VNTuBlND/uhqVwjUJzpYZ.ebop6', 'EMPLOYEE', '2024-11-15', 'kjjjjjjjj', '2024-11-21 06:15:58', '2024-11-21 06:15:58', NULL, NULL, NULL),
(59, 'test', 'test', 'testgrh@gmail.com', '$2a$10$XuFn/ENU6fDEeDpMvhYYVuBRVx2.uYOzgKOUnhOqFDzhfWSsUtHzO', 'EMPLOYEE', '2024-11-21', 'testeur', '2024-11-21 06:45:24', '2024-11-21 06:45:24', NULL, NULL, NULL),
(60, 'Inscription test ', 'test', 'testsdezr@gmail.com', '$2a$10$3fd.DFtNk2s8pvfjZHo6e.GsLPAVbCCbNWOs/onkV9Zixl1bMombe', 'EMPLOYEE', '2024-11-08', 'testeur', '2024-11-21 06:51:39', '2024-11-21 06:51:39', NULL, NULL, NULL),
(63, 'test', 'test', 'testeur@gmail.com', '$2a$10$n/Po.qgJoc3Yx0KwL.suT.AI6Pqa9r2CbckDBABbucoW.xnGu.lDu', 'EMPLOYEE', '2024-11-12', 'testeur', '2024-11-21 07:25:39', '2024-11-26 07:04:22', 10.00, '1732604662127-505258805.png', '78951254'),
(67, 'Admin', 'Jean', 'admin@gmail.com', '$2a$10$n/Po.qgJoc3Yx0KwL.suT.AI6Pqa9r2CbckDBABbucoW.xnGu.lDu', 'ADMIN', '2024-11-21', 'test', '2024-11-21 09:21:50', '2024-11-21 09:52:03', NULL, NULL, NULL),
(70, 'Jeaneeee', 'Dupont', 'jean.dupont@example.com', '$2a$10$YQPn01N/m1W.Jtt3x3Imt.XVVuW.xyyQH18zQJO/69VU/R6ctUiHm', 'EMPLOYEE', '2024-03-20', 'Développeur', '2024-11-29 12:03:23', '2024-11-29 12:35:18', 10.00, NULL, '+33612345678'),
(71, 'Marina', 'Marinaa', 'marinlaudia003@gmail.com', '$2a$10$qNbIqiqjzieEn/KqKXz1bubwT1lZ1IwdKCGVZh.mtpLLzz7c3GJOq', 'EMPLOYEE', '2024-11-08', 'devops', '2024-11-29 12:22:11', '2024-11-29 12:22:11', 10.00, NULL, '0359485278'),
(72, 'Miora', 'Rakotomalala', 'miora@gmail.com', '$2a$10$qiyIEl7wDHQEmkbw3mqDQOcK7x2qxX0Ev51Ee36yuKBE6tXoy9MYK', 'EMPLOYEE', '2024-11-15', 'dev', '2024-11-29 12:23:37', '2024-11-29 12:23:37', 10.00, NULL, '0359488578'),
(74, 'Kanto', 'Chan', 'chan@gmail.com', '$2a$10$Athxwj8iNOUcmKNkzZ8CH.awzSoGyDQ3.v/tfkktBb7/SpwKFUpfO', 'EMPLOYEE', '2024-11-22', 'dev', '2024-11-29 12:58:20', '2024-11-29 12:58:20', 10.00, NULL, '0359425201'),
(96, 'Marina', 'Marinaa', 'marinaclaua@gmail.com', '$2a$10$8kauaM5HwYyPVrJHwo5KFu0u4KV/cIZfS1G40hAHI5SOsTmrFL0AO', 'EMPLOYEE', '2024-12-12', 'testeur', '2024-12-02 07:13:21', '2024-12-02 07:13:21', 10.00, NULL, '0359485278'),
(97, 'Marina', 'Marinaa', 'marinacla@gmail.com', '$2a$10$2uRvEEvYiTcZpVDA8FJyPu8UP85HxT2Wz3H5R0JWiEZYyERPB4v9a', 'EMPLOYEE', '2024-12-12', 'testeur', '2024-12-02 07:14:57', '2024-12-02 07:14:57', 10.00, NULL, '0359485278'),
(98, 'Marina', 'Marinaa', 'marinacl77a@gmail.com', '$2a$10$kdUBhnpM8quoKjShBYrB7O1J5v6LBReZt3aug2BGc06d.GtGtq0nm', 'EMPLOYEE', '2024-12-12', 'testeur', '2024-12-02 07:17:22', '2024-12-02 07:17:22', 10.00, NULL, '0359485278'),
(99, 'Marina', 'Marinaa', 'marinl77a@gmail.com', '$2a$10$PsOhfughL0X/TFdrDc/AL.v6OpNjXNgM16Xo2JUJMFYDfZCNb06gm', 'EMPLOYEE', '2024-12-12', 'testeur', '2024-12-02 07:19:10', '2024-12-02 07:19:10', 10.00, NULL, '0359485278'),
(100, 'Claudia', 'Marinaa', 'marinaclaa@gmail.com', '$2a$10$Zx8kfVH8paA/iqTR9UvptOFUzwzxXPoY/iQvhjPGa2lw50aMFCScK', 'EMPLOYEE', '2024-12-17', 'testeur', '2024-12-02 07:22:47', '2024-12-02 07:22:47', 10.00, NULL, '0359424589');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `conges`
--
ALTER TABLE `conges`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `conges`
--
ALTER TABLE `conges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `conges`
--
ALTER TABLE `conges`
  ADD CONSTRAINT `conges_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
