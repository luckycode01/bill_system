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
DROP TABLE IF EXISTS `user_center`;
create table user_center (
   `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
   `username` varchar(32) NOT NULL COMMENT '用户名',
   `password` char(64) NOT NULL COMMENT '密码',
   `role_ids` varchar(512) NULL DEFAULT NULL COMMENT '角色id(逗号分割的字符串)',
   `user_mobile` varchar(32) DEFAULT NULL COMMENT '手机号',
   `user_email` varchar(64) DEFAULT NULL COMMENT '邮箱',
   `mg_state` tinyint(2) DEFAULT '1' COMMENT '1：表示启用 0:表示禁用',
   `create_time` int(10) unsigned NOT NULL COMMENT '创建时间',
   `update_time` int(10) unsigned NOT NULL COMMENT '修改时间',
   `user_type` int(2) NOT NULL DEFAULT '1' COMMENT '用户类型(1:管理用户，2:普通用户)',
   `deleted` tinyint NOT NULL COMMENT '逻辑删除(0未删除；1删除)',
   `avatar` varchar(100) NULL DEFAULT NULL comment '用户头像',
   `user_sex` enum( '0', '1') NULL DEFAULT null COMMENT '性别（0：男，1：女）',
   `user_edu` enum('10', '20', '30', '40', '50', '60', '70')  NULL DEFAULT null COMMENT '学历(70:博士, 60:硕士, 50:本科, 40:专科, 30:高中, 20:初中, 10:小学)',
   `user_edustr` varchar(8) NULL DEFAULT COMMENT '学历',
   `user_introduce` text COMMENT '简介',
   PRIMARY KEY (id),
   UNIQUE (username,user_mobile,user_email),
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='管理员表';

INSERT INTO `user_center` VALUES ('1', 'admin', '$2y$10$sZlpZNoLAnoD1DtYO9REAODCPkpMb5bwl4oMzrMvJa83k9BY3KRwq', '0,1,2', '13412344321', 'adsfad@qq.com', '1', '1486720211',  '1486720211', '1', '0',null,null,null,null,null);

INSERT INTO `user_center` VALUES (510, 'lucky','$2y$10$sZlpZNoLAnoD1DtYO9REAODCPkpMb5bwl4oMzrMvJa83k9BY3KRwq','2,3', '13412341001', '13412341001@qq.com', 0, 1704326400, 1704326400, 1, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user_center` VALUES (511, '001', '$2y$10$7ehedDkrToNRAAoqLO55euVplsJV.k0IfMjdZhnP0NiuIFZkiLV/O', '2,3', '13412123002', '13412123002@qq.com', 0, 1704326400, 1704326400, 2, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user_center` VALUES (512, '002', '$2y$10$7ehedDkrToNRAAoqLO55euVplsJV.k0IfMjdZhnP0NiuIFZkiLV/O', '2,3', '13412123003', '13412123003@qq.com', 0, 1704326400, 1704326400, 2, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user_center` VALUES (513, '003', '$2y$10$7ehedDkrToNRAAoqLO55euVplsJV.k0IfMjdZhnP0NiuIFZkiLV/O', '2,3', '13412123004', '13412123004@qq.com', 0, 1704326400, 1704326400, 2, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user_center` VALUES (514, '004', '$2y$10$7ehedDkrToNRAAoqLO55euVplsJV.k0IfMjdZhnP0NiuIFZkiLV/O', '2,3', '13412123005', '13412123005@qq.com', 0, 1704441451, 1704441451, 2, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user_center` VALUES (515, '005', '$2y$10$7ehedDkrToNRAAoqLO55euVplsJV.k0IfMjdZhnP0NiuIFZkiLV/O', '2,3', '13412123006', '13412123006@qq.com', 0, 1704441451, 1704441451, 2, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user_center` VALUES (516, '006', '$2y$10$7ehedDkrToNRAAoqLO55euVplsJV.k0IfMjdZhnP0NiuIFZkiLV/O', '2,3', '13412123007', '13412123007@qq.com', 0, 1704441451, 1704441451, 2, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user_center` VALUES (517, '007', '$2y$10$7ehedDkrToNRAAoqLO55euVplsJV.k0IfMjdZhnP0NiuIFZkiLV/O', '2,3', '13412123008', '13412123008@qq.com', 0, 1704441451, 1704441451, 2, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user_center` VALUES (518, '008', '$2y$10$7ehedDkrToNRAAoqLO55euVplsJV.k0IfMjdZhnP0NiuIFZkiLV/O', '2,3', '13412123009', '13412123009@qq.com', 0, 1704441451, 1704441451, 2, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user_center` VALUES (519, '009', '$2y$10$7ehedDkrToNRAAoqLO55euVplsJV.k0IfMjdZhnP0NiuIFZkiLV/O', '2,3', '13412123010', '13412123010@qq.com', 0, 1704441451, 1704441451, 2, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user_center` VALUES (520, '010', '$2y$10$7ehedDkrToNRAAoqLO55euVplsJV.k0IfMjdZhnP0NiuIFZkiLV/O', '2,3', '13412123011', '13412123011@qq.com', 0, 1704441451, 1704441451, 2, 0, NULL, NULL, NULL, NULL, NULL);
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
  `create_time` int(10) unsigned NOT NULL COMMENT '创建时间',
  `update_time` int(10) unsigned NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `sp_role` VALUES ('30', '主管', '101,0,104,116,115,142,143,144,121,122,123,149,102,107,109,103,111,129,130,134,135,138,139,140,141,112,147,125,110,131,132,133,136,137,145,146,148', 'Goods-index,Goods-tianjia,Category-index,Order-showlist,Brand-index', '技术负责人',1486720211,1486720211);
INSERT INTO `sp_role` VALUES ('31', '测试角色', '101,0,104,105,116,117,115,142,143,144,121,122,123,149,103,111,129,134,138,112,147', 'Goods-showlist,Goods-tianjia,Category-showlist,Order-showlist,Order-dayin,Order-tianjia', '测试角色描述',1486720211,1486720211);
INSERT INTO `sp_role` VALUES ('34', '测试角色2', '0,105,116,142,143,122', null, '测试描述12',1486720211,1486720211);

INSERT INTO `sp_role` VALUES ('35', '主管1', '101,0,148', 'Order-showlist,Brand-index', '技术111111',1704441451,1704441451);
INSERT INTO `sp_role` VALUES ('36', '主管2', '101,0,148', 'Order-showlist,Brand-index', '技术222222',1704441451,1704441451);
INSERT INTO `sp_role` VALUES ('37', '主管3', '101,0,148', 'Order-showlist,Brand-index', '技术1704326400',1704326400,1704326400);
INSERT INTO `sp_role` VALUES ('38', '主管4', '101,0,148', 'Order-showlist,Brand-index', '技术1704326400',1704326400,1704326400);
INSERT INTO `sp_role` VALUES ('39', '员工1', '101,0,148', 'Order-showlist,Brand-index', '技术1704326400',1704326400,1704326400);
INSERT INTO `sp_role` VALUES ('40', '员工1', '101,0,148', 'Order-showlist,Brand-index', '技术1704326400',1704326400,1704326400);
INSERT INTO `sp_role` VALUES ('41', '员工1', '101,0,148', 'Order-showlist,Brand-index', '技术1704326400',1704326400,1704326400);
INSERT INTO `sp_role` VALUES ('42', '员工1', '101,0,148', 'Order-showlist,Brand-index', '技术1704326400',1704326400,1704326400);
INSERT INTO `sp_role` VALUES ('43', '员工1', '101,0,148', 'Order-showlist,Brand-index', '技术1704326400',1704326400,1704326400);
INSERT INTO `sp_role` VALUES ('44', '员工1', '101,0,148', 'Order-showlist,Brand-index', '技术1704326400',1704326400,1704326400);
INSERT INTO `sp_role` VALUES ('45', '员工1', '101,0,148', 'Order-showlist,Brand-index', '技术1704326400',1704326400,1704326400);
INSERT INTO `sp_role` VALUES ('46', '员工1', '101,0,148', 'Order-showlist,Brand-index', '技术1704326400',1704326400,1704326400);
INSERT INTO `sp_role` VALUES ('47', '员工1', '101,0,148', 'Order-showlist,Brand-index', '技术1704326400',1704326400,1704326400);
INSERT INTO `sp_role` VALUES ('48', '员工1', '101,0,148', 'Order-showlist,Brand-index', '技术1704326400',1704326400,1704326400);
INSERT INTO `sp_role` VALUES ('49', '员工1', '101,0,148', 'Order-showlist,Brand-index', '技术1704326400',1704326400,1704326400);
INSERT INTO `sp_role` VALUES ('50', '员工1', '101,0,148', 'Order-showlist,Brand-index', '技术1704326400',1704326400,1704326400);
INSERT INTO `sp_role` VALUES ('51', '员工1', '101,0,148', 'Order-showlist,Brand-index', '技术1704326400',1704326400,1704326400);


-- ----------------------------
-- Table structure for sp_permission
-- ----------------------------

DROP TABLE IF EXISTS `sp_permission`;
CREATE TABLE `sp_permission` (
	`ps_id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
	`ps_name` VARCHAR ( 20 ) NOT NULL COMMENT '权限名称',
	`ps_pid` SMALLINT UNSIGNED NOT NULL COMMENT '父id',
	`ps_level` ENUM ( '0', '3','2', '1' ) NOT NULL DEFAULT '0' COMMENT '权限等级',
	`ps_type` INT ( 2 ) NOT NULL DEFAULT 1 COMMENT '菜单类型(菜单1,按钮2)',
	`ps_icon` VARCHAR ( 32 ) NULL DEFAULT '' COMMENT '菜单icon',
	`ps_params` VARCHAR ( 32 ) NULL DEFAULT NULL COMMENT '路由参数',
	`ps_show` INT ( 2 ) NULL COMMENT '是否显示(否0，是1)',
	`ps_delete` INT ( 2 ) NULL COMMENT '是否删除(删除0，未删除1)',
	`create_time` INT UNSIGNED NOT NULL COMMENT '创建时间',
	`update_time` INT UNSIGNED NOT NULL COMMENT '创建时间',
	PRIMARY KEY ( `ps_id` ) 
) ENGINE = INNODB AUTO_INCREMENT = 50 DEFAULT CHARSET = utf8mb3 COMMENT = '权限表';

INSERT INTO `sp_permission` VALUES ('101', '商品管理', '0',  '0','1','category',null,1,1,'0','0');
INSERT INTO `sp_permission` VALUES ('102', '订单管理', '0',  '0','1','category',null,1,1,'0','0');
INSERT INTO `sp_permission` VALUES ('103', '权限管理', '0',  '0','1','category',null,1,1,'0','0');
INSERT INTO `sp_permission` VALUES ('104', '商品列表', '101', '1','1','category',null,1,1,'0','0');
INSERT INTO `sp_permission` VALUES ('105', '添加商品', '104',  '2','1','category',null,1,1,'0','0');
INSERT INTO `sp_permission` VALUES ('107', '订单列表', '102',  '1','1','category',null,1,1,'0','0');


-- ----------------------------
-- Table structure for sp_permission_api
-- ----------------------------
DROP TABLE IF EXISTS `sp_permission_api`;
CREATE TABLE `sp_permission_api` (
	`id` INT ( 11 ) NOT NULL AUTO_INCREMENT,
	`ps_id` INT ( 11 ) NOT NULL,
	`ps_api_service` VARCHAR ( 255 ) DEFAULT NULL COMMENT '权限服务名称',
	`ps_api_action` VARCHAR ( 255 )  DEFAULT NULL COMMENT '权限方法',
	`ps_api_path` VARCHAR ( 100 ) NOT NULL DEFAULT '' COMMENT '组件地址',
	`ps_api_sign` VARCHAR ( 32 ) NOT NULL DEFAULT '' COMMENT '权限标识',
	`ps_api_order` INT ( 4 ) NOT NULL DEFAULT 0 COMMENT '排序',
	PRIMARY KEY ( `id` ),
KEY `ps_id` ( `ps_id` ) 
) ENGINE = INNODB AUTO_INCREMENT = 50 DEFAULT CHARSET = utf8;

INSERT INTO `sp_permission_api` VALUES ('1', '101', null, null, 'goods','','', '3');
INSERT INTO `sp_permission_api` VALUES ('2', '102', null, null, 'orders','','', '4');
INSERT INTO `sp_permission_api` VALUES ('3', '103', null, null, 'rights','','', '2');
INSERT INTO `sp_permission_api` VALUES ('4', '104', 'GoodService', 'getAllGoods', 'goods','sys:user:add','', '1');
INSERT INTO `sp_permission_api` VALUES ('5', '105', 'GoodService', 'createGood', 'goods','sys:user:delete', '','');
INSERT INTO `sp_permission_api` VALUES ('6', '107', 'OrderService', 'getAllOrders', 'orders','sys:user:get','', '');
INSERT INTO `sp_permission_api` VALUES ('9', '109', 'OrderService', 'createOrder', 'orders','sys:user:add', '','');
INSERT INTO `sp_permission_api` VALUES ('10', '110', 'ManagerService', 'getAllManagers','sys:user:list', 'users','', '');
INSERT INTO `sp_permission_api` VALUES ('11', '110', 'ManagerService', 'getInfoManager','sys:user:show', 'users','', '');
INSERT INTO `sp_permission_api` VALUES ('12', '107', 'RightService', 'getAllRights','sys:user:show', 'users','', '');
INSERT INTO `sp_permission_api` VALUES ('13', '107', 'MenuService', 'getLeftMenus','sys:user:show', 'users','', '');


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
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='支出表';

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
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='房租表';