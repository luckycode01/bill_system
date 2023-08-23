var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// 路由加载
var mount = require("mount-routes");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 初始化数据库模块
var database = require("./db/database");
database.initialize(app, function (err) {
  if (err) {
    console.error("连接数据库失败失败 %s", err);
  }
});

/**
 * 初始化路由
 */
// 带路径的用法并且可以打印出路有表
mount(app, path.join(process.cwd(), "/routes"), true);

//跨域
// app.all("/ueditor/ue", function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With, mytoken");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Content-Length, Authorization, Accept, X-Requested-With, X_Requested_With"
//   );
//   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By", " 3.2.1");
//   if (req.method == "OPTIONS") res.send(200);
//   /*让options请求快速返回*/ else next();
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

const port = 9999;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`The server is started successfully`);
});

module.exports = app;
