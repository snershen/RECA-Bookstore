const domain = import.meta.env.VITE_API_URL
const apiPath = import.meta.env.VITE_API_PATH

import axios from 'axios'

const loginRequest = axios.create({
  baseURL: `${domain}`
})

const adminRequest = axios.create({
  baseURL: `${domain}/api/${apiPath}/admin/`
  // timeout: 1000
  //   headers: { 'X-Custom-Header': 'foobar' }
})

//從 cookie 中取出 token
const token = document.cookie.replace(/(?:(?:^|.*;\s*)bookstoreAPI\s*=\s*([^;]*).*$)|^.*$/, '$1')

//將 token 放在請求的 header 中一併送出
adminRequest.defaults.headers.common['Authorization'] = token

export const apiSignIn = (data) => {
  return loginRequest.post(`/admin/signin`, data)
}

export const apiLogout = () => {
  return loginRequest.post(`/logout`)
}

// export const apiCheck = () => {
//   return loginRequest.post(`/api/user/check`)
// }

const userRequest = axios.create({
  baseURL: `${domain}/api/${apiPath}/`
  // timeout: 1000
})

userRequest.interceptors.response.use(
  function (res) {
    return res
  },
  function (err) {
    return err
  }
)

adminRequest.interceptors.response.use(
  function (res) {
    return res
  },
  function (err) {
    return err
  }
)

//產品列表
export const admin_getProductAll = () => {
  return adminRequest.get(`/products/all`)
}

export const admin_getProductCategory = (category = '') => {
  return adminRequest.get(`/products/?category=${category}`)
}

export const admin_postProduct = (data) => {
  return adminRequest.post('/product', data)
}

export const admin_putProduct = (data, id) => {
  return adminRequest.put(`/product/${id}`, data)
}

export const admin_deleteProduct = (id) => {
  return adminRequest.delete(`/product/${id}`)
}

//訂單
export const adminGetOrder = (page) => {
  return adminRequest.get(`/orders/?page=${page}`)
}

export const deleteOrderAll = () => {
  return adminRequest.delete(`/order/all`)
}

export const admin_putOrder = (id) => {
  return adminRequest.put(`/order/${id}`)
}

export const deleteOrder = (id) => {
  return adminRequest.delete(`/order/${id}`)
}

//優惠券
export const adminGetCoupon = (page) => {
  return adminRequest.get(`/coupons/?page=${page}`)
}

export const adminPostCoupon = (data) => {
  return adminRequest.post(`/coupon`, data)
}

export const adminPutCoupon = (data, id) => {
  return adminRequest.put(`/coupon/${id}`, data)
}

export const adminDeleteCoupon = (id) => {
  return adminRequest.delete(`/coupon/${id}`)
}

//文章
export const adminPostArticle = (data) => {
  return adminRequest.post(`/article`, data)
}

export const adminGetArticleAll = (page) => {
  return adminRequest.get(`/articles/?page=${page}`)
}

export const adminGetSingleArticle = (id) => {
  return adminRequest.get(`/article/${id}`)
}

export const adminPutArticle = (id, data) => {
  return adminRequest.put(`/article/${id}`, data)
}

export const adminDeleteArticle = (id) => {
  return adminRequest.delete(`/article/${id}`)
}

//上傳圖片
export const adminUploadImg = (data) => {
  return adminRequest.post(`/upload`, data)
}

//=========== user ============

//商品列表
export const userGetProduct = (page, category = '') => {
  let url = `/products?page=${page}`
  if (category !== '') {
    const encodedCategory = encodeURIComponent(category)
    url = `/products?page=${page}&category=${encodedCategory}`
  }
  return userRequest.get(url)
}

export const userGetProductAll = () => {
  return userRequest.get(`products/all`)
}

export const userGetSingleProduct = (id) => {
  return userRequest.get(`/product/${id}`)
}

//購物車
export const userPostCart = (data) => {
  return userRequest.post(`/cart`, data)
}

export const userPutCart = (id, data) => {
  return userRequest.put(`/cart/${id}`, data)
}

export const userDeleteCart = (id) => {
  return userRequest.delete(`/cart/${id}`)
}

export const userDeleteCartAll = () => {
  return userRequest.delete(`/carts`)
}

export const userGetCart = () => {
  return userRequest.get(`/cart`)
}

//訂單
export const userPostOrder = (data) => {
  return userRequest.post(`/order`, data)
}

export const userGetOrder = () => {
  return userRequest.get(`/orders`)
}

export const userSingleOrder = (id) => {
  return userRequest.get(`/order/${id}`)
}

//文章列表
export const userGetArticles = () => {
  return userRequest.get(`/articles`)
}

export const userGetSingleArticle = (id) => {
  return userRequest.get(`/article/${id}`)
}

//優惠券
export const userCheckCoupon = (data) => {
  return userRequest.post(`/coupon`, data)
}

//結帳
export const userPay = (id) => {
  return userRequest.post(`/pay/${id}`)
}
