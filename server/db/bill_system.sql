-- --创建名称为bill_system的数据库，并设定编码集为utf8mb4
CREATE DATABASE IF NOT EXISTS bill_system DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- 创建了一个名为：hive 密码为：hive1234 的用户,设置为任意ip都可以访问（%）
create user 'lucky' @'%' identified by 'Aa123456@123';

--  授予 lucky 用户在 bill_system 库的所有权限，on后面接的 bill_system 是db名字
grant all privileges on bill_system.* to lucky @'%' identified by 'Aa123456@123';

-- --刷新
flush privileges;

use bill_system;

drop table if exists user_center;

/*==============================================================*/
/* Table: user_manager                                          */
/*==============================================================*/
create table user_manager (
   `mg_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
   `avator` varchar(100) NULL DEFAULT NULL comment '用户头像',
   `mg_name` varchar(32) NOT NULL COMMENT '名称',
   `mg_pwd` char(64) NOT NULL COMMENT '密码',
   `role_id` tinyint(11) NOT NULL DEFAULT '0' COMMENT '角色id',
   `mg_mobile` varchar(32) DEFAULT NULL,
   `mg_email` varchar(64) DEFAULT NULL,
   `mg_state` tinyint(2) DEFAULT '1' COMMENT '1：表示启用 0:表示禁用',
   `mg_time` int(10) unsigned NOT NULL COMMENT '创建时间',
   `gmt_mod` ified DATETIME NOT NULL COMMENT '更新时间',
   `deleted` tinyint NOT NULL COMMENT '逻辑删除(0未删除；1删除)',
   PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=510 DEFAULT CHARSET=utf8 COMMENT='管理员表';

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


-- ----------------------------
-- Table structure for sp_user
-- ----------------------------
CREATE TABLE `sp_user` (
   `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增id',
   `username` varchar(128) NOT NULL DEFAULT '' COMMENT '登录名',
   `password` char(64) NOT NULL DEFAULT '' COMMENT '登录密码',
   `avator` varchar(100) NULL DEFAULT NULL COMMENT '用户头像',
   `user_email` varchar(64) NOT NULL DEFAULT '' COMMENT '邮箱',
   `user_sex` enum('2', '0', '1') NOT NULL DEFAULT '2' COMMENT '性别（0：男，1：女）',
   `user_qq` varchar(32) NOT NULL DEFAULT '' COMMENT 'qq',
   `user_mobile` varchar(32) NOT NULL DEFAULT '' COMMENT '手机',
   `user_edu` enum('10', '20', '30', '40', '50', '60', '70') NOT NULL DEFAULT '本科' COMMENT '学历(70:博士, 60:硕士, 50:本科, 40:专科, 30:高中, 20:初中, 10:小学)',
   `user_introduce` text COMMENT '简介',
   `create_time` int(11) NOT NULL COMMENT '创建时间',
   `update_time` int(11) NOT NULL COMMENT '修改时间',
   PRIMARY KEY (`user_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = utf8 COMMENT = '用户表';


/*==============================================================*/
/* Table bill_system for bill_daily_life  */ 
/*==============================================================*/

DROP TABLE IF EXISTS bill_daily_life;

CREATE TABLE bill_daily_life (
   id bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
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
   id bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
   user_id bigint(20) NULL DEFAULT NULL COMMENT '用户ID',
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