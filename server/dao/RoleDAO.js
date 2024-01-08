var path = require("path");
daoModule = require("./DAO");
databaseModule = require(path.join(process.cwd(), "modules/database"));

/**
 * 获取权限列表
 * 
 * @param  {Function} cb 回调函数
 */
module.exports.findByKey = function (conditions, cb) {
  const { roleName, offset, limit } = conditions;
  sql = `SELECT role.* FROM sp_role as role`;
  sql += ` WHERE (? is NUll OR role.role_name LIKE ?)  
          ORDER by role.create_time DESC  LIMIT ?,?`;
  database.driver.execQuery(sql,
    [roleName, `%${roleName}%`, offset, limit],
    function (err, managers) {
      if (err) return cb("查询执行出错");
      cb(null, managers);
    }
  );
};

/**
 * 模糊查询用户数量
 *
 * @param  {[type]}   key 关键词
 * @param  {Function} cb  回调函数
 */
module.exports.countByKey = function (conditions, cb) {
  const { roleName } = conditions;
  db = databaseModule.getDatabase();
  sql = `SELECT count(*) as count FROM sp_role as role`;
  sql += ` WHERE (? is NUll OR role.role_name LIKE ?) `;
  database.driver.execQuery(sql, [roleName, `%${roleName}%`], function (err, result) {
    if (err) return cb("查询执行出错");
    cb(null, result[0]["count"]);
  });
};