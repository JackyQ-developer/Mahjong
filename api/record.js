import request from '@/utils/request'

export function getRecordList(query) {
  return request({
    url: '/record/list',
    method: 'get',
    params: query
  })
}

/**
 * @description 添加记录
 * @param {Object} data
 */
export function addRecord(data) {
  return request({
    url: '/record',
    method: 'post',
    data
  })
}
