module.exports = function(db,callback){
	// 用户模型
	db.define("ManagerModel",{
		id : {type: 'serial', key: true},
		username : String,
		password : String,
		role_ids : String,
		user_mobile : String,
		user_email : String,
		mg_state : Number,
		create_time : Number,
		update_time : Number,
		user_type : Number,
		avatar : String,
		user_sex : String,
		user_edu : String,
		user_edustr : String,
		user_introduce : String,
		deleted:Number
	},{
		table : "user_center"
	});
	return callback();
}