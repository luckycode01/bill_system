var _ = require("lodash");
var path = require("path");
var dao = require(path.join(process.cwd(), "dao/DAO"));
const roleDAO = require(path.join(process.cwd(), "dao/roleDAO"));
var permissionAPIDAO = require(path.join(
  process.cwd(),
  "dao/PermissionAPIDAO"
));

/**
 * 获取所有用户的角色 & 权限
 *
 * @param  {Function} cb 回调函数
 */
module.exports.getAllRoles = function (conditions, cb) {
  //获取所有角色数量
  roleDAO.countByKey(conditions, function (err, count) {
    const pageNum = parseInt(conditions["pageNum"]);
    const pageSize = parseInt(conditions["pageSize"]);
    pageCount = Math.ceil(count / pageSize);
    offset = (pageNum - 1) * pageSize;
    if (offset >= count) {
      offset = count;
    }
    limit = pageSize;

    conditions["offset"] = offset;
    conditions["limit"] = limit;

    roleDAO.findByKey(conditions, function (err, roles) {
      if (err) return cb("获取角色数据失败");
      permissionAPIDAO.list({},function (err, permissions) {
        if (err) return cb("获取权限数据失败");
        var permissionKeys = _.keyBy(permissions, "ps_id");
        var perData = [];
        for (idx in roles) {
          role = roles[idx];
          permissionIds = role.ps_ids.split(",");
          roleResult = {
            id: role.role_id,
            roleName: role.role_name,
            roleDesc: role.role_desc,
            menuIdList: permissionIds,
            createTime: role.create_time || null,
            updateTime: role.update_time || null,
            // children: [],
          };
          perData.push(roleResult);
        }
        var rolesResult = {
          data: perData,
          pageInfo: {
            pageNum,
            pageSize,
            total: count,
          },
        };
        cb(null, rolesResult);
      });
    });
  });
};

/**
 * 添加角色
 *
 * @param  {[type]}   params [description]
 * @param  {Function} cb     [description]
 */
module.exports.createRole = function (params, cb) {
  if (!params.roleName) return cb("角色名称不能为空");
  if (!params.roleDesc) params.roleDesc = "";

  dao.create(
    "RoleModel",
    {
      role_name: params.roleName,
      role_desc: params.roleDesc,
      ps_ids: params.roleIds,
      create_time: new Date(),
      update_time: new Date(),
    },
    function (err, role) {
      if (err) return cb("创建角色失败");
      cb(null, {
        roleId: role.role_id,
        roleName: role.role_name,
        roleDesc: role.role_desc,
        roleIds: role.ps_ids,
      });
    }
  );
};

/**
 * 更新角色信息
 *
 * @param  {[type]}   role 角色对象
 * @param  {Function} cb   回调函数
 */
module.exports.updateRole = function (params, cb) {
  if (!params) return cb("参数不能为空");
  if (!params.id) return cb("角色ID不能为空");
  if (isNaN(parseInt(params.id))) return cb("角色ID必须为数字");

  updateInfo = {
    update_time: new Date(),
    role_desc: params.roleDesc,
    ps_ids: params.roleIds
  };
  if (params.roleName) {
    updateInfo["role_name"] = params.roleName;
  }

  dao.update("RoleModel", params.id, updateInfo, function (err, newRole) {
    if (err) return cb("更新角色信息失败");
    cb(null, {
      roleId: newRole.role_id,
      roleName: newRole.role_name,
      roleDesc: newRole.role_desc,
      roleIds: newRole.ps_ids,
      rolePermissionDesc: newRole.ps_ca,
    });
  });
};

/**
 * 通过角色 ID 获取角色详情
 *
 * @param  {[type]}   id 角色ID
 * @param  {Function} cb 回调函数
 */
module.exports.getRoleById = function (id, cb) {
  if (!id) return cb("角色ID不能为空");
  if (isNaN(parseInt(id))) return cb("角色ID必须为数字");
  dao.show("RoleModel", id, function (err, role) {
    if (err) return cb("获取角色详情失败");
    cb(null, {
      roleId: role.role_id,
      roleName: role.role_name,
      roleDesc: role.role_desc,
      rolePermissionDesc: role.ps_ca,
    });
  });
};

/**
 * 删除角色
 *
 * @param  {[type]}   id 角色ID
 * @param  {Function} cb 回调函数
 */
module.exports.deleteRole = function (id, cb) {
  if (!id) return cb("角色ID不能为空");
  if (isNaN(parseInt(id))) return cb("角色ID必须为数字");
  dao.destroy("RoleModel", id, function (err) {
    if (err) return cb("删除失败");
    cb(null, true);
  });
};

/**
 * 权限验证函数
 *
 * @param  {[type]}   rid         角色ID
 * @param  {[type]}   serviceName 服务名
 * @param  {[type]}   actionName  动作名（方法）
 * @param  {Function} cb          回调函数
 */
module.exports.authRight = function (userInfo, serviceName, actionName, cb) {
  permissionAPIDAO.authRight(
    userInfo,
    serviceName,
    actionName,
    function (err, pass) {
      cb(err, pass);
    }
  );
};
