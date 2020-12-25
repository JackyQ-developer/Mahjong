import moment from 'moment'
import store from '../store'
// import parseTime, formatTime and set to filter
export { parseTime, formatTime } from '@/utils'

/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * @description 日期过滤器
 * @param value
 * @returns {string} 格式化后的日期
 */
export function dateFormatter(value) {
  if (value === '') {
    return '--'
  } else {
    return moment(parseInt(value)).format('YYYY-MM-DD')
  }
}

/**
 * @description 日期过滤器
 * @param value
 * @returns {string} 格式化后的日期
 */
export function datetimeFormatter(value) {
  if (value === '') {
    return '--'
  } else {
    return moment(new Date(value)).format('YYYY-MM-DD hh:mm:ss')
  }
}

/**
 * @description 字典数据转换
 * @param value
 * @param name
 * @returns {string}
 */
export function dictFilter(value, name) {
  const dict = store.state['other/common'][name.toString()]
  if (dict === undefined) {
    console.warn('字典字段未找到: ' + name.toString())
    return value
  }
  let value2
  for (let i = 0; i < dict.length; i++) {
    if (value === dict[i].value) {
      value2 = dict[i].label
    }
  }
  return value2
}

/**
 * @description 维保订单状态
 * @param value
 * @returns {string}
 */
export function orderStatus(value) {
  	if (value === '0') {
  		return '未发布'
  	} else if (value === '1') {
  		return '发布中'
    } else if (value === '2') {
  		return '已报价'
  	} else if (value === '3') {
  		return '已签约'
  	} else if (value === '4') {
  		return '已支付'
  	} else {
		return value
	}
}

/**
 * @description 合同类型
 * @param value
 * @returns {string}
 */
export function contractType(value) {
  	if (value === '0') {
  		return '清包'
  	} else if (value === '1') {
  		return '半包'
    } else if (value === '2') {
  		return '全包'
  	} else {
		return value
	}
}

/**
 * @description 维保类型
 * @param value
 * @returns {string}
 */
export function maintainType(value) {
  	if (value === '0') {
  		return '按需维保'
  	} else if (value === '1') {
  		return '传统维保'
    } else {
		return value
	}
}
