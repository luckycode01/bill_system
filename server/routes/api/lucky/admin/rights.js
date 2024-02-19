var express = require('express');
var router = express.Router();
var path = require("path");

// 获取验证模块
var authorization = require(path.join(process.cwd(),"/modules/authorization"));

// 通过验证模块构建权限服务模块
var rightService = authorization.getService("RightService");
router.get("/getRightList",
	// 参数验证
	function(req,res,next) {
		if(!req.query.type) {
			return res.sendResult(null,400,"显示类型未定义");
		}
		if(req.query.type != "list" && req.query.type != "tree") {
			return res.sendResult(null,400,"显示类型参数错误");
		}
		next();
	},
	// 业务逻辑
	function(req,res,next) {
		rightService.getAllRights(req.query.type,function(err,rights){
			if(err) return res.sendResult(null,400,err);
			res.sendResult(rights,200,"获取权限列表成功");
		})(req,res,next);
	}
);

module.exports = router;