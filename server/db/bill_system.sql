-- --创建名称为bill_system的数据库，并设定编码集为utf8mb4
CREATE DATABASE IF NOT EXISTS bill_system DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- 创建了一个名为：hive 密码为：hive1234 的用户,设置为任意ip都可以访问（%）
CREATE user 'lucky' @'%' identified by 'Aa123456@123';

--  授予 lucky 用户在 bill_system 库的所有权限，on后面接的 bill_system 是db名字
-- grant all privileges on bill_system.* to lucky @'%' identified by 'Aa123456@123';
grant all privileges on bill_system.* to lucky@'%' with grant option;

-- --刷新
flush privileges;

use bill_system;


-- TABLE: user_manager  
DROP TABLE IF EXISTS `user_center`;
CREATE TABLE user_center (
   `id` INT(8) NOT NULL AUTO_INCREMENT COMMENT '主键id',
   `username` VARCHAR(32) NOT NULL COMMENT '用户名',
   `password` CHAR(64) NOT NULL COMMENT '密码',
   `role_ids` VARCHAR(512) NULL DEFAULT NULL COMMENT '角色id(逗号分割的字符串)',
   `user_mobile` CHAR(11) DEFAULT NULL COMMENT '手机号',
   `user_email` VARCHAR(64) DEFAULT NULL COMMENT '邮箱',
   `mg_state` TINYINT(2) DEFAULT '1' COMMENT '1：表示启用 0:表示禁用',
   `create_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `update_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  COMMENT '修改时间',
   `user_type` TINYINT(2) NOT NULL DEFAULT '1' COMMENT '用户类型(1:管理用户，2:普通用户)',
   `deleted` TINYINT(2) NOT NULL COMMENT '逻辑删除(0未删除；1删除)',
   `avatar` VARCHAR(100) NULL DEFAULT NULL comment '用户头像',
   `user_sex` enum( '0', '1') NULL DEFAULT NULL COMMENT '性别（0：男，1：女）',
   `user_edu` enum('10', '20', '30', '40', '50', '60', '70')  NULL DEFAULT NULL COMMENT '学历(70:博士, 60:硕士, 50:本科, 40:专科, 30:高中, 20:初中, 10:小学)',
   `user_edustr` VARCHAR(8) NULL DEFAULT NULL COMMENT '学历',
   `user_introduce` TEXT COMMENT '简介',
   PRIMARY KEY (id),
   UNIQUE (username,user_mobile,user_email)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8 COMMENT='管理员表';

INSERT INTO `user_center` VALUES ('12', 'admin', '$2y$10$sZlpZNoLAnoD1DtYO9REAODCPkpMb5bwl4oMzrMvJa83k9BY3KRwq', '0', '13412344321', 'adsfad@qq.com', '1', '2024-01-01 12:31:00',  '2024-01-01 12:31:00', '1', '0',NULL,NULL,NULL,NULL,NULL);

INSERT INTO `user_center` VALUES (510, 'lucky','$2y$10$sZlpZNoLAnoD1DtYO9REAODCPkpMb5bwl4oMzrMvJa83k9BY3KRwq','2,3', '13412341001', '13412341001@qq.com', 0, '2024-02-02 12:31:00', '2024-02-02 12:31:00', 1, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user_center` VALUES (511, '001', '$2y$10$7ehedDkrToNRAAoqLO55euVplsJV.k0IfMjdZhnP0NiuIFZkiLV/O', '2,3', '13412123002', '13412123002@qq.com', 0, '2024-02-02 12:31:00', '2024-02-02 12:31:00', 2, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user_center` VALUES (512, '002', '$2y$10$7ehedDkrToNRAAoqLO55euVplsJV.k0IfMjdZhnP0NiuIFZkiLV/O', '2,3', '13412123003', '13412123003@qq.com', 0, '2024-02-02 12:31:00', '2024-02-02 12:31:00', 2, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user_center` VALUES (513, '003', '$2y$10$7ehedDkrToNRAAoqLO55euVplsJV.k0IfMjdZhnP0NiuIFZkiLV/O', '2,3', '13412123004', '13412123004@qq.com', 0, '2024-02-02 12:31:00', '2024-02-02 12:31:00', 2, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user_center` VALUES (514, '004', '$2y$10$7ehedDkrToNRAAoqLO55euVplsJV.k0IfMjdZhnP0NiuIFZkiLV/O', '2,3', '13412123005', '13412123005@qq.com', 0, '2024-02-02 12:31:00', '2024-02-02 12:31:00', 2, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user_center` VALUES (515, '005', '$2y$10$7ehedDkrToNRAAoqLO55euVplsJV.k0IfMjdZhnP0NiuIFZkiLV/O', '2,3', '13412123006', '13412123006@qq.com', 0, '2024-02-02 12:31:00', '2024-02-02 12:31:00', 2, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user_center` VALUES (516, '006', '$2y$10$7ehedDkrToNRAAoqLO55euVplsJV.k0IfMjdZhnP0NiuIFZkiLV/O', '2,3', '13412123007', '13412123007@qq.com', 0, '2024-02-02 12:31:00', '2024-02-02 12:31:00', 2, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user_center` VALUES (517, '007', '$2y$10$7ehedDkrToNRAAoqLO55euVplsJV.k0IfMjdZhnP0NiuIFZkiLV/O', '2,3', '13412123008', '13412123008@qq.com', 0, '2024-02-02 12:31:00', '2024-02-02 12:31:00', 2, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user_center` VALUES (518, '008', '$2y$10$7ehedDkrToNRAAoqLO55euVplsJV.k0IfMjdZhnP0NiuIFZkiLV/O', '2,3', '13412123009', '13412123009@qq.com', 0, '2024-02-02 12:31:00', '2024-02-02 12:31:00', 2, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user_center` VALUES (519, '009', '$2y$10$7ehedDkrToNRAAoqLO55euVplsJV.k0IfMjdZhnP0NiuIFZkiLV/O', '2,3', '13412123010', '13412123010@qq.com', 0, '2024-02-02 12:31:00', '2024-02-02 12:31:00', 2, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user_center` VALUES (520, '010', '$2y$10$7ehedDkrToNRAAoqLO55euVplsJV.k0IfMjdZhnP0NiuIFZkiLV/O', '2,3', '13412123011', '13412123011@qq.com', 0, '2024-02-02 12:31:00', '2024-02-02 12:31:00', 2, 0, NULL, NULL, NULL, NULL, NULL);
-- ----------------------------
-- TABLE structure for sp_role
-- ----------------------------
DROP TABLE IF EXISTS `sp_role`;
CREATE TABLE `sp_role` (
  `role_id` INT(8) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `role_name` VARCHAR(20) NOT NULL COMMENT '角色名称',
  `ps_ids` VARCHAR(512) NOT NULL DEFAULT '' COMMENT '权限ids,1,2,5',
  `ps_ca` TEXT COMMENT '控制器-操作,控制器-操作,控制器-操作',
  `role_desc` TEXT,
  `create_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8;

INSERT INTO `sp_role` VALUES ('30', '主管', '101,0,104,116,115,142,143,144,121,122,123,149,102,107,109,103,111,129,130,134,135,138,139,140,141,112,147,125,110,131,132,133,136,137,145,146,148', 'Goods-index,Goods-tianjia,Category-index,Order-showlist,Brand-index', '技术负责人','2024-02-02 12:31:00','2024-02-02 12:31:00');
INSERT INTO `sp_role` VALUES ('31', '测试角色', '101,0,104,105,116,117,115,142,143,144,121,122,123,149,103,111,129,134,138,112,147', 'Goods-showlist,Goods-tianjia,Category-showlist,Order-showlist,Order-dayin,Order-tianjia', '测试角色描述','2024-02-02 12:31:00','2024-02-02 12:31:00');
INSERT INTO `sp_role` VALUES ('34', '测试角色2', '0,105,116,142,143,122', NULL, '测试描述12','2024-02-02 12:31:00','2024-02-02 12:31:00');

INSERT INTO `sp_role` VALUES ('35', '主管1', '101,0,148', 'Order-showlist,Brand-index', '技术111111','2024-02-02 12:31:00','2024-02-02 12:31:00');
INSERT INTO `sp_role` VALUES ('36', '主管2', '101,0,148', 'Order-showlist,Brand-index', '技术222222','2024-02-02 12:31:00','2024-02-02 12:31:00');
INSERT INTO `sp_role` VALUES ('37', '主管3', '101,0,148', 'Order-showlist,Brand-index', '技术170432640','2024-02-02 12:31:00','2024-02-02 12:31:00');
INSERT INTO `sp_role` VALUES ('38', '主管4', '101,0,148', 'Order-showlist,Brand-index', '技术170432640','2024-02-02 12:31:00','2024-02-02 12:31:00');
INSERT INTO `sp_role` VALUES ('39', '员工1', '101,0,148', 'Order-showlist,Brand-index', '技术170432640','2024-02-02 12:31:00','2024-02-02 12:31:00');
INSERT INTO `sp_role` VALUES ('40', '员工1', '101,0,148', 'Order-showlist,Brand-index', '技术170432640','2024-02-02 12:31:00','2024-02-02 12:31:00');
INSERT INTO `sp_role` VALUES ('41', '员工1', '101,0,148', 'Order-showlist,Brand-index', '技术170432640','2024-02-02 12:31:00','2024-02-02 12:31:00');
INSERT INTO `sp_role` VALUES ('42', '员工1', '101,0,148', 'Order-showlist,Brand-index', '技术170432640','2024-02-02 12:31:00','2024-02-02 12:31:00');
INSERT INTO `sp_role` VALUES ('43', '员工1', '101,0,148', 'Order-showlist,Brand-index', '技术170432640','2024-02-02 12:31:00','2024-02-02 12:31:00');
INSERT INTO `sp_role` VALUES ('44', '员工1', '101,0,148', 'Order-showlist,Brand-index', '技术170432640','2024-02-02 12:31:00','2024-02-02 12:31:00');
INSERT INTO `sp_role` VALUES ('45', '员工1', '101,0,148', 'Order-showlist,Brand-index', '技术170432640','2024-02-02 12:31:00','2024-02-02 12:31:00');
INSERT INTO `sp_role` VALUES ('46', '员工1', '101,0,148', 'Order-showlist,Brand-index', '技术170432640','2024-02-02 12:31:00','2024-02-02 12:31:00');
INSERT INTO `sp_role` VALUES ('47', '员工1', '101,0,148', 'Order-showlist,Brand-index', '技术170432640','2024-02-02 12:31:00','2024-02-02 12:31:00');
INSERT INTO `sp_role` VALUES ('48', '员工1', '101,0,148', 'Order-showlist,Brand-index', '技术170432640','2024-02-02 12:31:00','2024-02-02 12:31:00');
INSERT INTO `sp_role` VALUES ('49', '员工1', '101,0,148', 'Order-showlist,Brand-index', '技术170432640','2024-02-02 12:31:00','2024-02-02 12:31:00');
INSERT INTO `sp_role` VALUES ('50', '员工1', '101,0,148', 'Order-showlist,Brand-index', '技术170432640','2024-02-02 12:31:00','2024-02-02 12:31:00');
INSERT INTO `sp_role` VALUES ('51', '员工1', '101,0,148', 'Order-showlist,Brand-index', '技术170432640','2024-02-02 12:31:00','2024-02-02 12:31:00');


-- ----------------------------
-- TABLE structure for sp_permission
-- ----------------------------

DROP TABLE IF EXISTS `sp_permission`;
CREATE TABLE `sp_permission` (
	`ps_id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
	`ps_name` VARCHAR ( 20 ) NOT NULL COMMENT '权限名称',
	`ps_pid` SMALLINT UNSIGNED NOT NULL COMMENT '父id',
	`ps_level` ENUM ( '0', '3','2', '1' ) NOT NULL DEFAULT '0' COMMENT '权限等级',
	`ps_type` INT ( 2 ) NOT NULL DEFAULT 1 COMMENT '菜单类型(菜单1,按钮2)',
	`ps_icon` VARCHAR ( 32 ) NULL DEFAULT NULL COMMENT '菜单icon',
	`ps_params` VARCHAR ( 32 ) NULL DEFAULT NULL COMMENT '路由参数',
	`ps_show` TINYINT(2) NULL  DEFAULT 1 COMMENT  '是否显示(否0，是1)',
	`ps_delete` TINYINT(2) NULL DEFAULT 1 COMMENT '是否删除(删除0，未删除1)',
   `create_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `update_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
	PRIMARY KEY ( `ps_id` ) 
) ENGINE = INNODB AUTO_INCREMENT = 100 DEFAULT CHARSET = utf8mb3 COMMENT = '权限表';

INSERT INTO `sp_permission` VALUES ('101', '商品管理', '0',  '0','1','category',NULL,1,1,'2024-02-02 12:31:00','2024-02-02 12:31:00');
INSERT INTO `sp_permission` VALUES ('102', '订单管理', '0',  '0','1','category',NULL,1,1,'2024-02-02 12:31:00','2024-02-02 12:31:00');
INSERT INTO `sp_permission` VALUES ('103', '权限管理', '0',  '0','1','category',NULL,1,1,'2024-02-02 12:31:00','2024-02-02 12:31:00');
INSERT INTO `sp_permission` VALUES ('104', '商品列表', '101', '1','1','category',NULL,1,1,'2024-02-02 12:31:00','2024-02-02 12:31:00');
INSERT INTO `sp_permission` VALUES ('105', '添加商品', '104',  '2','1','category',NULL,1,1,'2024-02-02 12:31:00','2024-02-02 12:31:00');
INSERT INTO `sp_permission` VALUES ('107', '订单列表', '102',  '1','1','category',NULL,1,1,'2024-02-02 12:31:00','2024-02-02 12:31:00');


-- ----------------------------
-- TABLE structure for sp_permission_api
-- ----------------------------
DROP TABLE IF EXISTS `sp_permission_api`;
CREATE TABLE `sp_permission_api` (
	`id` INT ( 11 ) NOT NULL AUTO_INCREMENT,
	`ps_id` INT ( 11 ) NOT NULL COMMENT '权限服务名称',
	`ps_api_service` VARCHAR ( 255 ) DEFAULT NULL COMMENT '权限服务名称',
	`ps_api_action` VARCHAR ( 255 )  DEFAULT NULL COMMENT '权限方法',
	`ps_api_path` VARCHAR ( 100 ) NOT NULL DEFAULT '' COMMENT '组件地址',
	`ps_api_sign` VARCHAR ( 32 ) NOT NULL DEFAULT '' COMMENT '权限标识',
	`ps_api_order` INT ( 4 ) NOT NULL DEFAULT 0 COMMENT '排序',
	PRIMARY KEY ( `id` ),
   KEY `ps_id` ( `ps_id` ) 
) ENGINE = INNODB AUTO_INCREMENT = 100 DEFAULT CHARSET = utf8;

INSERT INTO `sp_permission_api` VALUES ('1', '101', NULL, NULL, 'goods','', '3');
INSERT INTO `sp_permission_api` VALUES ('2', '102', NULL, NULL, 'orders','', '4');
INSERT INTO `sp_permission_api` VALUES ('3', '103', NULL, NULL, 'rights','', '2');
INSERT INTO `sp_permission_api` VALUES ('4', '104', 'GoodService', 'getAllGoods', 'goods','sys:user:add', '1');
INSERT INTO `sp_permission_api` VALUES ('5', '105', 'GoodService', 'createGood', 'goods','sys:user:delete', 0);
INSERT INTO `sp_permission_api` VALUES ('6', '107', 'OrderService', 'getAllOrders', 'orders','sys:user:get', 0);
INSERT INTO `sp_permission_api` VALUES ('9', '109', 'OrderService', 'Order', 'orders','sys:user:add', 0);
INSERT INTO `sp_permission_api` VALUES ('10', '110', 'ManagerService', 'getAllManagers','users','sys:user:list',  0);
INSERT INTO `sp_permission_api` VALUES ('11', '110', 'ManagerService', 'getInfoManager','users','sys:user:show',  0);
INSERT INTO `sp_permission_api` VALUES ('12', '107', 'RightService', 'getAllRights', 'users','sys:user:show', 0);
INSERT INTO `sp_permission_api` VALUES ('13', '107', 'MenuService', 'getLeftMenus','users','sys:user:show',  0);
INSERT INTO `sp_permission_api` VALUES ('14', '107', 'MenuService', 'createMenu','users','sys:user:show',  0);
INSERT INTO `sp_permission_api` VALUES ('15', '107', 'MenuService', 'updateMenu','users','sys:user:show',  0);

-- TABLE bill_system for sp_category
DROP TABLE IF EXISTS bill_category;
CREATE TABLE bill_category (
   `cate_id` INT(4) NOT NULL AUTO_INCREMENT COMMENT '分类id',
   `cate_name` VARCHAR(32) NOT NULL COMMENT '分类名称',
   `cate_image` VARCHAR(32) NOT NULL COMMENT '分类图标',
   `cate_desc` VARCHAR(32) NULL DEFAULT '' COMMENT '分类描述',
   `cate_order` INT(4) NULL DEFAULT 1 COMMENT '排序',
   `cate_width` INT(4) NULL DEFAULT 0 COMMENT '支出或收入分类的表头显示宽度',
   `create_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `update_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
   `deleted` TINYINT(2) NOT NULL DEFAULT 1 COMMENT '逻辑删除(1未删除；0删除)',
   PRIMARY KEY (cate_id),
   UNIQUE (cate_name)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8 COMMENT='分类表';

INSERT INTO `bill_category` VALUES (100, '快餐饮食','','',1,100,'2024-02-02 12:31:00', '2024-02-02 12:31:00',1);
INSERT INTO `bill_category` VALUES (101, '生活买菜','','',2,100,'2024-02-02 12:31:00', '2024-02-02 12:31:00',1);

-- TABLE bill_system for sp_category
DROP TABLE IF EXISTS bill_life_expend;
CREATE TABLE bill_life_expend (
   `id` INT(8) NOT NULL AUTO_INCREMENT COMMENT '账单id',
   `user_id` INT(8) NOT NULL COMMENT '用户ID',
   `category_id` INT(4) NOT NULL COMMENT '分类id',
   `bill_date` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '账单日期',
   `bill_amount` decimal(8, 2) NOT NULL COMMENT '账单金额',
   `bill_out_desc` VARCHAR(32) NULL DEFAULT '' COMMENT '支出备注',
   `bill_in_desc` VARCHAR(32) NULL DEFAULT '' COMMENT '收入备注',
   `create_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `update_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
   PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8 COMMENT='支出表';

INSERT INTO `bill_life_expend` VALUES (100, 1, 101, '2024-02-02', 15.6, '','', '2024-02-02 12:31:00', '2024-02-02 12:31:00');
INSERT INTO `bill_life_expend` VALUES (101, 1, 100, '2024-02-02', 11.4, '', '','2024-02-02 12:31:00', '2024-02-02 12:31:00');


-- -- TABLE bill_system for bill_house_rent
DROP TABLE IF EXISTS bill_house_rent;

CREATE TABLE bill_house_rent(
   `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '自增id',
   `user_id` INT(11) NULL DEFAULT NULL COMMENT '用户ID',
   `room_rent` decimal(8, 2) NOT NULL COMMENT '房租',
   `water_start` decimal(8, 2) NOT NULL COMMENT '水表起码',
   `water_end` decimal(8, 2) NOT NULL COMMENT '水表止码',
   `water_amount` decimal(8, 2) NOT NULL COMMENT '水费',
   `electricity_start` decimal(8, 2) NOT NULL COMMENT '电表起码',
   `electricity_end` decimal(8, 2) NOT NULL COMMENT '电表止码',
   `electricity_amount` decimal(8, 2) NOT NULL COMMENT '电费',
   `network_amount` decimal(8, 2) NOT NULL COMMENT '宽带网费',
   `preferential` decimal(8, 2) NOT NULL COMMENT '优惠',
   `rent_deposit` decimal(8, 2) NOT NULL COMMENT '押金',
   `rent_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '账单时间',
   `create_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `update_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
   PRIMARY KEY (`id`)
)ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8 COMMENT='房租表';


-- -- TABLE bill_system for bill_salary
DROP TABLE IF EXISTS bill_salary;

CREATE TABLE bill_salary (
   `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '自增id',
   `user_id` INT(11) NULL DEFAULT NULL COMMENT '用户ID',
   `salary_income` decimal(8, 2) NOT NULL COMMENT '薪资收入',
   `project_bonus` decimal(8, 2) NOT NULL COMMENT '项目奖金',
   `travel_allowance` decimal(8, 2) NOT NULL COMMENT '出差补贴',
   `tax_refund` decimal(8, 2) NOT NULL COMMENT '纳税退税',
   `salary_desc` VARCHAR(8) NULL DEFAULT NULL COMMENT '备注',
   `salary_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '账单时间',
   `create_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `update_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
   PRIMARY KEY (`id`)
)ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8 COMMENT='房租表';