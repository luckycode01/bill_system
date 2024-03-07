module.exports = function(db,callback){
	// 用户模型
	db.define("CategoryModel",{
		cate_id : {type: 'serial', key: true},
		cate_name : String,
		cate_image : String,
		cate_desc : String,
		cate_order: String,
		cate_width: Number,
		create_time: Number,
		update_time: String,
		deleted: String,
	},{
		table : "bill_category"
	});
	return callback();
}