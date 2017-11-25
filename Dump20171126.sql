-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: animalgo
-- ------------------------------------------------------
-- Server version	5.7.20-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `area`
--

DROP TABLE IF EXISTS `area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `area` (
  `id` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area`
--

LOCK TABLES `area` WRITE;
/*!40000 ALTER TABLE `area` DISABLE KEYS */;
INSERT INTO `area` VALUES ('mapogu','마포구'),('songpagu','송파구');
/*!40000 ALTER TABLE `area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cafe_images`
--

DROP TABLE IF EXISTS `cafe_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cafe_images` (
  `image_id` int(11) NOT NULL,
  `id` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  PRIMARY KEY (`image_id`),
  KEY `fk_images_cafe_list1_idx` (`id`),
  CONSTRAINT `fk_images_cafe_list1` FOREIGN KEY (`id`) REFERENCES `cafe_list` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cafe_images`
--

LOCK TABLES `cafe_images` WRITE;
/*!40000 ALTER TABLE `cafe_images` DISABLE KEYS */;
INSERT INTO `cafe_images` VALUES (1,'cloud','../img/sky-1.jpg'),(2,'cloud','../img/sky-2.jpg'),(3,'cloud','../img/sky-3.jpg');
/*!40000 ALTER TABLE `cafe_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cafe_info`
--

DROP TABLE IF EXISTS `cafe_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cafe_info` (
  `info_id` int(11) NOT NULL,
  `id` varchar(100) NOT NULL,
  `info` varchar(100) NOT NULL,
  PRIMARY KEY (`info_id`),
  KEY `fk_cafe_info_cafe_list1_idx` (`id`),
  CONSTRAINT `fk_cafe_info_cafe_list1` FOREIGN KEY (`id`) REFERENCES `cafe_list` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cafe_info`
--

LOCK TABLES `cafe_info` WRITE;
/*!40000 ALTER TABLE `cafe_info` DISABLE KEYS */;
INSERT INTO `cafe_info` VALUES (1,'cloud','애견카페'),(2,'cloud','카페음료로 계산: 7500원~'),(3,'cloud','02)978-4567'),(4,'cloud','12PM ~ 22PM 매월 셋째주 수요일 휴무'),(5,'cloud','홍대'),(6,'cloud','주차공간이 협소하오니 대중교통을 이용하시길 권합니다.');
/*!40000 ALTER TABLE `cafe_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cafe_list`
--

DROP TABLE IF EXISTS `cafe_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cafe_list` (
  `id` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `background` varchar(150) DEFAULT NULL,
  `summary` varchar(100) DEFAULT NULL,
  `area_id` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cafe_list_area1_idx` (`area_id`),
  CONSTRAINT `fk_cafe_list_area1` FOREIGN KEY (`area_id`) REFERENCES `area` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cafe_list`
--

LOCK TABLES `cafe_list` WRITE;
/*!40000 ALTER TABLE `cafe_list` DISABLE KEYS */;
INSERT INTO `cafe_list` VALUES ('cloud','구름뜬하늘','../img/sky-1.jpg','구름이와 하늘이','mapogu');
/*!40000 ALTER TABLE `cafe_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cafe_location`
--

DROP TABLE IF EXISTS `cafe_location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cafe_location` (
  `id` varchar(100) NOT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `cafeid` FOREIGN KEY (`id`) REFERENCES `cafe_list` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cafe_location`
--

LOCK TABLES `cafe_location` WRITE;
/*!40000 ALTER TABLE `cafe_location` DISABLE KEYS */;
INSERT INTO `cafe_location` VALUES ('cloud',37.555087,126.926846);
/*!40000 ALTER TABLE `cafe_location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cafe_traffic`
--

DROP TABLE IF EXISTS `cafe_traffic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cafe_traffic` (
  `traffic_id` int(11) NOT NULL,
  `id` varchar(100) NOT NULL,
  `bus` varchar(100) DEFAULT NULL,
  `subway` varchar(100) DEFAULT NULL,
  `car` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`traffic_id`),
  KEY `cafe_id_idx` (`id`),
  CONSTRAINT `cafe_id` FOREIGN KEY (`id`) REFERENCES `cafe_list` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cafe_traffic`
--

LOCK TABLES `cafe_traffic` WRITE;
/*!40000 ALTER TABLE `cafe_traffic` DISABLE KEYS */;
INSERT INTO `cafe_traffic` VALUES (1,'cloud','153, 143, 162 승차 후 서강대학교 정류장에서 하차','2호선 신촌역 6번출구에서 600M','홍대입구역에서 서교동교회 방면으로 5분');
/*!40000 ALTER TABLE `cafe_traffic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clinic_location`
--

DROP TABLE IF EXISTS `clinic_location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clinic_location` (
  `id` varchar(150) NOT NULL,
  `name` varchar(200) NOT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  `telephone` varchar(100) NOT NULL,
  `address` varchar(200) NOT NULL,
  `area_id` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `area_idx` (`area_id`),
  CONSTRAINT `area` FOREIGN KEY (`area_id`) REFERENCES `area` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clinic_location`
--

LOCK TABLES `clinic_location` WRITE;
/*!40000 ALTER TABLE `clinic_location` DISABLE KEYS */;
INSERT INTO `clinic_location` VALUES ('jonghab','잠실종합동물병원',37.5023506,127.1102362,'02-415-7585','서울특별시 송파구 송파대로 388 창영빌딩 1층','songpagu');
/*!40000 ALTER TABLE `clinic_location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member` (
  `uid` varchar(200) NOT NULL,
  `email` varchar(300) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `nickname` varchar(400) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES ('5GzGYOA6UzLY','asdf','e9856d869974433c73e75b458127ec6d338a0ecee7033676c88115bd94e7c4d7891b3a47e313ba78',''),('N1aOb7AytExn','aaaa','27b6a4c8497280bf413f159687f23cabe085f65f1cc324532711a3c65dcb2c83696eeff31d4f3b55','테스트입니다'),('TmogqfpQWdo5',NULL,NULL,'임지연');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-26  0:11:31
