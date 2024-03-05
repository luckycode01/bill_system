var express = require("express");
var router = express.Router();
var path = require("path");

// 获取验证模块
var authorization = require(path.join(process.cwd(), "/modules/authorization"));

// 通过验证模块获取分类管理
var categoryServ = authorization.getService("CategoryService");

// 订单列表
router.get(
  "/getCategoryList",
  // 参数验证
  function (req, res, next) {
    // 参数验证
    if (!req.query.pageNum || req.query.pageNum <= 0)
      return res.sendResult(null, 400, "pageNum 参数错误");
    if (!req.query.pageSize || req.query.pageSize <= 0)
      return res.sendResult(null, 400, "pageSize 参数错误");
    next();
  },
  // 业务逻辑
  function (req, res, next) {
    const conditions = {
      pageNum: req.query.pageNum,
      pageSize: req.query.pageSize,
    };
    if (req.query.catename) {
      conditions["catename"] = req.query.catename;
    }
    categoryServ.getAllCategories(conditions, function (err, result) {
      if (err) return res.sendResult(null, 400, err);
      res.sendResult(result, 200, "获取成功");
    })(req, res, next);
  }
);

// 添加分类
router.post(
  "/addCategory",
  // 参数验证
  function (req, res, next) {
    next();
  },
  // 业务逻辑
  function (req, res, next) {

  }
);
// 修改分类
router.post(
  "/updateCategory",
  // 参数验证
  function (req, res, next) {
    next();
  },
  // 业务逻辑
  function (req, res, next) {

  }
);
// 删除分类
router.post(
  "/deleteCategory",
  // 参数验证
  function (req, res, next) {
    next();
  },
  // 业务逻辑
  function (req, res, next) {

  }
);

module.exports = router;
