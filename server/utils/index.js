//将根元素和根元素的第一个层子元素追加,在遍历到非根元素时,将其追加到它的父元素下.
module.exports.listTransFormTree = function listTransFormTree(list, idName, pidName, type, rid, rolePermissions) {
  const arr = []
  if (type && type == 1) {
    list = list.filter(item => item.ps_type == type);
  }
  if (rid && rid != 0) {
    let temp = [];
    rolePermissions.forEach(r => {
      const res = list.filter(item => item.ps_id == r);
      if (res && res.length) {
        temp = [...temp, ...res];
      }
    })
    list = temp;
  }
  list.forEach((v) => {
    //获取一个不包含当前项的新数组
    const newList = list.filter((k) => k[idName] !== v[idName]);
    //如果没有找到这一项的父元素那么可以确定它是根元素
    const root = newList.find((t) => t[idName] === v[pidName]);
    if (!root) {
      //往数组中追加根元素
      arr.push(v)
    }
    //找当前项的子元素  此步骤完成了给多层子元素追加进去的功能,因为最开始foreach遍历的项,如果不是根元素,那么也会去找他的子元素追加进这个项.
    const children = newList.filter((k) => k[pidName] === v[idName]);
    //找到了就赋值
    if (children.length > 0) {
      v.children = children
    } else {
      v.children = []
    }
  });
  return arr;
}

module.exports.dataMap = function dataMap(data) {
  return (reslut = data.map((item) => {
    const obj = {
      id: item.ps_id,
      parentId: item.ps_pid,
      authName: item.ps_name,
      path: item.ps_api_path,
      order: item.ps_api_order,
      level: item.ps_level,
      type: item.ps_type,
      icon: item.ps_icon,
      sign: item.ps_sign,
      params: item.ps_params,
      show: item.ps_show,
      createTime: item.create_time,
      serviceName: item.ps_api_service,
      actionName: item.ps_api_action,
      children: [],
    };
    if (item.children && item.children.length) {
      obj.children = dataMap(item.children);
    }else{
      delete obj.children
    }
    return obj;
  }));
}
module.exports.compare = function compare(a, b) {
  if (a.order < b.order) {
    return -1;
  } else if (a.order > b.order) {
    return 1;
  } else {
    return 0;
  }
} 