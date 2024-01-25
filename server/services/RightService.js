var _ = require("lodash");
var path = require("path");
var dao = require(path.join(process.cwd(), "dao/PermissionAPIDAO"));
// 初始化数据库模块
var utils = require("../utils/index");
const { util } = require("chai");

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
		cb(null, dataMap(res));
	});
};

function dataMap(data) {
	return (reslut = data.map((item) => {
		const obj = {
			id: item.ps_id,
			pid: item.ps_pid,
			authName: item.ps_name,
			path: item.ps_api_path,
			order: item.ps_api_order,
			type: item.ps_type,
			order: item.ps_order,
			icon: item.ps_icon,
			sign: item.ps_sign,
			params: item.ps_params,
			show: item.ps_show,
			createTime: item.create_time,
			serviceName: item.ps_api_service,
			actionName: item.ps_api_action,
			children: [],
		};
		if (item.children && item.children.length) {
			obj.children = dataMap(item.children);
		}
		return obj;
	}));
}