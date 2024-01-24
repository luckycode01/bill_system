module.exports = function(db,callback) {
	// 用户模型
	db.define("PermissionAPIModel",{
		id : {type: 'serial', key: true},
		ps_id : Number,
		ps_api_service : String,
		ps_api_action : String,
		ps_api_path : String,
		ps_api_order : Number,
		ps_api_sign:String,
	},{
		table : "sp_permission_api"
	});
	return callback();
}