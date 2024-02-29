var _ = require("lodash");
var path = require("path");
var dao = require(path.join(process.cwd(), "dao/PermissionAPIDAO"));
// 初始化数据库模块
var utils = require("../utils/index");

// 获取所有权限
module.exports.getAllRights = function (query, cb) {
	if (!query.type || (query.type != "list" && query.type != "tree")) {
		cb("参数类型错误");
	}
	const params = {
		menuName: query.menuName || null,
	}
	dao.list(params, function (err, permissions) {
		if (err) return cb("获取权限数据失败");
		let res = _.cloneDeep(permissions);
		res = res.filter(item => item.ps_delete == 1);
		console.log(111111, res);
		if (query.type == "tree") {
			res = utils.listTransFormTree(res, "ps_id", "ps_pid");
		}
		cb(null, utils.dataMap(res).sort(utils.compare));
	});
};
