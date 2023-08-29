-- --创建名称为bill_system的数据库，并设定编码集为utf8mb4
CREATE DATABASE IF NOT EXISTS bill_system  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- 创建了一个名为：hive 密码为：hive1234 的用户,设置为任意ip都可以访问（%）
create user 'lucky'@'%' identified by 'lucky123456';
--  授予 lucky 用户在 bill_system 库的所有权限，on后面接的 bill_system 是db名字
grant all privileges on bill_system.* to lucky@'%' identified by 'lucky123456';
-- --刷新
flush privileges;

use bill_system;

drop table if exists user_center;

drop table if exists user_priority_relationship;

drop table if exists user_role_relationship;

drop table if exists user_priority;

drop table if exists user_role;

drop table if exists user_role_priority_relationship;

/*==============================================================*/
/* Table: user_center                                          */
/*==============================================================*/
create table user_center
(
   id            bigint not null auto_increment comment '主键，自增长',
   user_name     varchar(10) not null  comment '用户名',
   password      varchar(20) not null  comment '密码',
   avator        varchar(100) null default null comment '用户头像',
   email         varchar(50) null default null comment '邮箱',
   mobile        varchar(20) null default null comment '手机',
   user_role     varchar(50) null default null comment '用户角色',
   user_status   tinyint null default null comment '用户状态(1：启用；2：未启用；',
   gmt_create           datetime not null comment '创建时间',
   gmt_modified         datetime not null comment '更新时间',
   deleted       tinyint not null comment '逻辑删除(0未删除；1删除)',
   primary key (id)
);

alter table user_center comment '用户表，一个用户就对应着一个账号，每个账号给分配多个角色，同时这个账号也可以给分配多个权限';

/*==============================================================*/
/* Table: user_priority_relationship                    */
/*==============================================================*/
create table user_priority_relationship
(
   id                   bigint not null auto_increment comment '账号 主键，自增长',
   priority_id          bigint not null comment '权限的主键id',
   gmt_create           datetime not null comment '创建时间',
   gmt_modified         datetime not null comment '更新时间',
   primary key (id)
);

alter table user_priority_relationship comment '账号与权限的关系表，一个账号可以对应多个权限，一个权限也可以属于多个账号';

/*==============================================================*/
/* Table: user_role_relationship                        */
/*==============================================================*/
create table user_role_relationship
(
   id                   bigint not null auto_increment comment '主键，自增长',
   user_id           bigint not null comment '账号的主键',
   role_id              bigint not null comment '角色的主键',
   gmt_create           datetime not null comment '创建时间',
   gmt_modified         datetime not null comment '更新时间',
   primary key (id)
);

alter table user_role_relationship comment '账号和角色的关系表，一个账号可以对应多个角色，一个角色也可以对应多个账号';

/*==============================================================*/
/* Table: user_priority                                         */
/*==============================================================*/
create table user_priority
(
   id                   bigint not null auto_increment comment '主键，自增长',
   code                 varchar(1024) not null comment '权限编号',
   url                  varchar(1024) not null comment '权限对应的请求URL',
   priority_comment     varchar(1024) comment '权限的说明备注',
   priority_type        tinyint not null default 1 comment '权限类型，1：菜单，2：按钮，其他',
   parent_id            bigint comment '父权限的主键',
   gmt_create           datetime not null comment '权限的创建时间',
   gmt_modified         datetime not null comment '权限的修改时间',
   primary key (id)
);

alter table user_priority comment '权限表，每个权限代表了系统中的一个菜单、按钮、URL请求';

/*==============================================================*/
/* Table: user_role                                             */
/*==============================================================*/
create table user_role
(
   id                   bigint not null auto_increment comment '主键，自增长',
   code                 varchar(1024) not null comment '角色编号',
   role_name            varchar(1024) not null comment '角色名称',
   role_comment         varchar(1024) comment '角色的说明备注',
   is_enabled           tinyint not null default 1 comment '角色是否启用，1：启用，0：未启用',
   gmt_create           datetime not null comment '角色的创建时间',
   gmt_modified         datetime not null comment '角色的修改时间',
   primary key (id)
);

alter table user_role comment '角色表，在系统中有多个角色，每个角色可以分配一些权限';

/*==============================================================*/
/* Table: user_role_priority_relationship                       */
/*==============================================================*/
create table user_role_priority_relationship
(
   id                   bigint not null auto_increment comment '主键，自增长',
   priority_id          bigint not null comment '权限的主键',
   role_id              bigint not null comment '角色的主键',
   gmt_create           datetime not null comment '创建时间',
   gmt_modified         datetime not null comment '更新时间',
   primary key (id)
);

alter table user_role_priority_relationship comment '角色和权限的关系表，角色和权限是多对多的关系，一个角色可以对应多个权限，一个权限可以属于多个角色';



-- Table bill_system for bill_daily_life
DROP TABLE IF EXISTS bill_daily_life;
CREATE TABLE bill_daily_life
(
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
    medical_remarks varchar(1024) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT  '医药备注',
    other_amount decimal(8, 2) NOT NULL COMMENT '其他消费',
    other_remarks varchar(1024) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT  '其他备注',
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
    water_start  decimal(8, 2) NOT NULL COMMENT '水表起码',
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
