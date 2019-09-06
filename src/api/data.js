import axios from '@/libs/api.request'

export const getTableData = () => {
  return axios.request({
    url: 'get_table_data',
    method: 'get'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const uploadImg = formData => {
  return axios.request({
    url: 'image/upload',
    data: formData
  })
}

export const getOrgData = () => {
  return axios.request({
    url: 'get_org_data',
    method: 'get'
  })
}

export const getTreeSelectData = () => {
  return axios.request({
    url: 'get_tree_select_data',
    method: 'get'
  })
}

// 获取隐士门派列表
export const GET_HERMITS_LIST = (params) => {
  return axios.request({
    url: '/data/hermits/list',
    method: 'get',
    params
  })
}

// 添加隐士门派
export const ADD_HERMITS = (data) => {
  return axios.request({
    url: '/data/hermits/add',
    method: 'put',
    data
  })
}

// 编辑隐士门派
export const EDIT_HERMITS = (data) => {
  return axios.request({
    url: '/data/hermits/save',
    method: 'post',
    data
  })
}

// 删除隐士门派
export const DELETE_HERMITS = (id) => {
  return axios.request({
    url: '/data/hermits/delete',
    method: 'delete',
    data: id
  })
}
