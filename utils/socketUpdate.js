/**
 * @description 更新app
*/
// import config from '@/common/config'
// // #ifdef APP-PLUS
// export async function update(data) {
// 	try{
// 		if (data.update && data.wgtUrl) {
// 			// hot-update
// 			const downloadWgtUrl = uni.downloadFile({
// 				url: data.wgtUrl,
// 				success: downloadResult => {
// 					if (downloadResult.statusCode === 200) {
// 						plus.runtime.install(
// 							downloadResult.tempFilePath, {
// 								force: true
// 							},
// 							function() {
// 								console.log('install success...');
// 								uni.showToast({
// 									title: '更新成功, 重启中...',
// 									icon: 'none'
// 								})
// 								setTimeout(() => {
// 									plus.runtime.restart();
// 								}, 1500)
// 							},
// 							function(e) {
// 								console.log(e)
// 								console.error('install fail...');
// 								uni.showToast({
// 									title: '更新失败',
// 									content: '请联系管理员'
// 								})
// 							}
// 						);
// 					}
// 				}
// 			});
// 			downloadWgtUrl.onProgressUpdate(res => {
// 			    console.log('热包下载进度' + res.progress);
// 			});
// 		} else if (data.update && data.pkgUrl) {
// 			// 整包升级
// 			const downloadPkgUrl = uni.downloadFile({
// 				url: data.pkgUrl,
// 				success: (downloadResult) => {
// 					if (downloadResult.statusCode === 200) {
// 						plus.runtime.install(downloadResult.tempFilePath, {
// 							force: false
// 						}, function() {
// 							uni.showToast({
// 								title: '升级成功, 重启中...',
// 								icon: 'none'
// 							})
// 							setTimeout(() => {
// 								plus.runtime.restart();
// 							}, 1500)
		
// 						}, function(e) {
// 							uni.showToast({
// 								title: '更新失败',
// 								content: '请联系管理员'
// 							})
// 						});
// 					}
// 				}
// 			});
// 			downloadPkgUrl.onProgressUpdate(res => {
// 			    console.log('下载进度' + res.progress);
// 			});
// 		}
// 	}
// 	catch(err){
// 		console.log(err)
// 		return err
// 	}
// }
// // #endif


/**
 * @description 更新app
 */
import config from '@/common/config'
import { download } from '@/utils/downloadFile.js'

// #ifdef APP-PLUS
export function update(data) {
	return new Promise(async (resolve, reject) => {
		if (data.update && data.wgtUrl) {
			// hot-update
			const downloadWgt = await download(data.wgtUrl)
			console.log(downloadWgt, 94)
			resolve(downloadWgt)
		} else if (data.update && data.pkgUrl) {
			const downloadPkg = await download(data.pkgUrl)
			resolve(downloadPkg)
			// 整包升级
			// try {
				
			// } catch (e) {
			// 	console.log(e)
			// }
		}
	}).catch((e)=>{
		return e
	})
}
// #endif
