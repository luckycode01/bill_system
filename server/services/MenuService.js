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
		permissionAPIDAO.list({}, function (err, permissions) {
			if (err) return cb("获取权限数据失败");
			let res = _.cloneDeep(permissions);
			res = res.filter(item => item.ps_delete == 1);
			res = utils.listTransFormTree(res, "ps_id", "ps_pid", 1, rid, rolePermissions);
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
			ps_pid: params.parentId,
			ps_type: params.type,
			ps_icon: params.icon,
			ps_params: params.menuParams,
			ps_show: params.isShowMenu,
			create_time: new Date(),
			update_time: new Date(),
			ps_api_path: params.menuPath,
			ps_api_sign: params.menuSign,
			ps_api_order: params.order,
			ps_api_service: params.serviceName,
			ps_api_action: params.actionName,
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
		if (err || !res) return cb(err.message);
		const obj = {
			id: params.id,
			ps_name: params.menuName,
			ps_pid: params.parentId,
			ps_type: params.type,
			ps_icon: params.icon,
			ps_params: params.menuParams,
			ps_show: params.isShowMenu,
			update_time: new Date(),
		}
		menuDAO.update("PermissionModel", { ...obj }, function (err, updateRes) {
			if (err) return cb(err);
			menuDAO.updateApi({
				id: params.id,
				ps_api_path: params.menuPath,
				ps_api_order: params.order,
				ps_api_sign: params.menuSign,
				ps_api_service: params.serviceName,
				ps_api_action: params.actionName,
			}, function (err, updateRes) {
				if (err) return cb(err);
				return cb(null, updateRes);
			});
		});
	});
}


// 根据ID查询菜单
module.exports.getMenuInfoById = function (params, cb) {
	if (!params) {
		cb("参数错误");
	}
	menuDAO.query(params, function (err, menuInfo) {
		if (err) return cb("获取菜单失败");
		let res = _.cloneDeep(menuInfo);
		res = res.length ? res[0] : [];
		cb(null, {
			id: res.ps_id,
			menuName: res.ps_name,
			parentId: res.ps_pid,
			menuType: res.ps_type,
			menuPath: res.ps_api_path,
			menuSign: res.ps_api_sign,
			icon: res.ps_icon,
			menuParams: res.ps_params,
			isShowMenu: res.ps_show,
			order: res.ps_api_order,
			serviceName: res.ps_api_service,
			actionName: res.ps_api_action,
			createTime: res.create_time,
			updateTime: res.update_time
		});
	});
};
// 删除菜单
module.exports.deleteMenu = function (params, cb) {
	if (!params) {
		cb("参数错误");
	}
	menuDAO.destroy(params, function (err, menuInfo) {
		if (err) return cb("获取菜单失败");
		let res = _.cloneDeep(menuInfo);
		res = res.length ? res[0] : [];
		cb(null, {});
	});
};
