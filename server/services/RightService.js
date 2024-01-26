var _ = require("lodash");
var path = require("path");
var dao = require(path.join(process.cwd(), "dao/PermissionAPIDAO"));
// 初始化数据库模块
var utils = require("../utils/index");

// 获取所有权限
module.exports.getAllRights = function (type, cb) {
	if (!type || (type != "list" && type != "tree")) {
		cb("参数类型错误");
	}
	dao.list(function (err, permissions) {
		if (err) return cb("获取权限数据失败");
		let res = _.cloneDeep(permissions);
		if (type == "tree") {
			res = utils.listTransFormTree(permissions, "ps_id", "ps_pid");
		}
		cb(null, utils.dataMap(res).sort(utils.compare));
	});
};
