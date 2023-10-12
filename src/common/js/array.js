export function checkArray(key) {
  let arr = ['1', '2', '3', '4', 'demo'];

  let index = arr.indexOf(key);

  if (index > -1) {
    return true // 有权限
  } else {
    return false // 无权限
  }
}