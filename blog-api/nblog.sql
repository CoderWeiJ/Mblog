/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50736
 Source Host           : localhost:3306
 Source Schema         : nblog

 Target Server Type    : MySQL
 Target Server Version : 50736
 File Encoding         : 65001

 Date: 24/01/2022 20:57:16
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for about
-- ----------------------------
DROP TABLE IF EXISTS `about`;
CREATE TABLE `about`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_en` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `name_zh` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `value` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of about
-- ----------------------------
INSERT INTO `about` VALUES (1, 'title', '标题', '关于帅气的 Naccl');
INSERT INTO `about` VALUES (2, 'musicId', '网易云歌曲ID', '423015580');
INSERT INTO `about` VALUES (3, 'content', '正文Markdown', '');
INSERT INTO `about` VALUES (4, 'commentEnabled', '评论开关', 'true');

-- ----------------------------
-- Table structure for blog
-- ----------------------------
DROP TABLE IF EXISTS `blog`;
CREATE TABLE `blog`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文章标题',
  `first_picture` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文章首图，用于随机文章展示',
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文章正文',
  `description` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '描述',
  `is_published` tinyint(1) NOT NULL COMMENT '1:公开 0:私密',
  `is_recommend` tinyint(1) NOT NULL COMMENT '推荐开关',
  `is_appreciation` tinyint(1) NOT NULL COMMENT '赞赏开关',
  `is_comment_enabled` tinyint(1) NOT NULL COMMENT '评论开关',
  `views` int(11) NOT NULL COMMENT '浏览次数',
  `words` int(11) NOT NULL COMMENT '文章次数',
  `read_time` int(11) NOT NULL COMMENT '阅读时长(分钟)',
  `category_id` bigint(20) NOT NULL COMMENT '文章分类',
  `is_top` tinyint(1) NOT NULL COMMENT '是否置顶',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码保护',
  `user_id` bigint(20) NULL DEFAULT NULL COMMENT '文章作者',
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of blog
-- ----------------------------

-- ----------------------------
-- Table structure for blog_tag
-- ----------------------------
DROP TABLE IF EXISTS `blog_tag`;
CREATE TABLE `blog_tag`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `blog_id` bigint(20) NOT NULL COMMENT '博客id',
  `tag_id` bigint(20) NOT NULL COMMENT '标签id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of blog_tag
-- ----------------------------

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '分类名',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------

-- ----------------------------
-- Table structure for city_visitor
-- ----------------------------
DROP TABLE IF EXISTS `city_visitor`;
CREATE TABLE `city_visitor`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `city` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '城市名称',
  `uv` int(11) NOT NULL COMMENT '独立访客数量',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of city_visitor
-- ----------------------------

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '昵称',
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '邮箱',
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '评论内容',
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '头像路径',
  `ip` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '评论者ip地址',
  `is_published` tinyint(1) NOT NULL COMMENT '公开或回收站',
  `is_admin_comment` tinyint(1) NOT NULL COMMENT '博主回复',
  `page` int(11) NOT NULL COMMENT '0普通文章 1关于我页面 2友链页面',
  `is_notice` tinyint(1) NOT NULL COMMENT '接收邮件提醒',
  `blog_id` bigint(20) NULL DEFAULT NULL COMMENT '所属的文章',
  `parent_comment_id` bigint(20) NOT NULL COMMENT '父评论id，-1为根评论',
  `website` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '个人网站',
  `qq` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '如果评论昵称为QQ号，则将昵称和头像置为QQ昵称和QQ头像，并将此字段置为QQ号备份',
  `createdAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment
-- ----------------------------

-- ----------------------------
-- Table structure for exception_log
-- ----------------------------
DROP TABLE IF EXISTS `exception_log`;
CREATE TABLE `exception_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uri` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '请求接口',
  `method` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '请求方式',
  `param` varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '请求参数',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '操作描述',
  `error` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '异常信息',
  `ip` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'ip地址',
  `ip_source` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'ip来源',
  `os` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '操作系统',
  `browser` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '浏览器',
  `user_agent` varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'user-agent用户代理',
  `createdAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of exception_log
-- ----------------------------

-- ----------------------------
-- Table structure for friend
-- ----------------------------
DROP TABLE IF EXISTS `friend`;
CREATE TABLE `friend`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '昵称',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '描述',
  `website` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '站点',
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '头像链接',
  `is_published` tinyint(1) NOT NULL COMMENT '公开或隐藏',
  `views` int(11) NOT NULL COMMENT '点击次数',
  `createdAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of friend
-- ----------------------------

