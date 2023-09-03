-- --创建名称为bill_system的数据库，并设定编码集为utf8mb4
CREATE DATABASE IF NOT EXISTS bill_system DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- 创建了一个名为：hive 密码为：hive1234 的用户,设置为任意ip都可以访问（%）
create user 'lucky' @'%' identified by 'Aa123456@123';

--  授予 lucky 用户在 bill_system 库的所有权限，on后面接的 bill_system 是db名字
-- grant all privileges on bill_system.* to lucky @'%' identified by 'Aa123456@123';
grant all privileges on bill_system.* to lucky@'%' with grant option;

-- --刷新
flush privileges;

use bill_system;


/*==============================================================*/
/* Table: user_manager                                          */
/*==============================================================*/
DROP TABLE IF EXISTS `user_manager`;
create table user_manager (
   `mg_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
   `mg_name` varchar(32) NOT NULL COMMENT '名称',
   `mg_pwd` char(64) NOT NULL COMMENT '密码',
   `role_id` tinyint(11) NOT NULL DEFAULT '0' COMMENT '角色id',
   `mg_mobile` varchar(32) DEFAULT NULL,
   `mg_email` varchar(64) DEFAULT NULL,
   `avator` varchar(100) NULL DEFAULT NULL comment '用户头像',
   `mg_state` tinyint(2) DEFAULT '1' COMMENT '1：表示启用 0:表示禁用',
   `create_time` int(10) unsigned NOT NULL COMMENT '创建时间',
   `update_time` int(10) unsigned NOT NULL COMMENT '修改时间',
   `deleted` tinyint NOT NULL COMMENT '逻辑删除(0未删除；1删除)',
   PRIMARY KEY (mg_id)
) ENGINE=InnoDB AUTO_INCREMENT=510 DEFAULT CHARSET=utf8 COMMENT='管理员表';

INSERT INTO `user_manager` VALUES ('1', 'admin', '$2y$10$sZlpZNoLAnoD1DtYO9REAODCPkpMb5bwl4oMzrMvJa83k9BY3KRwq', '0', '12345678', 'adsfad@qq.com', null, '1', '1486720211',  '1486720211',  '0');

-- ----------------------------
-- Table structure for sp_role
-- ----------------------------
DROP TABLE IF EXISTS `sp_role`;
CREATE TABLE `sp_role` (
  `role_id` smallint(6) unsigned NOT NULL AUTO_INCREMENT,
  `role_name` varchar(20) NOT NULL COMMENT '角色名称',
  `ps_ids` varchar(512) NOT NULL DEFAULT '' COMMENT '权限ids,1,2,5',
  `ps_ca` text COMMENT '控制器-操作,控制器-操作,控制器-操作',
  `role_desc` text,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;

INSERT INTO `sp_role` VALUES ('30', '主管', '101,0,104,116,115,142,143,144,121,122,123,149,102,107,109,103,111,129,130,134,135,138,139,140,141,112,147,125,110,131,132,133,136,137,145,146,148', 'Goods-index,Goods-tianjia,Category-index,Order-showlist,Brand-index', '技术负责人');
INSERT INTO `sp_role` VALUES ('31', '测试角色', '101,0,104,105,116,117,115,142,143,144,121,122,123,149,103,111,129,134,138,112,147', 'Goods-showlist,Goods-tianjia,Category-showlist,Order-showlist,Order-dayin,Order-tianjia', '测试角色描述');
INSERT INTO `sp_role` VALUES ('34', '测试角色2', '0,105,116,142,143,122', null, '测试描述12');

-- ----------------------------
-- Table structure for sp_permission
-- ----------------------------
DROP TABLE IF EXISTS `sp_permission`;
CREATE TABLE `sp_permission` (
  `ps_id` smallint(6) unsigned NOT NULL AUTO_INCREMENT,
  `ps_name` varchar(20) NOT NULL COMMENT '权限名称',
  `ps_pid` smallint(6) unsigned NOT NULL COMMENT '父id',
  `ps_c` varchar(32) NOT NULL DEFAULT '' COMMENT '控制器',
  `ps_a` varchar(32) NOT NULL DEFAULT '' COMMENT '操作方法',
  `ps_level` enum('0','2','1') NOT NULL DEFAULT '0' COMMENT '权限等级',
  PRIMARY KEY (`ps_id`)
) ENGINE=InnoDB AUTO_INCREMENT=160 DEFAULT CHARSET=utf8 COMMENT='权限表';
INSERT INTO `sp_permission` VALUES ('101', '商品管理', '0', '', '', '0');
INSERT INTO `sp_permission` VALUES ('102', '订单管理', '0', '', 'order', '0');
INSERT INTO `sp_permission` VALUES ('103', '权限管理', '0', '', '', '0');
INSERT INTO `sp_permission` VALUES ('104', '商品列表', '101', 'Goods', 'index', '1');
INSERT INTO `sp_permission` VALUES ('105', '添加商品', '104', 'Goods', 'tianjia', '2');
INSERT INTO `sp_permission` VALUES ('107', '订单列表', '102', 'Order', 'index', '1');
INSERT INTO `sp_permission` VALUES ('109', '添加订单', '107', 'Order', 'tianjia', '2');
INSERT INTO `sp_permission` VALUES ('110', '用户列表', '125', 'Manager', 'index', '1');
INSERT INTO `sp_permission` VALUES ('111', '角色列表', '103', 'Role', 'index', '1');
INSERT INTO `sp_permission` VALUES ('112', '权限列表', '103', 'Permission', 'index', '1');
INSERT INTO `sp_permission` VALUES ('115', '分类参数', '101', 'Type', 'index', '1');
INSERT INTO `sp_permission` VALUES ('116', '商品修改', '104', 'Goods', 'upd', '2');
INSERT INTO `sp_permission` VALUES ('117', '商品删除', '104', 'Goods', 'del', '2');
INSERT INTO `sp_permission` VALUES ('121', '商品分类', '101', '', '', '1');
INSERT INTO `sp_permission` VALUES ('122', '添加分类', '121', '', '', '2');
INSERT INTO `sp_permission` VALUES ('123', '删除分类', '121', '', '', '2');
INSERT INTO `sp_permission` VALUES ('125', '用户管理', '0', '', '', '0');
INSERT INTO `sp_permission` VALUES ('129', '添加角色', '111', '', '', '2');
INSERT INTO `sp_permission` VALUES ('130', '删除角色', '111', '', '', '2');
INSERT INTO `sp_permission` VALUES ('131', '添加用户', '110', '', '', '2');
INSERT INTO `sp_permission` VALUES ('132', '删除用户', '110', '', '', '2');
INSERT INTO `sp_permission` VALUES ('133', '更新用户', '110', '', '', '2');
INSERT INTO `sp_permission` VALUES ('134', '角色授权', '111', '', '', '2');
INSERT INTO `sp_permission` VALUES ('135', '取消角色授权', '111', '', '', '2');
INSERT INTO `sp_permission` VALUES ('136', '获取用户详情', '110', '', '', '2');
INSERT INTO `sp_permission` VALUES ('137', '分配用户角色', '110', '', '', '2');
INSERT INTO `sp_permission` VALUES ('138', '获取角色列表', '111', '', '', '2');
INSERT INTO `sp_permission` VALUES ('139', '获取角色详情', '111', '', '', '2');
INSERT INTO `sp_permission` VALUES ('140', '更新角色信息', '111', '', '', '2');
INSERT INTO `sp_permission` VALUES ('141', '更新角色权限', '111', '', '', '2');
INSERT INTO `sp_permission` VALUES ('142', '获取参数列表', '115', '', '', '2');
INSERT INTO `sp_permission` VALUES ('143', '创建商品参数', '115', '', '', '2');
INSERT INTO `sp_permission` VALUES ('144', '删除商品参数', '115', '', '', '2');
INSERT INTO `sp_permission` VALUES ('145', '数据统计', '0', '', '', '0');
INSERT INTO `sp_permission` VALUES ('146', '数据报表', '145', '', '', '1');
INSERT INTO `sp_permission` VALUES ('147', '查看权限', '112', '', '', '2');
INSERT INTO `sp_permission` VALUES ('148', '查看数据', '146', '', '', '2');
INSERT INTO `sp_permission` VALUES ('149', '获取分类详情', '121', '', '', '2');
INSERT INTO `sp_permission` VALUES ('150', '更新商品图片', '104', '', '', '2');
INSERT INTO `sp_permission` VALUES ('151', '更新商品属性', '104', '', '', '2');
INSERT INTO `sp_permission` VALUES ('152', '更新商品状态', '104', '', '', '2');
INSERT INTO `sp_permission` VALUES ('153', '获取商品详情', '104', '', '', '2');
INSERT INTO `sp_permission` VALUES ('154', '订单更新', '107', '', '', '2');
INSERT INTO `sp_permission` VALUES ('155', '获取订单详情', '107', '', '', '2');
INSERT INTO `sp_permission` VALUES ('156', '分类参数添加', '101', '', '', '2');
INSERT INTO `sp_permission` VALUES ('157', '分类参数删除', '101', '', '', '2');
INSERT INTO `sp_permission` VALUES ('158', '分类参数详情', '101', '', '', '2');
INSERT INTO `sp_permission` VALUES ('159', '设置管理状态', '110', '', '', '2');

-- ----------------------------
-- Table structure for sp_permission_api
-- ----------------------------
DROP TABLE IF EXISTS `sp_permission_api`;
CREATE TABLE `sp_permission_api` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ps_id` int(11) NOT NULL,
  `ps_api_service` varchar(255) DEFAULT NULL,
  `ps_api_action` varchar(255) DEFAULT NULL,
  `ps_api_path` varchar(255) DEFAULT NULL,
  `ps_api_order` int(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ps_id` (`ps_id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8;

INSERT INTO `sp_permission_api` VALUES ('1', '101', null, null, 'goods', '3');
INSERT INTO `sp_permission_api` VALUES ('2', '102', null, null, 'orders', '4');
INSERT INTO `sp_permission_api` VALUES ('3', '103', null, null, 'rights', '2');
INSERT INTO `sp_permission_api` VALUES ('4', '104', 'GoodService', 'getAllGoods', 'goods', '1');
INSERT INTO `sp_permission_api` VALUES ('5', '105', 'GoodService', 'createGood', 'goods', null);
INSERT INTO `sp_permission_api` VALUES ('6', '107', 'OrderService', 'getAllOrders', 'orders', null);
INSERT INTO `sp_permission_api` VALUES ('9', '109', 'OrderService', 'createOrder', 'orders', null);
INSERT INTO `sp_permission_api` VALUES ('10', '110', 'ManagerService', 'getAllManagers', 'users', null);

-- ----------------------------
-- Table structure for sp_user
-- ----------------------------
CREATE TABLE `sp_user` (
   `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增id',
   `username` varchar(128) NOT NULL DEFAULT '' COMMENT '登录名',
   `password` char(64) NOT NULL DEFAULT '' COMMENT '登录密码',
   `user_email` varchar(64) NOT NULL DEFAULT '' COMMENT '邮箱',
   `user_sex` enum('2', '0', '1') NOT NULL DEFAULT '2' COMMENT '性别（0：男，1：女）',
   `user_mobile` varchar(32) NOT NULL DEFAULT '' COMMENT '手机',
   `user_edu` enum('10', '20', '30', '40', '50', '60', '70') NOT NULL DEFAULT '本科' COMMENT '学历(70:博士, 60:硕士, 50:本科, 40:专科, 30:高中, 20:初中, 10:小学)',
   `user_edustr` enum('博士', '硕士', '本科', '专科', '高中', '初中', '小学') NOT NULL DEFAULT '本科' COMMENT '学历(70:博士, 60:硕士, 50:本科, 40:专科, 30:高中, 20:初中, 10:小学)',
   `user_introduce` text COMMENT '简介',
   `mg_state` tinyint(2) DEFAULT '1' COMMENT '1：表示启用 0:表示禁用',
   `deleted` tinyint NOT NULL COMMENT '逻辑删除(0未删除；1删除)',
   `role_id` tinyint(11) NOT NULL DEFAULT '0' COMMENT '角色id',
   `avator` varchar(100) NULL DEFAULT NULL COMMENT '用户头像',
   `create_time` int(11) NOT NULL COMMENT '创建时间',
   `update_time` int(11) NOT NULL COMMENT '修改时间',
   
   PRIMARY KEY (`user_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = utf8 COMMENT = '用户表';

INSERT INTO `sp_user` VALUES ('1', 'zce', '$2a$08$lV0Gr4AKx7xH7cCU4KCGCOikNzGPaWIpw9W7A9BONIxoJ2.hGC9qi', 'w@zce.me', '男', '13412344321', '60', '硕士', '简介简介简介', '1', '0', '0', null, '1512033129');
INSERT INTO `sp_user` VALUES ('11', 'ww', '$2a$08$09nUxs.9czzXc4JZJTOdteeXSd/mxZVg96AhqciGbTMB6cfbGUWC2', 'i@zce.me', '女', '13467899876', '50', '本科', '简介1231233', '1', '0', '0', null,'1512122098');


/*==============================================================*/
/* Table bill_system for bill_daily_life  */ 
/*==============================================================*/

DROP TABLE IF EXISTS bill_daily_life;

CREATE TABLE bill_daily_life (
   id int(11) NOT NULL AUTO_INCREMENT COMMENT '自增id',
   user_id bigint(20) NULL DEFAULT NULL COMMENT '用户ID',
   food_amount decimal(8, 2) NOT NULL COMMENT '快餐饮食',
   life_amount decimal(8, 2) NOT NULL COMMENT '生活买菜',
   traffic_amount decimal(8, 2) NOT NULL COMMENT '交通出行',
   merchandise_amount decimal(8, 2) NOT NULL COMMENT '日用百货',
   phone_bill decimal(8, 2) NOT NULL COMMENT '话费充值',
   vehicle_maintenance decimal(8, 2) NOT NULL COMMENT '车辆保养',
   Clothing_amount decimal(8, 2) NOT NULL COMMENT '服装服饰',
   fruit_snacks decimal(8, 2) NOT NULL COMMENT '水果零食',
   medical_health decimal(8, 2) NOT NULL COMMENT '医药健康',
   medical_remarks varchar(1024) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '医药备注',
   other_amount decimal(8, 2) NOT NULL COMMENT '其他消费',
   other_remarks varchar(1024) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '其他备注',
   dissipate_time datetime(0) NULL DEFAULT NULL COMMENT '消费时间',
   gmt_create datetime(0) NOT NULL COMMENT '创建时间',
   gmt_modified datetime(0) NOT NULL COMMENT '更新时间',
   PRIMARY KEY (id)
);

DROP TABLE IF EXISTS bill_house_renting;

CREATE TABLE bill_house_renting(
   id int(11) NOT NULL AUTO_INCREMENT COMMENT '自增id',
   user_id int(11) NULL DEFAULT NULL COMMENT '用户ID',
   room_rent decimal(8, 2) NOT NULL COMMENT '房租',
   water_start decimal(8, 2) NOT NULL COMMENT '水表起码',
   water_end decimal(8, 2) NOT NULL COMMENT '水表止码',
   water_amount decimal(8, 2) NOT NULL COMMENT '水费',
   electricity_start decimal(8, 2) NOT NULL COMMENT '电表起码',
   electricity_end decimal(8, 2) NOT NULL COMMENT '电表止码',
   electricity_amount decimal(8, 2) NOT NULL COMMENT '电费',
   network_amount decimal(8, 2) NOT NULL COMMENT '宽带网费',
   deposit decimal(8, 2) NOT NULL COMMENT '押金',
   pay_time datetime(0) NULL DEFAULT NULL COMMENT '交租时间',
   gmt_create datetime(0) NOT NULL COMMENT '创建时间',
   gmt_modified datetime(0) NOT NULL COMMENT '更新时间',
   PRIMARY KEY (id)
)