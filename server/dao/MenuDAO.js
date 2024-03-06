var path = require("path");
daoModule = require("./DAO");
databaseModule = require(path.join(process.cwd(), "modules/database"));

/**
 * 获取用户菜单
 * 
 * @param  {[type]}   rid         角色ID
 * @param  {[type]}   serviceName 服务名
 * @param  {[type]}   actionName  动作名
 * @param  {Function} cb          回调函数
 */
module.exports.getMenuList = function (userInfo, cb) {
  sql = `SELECT id, GROUP_CONCAT(ps_ids) AS role_ps_ids FROM user_center JOIN sp_role ON FIND_IN_SET(sp_role.role_id, '${userInfo.rids}') > 0 WHERE user_center.id = ${userInfo.uid}; `;
  database.driver.execQuery(sql, function (err, role) {
    if (err || !role) return cb("获取角色信息失败", false);
    // 对查询的id去重
    let ps_ids = [...new Set(role[0].role_ps_ids.split(","))];
    return cb(null, ps_ids);

  });
}

/**
 * 
 * @param {*} obj 菜单信息
 * @param {*} cb 回调函数
 */

module.exports.create = function (obj, cb) {
  const { ps_name, ps_pid, ps_type, ps_icon, ps_params, ps_show, create_time, update_time, ps_api_path, ps_api_sign, ps_api_order, ps_api_service, ps_api_action } = obj;
  const sqlPer = `INSERT INTO sp_permission (ps_name, ps_pid, ps_type, ps_icon, ps_params, ps_show, create_time, update_time) `
    + `VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;
  const sqlPerApi = `INSERT INTO sp_permission_api (ps_id, ps_api_path, ps_api_sign, ps_api_order,ps_api_service,ps_api_action) VALUES(?, ?, ?, ?, ?, ?)`;
  database.driver.execQuery(sqlPer, [ps_name, ps_pid, ps_type, ps_icon, ps_params, ps_show, create_time, update_time], (perErr, perRes) => {
    if (perErr) return cb("Internal Server Error", false);
    const psId = perRes.insertId;
    database.driver.execQuery(sqlPerApi, [psId, ps_api_path, ps_api_sign, ps_api_order, ps_api_service, ps_api_action], (err, apiRes) => {
      if (err) {
        database.driver.execQuery(`delete from sp_permission where ps_id = ${psId} `, [], (err, delRes) => {
          if (err) {
            return cb("Internal Server Error", false);
          }
        });
        return cb("Internal Server Error", false);
      }
      return cb(null, apiRes);
    });
  });
};

/**
 * 通过ID获取菜单对象数据
 *
 * @param  {[type]}   id 菜单主键ID
 * @param  {Function} cb 回调函数
 */
module.exports.show = function (id, cb) {
  daoModule.show("PermissionModel", id, cb);
};

/**
 * 更新菜单
 * @param {} obj  更新参数
 * @param {*} cb  回调函数
 * 
 */
module.exports.update = function (model, obj, cb) {
  daoModule.update(model, obj.id, obj, cb);
};
/**
 * 
 * @param {*} 更新api 
 * @param {*} obj 
 * @param {*} cb 
 */
module.exports.updateApi = function (obj, cb) {
  const { ps_api_path, ps_api_sign, ps_api_order, id, ps_api_service, ps_api_action } = obj;
  const sql = `UPDATE sp_permission_api SET ps_api_path = '${ps_api_path}', ps_api_service = '${ps_api_service}', ps_api_action = '${ps_api_action}', ps_api_sign = '${ps_api_sign}', ps_api_order = '${ps_api_order}' WHERE ps_id = ${id}`;
  database.driver.execQuery(sql, [], (err, res) => {
    if (err) {
      return cb("Internal Server Error", false);
    }
    return cb(null, "更新成功")
  });
};
module.exports.query = function (id, cb) {
  const sql = `SELECT * FROM sp_permission LEFT JOIN sp_permission_api ON sp_permission.ps_id = sp_permission_api.ps_id WHERE sp_permission.ps_id = ${id}; `;
  database.driver.execQuery(sql, [], (err, res) => {
    if (err) {
      return cb("Internal Server Error", false);
    }
    return cb(null, res)
  });
};
/**
 * 
 * @param {*} id 主键id 
 * @param {*} cb 
 */
module.exports.destroy = function (id, cb) {
  var db = databaseModule.getDatabase();
  var Model = db.models.PermissionModel;
  var ModelApi = db.models.PermissionAPIModel;

  ModelApi.exists({ ps_id: id }, function (err, isExists) {
    if (err) return cb("查询失败");
    if (!isExists) {
      return cb("菜单不存在");
    }
    const sql = `UPDATE sp_permission SET ps_delete=0 WHERE ps_id=${id}`;
    database.driver.execQuery(sql, [], (err, res) => {
      if (err) {
        return cb("Internal Server Error", false);
      }
      return cb(null, res)
    });
  });
};