// 注册所有的全局指令

import copy from '../directive/v-copy';
// 自定义指令
const directives = {
 copy,
};
// 这种写法可以批量注册指令
export default {
 install(Vue) {
  Object.keys(directives).forEach((key) => {
   Vue.directive(key, directives[key]);
  });
 },
};