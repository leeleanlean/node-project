-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2017-03-13 11:03:51
-- 服务器版本： 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `leelean`
--

-- --------------------------------------------------------

--
-- 表的结构 `list`
--

CREATE TABLE IF NOT EXISTS `list` (
  `tid` char(15) COLLATE utf8_bin NOT NULL,
  `token` char(22) COLLATE utf8_bin NOT NULL,
  `creatDate` date NOT NULL,
  `type` int(11) NOT NULL,
  `title` char(15) COLLATE utf8_bin NOT NULL,
  `location` char(10) COLLATE utf8_bin NOT NULL,
  `price` int(11) NOT NULL,
  `unit` char(5) COLLATE utf8_bin NOT NULL,
  `demand` int(11) NOT NULL,
  `contact` char(5) COLLATE utf8_bin NOT NULL,
  `mobilePhone` char(11) COLLATE utf8_bin NOT NULL,
  `detail` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `list`
--

INSERT INTO `list` (`tid`, `token`, `creatDate`, `type`, `title`, `location`, `price`, `unit`, `demand`, `contact`, `mobilePhone`, `detail`) VALUES
('20170223041015', '0', '2017-02-23', 1, 'test title', '上海', 20, '个', 2000, 'eeee', '15899996666', 'detail'),
('20170223041743', '0', '2017-02-23', 1, '测试tid', '上海', 100, '个', 1000, 'leele', '15988886666', 'detail'),
('20170223042752', '0', '2017-02-23', 2, '测试求购信息', '上海', 100, '个', 1000, '上海往事', '15988887777', '上海往事，详细信息简介'),
('20170310052642', 'Bx5jcuIY6GEtwVkC', '2017-03-10', 1, '供应大米一万斤', '上海', 2, '斤', 15000, '李林', '15966669999', '稻谷的胚与糊粉层中含有近64%的稻米营养和90%以上的人体必须的营养元素，较为均衡，这应该是其所以成为人类主食的根本原因。最新发明专利产品米珍就是以稻米的胚与糊粉层为主的洁净营养食品[2]  ，是米糠的升级换代产品，其将成为稻米加工行业的主产品。大米是补充营养素的基础食物，除了富含碳水化合物外，还含有蛋白质、脂肪、维生素及11种矿物质，能为人体提供全面的营养。虽然各种营养素的单个含量不是很高，但因其食用量大，总体上是具有很高营养功效的，所以被誉为“五谷之首”。[3] \n大米\n大米(6张)\n大米中含碳水化合物75%左右，蛋白质7%-8%，脂肪1.3%-1. 8%，并含有丰富的B族维生素等。大米中的碳水化合物主要是淀粉，所含的蛋白质主要是米谷蛋白，其次是米胶蛋白和球蛋白，其蛋白质的生物价和氨基酸的构成比例都比小麦、大麦、小米、玉米等禾谷类作物高，消化率66.8%-83.1%，也是谷类蛋白质中较高的一种。\n因此，食用大米有较高的营养价值。但大米蛋白质中赖氨酸和苏氨酸的含量较少，所以不是一种完全蛋白质，其营养价值比不上动物蛋白质。但在午餐和晚餐时食用大米，较面食而言更有利于人们减肥。在我国南方地区人们一般食用大米作为主食，而在北方就有很大的不同。\n脂肪含量约9%，其脂肪中所含的亚油酸含量较高，一般占全部脂肪的34%，比莱籽油和茶油分别多2-5倍。'),
('20170313045328', 'JQfbEK8lGggTcmeSMmvkO0', '2017-03-13', 1, '测试供应信息', '上海', 15, '个', 10000, 'leele', '15921573336', '测试供应信息'),
('20170313051141', 'JQfbEK8lGggTcmeSMmvkO0', '2017-03-13', 1, '测试供应信息2', '上海', 100, '个', 1000, 'lee', '15888889999', '测试详情');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `userName` char(16) COLLATE utf8_bin NOT NULL,
  `password` char(16) COLLATE utf8_bin NOT NULL,
  `token` char(22) COLLATE utf8_bin NOT NULL,
  `mobilePhone` char(11) COLLATE utf8_bin NOT NULL,
  `adress` char(30) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`userName`, `password`, `token`, `mobilePhone`, `adress`) VALUES
('leelean', 'lixiaolin', '0', '', ''),
('lee', '123456', '0', '', ''),
('leelean', '123456', '', '', ''),
('leelee', '159159', '', '', ''),
('user', '111111', 'nxxJJQgFKRFFSvsJ', '', ''),
('1111111', '111111', 'q1eZZtKDPRwJXXw4', '', ''),
('2222', '22222', 'senOBunlrVmtlJOJ', '', ''),
('111111', '111', 'Bx5jcuIY6GEtwVkC', '', ''),
('微信用户', '123456', 'cMm3jjqGxVLPJgee', '', ''),
('心用户', '222222', 'i3CNW4TJ63xAZRJeSIC5fY', '', ''),
('123456', '1111', 'caxCpQ48EY5XnXNrP9SR1G', '', ''),
('112233', '11111', '2bTNROkuyNr3Sqqwwe8TLd', '', ''),
('222333', '22222', 'MJRVHBVGusK8Z3Y54cN72f', '', ''),
('222111', '22222', 'pHfP1KOm0jy1fuLl6DSHY1', '', ''),
('2211', '2211', 'BHnwcG3pSJI9pNERxVM3NO', '', ''),
('121212', '111', 'RYW33WArih4GuaypdzbE2D', '', ''),
('123123', '111', 'rEPXqFIRiA1o3P2gCvHB44', '', ''),
('11223', '111', 'ogUSy321FycWA6hM3fWSYO', '', ''),
('1122331', '111222', 's0QtZqzkisn0UnsejXBcao', '', ''),
('搜索狗', '222222', 'VmTrUhvNwTP0GNXYQwO9uX', '', ''),
('11111111', '222', 'f7aE0HJyfsQjrROPz3eIss', '333', '4444'),
('888888', '888888', 'SKOMVaSQYreJ8lNLYxv5GD', '', ''),
('leeleanlean', 'lixiaolin', 'JQfbEK8lGggTcmeSMmvkO0', '15988889999', '上海市 虹口区');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
