var path = require("path");
daoModule = require("./DAO");
databaseModule = require(path.join(process.cwd(), "modules/database"));

/**
 * 获取权限列表
 * 
 * @param  {Function} cb 回调函数
 */
module.exports.list = function (cb) {
	db = databaseModule.getDatabase();
	sql = "SELECT * FROM sp_permission_api as api LEFT JOIN sp_permission as main ON main.ps_id = api.ps_id WHERE main.ps_id is not null";
	database.driver.execQuery(sql, function (err, result) {
		if (err) return cb("获取权限列表失败", null);
		cb(null, result);
	});
}

/**
 * 权限验证
 * 
 * @param  {[type]}   rid         角色ID
 * @param  {[type]}   serviceName 服务名
 * @param  {[type]}   actionName  动作名
 * @param  {Function} cb          回调函数
 */
module.exports.authRight = function (userInfo, serviceName, actionName, cb) {

	// 超级管理员
	if (userInfo.rids == 0) return cb(null, true);

	// 权限验证
	daoModule.findOne("PermissionAPIModel", { "ps_api_service": serviceName, "ps_api_action": actionName }, function (err, permissionAPI) {
		console.log("PermissionAPIModel====>rid => %s,serviceName => %s,actionName => %s", userInfo, serviceName, actionName, permissionAPI);
		if (err || !permissionAPI) return cb("无权限访问", false);
		sql = `SELECT id, GROUP_CONCAT(ps_ids) AS role_ps_ids FROM user_center JOIN sp_role ON FIND_IN_SET(sp_role.role_id, '${userInfo.rids}') > 0 WHERE user_center.id = ${userInfo.uid}; `;
		database.driver.execQuery(sql, function (err, role) {
			if (err || !role) return cb("获取角色信息失败", false);
			// 对查询的id去重
			let ps_ids = [...new Set(role[0].role_ps_ids.split(","))];
			for (idx in ps_ids) {
				ps_id = ps_ids[idx];
				if (parseInt(permissionAPI.ps_id) == parseInt(ps_id)) {
					return cb(null, true);
				}
			}
			return cb("无权限访问", false);

		});
	});
}