module.exports = function(db,callback){
	// 用户模型
	db.define("UserCenter",{
		id : {type: 'serial', key: true},
		user_name : String,
		password : String,
		avator : Number,
		email : Number,
		mobile : String,
		user_role_id : String,
		user_status : Number,
		gmt_create : Number,
		gmt_modified : Number,
		deleted : Number,
	},{
		table : "user_center"
	});
	return callback();
}