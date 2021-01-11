const TokenKey = 'Admin-Token'

export function getToken() {
  try {
    const value = uni.getStorageSync(TokenKey);
    return value
  } catch (e) {
    // error
    console.log('获取token失败:' + e);
  }
}

export function setToken(token) {
  try {
    return uni.setStorageSync(TokenKey, token);
  } catch (e) {
    // error
    console.log('存储token失败:' + e)
  }
}

export function removeToken() {
  try {
    return uni.removeStorageSync(TokenKey);
  } catch (e) {
    // error
    console.log('删除token失败:' + e)
  }
}