-- ----------------------------
-- Table structure for login_log
-- ----------------------------
DROP TABLE IF EXISTS `login_log`;
CREATE TABLE `login_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名称',
  `ip` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'ip地址',
  `ip_source` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'ip来源',
  `os` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '操作系统',
  `browser` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '浏览器',
  `status` tinyint(1) NULL DEFAULT NULL COMMENT '登录状态',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '操作描述',
  `user_agent` varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'user-agent用户代理',
  `createdAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of login_log
-- ----------------------------

-- ----------------------------
-- Table structure for moment
-- ----------------------------
DROP TABLE IF EXISTS `moment`;
CREATE TABLE `moment`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '动态内容',
  `likes` int(11) NULL DEFAULT NULL COMMENT '点赞数量',
  `is_published` tinyint(1) NOT NULL COMMENT '是否公开',
  `createdAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of moment
-- ----------------------------

-- ----------------------------
-- Table structure for operation_log
-- ----------------------------
DROP TABLE IF EXISTS `operation_log`;
CREATE TABLE `operation_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '操作者用户名',
  `uri` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '请求接口',
  `method` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '请求方式',
  `param` varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '请求参数',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '操作描述',
  `error` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '异常信息',
  `ip` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'ip地址',
  `ip_source` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'ip来源',
  `os` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '操作系统',
  `browser` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '浏览器',
  `times` int(11) NOT NULL COMMENT '请求耗时(毫秒)',
  `user_agent` varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'user-agent用户代理',
  `createdAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of operation_log
-- ----------------------------

-- ----------------------------
-- Table structure for schedule_job
-- ----------------------------
DROP TABLE IF EXISTS `schedule_job`;
CREATE TABLE `schedule_job`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bean_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'bean名称',
  `method_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '方法名',
  `params` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '参数',
  `cron` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'cron表达式',
  `status` tinyint(4) NULL DEFAULT NULL COMMENT '任务状态',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注',
  `createdAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of schedule_job
-- ----------------------------
INSERT INTO `schedule_job` VALUES (1, 'redisSyncScheduleTask', 'syncBlogViewsToDatabase', NULL, '0 0 1 * * ?', 1, '每天凌晨一点，从Redis将博客浏览量同步到数据库', '2022-01-24 20:40:08');
INSERT INTO `schedule_job` VALUES (2, 'visitorSyncScheduleTask', 'syncVisitInfoToDatabase', '', '0 0 0 * * ?', 1, '清空当天Redis访客标识，记录当天的PV和UV，更新当天所有访客的PV和最后访问时间，更新城市新增访客UV数', '2022-01-24 20:41:55');

-- ----------------------------
-- Table structure for schedule_job_log
-- ----------------------------
DROP TABLE IF EXISTS `schedule_job_log`;
CREATE TABLE `schedule_job_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `job_id` bigint(20) NOT NULL COMMENT '任务id',
  `bean_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'bean名称',
  `method_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '方法名',
  `params` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '参数',
  `status` tinyint(4) NOT NULL COMMENT '任务执行结果',
  `error` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '异常信息',
  `times` int(11) NOT NULL COMMENT '耗时(毫秒)',
  `createdAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of schedule_job_log
-- ----------------------------

-- ----------------------------
-- Table structure for site_setting
-- ----------------------------
DROP TABLE IF EXISTS `site_setting`;
CREATE TABLE `site_setting`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_en` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `name_zh` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `value` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `type` int(11) NULL DEFAULT NULL COMMENT '1基础设置 2页脚徽标 3资料卡 4友链信息',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of site_setting
-- ----------------------------
INSERT INTO `site_setting` VALUES (1, 'webTitleSuffix', '网页标题后缀', ' - WeiJ\'s Blog', 1);
INSERT INTO `site_setting` VALUES (2, 'blogName', '博客名称', 'WeiJ\'s Blog', 1);
INSERT INTO `site_setting` VALUES (3, 'footerImgTitle', '页脚图片标题', '手机看本站', 1);
INSERT INTO `site_setting` VALUES (4, 'footerImgUrl', '页脚图片路径', '/img/qr.png', 1);
INSERT INTO `site_setting` VALUES (5, 'copyright', 'Copyright', '{\"title\":\"Copyright © 2021 - 2022\",\"siteName\":\"WeiJ\'S BLOG\"}', 1);
INSERT INTO `site_setting` VALUES (6, 'beian', 'ICP备案号', '', 1);
INSERT INTO `site_setting` VALUES (7, 'badge', '徽标', '{\"title\":\"由 Spring Boot 强力驱动\",\"url\":\"https://spring.io/projects/spring-boot/\",\"subject\":\"Powered\",\"value\":\"Spring Boot\",\"color\":\"blue\"}', 2);
INSERT INTO `site_setting` VALUES (8, 'badge', '徽标', '{\"title\":\"Vue.js 客户端渲染\",\"url\":\"https://cn.vuejs.org/\",\"subject\":\"SPA\",\"value\":\"Vue.js\",\"color\":\"brightgreen\"}', 2);
INSERT INTO `site_setting` VALUES (9, 'badge', '徽标', '{\"title\":\"UI 框架 Semantic-UI\",\"url\":\"https://semantic-ui.com/\",\"subject\":\"UI\",\"value\":\"Semantic-UI\",\"color\":\"semantic-ui\"}', 2);
INSERT INTO `site_setting` VALUES (10, 'badge', '徽标', '{\"title\":\"阿里云提供服务器及域名相关服务\",\"url\":\"https://www.aliyun.com/\",\"subject\":\"VPS & DNS\",\"value\":\"Aliyun\",\"color\":\"blueviolet\"}', 2);
INSERT INTO `site_setting` VALUES (11, 'badge', '徽标', '{\"title\":\"jsDelivr 提供 CDN 加速服务\",\"url\":\"https://www.jsdelivr.com/\",\"subject\":\"CDN\",\"value\":\"jsDelivr\",\"color\":\"orange\"}', 2);
INSERT INTO `site_setting` VALUES (12, 'badge', '徽标', '{\"title\":\"GitHub 提供图床\",\"url\":\"https://github.com/\",\"subject\":\"OSS\",\"value\":\"GitHub\",\"color\":\"github\"}', 2);
INSERT INTO `site_setting` VALUES (13, 'badge', '徽标', '{\"title\":\"本站点采用 CC BY 4.0 国际许可协议进行许可\",\"url\":\"https://creativecommons.org/licenses/by/4.0/\",\"subject\":\"CC\",\"value\":\"BY 4.0\",\"color\":\"lightgray\"}', 2);
INSERT INTO `site_setting` VALUES (14, 'avatar', '图片路径', '/img/avatar.jpg', 3);
INSERT INTO `site_setting` VALUES (15, 'name', '昵称', '竹溪听风', 3);
INSERT INTO `site_setting` VALUES (16, 'rollText', '滚动个签', '\"以家为家，以乡为乡，\",\"以国为国，以天下为天下。\"', 3);
INSERT INTO `site_setting` VALUES (17, 'github', 'GitHub地址', 'https://github.com/CoderWeiJ', 3);
INSERT INTO `site_setting` VALUES (18, 'qq', 'QQ链接', 'http://sighttp.qq.com/authd?IDKEY=', 3);
INSERT INTO `site_setting` VALUES (19, 'bilibili', 'bilibili链接', 'https://space.bilibili.com/', 3);
INSERT INTO `site_setting` VALUES (20, 'netease', '网易云音乐', 'https://music.163.com/#/user/home?id=', 3);
INSERT INTO `site_setting` VALUES (21, 'email', 'email', '1213586653@qq.com', 3);

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '标签名',
  `color` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '标签颜色(可选)',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tag
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '昵称',
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '头像地址',
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '邮箱',
  `role` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '角色访问权限',
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------

