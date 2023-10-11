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
router.post(
	"/addOrEditMenu",
	// 参数验证
	function (req, res, next) {
		if (!req.body.menuName) return res.sendResult(null, 400, "菜单名称不能为空");
		if (!req.body.parentld) return res.sendResult(null, 400, "上级Id不能为空");
		if (!req.body.type) return res.sendResult(null, 400, "权限类型不能为空");
		if(req.body.type == 1){

		}else if(req.body.type == 2){
			
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