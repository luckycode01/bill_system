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



	var authFn = function (rid, rolePermissions, cb) {
		permissionAPIDAO.list(function (err, permissions) {
			if (err) return cb("获取权限数据失败");
			let res = _.cloneDeep(permissions);
			res = utils.listTransFormTree(permissions, "ps_id", "ps_pid", 1,rid,rolePermissions);
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
			rolePermissions = role || [];
			keyRolePermissions = {}
			for (idx in rolePermissions) {
				keyRolePermissions[rolePermissions[idx]] = true;
			}

			authFn(rid, rolePermissions, cb);
		})
	}

}

/**
 * 添加菜单
 * @param {*} params 
 * @param {*} cb 
 */
module.exports.createMenu = function (params, cb) {
	menuDAO.create(
		{
			ps_name: params.menuName,
			ps_pid: params.pid,
			ps_level: params.level,
			ps_type: params.type,
			ps_icon: params.icon,
			ps_params: params.menuParams,
			ps_show: params.isShowMenu,
			create_time: Date.parse(new Date()) / 1000,
			update_time: Date.parse(new Date()) / 1000,
			ps_api_path: params.menuPath,
			ps_api_sign: params.menuSign,
			ps_api_order: params.order,
		},
		function (err, manager) {
			if (err) return cb("创建失败");
			result = {
				id: manager.mg_id,
				username: manager.mg_name,
			};
			cb(null, result);
		}
	);
}

/**
 * 
 * @param {*}  
 * @param {*}  
 * @returns 
 */
module.exports.updateMenu = function (params, cb) {
	menuDAO.show(params.id, function (err, res) {
		if (err || !res) cb("管理员ID不存在");
		menuDAO.update(
			{
				mg_id: manager.mg_id,
				role_id: rid
			},
			function (err, manager) {
				if (err) return cb("设置失败");
				cb(null, {
					id: manager.mg_id,
					rid: manager.role_id,
					username: manager.mg_name,
					mobile: manager.mg_mobile,
					email: manager.mg_email,
				});
			}
		);
	});
}