-- ----------------------------
-- Table structure for visit_log
-- ----------------------------
DROP TABLE IF EXISTS `visit_log`;
CREATE TABLE `visit_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '访客标识码',
  `uri` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '请求接口',
  `method` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '请求方式',
  `param` varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '请求参数',
  `behavior` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '访问行为',
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '访问内容',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '备注',
  `ip` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'ip地址',
  `ip_source` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'ip来源',
  `os` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '操作系统',
  `browser` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '浏览器',
  `times` int(11) NOT NULL COMMENT '请求耗时(毫秒)',
  `user_agent` varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'user-agent用户代理',
  `createdAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of visit_log
-- ----------------------------

-- ----------------------------
-- Table structure for visit_record
-- ----------------------------
DROP TABLE IF EXISTS `visit_record`;
CREATE TABLE `visit_record`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pv` int(11) NOT NULL COMMENT '访问量',
  `uv` int(11) NOT NULL COMMENT '独立用户',
  `date` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '日期\"01-12\"',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of visit_record
-- ----------------------------

-- ----------------------------
-- Table structure for visitor
-- ----------------------------
DROP TABLE IF EXISTS `visitor`;
CREATE TABLE `visitor`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '访客标识码',
  `ip` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'ip地址',
  `ip_source` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'ip来源',
  `os` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '操作系统',
  `browser` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '浏览器',
  `pv` int(11) NOT NULL COMMENT '访问页数统计',
  `user_agent` varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'user-agent用户代理',
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of visitor
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
