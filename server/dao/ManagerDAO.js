var path = require("path");
daoModule = require("./DAO");
databaseModule = require(path.join(process.cwd(), "modules/database"));

/**
 * 创建管理员
 *
 * @param  {[type]}   obj 管理员信息
 * @param  {Function} cb  回调函数
 */
module.exports.create = function (obj, cb) {
  daoModule.create("ManagerModel", obj, cb);
};

/**
 * 获取管理员列表
 *
 * @param  {[type]}   conditions 查询条件
 * @param  {Function} cb         回调函数
 */
module.exports.list = function (conditions, cb) {
  daoModule.list("ManagerModel", conditions, function (err, models) {
    if (err) return cb(err, null);
    cb(null, models);
  });
};

/**
 * 通过查询条件获取管理员对象
 *
 * @param  {[type]}   conditions 条件
 * @param  {Function} cb         回调函数
 */
module.exports.findOne = function (conditions, cb) {
  daoModule.findOne("ManagerModel", conditions, cb);
};

/**
 * 通过关键词查询用户
 *
 * @param  {[type]}   key    关键词
 * @param  {[type]}   offset
 * @param  {[type]}   limit
 * @param  {Function} cb     回调函数
 */
module.exports.findByKey = function (conditions, cb) {
  const { userName, offset, limit, mobile, userType, startTime, endTime, state } = conditions;
  // sql = "SELECT * FROM user_center as user LEFT JOIN sp_role as role ON FIND_IN_SET(role.role_id, user.role_ids) > 0";
  sql = `SELECT user.*,GROUP_CONCAT(role.role_name) as role_names FROM user_center as user LEFT JOIN sp_role as role ON FIND_IN_SET(role.role_id, user.role_ids) > 0 `;
  sql +=
    `WHERE (? is NUll OR user.username LIKE ?)` +
    `AND (? is NUll OR user.user_mobile LIKE ?) ` +
    `AND (? is NUll OR user.mg_state = ?) ` +
    `AND (? is NUll OR user.user_type = ?) ` +
    `AND (? is NUll OR user.create_time > ?) ` +
    `AND (? is NUll OR user.create_time < ?) ` +
    `GROUP BY user.id ` +
    `ORDER by user.create_time DESC  LIMIT ?,?;`;
  database.driver.execQuery(sql,
    [userName, `%${userName}%`, mobile, `%${mobile}%`, state, state, userType, userType, startTime, startTime, endTime, endTime, offset, limit],
    function (err, managers) {
      if (err) return cb("查询执行出错");
      cb(null, managers);
    }
  );
};

/**
 * 判断是否存在用户
 *
 * @param  {[type]}   username 用户名
 * @param  {Function} cb       回调函数
 *
 */
module.exports.exists = function (params, cb) {
  var db = databaseModule.getDatabase();
  var Model = db.models.ManagerModel;
  Model.exists({ username: params.username }, function (err, isExists) {
    if (err) return cb("查询失败");
    if (isExists) {
      return cb("用户名已存在", isExists);
    } else {
      Model.exists({ user_mobile: params.mobile }, function (err, isExists) {
        if (err) return cb("查询失败");
        if (isExists) {
          return cb("手机号已被占用", isExists);
        } else {
          cb(null, isExists);
        }
      });
    }
  });
};

/**
 * 模糊查询用户数量
 *
 * @param  {[type]}   key 关键词
 * @param  {Function} cb  回调函数
 */
module.exports.countByKey = function (conditions, cb) {
  const { userName, mobile, userType, startTime, endTime, state } = conditions;
  db = databaseModule.getDatabase();
  sql = "SELECT count(*) as count FROM user_center as user";
  sql += ' WHERE (? is NUll OR user.username LIKE ?) ' +
    "AND (? is NUll OR user.user_mobile LIKE ?) " +
    "AND (? is NUll OR user.mg_state = ?) " +
    "AND (? is NUll OR user.user_type = ?) " +
    "AND (? is NUll OR user.create_time > ?) " +
    "AND (? is NUll OR user.create_time < ?);"
  database.driver.execQuery(sql, [userName, `%${userName}%`, mobile, `%${mobile}%`, state, state, userType, userType, startTime, startTime, endTime, endTime], function (err, result) {
    if (err) return cb("查询执行出错");
    cb(null, result[0]["count"]);
  });
};

/**
 * 通过ID获取管理员对象数据
 *
 * @param  {[type]}   id 管理员主键ID
 * @param  {Function} cb 回调函数
 */
module.exports.show = function (id, cb) {
  daoModule.show("ManagerModel", id, cb);
};

/**
 * 更新管理员信息
 *
 * @param  {[type]}   obj 管理员对象
 * @param  {Function} cb  回调函数
 */
module.exports.update = function (obj, cb) {
  daoModule.update("ManagerModel", obj.id, obj, cb);
};

/**
 * 删除管理员对象数据
 *
 * @param  {[type]}   id 主键ID
 * @param  {Function} cb 回调函数
 */
module.exports.destroy = function (id, cb) {
  var db = databaseModule.getDatabase();
  var Model = db.models.ManagerModel;
  Model.exists({ id: id }, function (err, isExists) {
    console.log(err, isExists);
    if (err) return cb("查询失败");
    if (!isExists) {
      return cb("用户不存在");
    } else {
      daoModule.destroy("ManagerModel", id, function (err) {
        if (err) return cb(err);
        return cb(null);
      });
    }
  });
};

/**
 * 保存管理员信息
 *
 * @param  {[type]}   obj 管理员对象
 * @param  {Function} cb  回调函数
 */
module.exports.save = function (obj, cb) {
  daoModule.show(obj.mg_id, function (err, oldObj) {
    if (err) {
      daoModule.create("ManagerModel", obj, cb);
    } else {
      daoModule.update("ManagerModel", obj.mg_id, obj, cb);
    }
  });
};

/**
 * 获取管理员数量
 *
 * @param  {Function} cb 回调函数
 */
module.exports.count = function (cb) {
  daoModule("ManagerModel", cb);
};
