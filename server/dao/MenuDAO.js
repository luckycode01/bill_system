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