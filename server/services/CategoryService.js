var _ = require("lodash");
var path = require("path");
var dao = require(path.join(process.cwd(), "dao/DAO"));
var orm = require("orm");

/**
 * 获取所有分类
 *
 * @param  {[type]}   type    描述显示层级
 * @param  {Function} cb      回调函数
 */
module.exports.getAllCategories = function (params, cb) {
	var conditions = {};
	if (!params.pageNum || params.pageNum <= 0) return cb("pageNum 参数错误");
	conditions["columns"] = {};
	if (params.catename) {
		conditions["columns"]["cate_name"] = orm.like("%" + params.catename + "%");
	}
	conditions["columns"]["deleted"] = "1";

	dao.countByConditions("CategoryModel", conditions, function (err, count) {
		if (err) return cb(err);
		if (params.pageSize && params.pageSize != 0) {
			pageSize = params.pageSize;
		} else {
			pageSize = count;
		}
		pageNum = params.pageNum;
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
			"field_name",
			"deleted",
		];
		conditions["order"] = "cate_order";

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
				fieldName: item.field_name,
				createdTime: item.create_time,
				updateTime: item.update_time,
				isSelete: item.deleted,
			}));
			cb(err, resultDta);
		});
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
			field_name: params.fieldName,
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
			field_name: params.fieldName,
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
			cb(null, "删除成功");
		}
	);
};
