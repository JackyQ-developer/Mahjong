import request from '@/utils/request'

export function getConfig() {
  return request({
    url: '/sys/dict',
    // baseURL: 'http://192.168.104.121:7001',
    method: 'get',
    params: {
      type: [
        'gender',
        'powerMode',
        'eqpStatus',
        'constructType',
        'entType',
        'eqpKind',
        'eqpType',
        'eqpCategory',
        'inspectType',
        'releaseAgencies',
        'qualificationItemLevel',
        'belongIndustry',
        'releaseType',
        'eqpKind',
        'controlMode',
        'eqpUseScenarios',
        'inspectPackageStatus',
        'requestStatus'
      ]
    }
  })
}

export function getGvcode() {
  return request({
    url: '/common/gvcode',
    method: 'get'
  })
}

/**
 * @description 获取短信验证码
 * @param query query对象
 */
export function getSMScode(query) {
  console.log(query)
  return request({
    url: '/auth/common/SMScode',
    method: 'get',
    params: query
  })
}

/**
 * @description 删除文件
 * @param data {Object}  filePath
 */
export function delFile(data) {
  return request({
    url: '/fastdfs/file',
    method: 'delete',
    data
  })
}
