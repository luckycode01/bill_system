var _ = require('lodash');
var path = require("path");
var dao = require(path.join(process.cwd(), "dao/DAO"));

/**
 * 判断是否删除
 * 
 * @param  {[type]}  keyCategories 所有数据
 * @param  {[type]}  cat           [description]
 * @return {Boolean}               [description]
 */
function isDelete(keyCategories, cat) {
	if (cat.cat_pid == 0) {
		return cat.cat_deleted;
	} else if (cat.cat_deleted) {
		return true;
	} else {
		parentCat = keyCategories[cat.cat_pid];
		if (!parentCat) return true;
		return isDelete(keyCategories, parentCat);
	}
}

/**
 * 获取树状结果
 * @param  {[type]} keyCategories [description]
 * @return {[type]}               [description]
 */
function getTreeResult(keyCategories, categories, type) {

	var result = [];
	for (idx in categories) {
		var cat = categories[idx];
		// 判断是否被删除
		if (isDelete(keyCategories, cat)) continue;
		if (cat.cat_pid == 0) {
			result.push(cat);
		} else {
			if (cat.cat_level >= type) continue;
			var parantCat = keyCategories[cat.cat_pid];
			if (!parantCat) continue;
			if (!parantCat.children) {
				parantCat["children"] = [];
			}
			parantCat.children.push(cat);
		}
	}

	return result;
}



/**
 * 获取所有分类
 * 
 * @param  {[type]}   type    描述显示层级
 * @param  {Function} cb      回调函数
 */
module.exports.getAllCategories = function (params, cb) {
	console.log(11,params);
	var conditions = {};
	if (!params.pageNum || params.pageNum <= 0) return cb("pageNum 参数错误");
	if (!params.pageSize || params.pageSize <= 0) return cb("pageSize 参数错误");
	conditions["columns"] = {};
	if (params.query) {
		conditions["columns"]["cate_name"] = orm.like("%" + params.catename + "%");
	}
	conditions["columns"]["deleted"] = '0';

	dao.countByConditions("CategoryModel", conditions, function (err, count) {
		if (err) return cb(err);
		pagesize = params.pagesize;
		pagenum = params.pagenum;
		pageCount = Math.ceil(count / pagesize);
		offset = (pagenum - 1) * pagesize;
		if (offset >= count) {
			offset = count;
		}
		limit = pagesize;

		// 构建条件
		conditions["offset"] = offset;
		conditions["limit"] = limit;
		conditions["only"] = ["goods_id", "goods_name", "goods_price", "goods_weight", "goods_state", "add_time", "goods_number", "upd_time", "hot_mumber", "is_promote"];
		conditions["order"] = "-add_time";


		dao.list("GoodModel", conditions, function (err, goods) {
			if (err) return cb(err);
			var resultDta = {};
			resultDta["total"] = count;
			resultDta["pagenum"] = pagenum;
			resultDta["goods"] = _.map(goods, function (good) {
				return _.omit(good, "goods_introduce", "is_del", "goods_big_logo", "goods_small_logo", "delete_time");
			});
			cb(err, resultDta);
		})
	});
}

/**
 * 获取具体分类对象
 * 
 * @param  {[type]}   id 分类ID
 * @param  {Function} cb 回调函数
 */
module.exports.getCategoryById = function (id, cb) {
	dao.show("CategoryModel", id, function (err, category) {
		if (err) return cb("获取分类对象失败");
		cb(null, category);
	})
}

/**
 * 添加分类
 * 
 * @param {[type]}   cat 分类数据 
 * { 
 * cat_pid  => 父类ID(如果是根类就赋值为0),
 * cat_name => 分类名称,
 * cat_level => 层级 (顶层为 0)
 * }
 * 
 * @param {Function} cb  回调函数
 */
module.exports.addCategory = function (cat, cb) {
	dao.create("CategoryModel", { "cat_pid": cat.cat_pid, "cat_name": cat.cat_name, "cat_level": cat.cat_level }, function (err, newCat) {
		if (err) return cb("创建分类失败");
		cb(null, newCat);

	});
}

/**
 * 更新分类
 * 
 * @param  {[type]}   cat_id  分类ID
 * @param  {[type]}   newName 新的名称
 * @param  {Function} cb      回调函数
 */
module.exports.updateCategory = function (cat_id, newName, cb) {
	dao.update("CategoryModel", cat_id, { "cat_name": newName }, function (err, newCat) {
		if (err) return cb("更新失败");
		cb(null, newCat);
	});
}

/**
 * 删除分类
 * 
 * @param  {[type]}   cat_id 分类ID
 * @param  {Function} cb     回调函数
 */
module.exports.deleteCategory = function (cat_id, cb) {
	dao.update("CategoryModel", cat_id, { "cat_deleted": true }, function (err, newCat) {

		if (err) return cb("删除失败");
		cb("删除成功");
	});
}
