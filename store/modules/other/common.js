/**
 * @description 公共配置信息文件，具体数据查看api公共接口/获取字典资源信息
 */
import { getConfig } from '@/api/common'
const mutationTypes = {
  CONFIG_SETTING: 'CONFIG_SETTING'
}
const actionTypes = {
  getConfig: 'getConfig'
}

const state = {
  ethnicity: ['汉族', '蒙古族', '回族', '藏族', '维吾尔族', '苗族', '彝族', '壮族', '布依族', '朝鲜族', '满族', '侗族', '瑶族', '白族', '土家族', '哈尼族', '哈萨克族', '傣族', '黎族', '僳僳族', '佤族', '畲族', '高山族', '拉祜族', '水族', '东乡族', '纳西族', '景颇族', '柯尔克孜族', '土族', '达斡尔族', '仫佬族', '羌族', '布朗族', '撒拉族', '毛南族', '仡佬族', '锡伯族', '阿昌族', '普米族', '塔吉克族', '怒族', '乌孜别克族', '俄罗斯族', '鄂温克族', '德昂族', '保安族', '裕固族', '京族', '塔塔尔族', '独龙族', '鄂伦春族', '赫哲族', '门巴族', '珞巴族', '基诺族'],
  eduBackground: ['初中及以下', '高中', '大专', '本科及以上']
}

const mutations = {
  CONFIG_SETTING: (state, data) => {
    for (const key in data) {
      state[key.toString()] = data[key.toString()]
    }
  }
}

const actions = {
  async getConfig({ commit }, data) {
    const res = await getConfig()
    if (res.message !== '') console.log('获取配置: ' + res.message)
    commit('CONFIG_SETTING', res.data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  mutationTypes,
  actionTypes
}

