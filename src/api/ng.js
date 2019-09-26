import axios from '@/libs/api.request'

// 批量添加门派
export const ADD_NG_BATCH = (data) => {
  return axios.request({
    url: '/ng/addBatch',
    method: 'put',
    data
  })
}

// 获取门派列表
export const GET_NG_LIST = () => {
  return axios.request({
    url: '/ng/list',
    method: 'get'
  })
}

// 删除门派
export const DELETE_NG = (params) => {
  return axios.request({
    url: '/ng/del',
    method: 'delete',
    params
  })
}

// 删除所有门派
export const DELETE_NG_ALL = () => {
  return axios.request({
    url: '/ng/delAll',
    method: 'delete'
  })
}
