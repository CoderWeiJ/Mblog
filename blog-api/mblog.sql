/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50736
 Source Host           : localhost:3306
 Source Schema         : mblog

 Target Server Type    : MySQL
 Target Server Version : 50736
 File Encoding         : 65001

 Date: 14/07/2022 14:49:27
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
  `value` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of about
-- ----------------------------
INSERT INTO `about` VALUES (1, 'title', '标题', '关于帅气的 WeiJ');
INSERT INTO `about` VALUES (2, 'musicId', '网易云歌曲ID', '423015580');
INSERT INTO `about` VALUES (3, 'content', '正文Markdown', '# 关于我\r\n\r\n- M E: 一个前端菜鸟\r\n- 现状: 目前大四，正在实习\r\n- 技术栈：vue、nodejs\r\n- 爱好: 没啥特殊爱好\r\n\r\n# 我 & 博客\r\n\r\n生性只对感兴趣的事物充满热情，看到有趣的软件都会情不自禁地分析一波技术栈，可能用到了什么 algorithm，然后自我陶醉😅\r\n\r\n喜欢安静，但喜欢听得劲的电音，节奏控，coding 时喜欢听嗨歌，没事就跟着摇一摇🎵\r\n\r\n奶盖要摇匀了喝！🥛\r\n\r\n世界上只有甜的豆腐脑🤗\r\n\r\n[🍓GitHub主页](https://github.com/CoderWeiJ)，本是学习过程中的产物，没想到能受到大家的喜爱，如果你也喜欢本博客，⭐️就是最好的鼓励\r\n\r\n博客现在托管在阿里云学生机，因为水管比较小，静态资源托管在 GitHub，通过 jsDelivr CDN减速🚀\r\n\r\n博客源码、部署相关疑难杂症请在 GitHub 提 issue，**请勿**在本博客留言\r\n\r\n如需联系我，请尽量使用 TG 或邮件，thanks（评论我也会收到提醒）');
INSERT INTO `about` VALUES (4, 'commentEnabled', '评论开关', 'true');

