var express = require('express');
var router = express.Router();
var path = require("path");

// 获取验证模块
var authorization = require(path.join(process.cwd(), "/modules/authorization"));

// // 通过验证模块获取菜单服务模块
// var menuService = require(path.join(process.cwd(), "/services/MenuService"));

// 通过验证模块获取用户管理服务
var menuService = authorization.getService("MenuService");

// /获取用户菜单
router.get("/getMenuList",
	function (req, res, next) {
		menuService.getLeftMenus(req.userInfo, function (err, result) {
			if (err) return res.sendResult(null, 400, err);
			res.sendResult(result, 200, "获取菜单列表成功");
		})(req, res, next);
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
		if (req.body.parentId != 0 && !req.body.parentId) return res.sendResult(null, 400, "上级Id不能为空");
		if (!req.body.menuType) return res.sendResult(null, 400, "类型不能为空");
		if (req.body.menuType == 1) {//添加菜单
			if (!req.body.menuPath) return res.sendResult(null, 400, "组件地址不能为空");
		} else if (req.body.menuType == 2) { //添加按钮
			if (!req.body.menuSign) return res.sendResult(null, 400, "权限标识不能为空");
		}


		next();
	},
	// // 业务逻辑
	function (req, res, next) {
		params = {
			menuName: req.body.menuName,
			parentId: req.body.parentId,
			type: req.body.menuType || 1,
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
			menuService.updateMenu(params, function (err, result) {
				if (err) return res.sendResult(null, 400, err);
				res.sendResult(null, 200, "更新成功");
			})(req, res, next);
		} else {
			menuService.createMenu(params, function (err, result) {
				if (err) return res.sendResult(null, 400, err);
				res.sendResult(result, 200, "添加成功");
			})(req, res, next);
		}
	}
)

// 根据ID查询菜单
router.get(
	"/getMenuInfoById",
	function (req, res, next) {
		if (!req.query.menuId)
			return res.sendResult(null, 400, "菜单ID不能为空");
		next();
	},
	// 处理业务逻辑
	function (req, res, next) {
		menuService.getMenuInfoById(req.query.menuId, function (err, menu) {
			if (err) return res.sendResult(null, 400, err);
			res.sendResult(menu, 200, "获取成功");
		})(req, res, next);
	}
);
// 删除
router.post(
	"/deleteMenu",
	function (req, res, next) {
		if (!req.body.menuId)
			return res.sendResult(null, 400, "菜单ID不能为空");
		next();
	},
	// 处理业务逻辑
	function (req, res, next) {
		menuService.deleteMenu(req.body.menuId, function (err, menu) {
			if (err) return res.sendResult(null, 400, err);
			res.sendResult(menu, 200, "删除成功");
		})(req, res, next);
	}
);
module.exports = router;