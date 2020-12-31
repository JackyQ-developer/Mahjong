/**
 * 生成文件对应的模块
 *
 * @param {*} dirPath 文件夹路径
 */
const generateModules = (files) => {
  const modules = {}

  files.keys().forEach(key => {
    modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
  })
  return modules
}

/**
 * 所有file
 *
 */
const allFiles = {
  page: require.context('./modules/page', false, /\.js$/),
  components: require.context('./modules/components', false, /\.js$/),
  domain: require.context('./modules/domain', false, /\.js$/),
  other: require.context('./modules/other', false, /\.js$/)
}

/**
 * 所有module
 *
 */
const allModules = {
  page: generateModules(allFiles.page),
  components: generateModules(allFiles.components),
  domain: generateModules(allFiles.domain),
  other: generateModules(allFiles.other)
}

/**
 * @description 组装指令
 * @param type
 * @param moduleName
 * @param moudule
 */
function groupModule(type, moduleName, moudule) {
  const temp = { ...moudule }
  for (const key in temp) {
    temp[key] = type.toString() + '/' + moduleName.toString() + '/' + temp[key]
  }
  return temp
}

/**
 * 根据types获取modules下的多个模块的结构化数据
 * @param {*} types module type
 * @param {*} fieldName 字段名
 */
const getStructuredData = (types, fieldNames) => {
  const structuredData = {}
  types.forEach(type => {
    const modules = allModules[type]
    const structuredModuleData = Object.keys(modules).map(moduleName => {
      const fields = fieldNames.map(fieldName => {
        const module = groupModule(type, moduleName, modules[moduleName][fieldName])
        return module
      })
      return {
        [moduleName]: Object.assign(...fields)
      }
    })
    structuredData[type] = structuredModuleData && structuredModuleData.length ? Object.assign(...structuredModuleData) : {}
  })
  return structuredData
}

const enumTypePlugin = store => {
  console.log('呵呵哒: ', store)
  const mutationTypeEnum = getStructuredData(['page', 'components', 'domain', 'other'], ['mutationTypes'])
  const actionTypeEnum = getStructuredData(['page', 'components', 'domain', 'other'], ['actionTypes'])

  store.mutationTypes = mutationTypeEnum
  store.actionTypes = actionTypeEnum
}
export default enumTypePlugin
