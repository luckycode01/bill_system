var _ = require('lodash');
var path = require("path");
var dao = require(path.join(process.cwd(), "dao/DAO"));
var permissionAPIDAO = require(path.join(process.cwd(), "dao/PermissionAPIDAO"));
var menuDAO = require(path.join(process.cwd(), "dao/MenuDAO"));
var utils = require("../utils/index");

/**
 * 获取左侧菜单数据
 * 
 * @param  {Function} cb 回调函数
 */
module.exports.getLeftMenus = function (userInfo, cb) {
	if (!userInfo) return cb("无权限访问");



	var authFn = function (rid, keyRolePermissions, cb) {
		permissionAPIDAO.list(function (err, permissions) {
			if (err) return cb("获取权限数据失败");
			let res = _.cloneDeep(permissions);
			res = utils.listTransFormTree(permissions, "ps_id", "ps_pid", 1);
			res = utils.dataMap(res).sort(utils.compare)
			cb(null, res);
		});
	}

	rid = userInfo.rids;
	if (rid == 0) {
		authFn(rid, null, cb);
	} else {
		menuDAO.getMenuList(userInfo, function (err, role) {
			if (err || !role) return cb("无权限访问");
			rolePermissions = role;
			keyRolePermissions = {}
			for (idx in rolePermissions) {
				keyRolePermissions[rolePermissions[idx]] = true;
			}

			authFn(rid, keyRolePermissions, cb);
		})
		// dao.show("RoleModel",userInfo.rid,function(err,role){
		// 	if(err || !role) return cb("无权限访问");


		// 	rolePermissions = role.ps_ids.split(",")
		// 	keyRolePermissions = {}
		// 	for(idx in rolePermissions) {
		// 		keyRolePermissions[rolePermissions[idx]] = true;
		// 	}

		// 	authFn(rid,keyRolePermissions,cb);

		// })
	}

}

/**
 * 
 * @param {*} userInfo 
 * @param {*} cb 
 * @returns 
 */
module.exports.updateMenu = function (userInfo, cb) {
	if (!userInfo) return cb("无权限访问");



	var authFn = function (rid, keyRolePermissions, cb) {
		permissionAPIDAO.list(function (err, permissions) {
			if (err) return cb("获取权限数据失败");
			let res = _.cloneDeep(permissions);
			res = utils.listTransFormTree(permissions, "ps_id", "ps_pid", 1);
			res = utils.dataMap(res).sort(utils.compare)
			cb(null, res);
		});
	}

	rid = userInfo.rids;
	if (rid == 0) {
		authFn(rid, null, cb);
	} else {
		menuDAO.getMenuList(userInfo, function (err, role) {
			if (err || !role) return cb("无权限访问");
			rolePermissions = role;
			keyRolePermissions = {}
			for (idx in rolePermissions) {
				keyRolePermissions[rolePermissions[idx]] = true;
			}

			authFn(rid, keyRolePermissions, cb);
		})
	}

}
