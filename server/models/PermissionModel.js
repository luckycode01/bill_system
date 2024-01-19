module.exports = function(db,callback){
	// 用户模型
	db.define("PermissionModel",{
		ps_id : {type: 'serial', key: true},
		ps_name : String,
		ps_pid : Number,
		ps_c : String,
		ps_a : String,
		ps_level : String,
		ps_type:Number,
		ps_order:Number,
		ps_path:String,
		ps_icon:String,
		ps_sign:String,
		ps_params:String,
		ps_show:Number,
		ps_delete:Number,
		create_time:Number,
	},{
		table : "sp_permission"
	});
	return callback();
}