var express = require('express');
var router = express.Router();
var path = require("path");

// 获取验证模块
var authorization = require(path.join(process.cwd(), "/modules/authorization"));

// 通过验证模块获取菜单服务模块
var menuService = require(path.join(process.cwd(), "/services/MenuService"));

router.get("/getMenuList",
	function (req, res, next) {
		menuService.getLeftMenus(req.userInfo, function (err, result) {
			if (err) return res.sendResult(null, 400, err);
			res.sendResult(result, 200, "获取菜单列表成功");
		});
	}
);
/**
 * menuName:菜单名称
 * pid:上级菜单Id
 * level:菜单等级
 * type:菜单类型
 * icon:菜单图标
 * menuParams:路由参数
 * isShowMenu:是否显示菜单
 * 
 * serviceName:权限控制器名称
 * actionName:权限方法名称
 * menuPath:组件地址
 * menuSign:权限标识
 * order:排序
 * 
 */
router.post(
	"/addOrUpdateMenu",
	// 参数验证
	function (req, res, next) {
		if (!req.body.menuName) return res.sendResult(null, 400, "菜单名称不能为空");
		if (!req.body.pid) return res.sendResult(null, 400, "上级Id不能为空");
		if (!req.body.level) return res.sendResult(null, 400, "等级不能为空");
		if (!req.body.type) return res.sendResult(null, 400, "类型不能为空");
		if (!req.body.serviceName) return res.sendResult(null, 400, "控制器名称不能为空");
		if (!req.body.actionName) return res.sendResult(null, 400, "方法名称不能为空");
		if (req.body.type == 1) {//添加菜单
			if (!req.body.menuPath) return res.sendResult(null, 400, "组件地址不能为空");
		} else if (req.body.type == 2) { //添加按钮
			if (!req.body.menuSign) return res.sendResult(null, 400, "权限标识不能为空");
		}


		next();
	},
	// // 业务逻辑
	function (req, res, next) {
		rightService.getAllRights(req.query.type, function (err, rights) {
			if (err) return res.sendResult(null, 400, err);
			res.sendResult(rights, 200, "获取权限列表成功");
		})(req, res, next)
	}
)
module.exports = router;