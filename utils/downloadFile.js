import store from '@/store'

export function download(url) {
	return new Promise((resolve, reject) => {
		const downloadWgt = uni.downloadFile({
			url: url,
			success: downloadResult => {
				if (downloadResult.statusCode === 200) {
					plus.runtime.install(
						downloadResult.tempFilePath, {
							force: true
						},
						function(e) {
							console.log(e)
							// console.log('install success...');
							uni.showToast({
								title: '更新成功, 重启中...',
								icon: 'none'
							})
							setTimeout(() => {
								plus.runtime.restart();
							}, 1500)
							resolve(e)
						},
						function(e) {
							try {
								plus.nativeUI.closeWaiting();
							} catch (e) {
								console.log(e)
							}
							console.log(e)
							// console.error('install fail...');
							uni.showToast({
								title: '更新失败',
								content: '请联系管理员'
							})
							reject(e)
						}
					);
				}
			},
			fail: (e) => {
				reject(e)
			}
		});
		downloadWgt.onProgressUpdate(res => {
			console.log('下载进度' + res.progress);
			store.dispatch("home/percent", res.progress)
		});
	})
}
