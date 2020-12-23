import request from '@/utils/request'
// 123
export function login(data) {
  return request({
    url: '/sys/user/login',
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
