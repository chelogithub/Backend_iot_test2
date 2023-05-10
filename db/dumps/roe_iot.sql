
-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: mysql-server
-- Tiempo de generación: 30-11-2020 a las 23:27:10
-- Versión del servidor: 5.7.27
-- Versión de PHP: 7.2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `DAM`
--
CREATE DATABASE IF NOT EXISTS `roe_iot` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `roe_iot`;

-- --------------------------------------------------------

--
-- Table structure for table `Dispositivos`
--

CREATE TABLE `Dispositivos` (
  `devId` int(11) NOT NULL,
  `dispositivoId` int(11) NOT NULL,
  `serieNro` int(11) NOT NULL,
  `nombre` varchar(200) DEFAULT NULL,
  `ubicacion` varchar(200) DEFAULT NULL,
  `sampling` int(4) DEFAULT NULL,
  `canal1` tinyint(4) DEFAULT NULL,
  `canal2` tinyint(4) DEFAULT NULL,
  `temperatura` float DEFAULT NULL,
  `humedad` float DEFAULT NULL,
  `presion` float DEFAULT NULL,
  `topico` varchar(200) DEFAULT NULL,
  `topicoServ` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Dumping data for table `Dispositivos`
--

-- INSERT INTO `Dispositivos` (`devId`, `dispositivoId`, `serieNro`, `nombre`, `ubicacion`, `sampling`, `canal1`, `canal2`, `temperatura`, `humedad`, `presion`, `topico`, `topicoServ`) VALUES
-- (0, 0,1234,'Dispositivo prueba','Ubicacion prueba',30,1,1,1,1,1,'/test/test','/serv/serv');
--
-- Indexes for dumped tables
--

--
-- Indexes for table `Dispositivos`
--
ALTER TABLE `Dispositivos`
  ADD PRIMARY KEY (`devId`);
COMMIT;
--
-- AUTO_INCREMENT for table `Dispositivos`
--
ALTER TABLE `Dispositivos`
  MODIFY `devId` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

--
-- Table structure for table `logNodos`
--

CREATE TABLE `logNodos` (
  `logId` int(11) NOT NULL,
  `dispositivoId` int(11) NOT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `canal1` tinyint(4) NOT NULL,
  `canal2` tinyint(4) NOT NULL,
  `temperatura` float DEFAULT NULL,
  `humedad` float DEFAULT NULL,
  `presion` float DEFAULT NULL,
  `topico` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `logNodos`
--

-- INSERT INTO `logNodos` (`logId`, `dispositivoId`, `timestamp`, `canal1`, `canal2`, `temperatura`, `humedad`, `presion`, `topico`) VALUES
-- (0, 2, '2022-12-12 23:08:12', 1, 1, 28, 49, 1020, '/def/def');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `logNodos`
--
ALTER TABLE `logNodos`
  ADD PRIMARY KEY (`logId`);
COMMIT;

ALTER TABLE `logNodos`
  MODIFY `logId` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;


