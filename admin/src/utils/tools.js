/**
 * 通用js方法封装处理
 *
 *
 */

// 验证是否为blob格式
export function blobValidate(data) {
  return data.type !== "application/json";
}
