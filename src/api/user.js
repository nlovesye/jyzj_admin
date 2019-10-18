import axios from '@/libs/api.request'

export const LOGIN = ({ userName, password }) => {
  const data = {
    userName,
    password
  }
  return axios.request({
    url: '/user/login',
    data,
    method: 'post'
  })
}

export const REGIST = (user) => {
  return axios.request({
    url: '/user/regist',
    data: user,
    method: 'post'
  })
}

// 获取用户列表
export const GET_USER = () => {
  return axios.request({
    url: '/user/list',
    method: 'get'
  })
}

// 添加元素权限
export const ADD_ACCESS_ELE = (data) => {
  return axios.request({
    url: '/user/access/add',
    method: 'put',
    data
  })
}

// 删除权限
export const DEL_ACCESS = (data) => {
  return axios.request({
    url: '/user/access/del',
    method: 'delete',
    params: data
  })
}

// 获取元素权限列表
export const GET_ACCESS_ELE_LIST = () => {
  return axios.request({
    url: '/user/access/eleList',
    method: 'get'
  })
}

// 获取模块权限列表
export const GET_ACCESS_MODULE_LIST = () => {
  return axios.request({
    url: '/user/access/moduleList',
    method: 'get'
  })
}

// 添加模块权限
export const ADD_ACCESS_MODULE = (data) => {
  return axios.request({
    url: '/user/access/moduleAdd',
    method: 'put',
    data
  })
}
