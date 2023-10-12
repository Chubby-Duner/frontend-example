import axios from '../utils/axios'

// 例子接口

export function addCart(params) {
  return axios.post('/shop-cart', params);
}

export function modifyCart(params) {
  return axios.put('/shop-cart', params);
}

export function getCart(params) {
  return axios.get('/shop-cart', { params });
}

export function deleteCartItem(id) {
  return axios.delete(`/shop-cart/${id}`);
}

export function getByCartItemIds(params) {
  return axios.get('/shop-cart/settle', { params });
}

/* 
  页面使用: 
    引入：import { getByCartItemIds } from '../service/cart'

    调用：const { data: list } = await getByCartItemIds({ cartItemIds: _cartItemIds.join(',') })

*/

/* 
  axios并发请求

    axios.all[
       axios(shop_url, {method}),
       axios.get(url)
    ].then(axios.spread((data, data2) => {
       //  something  code
    })).catch(() => {
      //  something code
    })

*/