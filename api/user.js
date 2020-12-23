import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/sys/auth/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/sys/user/logout',
    method: 'post'
  })
}

// IM初始化
export function getAppCall(query) {
  return request({
    url: '/appcall',
    method: 'get',
    params: query
  })
}
