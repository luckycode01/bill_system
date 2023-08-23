const mysql = require("mysql");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "maweisheng",
  database: "bill_system",
  // 可选
  queueLimit: 3,
  connectionLimit: 20,
});
//添加一个query方法
let query = function (sql, callBack) {
  pool.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      return;
    }
    conn.query(sql, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      if (callBack) {
        callBack(data);
      }
    });
  });
};
//封装 插入一条数据。
let insert = (table, datas, callBack) => {
  //拼接SQL
  let fields = ""; //字段
  let values = ""; //值
  for (const k in datas) {
    fields += k + ","; //拼接字段
    values += `'${datas[k]}',`;
  }
  //清除最后一位的逗号。
  fields = fields.slice(0, -1);
  values = values.slice(0, -1);
  // console.log(fields);
  // console.log(values);
  let sql = `INSERT INTO ${table} (${fields}) VALUES (${values})`;
  query(sql, callBack);
};

//封装一个删除方法
let del = (table, datas, callBack) => {
  let arr = ["1=1"]; //避免datas为空时，出现异常错误。
  for (const k in datas) {
    arr.push(`${k} = '${datas[k]}'`);
  }
  let sql = `delete from ${table} where ${arr.join(" and ")}`;
  query(sql, callBack);
};
/**
 * 修改方法
 * @param {string} table 表名
 * @param {object} sets 修改的字段与值
 * @param {object} wheres 判断条件
 * @param {Function} callBack 回调函数
 */
let update = (table, sets, wheres, callBack) => {
  //准备一个数组，用来拼接 where子句
  let whereArr = ["1=1"]; //避免datas为空时，出现异常错误。
  for (const k in wheres) {
    whereArr.push(`${k} = '${wheres[k]}'`);
  }

  //准备一个数组，用来拼接 set 子句
  let setArr = [];
  for (const k in sets) {
    setArr.push(`${k} = '${sets[k]}'`);
  }

  let sql = `UPDATE ${table} SET ${setArr.join(",")}  WHERE ${whereArr.join(
    " and "
  )}`;
  query(sql, callBack);
};

module.exports = {
  query,
  insert,
  del,
  update,
};
