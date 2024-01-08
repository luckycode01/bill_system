var path = require("path");
var managersDAO = require(path.join(process.cwd(), "dao/ManagerDAO"));
var Password = require("node-php-password");
var logger = require("../modules/logger").logger();

/**
 * 获取所有账户
 * @param  {[type]}   conditions 查询条件
 * 查询条件统一规范
 * conditions
  {
    "query" : 关键词查询,
    "pagenum" : 页数,
    "pagesize" : 每页长度
  }
 * @param  {Function} cb         回调函数
 */
module.exports.getAllManagers = function (conditions, cb) {
  if (!conditions.pageNum) return cb("pageNum 参数不合法");
  if (!conditions.pageSize) return cb("pageSize 参数不合法");

  // 通过关键词获取管理员数量
  managersDAO.countByKey(conditions, function (err, count) {
    pageNum = parseInt(conditions["pageNum"]);
    pageSize = parseInt(conditions["pageSize"]);

    pageCount = Math.ceil(count / pageSize);
    offset = (pageNum - 1) * pageSize;
    if (offset >= count) {
      offset = count;
    }
    limit = pageSize;

    // 构建参数conditions
    conditions["offset"] = offset;
    conditions["limit"] = limit;

    managersDAO.findByKey(conditions, function (err, managers) {
      var retManagers = [];
      for (idx in managers) {
        var manager = managers[idx];
        var role_name = manager.role_name;
        if (!manager.role_id) {
          role_name = "超级管理员";
        }
        retManagers.push({
          id: manager.id,
          username: manager.username,
          roleNames: manager.role_names,
          mobile: manager.user_mobile,
          email: manager.user_email,
          createTime: manager.create_time,
          updateTime: manager.update_time,
          userType: manager.user_type,
          avator: manager.avator,
          sex: manager.user_sex,
          edu: manager.user_edu,
          edustr: manager.user_edustr,
          introduce: manager.user_introduce,
          state: manager.mg_state == 1,
          rids: manager.role_ids,
        });
      }
      var resultDta = {};
      resultDta["total"] = count;
      resultDta["pageInfo"] = {
        pageNum,
        pageSize,
      };
      resultDta["data"] = retManagers;
      cb(err, resultDta);
    });
  });
};

/**
 * 创建管理员
 *
 * @param  {[type]}   user 用户数据集
 * @param  {Function} cb   回调函数
 */
module.exports.createManager = function (params, cb) {
  managersDAO.exists(params, function (err, isExists) {
    if (err) return cb(err);

    if (isExists) {
      return cb("用户名已存在");
    }

    managersDAO.create(
      {
        username: params.username,
        password: Password.hash(params.password),
        role_ids: params.rids,
        user_mobile: params.mobile,
        user_email: params.email,
        mg_state: "1",
        create_time: Date.parse(new Date()) / 1000,
        update_time: Date.parse(new Date()) / 1000,
        user_type: params.userType,
        deleted: "0",
        avator: params.avator,
        user_sex: params.sex,
        user_edu: params.edu,
        user_edustr: "",
        user_introduce: params.introduce,
      },
      function (err, manager) {
        if (err) return cb("创建失败");
        result = {
          id: manager.mg_id,
          username: manager.mg_name,
          mobile: manager.mg_mobile,
          email: manager.mg_email,
          role_id: manager.role_id,
          create_time: manager.mg_time,
        };
        cb(null, result);
      }
    );
  });
};

/**
 * 更新管理员信息
 *
 * @param  {[type]}   params 管理员信息
 * @param  {Function} cb     回调函数
 */
module.exports.updateManager = function (params, cb) {
  managersDAO.update(
    {
      id: params.id,
      user_mobile: params.mobile,
      user_email: params.email,
      username: params.username,
      role_ids: params.rids,
      update_time: Date.parse(new Date()) / 1000,
      user_type: params.userType,
      avator: params.avator,
      user_sex: params.sex || null,
      user_edu: params.edu || null,
      user_edustr: params.edustr,
      user_introduce: params.introduce,
    },
    function (err, manager) {
      console.log(err);
      if (err) return cb(err);
      cb(null, {
        id: manager.id,
      });
    }
  );
};

