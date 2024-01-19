var _ = require('lodash');
var path = require("path");
var dao = require(path.join(process.cwd(), "dao/DAO"));
var permissionAPIDAO = require(path.join(process.cwd(), "dao/PermissionAPIDAO"));
var menuDAO = require(path.join(process.cwd(), "dao/MenuDAO"));

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
			var keyPermissions = _.keyBy(permissions, 'ps_id');
			var rootPermissionsResult = {};
			// 处理一级菜单
			for (idx in permissions) {

				permission = permissions[idx];

				if (permission.ps_level == 0) {
					if (rid != 0) {
						if (!keyRolePermissions[permission.ps_id]) continue;;
					}
					rootPermissionsResult[permission.ps_id] = {
						"id": permission.ps_id,
						"authName": permission.ps_name,
						"path": permission.ps_api_path,
						"limit":permission.ps_api_limit,
						"children": [],
						"order": permission.ps_api_order,
						"level":'',
						type:permission.ps_type,
						order:permission.ps_order,
						icon:permission.ps_icon,
						sign:permission.ps_sign,
						params:permission.ps_params,
						show:permission.ps_show,
						createTime:permission.create_time,
						serviceName:permission.ps_api_service,
						actionName:permission.ps_api_action,
					};
				}
			}

			// 处理二级菜单
			for (idx in permissions) {
				permission = permissions[idx];
				if (permission.ps_level == 1) {
					if (rid != 0) {
						if (!keyRolePermissions[permission.ps_id]) continue;;
					}
					parentPermissionResult = rootPermissionsResult[permission.ps_pid];
					if (parentPermissionResult) {
						parentPermissionResult.children.push({
							"id": permission.ps_id,
							"authName": permission.ps_name,
							"path": permission.ps_api_path,
							"limit":permission.ps_api_limit,
							"children": [],
							"order": permission.ps_api_order,
							type:permission.ps_type,
							order:permission.ps_order,
							icon:permission.ps_icon,
							sign:permission.ps_sign,
							params:permission.ps_params,
							show:permission.ps_show,
							createTime:permission.create_time,
							serviceName:permission.ps_api_service,
							actionName:permission.ps_api_action,
						});
					}
				}
			}
			// 排序
			result = _.values(rootPermissionsResult);
			result = _.sortBy(result, "order");
			for (idx in result) {
				subresult = result[idx];
				subresult.children = _.sortBy(subresult.children, "order");
			}

			cb(null, result);
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