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
		if (req.body.type == 1) {//添加菜单
			if (!req.body.menuPath) return res.sendResult(null, 400, "组件地址不能为空");
		} else if (req.body.type == 2) { //添加按钮
			if (!req.body.menuSign) return res.sendResult(null, 400, "权限标识不能为空");
		}


		next();
	},
	// // 业务逻辑
	function (req, res, next) {
		params = {
			menuName: req.body.menuName,
			pid: req.body.pid,
			level: req.body.level || 0,
			type: req.body.type || 1,
			menuPath: req.body.menuPath || '',
			menuSign: req.body.menuSign || '',
			icon: req.body.icon || null,
			menuParams: req.body.menuParams || null,
			isShowMenu: req.body.isShowMenu || 1,
			order: req.body.order || 0,
		};
		if (req.body.id) {
			// id存在，修改菜单
			params.id = req.body.id;
			menuService.updateMenu(params, function (err, manager) {
				if (err) return res.sendResult(null, 400, err);
				res.sendResult(manager, 200, "更新成功");
			})(req, res, next);
		} else {
			menuService.createMenu(params, function (err, manager) {
				if (err) return res.sendResult(null, 400, err);
				res.sendResult(manager, 200, "创建成功");
			})(req, res, next);
		}
	}
)
module.exports = router;