/**
 * 通过管理员 ID 进行删除操作
 *
 * @param  {[type]}   id 管理员ID
 * @param  {Function} cb 回调函数
 */
module.exports.deleteManager = function (id, cb) {
  managersDAO.destroy(id, function (err) {
    if (err) return cb(err);
    cb(null);
  });
  // });
};

/**
 * 通过管理员 ID 获取管理员信息
 *
 * @param  {[type]}   id 管理员 ID
 * @param  {Function} cb 回调函数
 */
module.exports.getInfoManager = function (id, cb) {
  managersDAO.show(id, function (err, manager) {
    if (err) return cb(err);
    if (!manager) return cb("该管理员不存在");
    cb(null, {
      id: manager.id || null,
      username: manager.username || null,
      mobile: manager.user_mobile || null,
      email: manager.user_email || null,
      sex: manager.user_sex || null,
      edu: manager.user_edu || null,
      edustr: manager.user_edustr || null,
      introduce: manager.user_introduce || null,
      avatar: manager.avatar || null,
      createTime: manager.create_time || null,
      updateTime: manager.update_time || null,
      userType: manager.user_type || null,
      rids: manager.role_ids || null,
    });
  });
};

/**
 * 为管理员设置角色
 *
 * @param {[type]}   id  管理员ID
 * @param {[type]}   rid 角色ID
 * @param {Function} cb  回调函数
 */
module.exports.setRole = function (id, rid, cb) {
  managersDAO.show(id, function (err, manager) {
    if (err || !manager) cb("管理员ID不存在");

    managersDAO.update(
      { mg_id: manager.mg_id, role_id: rid },
      function (err, manager) {
        if (err) return cb("设置失败");
        cb(null, {
          id: manager.mg_id,
          rid: manager.role_id,
          username: manager.mg_name,
          mobile: manager.mg_mobile,
          email: manager.mg_email,
        });
      }
    );
  });
};

module.exports.updateMgrState = function (id, state, cb) {
  managersDAO.show(id, function (err, manager) {
    if (err || !manager) cb("用户ID不存在");

    managersDAO.update(
      { id: manager.id, mg_state: state },
      function (err, manager) {
        if (err) return cb("设置失败");
        cb(null, {
          state: manager.mg_state ? 1 : 0,
        });
      }
    );
  });
};

/**
 * 管理员登录
 * @param  {[type]}   username 用户名
 * @param  {[type]}   password 密码
 * @param  {Function} cb       回调
 */
module.exports.login = function (username, password, cb) {
  logger.debug("login => username:%s,password:%s", username, password);
  logger.debug(username);
  console.log("login => username:%s,password:%s", username, password);
  managersDAO.findOne({ username: username }, function (err, manager) {
    logger.debug(err);
    if (err || !manager) return cb("用户名不存在");
    if (manager.role_id < 0) {
      return cb("该用户没有权限登录");
    }

    if (manager.role_id != 0 && manager.mg_state != 1) {
      return cb("该用户已经被禁用");
    }

    if (Password.verify(password, manager.password)) {
      cb(null, {
        id: manager.id || null,
        username: manager.username || null,
        // mobile: manager.user_mobile || null,
        // email: manager.user_email || null,
        // sex: manager.user_sex || null,
        // edu: manager.user_edu || null,
        // edustr: manager.user_edustr || null,
        // introduce: manager.user_introduce || null,
        // avatar: manager.avatar || null,
        // createTime: manager.create_time || null,
        // updateTime: manager.update_time || null,
        // userType: manager.user_type || null,
        rids: manager.role_ids || null,
      });
    } else {
      return cb("密码错误");
    }
  });
};
