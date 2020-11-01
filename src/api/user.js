import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/aircondition/user/login',
    method: 'post',
    data
  })
}
export function updatePassword(data) {
  return request({
    url: '/aircondition/user/updatePassword',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/aircondition/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/aircondition/user/logout',
    method: 'post'
  })
}
