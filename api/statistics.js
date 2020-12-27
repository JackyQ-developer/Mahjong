import request from '@/utils/request'

/**
 * @description 查询流水统计数据
 * @param {Object} query
 */
export function getStatisticsRecord(query) {
  return request({
    url: '/statistics/record',
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
