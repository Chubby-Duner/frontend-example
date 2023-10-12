import axios from '../utils/axios'

// 例子接口

export function getHome(params) {
  return axios.get('/index-infos');  // 接口地址
}


/* 
  页面使用： 

      引入：import { getHome } from '../service/home'

      使用：getHome()
      
*/