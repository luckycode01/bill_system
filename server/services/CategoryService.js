var _ = require("lodash");
var path = require("path");
var dao = require(path.join(process.cwd(), "dao/DAO"));
var orm = require("orm");

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
	var conditions = {};
	if (!params.pageNum || params.pageNum <= 0) return cb("pageNum 参数错误");
	if (!params.pageSize || params.pageSize <= 0) return cb("pageSize 参数错误");
	conditions["columns"] = {};
	if (params.catename) {
		conditions["columns"]["cate_name"] = orm.like("%" + params.catename + "%");
	}
	conditions["columns"]["deleted"] = "1";

	dao.countByConditions("CategoryModel", conditions, function (err, count) {
		if (err) return cb(err);
		pageSize = params.pageSize;
		pageNum = params.pageNum;
		pageCount = Math.ceil(count / pageSize);
		offset = (pageNum - 1) * pageSize;
		if (offset >= count) {
			offset = count;
		}
		limit = pageSize;

		// 构建条件
		conditions["offset"] = offset;
		conditions["limit"] = limit;
		conditions["only"] = [
			"cate_id",
			"cate_name",
			"cate_image",
			"cate_desc",
			"cate_order",
			"cate_width",
			"create_time",
			"update_time",
			"deleted",
		];
		conditions["order"] = "-cate_order";

		dao.list("CategoryModel", conditions, function (err, res) {
			if (err) return cb(err);
			var resultDta = {};
			resultDta["pageInfo"] = {
				total: count,
				pageNum: +pageNum,
				pageSize: +pageSize,
			};
			resultDta["data"] = res.map((item) => ({
				cateId: item.cate_id,
				cateName: item.cate_name,
				imgUrl: item.cate_image,
				desc: item.cate_desc,
				order: item.cate_order,
				width: item.cate_width,
				createdTime: item.create_time,
				updateTime: item.update_time,
				isSelete: item.deleted,
			}));
			cb(err, resultDta);
		});
	});
};

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
	});
};

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
module.exports.addCategory = function (params, cb) {
	dao.create(
		"CategoryModel",
		{
			cate_name: params.cateName,
			cate_image: params.imgUrl,
			cate_desc: params.cateDesc,
			cate_order: params.order,
			cate_width: params.showWidth,
			create_time: new Date(),
			update_time: new Date(),
			deleted: 1,
		},
		function (err, newCat) {
			if (err) {
				if (err.errno == 1062)
					return cb("该分类名称已存在")
				return cb("创建分类失败")
			};
			cb(null, null);
		}
	);
};

/**
 * 更新分类
 *
 * @param  {[type]}   cat_id  分类ID
 * @param  {[type]}   newName 新的名称
 * @param  {Function} cb      回调函数
 */
module.exports.updateCategory = function (cateId, params, cb) {
	dao.exists("CategoryModel", { cate_name: params.cateName, }, function (err, res) {
		if (err) return cb("更新失败");
		const conditions = {
			cate_name: params.cateName,
			cate_image: params.imgUrl,
			cate_desc: params.cateDesc,
			cate_order: params.order,
			cate_width: params.showWidth,
			update_time: new Date(),
			deleted: 1,
		}
		if (res) delete params.cate_name;

		dao.update(
			"CategoryModel",
			cateId,
			conditions,
			function (err, newCat) {
				if (err) return cb("更新失败");
				cb(null, null);
			}
		);
	})
};

/**
 * 删除分类
 *
 * @param  {[type]}   cat_id 分类ID
 * @param  {Function} cb     回调函数
 */
module.exports.deleteCategory = function (cateId, cb) {
	dao.update(
		"CategoryModel",
		cateId,
		{ deleted: 0 },
		function (err, newCat) {
			if (err) return cb("删除失败");
			cb(null,"删除成功");
		}
	);
};
