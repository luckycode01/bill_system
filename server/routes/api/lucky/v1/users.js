const { log } = require("console");
var express = require("express");
const { values } = require("lodash");
var router = express.Router();
var path = require("path");
const { isNull } = require("underscore");

// 获取验证模块
var authorization = require(path.join(process.cwd(), "/modules/authorization"));

// 通过验证模块获取用户管理服务
var mgrServ = authorization.getService("ManagerService");

// 查询用户列表
router.get(
  "/getUserlist",
  function (req, res, next) {
    // 参数验证
    if (!req.query.pageNum || req.query.pageNum <= 0)
      return res.sendResult(null, 400, "pagenum 参数错误");
    if (!req.query.pageSize || req.query.pageSize <= 0)
      return res.sendResult(null, 400, "pagesize 参数错误");
    next();
  },
  // 处理业务逻辑
  function (req, res, next) {
    mgrServ.getAllManagers(
      {
        userName: req.query.userName || null,
        mobile: req.query.mobile || null,
        userType: req.query.userType || null,
        state: req.query.state || null,
        startTime: req.query.startTime ? Date.parse(new Date(req.query.startTime)) / 1000 : null,
        endTime: req.query.endTime ? Date.parse(new Date(req.query.endTime)) / 1000 : null,
        pageNum: req.query.pageNum,
        pageSize: req.query.pageSize,
      },
      function (err, result) {
        if (err) return res.sendResult(null, 400, err);
        res.sendResult(result, 200, "获取用户成功");
      }
    )(req, res, next);
  }
);

// 创建和修改用户
router.post(
  "/addOrUpdateUser",
  function (req, res, next) {
    if (req.body.id && req.body.id == 1) {
      return res.sendResult(null, 400, "超级管理员不能修改");
    }
    if (!req.body.username) {
      return res.sendResult(null, 400, "用户名不能为空");
    }
    if (!req.body.mobile) {
      return res.sendResult(null, 400, "手机号不能为空");
    }
    if (!req.body.userType) {
      return res.sendResult(null, 400, "用户类型不能为空");
    }
    if (!req.body.id) {
      if (!req.body.password) {
        return res.sendResult(null, 400, "密码不能为空");
      }
      if (req.body.password != req.body.passwordRepead) {
        return res.sendResult(null, 400, "两次密码不一致，请确认");
      }
    }
    if (!req.body.rids) {
      req.body.rids = isNull;
      //return res.sendResult(null,200,"角色ID不能为空");
    }
    if (isNaN(parseInt(req.body.rids))) req.body.rids = null; //return res.sendResult(null,200,"角色ID必须是数字");
    next();
  },
  // 处理业务逻辑
  function (req, res, next) {
    params = {
      username: req.body.username,
      password: req.body.password,
      mobile: req.body.mobile,
      email: req.body.email || null,
      rids: req.body.rids || null,
      userType: req.body.userType,
      avator: req.body.avator || null,
      sex: req.body.sex || null,
      edu: req.body.edu || null,
      introduce: req.body.introduce || null,
    };
    if (req.body.id) {
      // id存在，修改用户否则为创建用户
      params.id = req.body.id;
      mgrServ.updateManager(params, function (err, manager) {
        if (err) return res.sendResult(null, 400, err);
        res.sendResult(manager, 200, "更新成功");
      })(req, res, next);
    } else {
      mgrServ.createManager(params, function (err, manager) {
        if (err) return res.sendResult(null, 400, err);
        res.sendResult(manager, 200, "创建成功");
      })(req, res, next);
    }
  }
);

// 删除用户
router.post(
  "/deleteUser",
  // 验证参数
  function (req, res, next) {
    if (req.body.id && req.body.id == 1) {
      return res.sendResult(null, 400, "超级管理员不能删除");
    }
    if (!req.body.id) return res.sendResult(null, 400, "用户ID不能为空");
    if (isNaN(parseInt(req.body.id)))
      return res.sendResult(null, 400, "ID必须是数字");
    if (req.body.id == 1)
      return res.sendResult(null, 400, "不允许删除admin账户");
    next();
  },
  // 处理业务逻辑
  function (req, res, next) {
    mgrServ.deleteManager(req.body.id, function (err) {
      if (err) return res.sendResult(null, 400, err);
      return res.sendResult(null, 200, "删除成功");
    })(req, res, next);
  }
);

router.post(
  "/updateUserState",
  // 参数验证
  function (req, res, next) {
    if (req.body.id && req.body.id == 1) {
      return res.sendResult(null, 400, "超级管理员不能禁用");
    }
    if (!req.body.id) {
      return res.sendResult(null, 400, "用户ID不能为空");
    }
    if (isNaN(parseInt(req.body.id)))
      return res.sendResult(null, 400, "用户ID必须是数字");
    next();
  },
  // 处理业务逻辑
  function (req, res, next) {
    state = 0;
    if (req.body.state && req.body.state == "true") state = 1;
    mgrServ.updateMgrState(req.body.id, state, function (err, manager) {
      if (err) return res.sendResult(null, 400, err);
      res.sendResult(manager, 200, "设置状态成功");
    })(req, res, next);
  }
);
// 获取登录用户信息
router.get(
  "/getUserInfo",
  function (req, res, next) {
    // uniqueId,rids
    next();
  },
  // 处理业务逻辑
  // 处理业务逻辑
  function (req, res, next) {
    mgrServ.getInfoManager(req.userInfo.uid, function (err, manager) {
      if (err) return res.sendResult(null, 400, err);
      res.sendResult(manager, 200, "获取成功");
    })(req, res, next);
  }
);

module.exports = router;
