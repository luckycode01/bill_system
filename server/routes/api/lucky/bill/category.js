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
    next();
  },
  // 业务逻辑
  function (req, res, next) {
    const conditions = {
      pageNum: req.query.pageNum,
      pageSize: req.query.pageSize,
    };
    if (req.query.catename) {
      conditions["catename"] = req.query.catename || '';
    }
    categoryServ.getAllCategories(conditions, function (err, result) {
      if (err) return res.sendResult(null, 400, err);
      res.sendResult(result, 200, "获取成功");
    })(req, res, next);
  }
);

// 添加分类
router.post(
  "/addorEditCategory",
  // 参数验证
  function (req, res, next) {
    // 参数验证
    if (!req.body.cateName)
      return res.sendResult(null, 400, "分类名称不能为空");
    if (req.body.order && !parseInt(req.body.order))
      return res.sendResult(null, 400, "排序请输入整数");
    if (req.body.cateId && !parseInt(req.body.cateId))
      return res.sendResult(null, 400, "请输入有效的分类Id");
    next();
  },
  // 业务逻辑
  function (req, res, next) {
    const params = {
      cateName: req.body.cateName,
      imgUrl: req.body.imgUrl,
      cateDesc: req.body.cateDesc,
      order: req.body.order,
      showWidth: req.body.showWidth,
      fieldName: req.body.fieldName,
    };
    if (req.body.cateId) {
      categoryServ.updateCategory(req.body.cateId, params, function (err, result) {
        if (err) return res.sendResult(null, 400, err);
        res.sendResult(result, 200, "更新成功");
      })(req, res, next);
    } else {
      categoryServ.addCategory(params, function (err, result) {
        if (err) return res.sendResult(null, 400, err);
        res.sendResult(result, 200, "添加成功");
      })(req, res, next);
    }

  }
);
// 删除分类
router.post(
  "/deleteCategory",
  // 参数验证
  function (req, res, next) {
    if (!req.body.cateId)
      return res.sendResult(null, 400, "请输入分类Id");
    if (!parseInt(req.body.cateId))
      return res.sendResult(null, 400, "请输入有效的分类Id");
    next();
  },
  // 业务逻辑
  function (req, res, next) {
    categoryServ.deleteCategory(req.body.cateId, function (err, result) {
      if (err) return res.sendResult(null, 400, err);
      res.sendResult(result, 200, "删除成功");
    })(req, res, next);
  }
);

module.exports = router;