-- ----------------------------
-- Table structure for blog
-- ----------------------------
DROP TABLE IF EXISTS `blog`;
CREATE TABLE `blog`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文章标题',
  `first_picture` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文章首图，用于随机文章展示',
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
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of blog
-- ----------------------------
INSERT INTO `blog` VALUES (1, 'Vue3成为默认版本', 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1113%2F032120114622%2F200321114622-4-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647164374&t=1d34b3e9bfdc5ec89d3cfa9eca3881c2', '# 添加任务接口\r\n\r\n[百度一下](http://www.baidu.com){target=_blank}\r\n\r\n*床前明月光*{.m-text-cover}，疑似地上霜\r\n\r\n~~删除线~~\r\n\r\n| 字段          | 说明     | 类型     | 备注                | 是否必填 |\r\n| ----------- | ------ | ------ | ----------------- | ---- |\r\n| account     | 账号     | String | 26kefei           | 是    |\r\n| device      | 设备名    | String | b1d9ec2f          | 是    |\r\n| task_name   | 任务名    | String | 湖边测试11            | 是    |\r\n| update_time | 任务更新时间 | Int    | 1642142802000     | 是    |\r\n| work_time   | 任务创建时间 | Int    | 1642142802000     | 是    |\r\n| latitude    | 经度     | Float  | 保留6位              | 是    |\r\n| longitude   | 纬度     | Float  | 保留6位              | 是    |\r\n| depth       | 水深     | Float  | 0-12              | 是    |\r\n| worker      | 作业人员   | String | S                 | 是    |\r\n| company     | 作业单位   | String | 可飞                | 是    |\r\n| location    | 地点     | String | 广东省惠州市惠阳区新圩镇伟迪科技园 | 是    |\r\n| water_temp  | 水温     | Float  | 0-100℃            | 是    |\r\n| notes       | 备注     | Number | /                 | 否    |\r\n| video_url   | 视频链接   | Number | /                 | 否    |\r\n| mete_info   | 气象信息   | Object | /                 | 是    |\r\n\r\n{.ui .celled .table}\r\n\r\nmeta_info字段\r\n\r\n| 字段      | 说明 | 类型     | 备注       | 是否必填 |\r\n| ------- | -- | ------ | -------- | ---- |\r\n| weather | 天气 | String | cloud    | 是    |\r\n| temp    | 气温 | Float  | 12.1     | 是    |\r\n| press   | 压强 | Float  | 100707.7 | 是    |\r\n| humi    | 湿度 | Float  | 0.72     | 是    |\r\n| speed   | 风速 | Float  | 9        | 是    |\r\n| direct  | 风向 | Float  | 69       | 是    |\r\n\r\n{.ui .celled .table}\r\n# 不可更改字段\r\n\r\n-   account\r\n-   device\r\n-   create_time\r\n-   latitude\r\n-   longitude\r\n-   location\r\n-   mete_info\r\n\r\n```js\r\n{\r\n    \"account\": \"26kefei\",\r\n    \"device\": \"b1d9ec2f\",\r\n    \"task_name\": \"广州测试-1\",\r\n    \"create_time\": 1642558973189,\r\n    \"work_time\": 1642558973189,\r\n    \"latitude\": 22.578469,\r\n    \"longitude\": 113.952533,\r\n    \"depth\": 0.33,\r\n    \"worker\": \"亚索\",\r\n    \"company\": \"可飞\",\r\n    \"location\": \"广东省惠州市惠阳区新圩镇伟迪科技园\",\r\n    \"water_temp\": 13.2,\r\n    \"mete_info\": {\r\n        \"weather\": \"多云\",\r\n        \"temp\": 17,\r\n        \"press\": 100707.7,\r\n        \"humi\": 0.72,\r\n        \"speed\": 9,\r\n        \"direct\": 69\r\n    },\r\n    \"video_url\": \"https://v-cdn.zjol.com.cn/280443.mp4\",\r\n    \"notes\": \"\",\r\n    \"platform\": \"1\"\r\n}\r\n```\r\n\r\n,\r\n\r\n\"webpack\": \"^5.68.0\",\r\n\r\n\"webpack-cli\": \"^4.9.2\",\r\n\r\n\"worker-loader\": \"^3.0.8\"', '一段描述![](https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1113%2F032120114622%2F200321114622-4-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647164374&t=1d34b3e9bfdc5ec89d3cfa9eca3881c2)', 1, 1, 1, 1, 411, 1980, 5, 1, 0, '', NULL, '2022-01-06 14:59:39', '2022-01-01 14:59:42');
INSERT INTO `blog` VALUES (2, 'Git笔记', 'https://img1.baidu.com/it/u=9897345,815541994&fm=253&fmt=auto&app=138&f=GIF?w=1000&h=500', '# 一、配置user信息\r\n\r\n```shell\r\ngit config --global user.name \'your.name\'\r\ngit config --global user.email \'your.email\'\r\n```\r\n\r\n![image-20211210102205420](https://tuchuang-1257620510.cos.ap-guangzhou.myqcloud.com/markdown/image-20211210102205420.png)\r\n\r\n## 1. config的三个作用域\r\n\r\n![image-20211210102320134](https://tuchuang-1257620510.cos.ap-guangzhou.myqcloud.com/markdown/image-20211210102320134.png)\r\n\r\n\r\n\r\n# 二、通过git给文件重命名\r\n\r\n原始操作\r\n\r\n```shell\r\nmv readme readme.md\r\ngit add readme.md\r\ngit rm readme\r\n```\r\n\r\n通过git操作\r\n\r\n```shell\r\n# 更改文件名并且添加到暂存区\r\ngit mv readme readme.md\r\n```\r\n\r\n# 三、git log查看历史提交\r\n\r\n命令：`git log`\r\n\r\n参数\r\n\r\n- --oneline: 显示简略信息\r\n\r\n![image-20211210105010952](https://tuchuang-1257620510.cos.ap-guangzhou.myqcloud.com/markdown/image-20211210105010952.png)\r\n\r\n- --all: 查看所有分支提交记录\r\n\r\n![image-20211210105121607](https://tuchuang-1257620510.cos.ap-guangzhou.myqcloud.com/markdown/image-20211210105121607.png)\r\n\r\n- -n4: 查看最近的commit，数字代表要查几条\r\n\r\n![image-20211210105218454](https://tuchuang-1257620510.cos.ap-guangzhou.myqcloud.com/markdown/image-20211210105218454.png)\r\n\r\n- `git log 分支名`\r\n- git help --web log: 网页打开\r\n\r\n\r\n\r\n# 四、图形化界面\r\n\r\n```shell\r\n$ gitk\r\n```\r\n\r\n\r\n\r\n# 五、探秘``.git``目录\r\n\r\n![image-20211210110552129](https://tuchuang-1257620510.cos.ap-guangzhou.myqcloud.com/markdown/image-20211210110552129.png)\r\n\r\n重点`HEAD`、`config`、`refs`\r\n\r\n最核心：`objects`\r\n\r\n\r\n\r\n# 六、`commit`、`tree`、`blob`三个对象之间的关系\r\n\r\n![image-20211210111017658](https://tuchuang-1257620510.cos.ap-guangzhou.myqcloud.com/markdown/image-20211210111017658.png)\r\n\r\n\r\n\r\n​	一个commit对象里面会包含有 tree(相当于文件夹)、parent、author和committer；一个tree里面会包含tree和blob(具体的内容)；而一个blob指的就是具体的文件内容。在git中，blob与文件名无关，只与文件内容有关，即文件内容相同，在git中是同一个blob。\r\n\r\n![image-20211210111907339](https://tuchuang-1257620510.cos.ap-guangzhou.myqcloud.com/markdown/image-20211210111907339.png)\r\n\r\n\r\n\r\n# 比较暂存区和HEAD所包含文件的差异\r\n\r\n```shell\r\n# 加--cached，比较暂存区和head的差异\r\n$ git diff --cached\r\n```\r\n\r\n# 比较工作区和暂存区所含文件的差异\r\n\r\n```shell\r\n# 比较所有文件\r\n$ git diff\r\n# 单独比较某个文件\r\n$ git diff --文件名\r\n```\r\n\r\n# 让暂存区恢复成和HEAD的一样\r\n\r\n```sehll\r\n$ git reset HEAD\r\n```\r\n\r\n# 让工作区的文件恢复和暂存区一样\r\n\r\n```shell\r\n$ git checkout -- index.html(文件名)\r\n```\r\n\r\n变更工作区用`checkout`\r\n\r\n变更暂存区用`reset`\r\n\r\n\r\n\r\n# 取消暂存区部分文件的更改\r\n\r\n```shell\r\n$ git reset HEAD -- 文件名 文件名 ...\r\n```\r\n\r\n\r\n\r\n# 消除最近的几次提交\r\n\r\n```shell\r\n$ git reset --hard 回到具体位置的commitId号\r\n```\r\n\r\n\r\n\r\n# 不同分支提交的指定文件的差异\r\n\r\n```shell\r\n# 查看分支\r\n$ git branch -av\r\n# 比较分支提交的文件差异，下面二者等同\r\n$ git diff 分支1id 分支2id -- 比较文件名\r\n$ git diff 分支1名字 分支2名字 -- 比较文件名\r\n\r\n\r\n```\r\n\r\n# 正确删除文件的方法\r\n\r\n```shell\r\n$ git rm 文件名\r\n```\r\n\r\n# 开发中临时加塞了紧急任务如何处理？\r\n\r\n应用场景：\r\n\r\n​	在开发中，突然要临时修复某个文件/增加某个功能，需要把手头的开发任务先放一边，优先完成紧急任务。\r\n\r\n​	这时，我们可以通过`git stash`将当前在开发的代码放到stash栈里，去完成某个紧急任务。\r\n\r\n​	紧急任务完成后，在`add`和`commit`后，执行`git stash pop`或`git stash apply`将之前放一边的代码，放回工作区中，继续完成。\r\n\r\n```shell\r\n# 堆栈\r\n$ git stash\r\n$ git stash list\r\n\r\n# 恢复到工作区，保存stash中的任务\r\n$ git stash apply \r\n\r\n# 恢复到工作区，删除stash栈的任务\r\n$ git stash pop\r\n\r\n\r\n```\r\n\r\n# 指定不需要Git管理的文件\r\n\r\n新建`.gitignore`\r\n\r\n```.gitignore\r\n# 以下结尾的文件都不会被git版本工具管理\r\n*.doc\r\n*.txt\r\n```\r\n\r\n# 如何将git仓库备份到本地？\r\n\r\n- 哑协议：`/local/Project/demo` ，类似linux下的路径名\r\n- 智能协议：`file:///local/Project/demo`，前面加个`file://`\r\n- http/https协议\r\n- ssh协议：`username@git-server.com/项目地址`\r\n\r\n![image-20211210145118261](https://tuchuang-1257620510.cos.ap-guangzhou.myqcloud.com/markdown/image-20211210145118261.png)\r\n\r\n\r\n\r\n## 与远程仓库关联\r\n\r\n```shell\r\n$ git remote add 名字(比如origin) 仓库地址\r\n# 查看\r\n$ git remote -v\r\n```\r\n\r\n## 本地仓库push到远程仓库\r\n\r\n```shell\r\n$ git push origin 远程仓库分支名(master)\r\n```\r\n\r\n', '一段描述![](https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1113%2F032120114622%2F200321114622-4-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647164374&t=1d34b3e9bfdc5ec89d3cfa9eca3881c2)', 1, 1, 1, 1, 21, 894, 11, 2, 1, NULL, NULL, '2022-02-14 16:04:57', '2022-02-14 16:05:00');
INSERT INTO `blog` VALUES (3, '二叉树总结篇', 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fphoto%2F2012-3-26%2Fenterdesk.com-3947C8124CD406DC594BEDF507AB07DC.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1648179256&t=8fea7024a7c0681b6c790786667b211e', '# 一、二叉树的理论基础\r\n\r\n## 二叉树的种类\r\n\r\n### 1. 满二叉树\r\n\r\n> 如果一棵二叉树只有度为0的结点和度为2的结点，并且度为0的结点在同一层上，则这棵二叉树为满二叉树。\r\n\r\n如图所示:\r\n\r\n\r\n\r\n<img src=\"https://img-blog.csdnimg.cn/20200806185805576.png\" alt=\"img\" style=\"zoom:50%;\" />\r\n\r\n\r\n\r\n这棵二叉树为满二叉树，也可以说深度为k，有2^k-1个节点的二叉树。\r\n\r\n### 2. 完全二叉树\r\n\r\n> 在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层最左边的若干位置。若最底层为第 h 层，则该层包含 1~ 2^h -1  个节点。\r\n\r\n\r\n\r\n<img src=\"https://img-blog.csdnimg.cn/20200920221638903.png\" alt=\"img\" style=\"zoom:50%;\" />\r\n\r\n### 3. 二叉搜索树\r\n\r\n前面介绍的树，都是没有数值的，而二叉搜索树是有数值的，**二叉搜索树是一个有序树**。\r\n\r\n- 若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值；\r\n- 若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值；\r\n- 它的左、右子树也分别为二叉排序树\r\n\r\n下面这两棵树都是搜索树\r\n\r\n![img](https://img-blog.csdnimg.cn/20200806190304693.png)\r\n\r\n### 4. 平衡二叉树\r\n\r\n> 又被称为AVL（Adelson-Velsky and Landis）树，且具有以下性质：它是一棵空树或它的左右两个子树的高度差的绝对值不超过1，并且左右两个子树都是一棵平衡二叉树。\r\n\r\n如图:\r\n\r\n![img](https://img-blog.csdnimg.cn/20200806190511967.png)\r\n\r\n\r\n\r\n## 二叉树的存储方式\r\n\r\n**二叉树可以链式存储，也可以顺序存储。**\r\n\r\n那么链式存储方式就用指针， 顺序存储的方式就是用数组。\r\n\r\n顾名思义就是顺序存储的元素在内存是连续分布的，而链式存储则是通过指针把分布在散落在各个地址的节点串联一起。\r\n\r\n链式存储如图：\r\n\r\n![img](https://img-blog.csdnimg.cn/2020092019554618.png)\r\n\r\n\r\n\r\n用数组来存储二叉树，顺序存储的方式如图：\r\n\r\n![img](https://img-blog.csdnimg.cn/20200920200429452.png)\r\n\r\n用数组来存储二叉树如何遍历的呢？\r\n\r\n**如果父节点的数组下表是i，那么它的左孩子就是i \\* 2 + 1，右孩子就是 i \\* 2 + 2。**\r\n\r\n但是用链式表示的二叉树，更有利于我们理解，所以一般我们都是用链式存储二叉树。\r\n\r\n**所以大家要了解，用数组依然可以表示二叉树。**\r\n\r\n\r\n\r\n## 二叉树的遍历方式\r\n\r\n关于二叉树的遍历方式，要知道二叉树遍历的基本方式都有哪些。\r\n\r\n一些同学用做了很多二叉树的题目了，可能知道前中后序遍历，可能知道层序遍历，但是却没有框架。\r\n\r\n我这里把二叉树的几种遍历方式列出来，大家就可以一一串起来了。\r\n\r\n二叉树主要有两种遍历方式：\r\n\r\n1. 深度优先遍历：先往深走，遇到叶子节点再往回走。\r\n2. 广度优先遍历：一层一层的去遍历。\r\n\r\n**这两种遍历是图论中最基本的两种遍历方式**\r\n\r\n那么从深度优先遍历和广度优先遍历进一步拓展，才有如下遍历方式：\r\n\r\n- 深度优先遍历\r\n  - 前序遍历（递归法，迭代法）\r\n  - 中序遍历（递归法，迭代法）\r\n  - 后序遍历（递归法，迭代法）\r\n- 广度优先遍历\r\n  - 层次遍历（迭代法）\r\n\r\n在深度优先遍历中：有三个顺序，前中后序遍历， 有同学总分不清这三个顺序，经常搞混，我这里教大家一个技巧。\r\n\r\n**这里前中后，其实指的就是中间节点的遍历顺序**，只要大家记住 前中后序指的就是中间节点的位置就可以了。\r\n\r\n看如下中间节点的顺序，就可以发现，中间节点的顺序就是所谓的遍历方式\r\n\r\n- 前序遍历：中左右\r\n- 中序遍历：左中右\r\n- 后序遍历：左右中\r\n\r\n大家可以对着如下图，看看自己理解的前后中序有没有问题。\r\n\r\n![img](https://img-blog.csdnimg.cn/20200806191109896.png)\r\n\r\n最后再说一说二叉树中深度优先和广度优先遍历实现方式，我们做二叉树相关题目，经常会使用递归的方式来实现深度优先遍历，也就是实现前中后序遍历，使用递归是比较方便的。\r\n\r\n**之前我们讲栈与队列的时候，就说过栈其实就是递归的一种是实现结构**，也就说前中后序遍历的逻辑其实都是可以借助栈使用非递归的方式来实现的。\r\n\r\n而广度优先遍历的实现一般使用队列来实现，这也是队列先进先出的特点所决定的，因为需要先进先出的结构，才能一层一层的来遍历二叉树。\r\n\r\n**这里其实我们又了解了栈与队列的一个应用场景了。**\r\n\r\n代码实现：\r\n\r\n```js\r\n// 前序遍历:\r\nvar preorderTraversal = function(root, res = []) {\r\n    if (!root) return res;\r\n    res.push(root.val);\r\n    preorderTraversal(root.left, res)\r\n    preorderTraversal(root.right, res)\r\n    return res;\r\n};\r\n\r\n// 中序遍历:\r\nvar inorderTraversal = function(root, res = []) {\r\n    if (!root) return res;\r\n    inorderTraversal(root.left, res);\r\n    res.push(root.val);\r\n    inorderTraversal(root.right, res);\r\n    return res;\r\n};\r\n\r\n// 后序遍历:\r\nvar postorderTraversal = function(root, res = []) {\r\n    if (!root) return res;\r\n    postorderTraversal(root.left, res);\r\n    postorderTraversal(root.right, res);\r\n    res.push(root.val);\r\n    return res;\r\n};\r\n```\r\n\r\n\r\n\r\n# 二、求二叉树的属性\r\n\r\n- 二叉树：是否对称\r\n\r\n  - 递归：后序，比较的是根节点的左子树与右子树是不是相互翻转\r\n  - 迭代：使用队列/栈将两个节点顺序放入容器中进行比较\r\n\r\n  ```js\r\n  var compare = function(left, right) {\r\n      // 节点有null的情况\r\n      if(left == null && right != null) return false;\r\n      else if(left != null && right == null) return false;\r\n      else if(left == null && right == null) return true;\r\n      else if(left.val !== right.val) return false; // 数值不相等\r\n      // 节点不为null的情况\r\n      let outside = compare(left.left, right.right); // 外侧比较\r\n      let inside = compare(left.right, right.left); // 内侧比较\r\n      return outside && inside;\r\n  }\r\n  var isSymmetric = function(root) {\r\n      if(root == null) return true;\r\n      return compare(root.left, root.right); // 比较根节点左右2个孩子\r\n  };\r\n  ```\r\n\r\n  \r\n\r\n- 二叉树：求最大深度\r\n\r\n  - 递归，后序，求根节点最大高度就是最大深度，通过递归函数的返回值做计算树的高度\r\n  - 迭代：层序遍历\r\n\r\n  ```js\r\n  var maxdepth = function(root) {\r\n      //使用递归的方法 递归三部曲\r\n      //1. 确定递归函数的参数和返回值\r\n      const getdepth=function(node){\r\n      //2. 确定终止条件\r\n          if(node===null){\r\n              return 0;\r\n          }\r\n      //3. 确定单层逻辑\r\n          let leftdepth=getdepth(node.left);\r\n          let rightdepth=getdepth(node.right);\r\n          let depth=1+math.max(leftdepth,rightdepth);\r\n          return depth;\r\n      }\r\n      return getdepth(root);\r\n  };\r\n  ```\r\n\r\n- 二叉树：最小深度\r\n\r\n  - 递归：后序，求根节点最小高度就是最小深度，注意最小深度的定义\r\n  - 迭代：层序遍历\r\n\r\n  ```js\r\n  /*\r\n  如果左子树为空，右子树不为空，说明最小深度是 1 + 右子树的深度。\r\n  反之，右子树为空，左子树不为空，最小深度是 1 + 左子树的深度。 \r\n  最后如果左右子树都不为空，返回左右子树深度最小值 + 1 。\r\n  */\r\n  \r\n  var minDepth = function(root) {\r\n      if(root == null) return 0; // 为null返回0\r\n      let leftDepth = minDepth(root.left);\r\n      let rightDepth = minDepth(root.right);\r\n      // 左为空，右不为空，不是最低点\r\n      if(root.left==null && root.right) return 1 + rightDepth;\r\n      // 右为空，左不为空，不是最低点\r\n      if(root.left && root.right == null) return 1 + leftDepth;\r\n      // 左右子树不为空，返回左右子树最小深度+1\r\n      let res = 1 + Math.min(leftDepth, rightDepth);\r\n      return res;\r\n  };\r\n  ```\r\n\r\n- 二叉树：求有多少个节点\r\n\r\n  - 递归：后序，通过递归函数的返回值计算节点数量\r\n  - 迭代：层序遍历\r\n\r\n  ```js\r\n  var countNodes = function(root) {\r\n      // 节点为null则返回0\r\n      if(root == null) return 0;\r\n      let leftNum = countNodes(root.left);\r\n      let rightNum = countNodes(root.right);\r\n      // 加1是将当前为根节点的节点加进去\r\n      return leftNum + rightNum + 1; \r\n  };\r\n  ```\r\n\r\n- 二叉树：是否平衡(opens new window)\r\n\r\n  - 递归：后序，注意后序求高度和前序求深度，递归过程判断高度差\r\n  - 迭代：效率很低，不推荐\r\n\r\n  ```js\r\n  const getDepth = function (node) {\r\n      // 2. 确定递归函数终止条件\r\n      if (node === null) {\r\n          return 0;\r\n      }\r\n      // 3. 确定单层递归逻辑\r\n      let leftDepth = getDepth(node.left);//左子树高度\r\n      if (leftDepth === -1) {\r\n          return -1;\r\n      }\r\n      let rightDepth = getDepth(node.right);//右子树高度\r\n      if (rightDepth === -1) {\r\n          return -1;\r\n      }\r\n      if (Math.abs(leftDepth - rightDepth) > 1) {\r\n          return -1;\r\n      } else {\r\n          return 1 + Math.max(leftDepth, rightDepth);\r\n      }\r\n  }\r\n  var isBalanced = function(root) {\r\n      //还是用递归三部曲  + 后序遍历 左右中 当前左子树右子树高度相差大于1就返回-1\r\n      // 1. 确定递归函数参数以及返回值\r\n      \r\n      return getDepth(root)===-1?false:true;\r\n  };\r\n  ```\r\n\r\n  \r\n\r\n- 二叉树：找所有路径(opens new window)\r\n\r\n  - 递归：前序，方便让父节点指向子节点，涉及回溯处理根节点到叶子的所有路径\r\n  - 迭代：一个栈模拟递归，一个栈来存放对应的遍历路径\r\n\r\n  ```js\r\n  var binaryTreePaths = function(root) {\r\n      let res = [];\r\n      // 1. 确定递归函数，函数参数\r\n      const getPath = function(node, curPath) {\r\n          // 确定终止条件，到叶子节点就结束\r\n          if(node.left == null && node.right == null) {\r\n              curPath+=node.val;\r\n              res.push(curPath);\r\n              return;\r\n          }\r\n          // 确定单层递归\r\n          curPath += node.val + \'->\';\r\n          node.left && getPath(node.left, curPath);\r\n          node.right && getPath(node.right, curPath);\r\n      }\r\n      getPath(root, \'\');\r\n      return res;\r\n  };\r\n  ```\r\n\r\n  \r\n\r\n- 二叉树：求左叶子之和(opens new window)\r\n\r\n  - 递归：后序，必须三层约束条件，才能判断是否是左叶子。\r\n  - 迭代：直接模拟后序遍历\r\n\r\n  ```js\r\n  var sumOfLeftLeaves = function(root) {\r\n      const nodeSum = function(node) {\r\n          if(node == null) return 0;\r\n          let leftValue = sumOfLeftLeaves(node.left);\r\n          let rightValue = sumOfLeftLeaves(node.right);\r\n          // 要的是左叶子节点，右边的不要\r\n          let midValue = 0;\r\n          if(node.left && node.left.left == null && node.left.right == null)\r\n              midValue = node.left.val;\r\n          let sum =midValue + leftValue + rightValue;\r\n          return sum;\r\n      }\r\n      return nodeSum(root);\r\n  };\r\n  ```\r\n\r\n  \r\n\r\n- 二叉树：求左下角的值(opens new window)\r\n\r\n  - 递归：顺序无所谓，优先左孩子搜索，同时找深度最大的叶子节点。\r\n  - 迭代：层序遍历找最后一行最左边\r\n\r\n  ```js\r\n  var findBottomLeftValue = function(root) {\r\n      let maxDepth = 0; // 最大深度\r\n      let maxLeftValue = 0;  // 最底层左节点的值\r\n      const dfsTree = function(node, curDepth) {\r\n          // 叶子节点\r\n          if(node.left == null && node.right == null) {\r\n              if(curDepth > maxDepth) {\r\n                  maxDepth = curDepth; // 更新最大深度\r\n                  maxLeftValue = node.val; // 更新最左边节点的值\r\n              }\r\n          }\r\n          node.left && dfsTree(node.left, curDepth+1);\r\n          node.right && dfsTree(node.right, curDepth+1);\r\n      }\r\n  \r\n      dfsTree(root, 1);\r\n      return maxLeftValue;\r\n  };\r\n  ```\r\n\r\n- 二叉树：求路径总和(opens new window)\r\n\r\n  - 递归：顺序无所谓，递归函数返回值为bool类型是为了搜索一条边，没有返回值是搜索整棵树。\r\n  - 迭代：栈里元素不仅要记录节点指针，还要记录从头结点到该节点的路径数值总和\r\n\r\n  ```js\r\n  var hasPathSum = function(root, targetSum) {\r\n      if(root == null) return false;\r\n      const leavePath = function(node, count) {\r\n          // 当count为0且node为叶子节点时，满足条件\r\n          if(node.left == null && node.right == null && count === 0) return true;\r\n          // count不为0，不符合条件\r\n          if(!node.left && !node.right) return false;\r\n  \r\n          if(node.left && leavePath(node.left, count - node.left.val)) return true;\r\n          if(node.right && leavePath(node.right, count - node.right.val)) return true;\r\n          return false;\r\n      }\r\n      return leavePath(root, targetSum-root.val);\r\n  };\r\n  ```\r\n\r\n  \r\n\r\n# 三、二叉树的修改与改造\r\n\r\n- 翻转二叉树\r\n\r\n  - 递归：前序，交换左右孩子\r\n  - 迭代：直接模拟前序遍历\r\n\r\n  ```js\r\n  var invertTree = function(root) {\r\n      //1. 首先使用递归版本的前序遍历实现二叉树翻转\r\n      //交换节点函数\r\n      const inverNode=function(left,right){\r\n          let temp=left;\r\n          left=right;\r\n          right=temp;\r\n          //需要重新给root赋值一下\r\n          root.left=left;\r\n          root.right=right;\r\n      }\r\n      //确定递归函数的参数和返回值inverTree=function(root)\r\n      //确定终止条件\r\n      if(root===null){\r\n          return root;\r\n      }\r\n      //确定节点处理逻辑 交换\r\n      inverNode(root.left,root.right);\r\n      invertTree(root.left);\r\n      invertTree(root.right);\r\n      return root;\r\n  };\r\n  ```\r\n\r\n  \r\n\r\n- 构造二叉树\r\n\r\n  - 递归：前序，重点在于找分割点，分左右区间构造\r\n  - 迭代，比较复杂，意义不大\r\n\r\n  ```js\r\n  var buildTree = function(inorder, postorder) {\r\n      let post_idx;\r\n      const idx_map = new Map();\r\n      const helper = (in_left, in_right) => {\r\n          // 如果这里没有节点构造二叉树了，就结束\r\n          if (in_left > in_right) {\r\n              return null;\r\n          }\r\n  \r\n          // 选择 post_idx 位置的元素作为当前子树根节点\r\n          const root_val = postorder[post_idx];\r\n          const root = new TreeNode(root_val);\r\n  \r\n          // 根据 root 所在位置分成左右两棵子树\r\n          const index = idx_map.get(root_val);\r\n  \r\n          // 下标减一\r\n          post_idx--;\r\n          // 构造右子树\r\n          root.right = helper(index + 1, in_right);\r\n          // 构造左子树\r\n          root.left = helper(in_left, index - 1);\r\n          return root;\r\n      }\r\n  \r\n      // 从后序遍历的最后一个元素开始\r\n      post_idx = postorder.length - 1;\r\n  \r\n      // 建立（元素，下标）键值对的哈希表\r\n      let idx = 0;\r\n      inorder.forEach((val, idx) => {\r\n          idx_map.set(val, idx);\r\n      });\r\n      return helper(0, inorder.length - 1);\r\n  };\r\n  ```\r\n\r\n  \r\n\r\n- 构造最大的二叉树\r\n\r\n  - 递归：前序，分割点为数组最大值，分左右区间构造\r\n  - 迭代，比较复杂，意义不大\r\n\r\n  ```js\r\n  var constructMaximumBinaryTree = function(nums) {\r\n      const helper = function(left, right){\r\n          // 递归终止条件\r\n          if(left > right) return null;\r\n  \r\n          let maxValue = -1, maxIndex = -1;\r\n          for (let i = left; i <= right; ++i) {\r\n              if (nums[i] > maxValue) {\r\n                  maxValue = nums[i];\r\n                  maxIndex = i;\r\n              }\r\n          }\r\n          let root = new TreeNode(maxValue); // 根节点\r\n          // 左子树\r\n          root.left = helper(left, maxIndex-1);\r\n          // 右子树\r\n          root.right = helper(maxIndex+1, right);\r\n          return root;\r\n      }\r\n      return helper(0, nums.length-1);\r\n  };\r\n  ```\r\n\r\n  \r\n\r\n- 合并两个二叉树\r\n\r\n  - 递归：前序，同时操作两个树的节点，注意合并的规则\r\n  - 迭代：使用队列，类似层序遍历\r\n\r\n  ```js\r\n  var mergeTrees = function(root1, root2) {\r\n      const dfsTree = function(r1, r2) {\r\n          if(r1 == null) return r2;\r\n          if(r2 == null) return r1;\r\n          r1.val += r2.val;\r\n          r1.left = dfsTree(r1.left, r2.left);\r\n          r1.right = dfsTree(r1.right, r2.right);\r\n          return r1;\r\n      }\r\n      return dfsTree(root1, root2);\r\n  };\r\n  ```\r\n\r\n# 四、求二叉搜索树的属性\r\n\r\n- 二叉搜索树中的搜索\r\n\r\n  - 递归：二叉搜索树的递归是有方向的\r\n  - 迭代：因为有方向，所以迭代法很简单\r\n\r\n  ```js\r\n  var searchBST = function(root, val) {\r\n      const findTree = function(node) {\r\n          if(node == null || node.val === val) return node;\r\n          if(node.val > val) return findTree(node.left);\r\n          if(node.val < val) return findTree(node.right);\r\n          return null;\r\n      }\r\n      return findTree(root);\r\n  };\r\n  ```\r\n\r\n  \r\n\r\n- 是不是二叉搜索树\r\n\r\n  - 递归：中序，相当于变成了判断一个序列是不是递增的\r\n  - 迭代：模拟中序，逻辑相同\r\n\r\n  ```js\r\n   /*\r\n      中序遍历: 左中右，如果是二叉搜索树的话，得到的序列应该是从小到大排序的，所以可以通过判断数组是不是升序排序来判断是否是二叉搜索树\r\n   */\r\n  // var isValidBST = function(root) {\r\n  //     let arr = [];\r\n  //     const buildArr = function(node) {\r\n  //         if(node) {\r\n  //             buildArr(node.left);\r\n  //             arr.push(node.val);\r\n  //             buildArr(node.right);\r\n  //         }\r\n  //     }\r\n  //     buildArr(root);\r\n  //     for(let i = 1;i < arr.length;i++) {\r\n  //         if(arr[i] <= arr[i - 1]) return false;\r\n  //     }\r\n  //     return true;\r\n  // };\r\n  \r\n  // 递归\r\n  var isValidBST = function(root) {\r\n      let pre = null;\r\n      const inorder = function(root) {\r\n          if(root == null) return true;\r\n          let left = inorder(root.left);\r\n          if(pre != null && pre.val>=root.val) return false;\r\n          pre = root;\r\n          let right = inorder(root.right);\r\n          return left && right;\r\n      }\r\n      return inorder(root);\r\n  }\r\n  ```\r\n\r\n  \r\n\r\n- 求二叉搜索树的最小绝对差\r\n\r\n  - 递归：中序，双指针操作\r\n  - 迭代：模拟中序，逻辑相同\r\n\r\n  ```js\r\n  // 辅助数组\r\n  // var getMinimumDifference = function(root) {\r\n  //     const arr = [];\r\n  //     const inorder = function(node) {\r\n  //         if(node) {\r\n  //             inorder(node.left);\r\n  //             arr.push(node.val);\r\n  //             inorder(node.right);\r\n  //         }\r\n  //     }\r\n  //     inorder(root);\r\n  //     let res = Infinity;\r\n  //     for(let i = 1;i < arr.length;i++) {\r\n  //         res = Math.min(res, arr[i] - arr[i - 1]);\r\n  //     }\r\n  //     return res;\r\n  // };\r\n  \r\n  var getMinimumDifference = function(root) {\r\n      let res = Infinity; // 差值\r\n      let pre = null; // 前一个节点\r\n      const inorder = function(node) {\r\n          if(!node) return;\r\n          inorder(node.left);\r\n          if(pre) res = Math.min(res, node.val-pre.val);\r\n          pre = node; // 记录前一个节点\r\n          inorder(node.right);\r\n      }\r\n      inorder(root);\r\n      return res;\r\n  }\r\n  ```\r\n\r\n  \r\n\r\n- 求二叉搜索树的众数\r\n\r\n  - 递归：中序，清空结果集的技巧，遍历一遍便可求众数集合\r\n\r\n  ```js\r\n  // 使用了map额外空间\r\n  // var findMode = function(root) {\r\n  //     let res = [];\r\n  //     let map = new Map();\r\n  //     const inorder = function(node) {\r\n  //         if(node) {\r\n  //             inorder(node.left);\r\n  //             map.set(node.val, map.get(node.val)?map.get(node.val)+1:1);\r\n  //             inorder(node.right);\r\n  //         }\r\n  //     }\r\n  //     inorder(root);\r\n  //     let maxCount = map.get(root.val); // 初始化一个值\r\n  //     for(let [key, value] of map) {\r\n  //         if(value === maxCount) res.push(key);\r\n  //         if(value > maxCount) {\r\n  //             res = []; // 出现次数更多的，清空数组，重新赋值\r\n  //             maxCount = value;\r\n  //             res.push(key);\r\n  //         }\r\n  //     }\r\n  //     return res;\r\n  // };\r\n  \r\n  // 不适用额外空间\r\n  var findMode = function(root) {\r\n      // 最大出现次数初始为1\r\n      let count = 0, maxCount = 1;\r\n      let pre = root; // 前节点\r\n      let res = [];\r\n      // 1. 确定递归函数和递归参数\r\n      const inorder = function(node) {\r\n          // 2. 确定终止条件\r\n          if(node == null) return;\r\n          inorder(node.left);\r\n          // 3. 单层递归逻辑\r\n          if(pre.val === node.val) count++;\r\n          else count = 1;\r\n          pre = node; // 记录前节点\r\n          if(count === maxCount) res.push(node.val);\r\n          else if(count > maxCount) {\r\n              res = [];\r\n              maxCount = count;\r\n              res.push(node.val);\r\n          }\r\n          inorder(node.right);\r\n      }\r\n      inorder(root);\r\n      return res;\r\n  }\r\n  ```\r\n\r\n  \r\n\r\n- 二叉搜索树转成累加树\r\n\r\n  - 递归：中序，双指针操作累加\r\n  - 迭代：模拟中序，逻辑相同\r\n\r\n```js\r\nvar convertBST = function(root) {\r\n    let pre = 0; // 记录前一个节点的数值\r\n    const travelsal = function(cur) {\r\n        if(cur == null) return;     \r\n        travelsal(cur.right); // 右\r\n        cur.val += pre; // 中\r\n        pre = cur.val;\r\n        travelsal(cur.left); // 右中左\r\n    }\r\n    travelsal(root);\r\n    return root;\r\n};\r\n```\r\n\r\n\r\n\r\n# 五、二叉树公共祖先问题\r\n\r\n- 二叉树的公共祖先问题\r\n\r\n  - 递归：后序，回溯，找到左子树出现目标值，右子树节点目标值的节点。\r\n  - 迭代：不适合模拟回溯\r\n\r\n  ```js\r\n  var lowestCommonAncestor = function(root, p, q) {\r\n      // 使用递归的方法\r\n      // 需要从下到上，所以使用后序遍历\r\n      // 1. 确定递归的函数\r\n      const travelTree = function(node) {\r\n          // 2. 确定终止条件\r\n          if(node == null || node === p || node === q) return node;\r\n          // 3. 单层递归逻辑\r\n          let left = travelTree(node.left);\r\n          let right = travelTree(node.right);\r\n          if(left != null && right != null) return node;\r\n          if(left) return left;\r\n          return right;\r\n      }\r\n      return travelTree(root);\r\n  };\r\n  ```\r\n\r\n- 二叉搜索树的公共祖先问题\r\n\r\n  - 递归：顺序无所谓，如果节点的数值在目标区间就是最近公共祖先\r\n  - 迭代：按序遍历\r\n\r\n\r\n\r\n# 六、二叉搜索树的修改与构造\r\n\r\n- 二叉搜索树中的插入操作\r\n\r\n  - 递归：顺序无所谓，通过递归函数返回值添加节点\r\n  - 迭代：按序遍历，需要记录插入父节点，这样才能做插入操作\r\n\r\n  ```js\r\n  // 有返回值var insertIntoBST = function(root, val) {    if(root == null) return new TreeNode(val);    if(root.val > val) root.left = insertIntoBST(root.left, val);    if(root.val < val) root.right = insertIntoBST(root.right, val);    return root;};\r\n  ```\r\n\r\n- 二叉搜索树中的删除操作\r\n\r\n  - 递归：前序，想清楚删除非叶子节点的情况\r\n  - 迭代：有序遍历，较复杂\r\n\r\n  ```js\r\n  var deleteNode = function(root, key) {\r\n      const preorder = function(node) {\r\n          // 没找到删除的节点，遍历到空节点直接返回null\r\n          if(node == null) return null;\r\n          if(node.val === key) {\r\n              // 左右孩子都为空，直接删除节点，返回null为根节点\r\n              if(!node.left && !node.right) return null;\r\n              else if(!node.left && node.right) return node.right;\r\n              else if(node.left && !node.right) return node.left;\r\n              // 左右子树都不为空，则将要删除节点的左孩子，放到右孩子的最左节点的左孩子上\r\n              else {\r\n                  let cur = node.right;\r\n                  while(cur.left) {\r\n                      cur = cur.left;\r\n                  }\r\n                  cur.left = node.left; // 把要删除的节点(node)的左子树放在cur的左孩子的位置\r\n                  let tmp = node;\r\n                  node = node.right;\r\n                  delete tmp;\r\n                  return node;\r\n              }\r\n          }\r\n          if(node.val > key) node.left = preorder(node.left);\r\n          if(node.val < key) node.right = preorder(node.right);\r\n          return node;\r\n      }\r\n      return preorder(root);\r\n  };\r\n  ```\r\n\r\n  \r\n\r\n- 修剪二叉搜索树\r\n\r\n  - 递归：前序，通过递归函数返回值删除节点\r\n  - 迭代：有序遍历，较复杂\r\n\r\n  ```js\r\n  var trimBST = function(root, low, high) {\r\n      const preorder = function(node) {\r\n          if(node == null) return null;\r\n          if(node.val < low) return preorder(node.right);\r\n          if(node.val > high) return preorder(node.left);\r\n  \r\n          if(node.left) node.left = preorder(node.left);\r\n          if(node.right) node.right = preorder(node.right);\r\n          return node;\r\n      }\r\n      return preorder(root);\r\n  };\r\n  ```\r\n\r\n  \r\n\r\n- 构造二叉搜索树\r\n\r\n  - 递归：前序，数组中间节点分割\r\n  - 迭代：较复杂，通过三个队列来模拟\r\n\r\n  ```js\r\n  var sortedArrayToBST = function(nums) {\r\n      const preorder = function(l, r) {\r\n          if(l > r) return null;\r\n          let mid = Math.floor((r - l) / 2) + l;\r\n          let root = new TreeNode(nums[mid]);\r\n          root.left = preorder(l, mid-1);\r\n          root.right = preorder(mid+1, r);\r\n          return root;\r\n      }\r\n      return preorder(0, nums.length-1);\r\n  };\r\n  ```\r\n\r\n  \r\n\r\n# 总结\r\n\r\n- 涉及到二叉树的构造，无论普通二叉树还是二叉搜索树一定前序，都是先构造中节点。\r\n- 求普通二叉树的属性，一般是后序，一般要通过递归函数的返回值做计算。\r\n- 求二叉搜索树的属性，一定是中序了，要不白瞎了有序性了。\r\n\r\n注意在普通二叉树的属性中，这里用的是一般为后序，例如单纯求深度就用前序，`二叉树：找所有路径`也用了前序，这是为了方便让父节点指向子节点。', '![](https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fphoto%2F2012-3-26%2Fenterdesk.com-3947C8124CD406DC594BEDF507AB07DC.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1648179256&t=8fea7024a7c0681b6c790786667b211e)', 1, 1, 1, 1, 135, 899, 10, 1, 0, NULL, NULL, '2022-02-23 11:35:19', '2022-02-23 11:35:24');

-- ----------------------------
-- Table structure for blog_tag
-- ----------------------------
DROP TABLE IF EXISTS `blog_tag`;
CREATE TABLE `blog_tag`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `blog_id` bigint(20) NOT NULL COMMENT '博客id',
  `tag_id` bigint(20) NOT NULL COMMENT '标签id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of blog_tag
-- ----------------------------
INSERT INTO `blog_tag` VALUES (1, 1, 1);
INSERT INTO `blog_tag` VALUES (2, 2, 2);
INSERT INTO `blog_tag` VALUES (3, 1, 2);
INSERT INTO `blog_tag` VALUES (4, 3, 3);
INSERT INTO `blog_tag` VALUES (5, 3, 4);

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '分类名',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, '学习笔记');
INSERT INTO `category` VALUES (2, '个人项目');
INSERT INTO `category` VALUES (3, '技术杂烩');
INSERT INTO `category` VALUES (4, '心情随写');

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
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of friend
-- ----------------------------
INSERT INTO `friend` VALUES (1, '房东的猫', '一个每天喝java的神秘男子', 'https://juejin.cn/user/308280372761549?utm_source=gold_browser_extension', 'https://p6-passport.byteacctimg.com/img/user-avatar/8017d9bdcdc1ae27d157d873084090b9~300x300.image', 1, 211, '2022-02-23 09:24:16');

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
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of moment
-- ----------------------------
INSERT INTO `moment` VALUES (1, '# 我的天啊', 31, 0, '2021-12-03 14:22:36');
INSERT INTO `moment` VALUES (2, '# 呕把联系我', 28, 1, '2021-10-16 14:23:07');
INSERT INTO `moment` VALUES (3, '原服务器到期了，打了两天前的服务器镜像（丢了两天数据），迁移成功\\n\\n [百度一下](http://www.baidu.com){target=_blank}', 112, 1, '2022-01-02 16:32:43');

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
  `value` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `type` int(11) NULL DEFAULT NULL COMMENT '1基础设置 2页脚徽标 3资料卡 4友链信息',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of site_setting
-- ----------------------------
INSERT INTO `site_setting` VALUES (1, 'webTitleSuffix', '网页标题后缀', ' - WeiJ\'s Blog', 1);
INSERT INTO `site_setting` VALUES (2, 'blogName', '博客名称', 'WeiJ\'s Blog', 1);
INSERT INTO `site_setting` VALUES (3, 'footerImgTitle', '页脚图片标题', '手机看本站', 1);
INSERT INTO `site_setting` VALUES (4, 'footerImgUrl', '页脚图片路径', '@a/img/qr.png', 1);
INSERT INTO `site_setting` VALUES (5, 'copyright', 'Copyright', '{\"title\":\"Copyright © 2021 - 2022\",\"siteName\":\"WeiJ\'S BLOG\"}', 1);
INSERT INTO `site_setting` VALUES (6, 'beian', 'ICP备案号', '\r\n粤ICP备2021129104号', 1);
INSERT INTO `site_setting` VALUES (7, 'badge', '徽标', '{\"title\":\"由 Spring Boot 强力驱动\",\"url\":\"https://spring.io/projects/spring-boot/\",\"subject\":\"Powered\",\"value\":\"Node.js\",\"color\":\"blue\"}', 2);
INSERT INTO `site_setting` VALUES (8, 'badge', '徽标', '{\"title\":\"Vue.js 客户端渲染\",\"url\":\"https://cn.vuejs.org/\",\"subject\":\"SPA\",\"value\":\"Vue.js\",\"color\":\"brightgreen\"}', 2);
INSERT INTO `site_setting` VALUES (9, 'badge', '徽标', '{\"title\":\"UI 框架 Semantic-UI\",\"url\":\"https://semantic-ui.com/\",\"subject\":\"UI\",\"value\":\"Semantic-UI\",\"color\":\"semantic-ui\"}', 2);
INSERT INTO `site_setting` VALUES (10, 'badge', '徽标', '{\"title\":\"阿里云提供服务器及域名相关服务\",\"url\":\"https://www.aliyun.com/\",\"subject\":\"VPS & DNS\",\"value\":\"Aliyun\",\"color\":\"blueviolet\"}', 2);
INSERT INTO `site_setting` VALUES (11, 'badge', '徽标', '{\"title\":\"jsDelivr 提供 CDN 加速服务\",\"url\":\"https://www.jsdelivr.com/\",\"subject\":\"CDN\",\"value\":\"jsDelivr\",\"color\":\"orange\"}', 2);
INSERT INTO `site_setting` VALUES (12, 'badge', '徽标', '{\"title\":\"GitHub 提供图床\",\"url\":\"https://github.com/\",\"subject\":\"OSS\",\"value\":\"GitHub\",\"color\":\"github\"}', 2);
INSERT INTO `site_setting` VALUES (13, 'badge', '徽标', '{\"title\":\"本站点采用 CC BY 4.0 国际许可协议进行许可\",\"url\":\"https://creativecommons.org/licenses/by/4.0/\",\"subject\":\"CC\",\"value\":\"BY 4.0\",\"color\":\"lightgray\"}', 2);
INSERT INTO `site_setting` VALUES (14, 'avatar', '图片路径', 'https://naccl.top/img/avatar.jpg', 3);
INSERT INTO `site_setting` VALUES (15, 'name', '昵称', '竹溪听风', 3);
INSERT INTO `site_setting` VALUES (16, 'rollText', '滚动个签', '\"以家为家，以乡为乡。\",\"以国为国，以天下为天下。\"', 3);
INSERT INTO `site_setting` VALUES (17, 'github', 'GitHub地址', 'https://github.com/CoderWeiJ', 3);
INSERT INTO `site_setting` VALUES (18, 'qq', 'QQ链接', 'http://sighttp.qq.com/authd?IDKEY=', 3);
INSERT INTO `site_setting` VALUES (19, 'bilibili', 'bilibili链接', 'https://space.bilibili.com/', 3);
INSERT INTO `site_setting` VALUES (20, 'netease', '网易云音乐', 'https://music.163.com/#/user/home?id=', 3);
INSERT INTO `site_setting` VALUES (21, 'email', 'email', '1213586653@qq.com', 3);
INSERT INTO `site_setting` VALUES (22, 'favorite', '自定义', '{\"title\":\"最喜欢的动漫 📺\",\"content\":\"异度侵入、春物语、NO GAME NO LIFE、实力至上主义的教室、辉夜大小姐、青春猪头少年不会梦到兔女郎学姐、路人女主、Re0、魔禁、超炮、俺妹、在下坂本、散华礼弥、OVERLORD、慎勇、人渣的本愿、白色相簿2、死亡笔记、DARLING in the FRANXX、鬼灭之刃\"}', 3);
INSERT INTO `site_setting` VALUES (23, 'favorite', '自定义', '{\"title\":\"最喜欢我的女孩子们 🤤\",\"content\":\"芙兰达、土间埋、食蜂操祈、佐天泪爷、樱岛麻衣、桐崎千棘、02、亚丝娜、高坂桐乃、五更琉璃、安乐冈花火、一色彩羽、英梨梨、珈百璃、时崎狂三、可儿那由多、和泉纱雾、早坂爱\"}', 3);
INSERT INTO `site_setting` VALUES (24, 'favorite', '自定义', '{\"title\":\"最喜欢玩的游戏 🎮\",\"content\":\"Stellaris、巫师、GTA、荒野大镖客、刺客信条、魔兽争霸、LOL、PUBG\"}', 3);
INSERT INTO `site_setting` VALUES (25, 'reward', '赞赏码路径', '/img/reward.jpg', 1);
INSERT INTO `site_setting` VALUES (26, 'commentAdminFlag', '博主评论标识', '咕咕', 1);
INSERT INTO `site_setting` VALUES (27, 'friendContent', '友链页面信息', '随机排序，不分先后。欢迎交换友链~(￣▽￣)~*\r\n\r\n* 昵称：WeiJ。  \r\n* 一句话：有朋自远方来，不亦乐乎。\r\n* 网址：[https://naccl.top](https://naccl.top)\r\n* 头像URL：[https://naccl.top/img/avatar.jpg](https://naccl.top/img/avatar.jpg)\r\n\r\n仅凭个人喜好添加友链，请在收到我的回复邮件后再于贵站添加本站链接。原则上已添加的友链不会删除，如果你发现自己被移除了，恕不另行通知，只需和我一样做就好。\r\n\r\n', 4);
INSERT INTO `site_setting` VALUES (28, 'friendCommentEnabled', '友链页面评论开关', '1', 4);

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '标签名',
  `color` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '标签颜色(可选)',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tag
-- ----------------------------
INSERT INTO `tag` VALUES (1, 'vue', 'pink');
INSERT INTO `tag` VALUES (2, 'git', 'red');
INSERT INTO `tag` VALUES (3, '算法', 'blue');
INSERT INTO `tag` VALUES (4, '二叉树', 'black');

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
