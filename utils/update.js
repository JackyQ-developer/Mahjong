/**
 * @description 更新app
 * 
 */
import store from '@/store'
import config from '@/common/config'
export async function update() {
	uni.showLoading({
		title: '加载配置文件...',
		mask: true
	});
	await store.dispatch('other/common/getConfig');
	uni.hideLoading();
	// #ifdef APP-PLUS
	console.log('APP PLUS READY')
	// 锁定屏幕方向
	plus.screen.lockOrientation('portrait-primary'); //锁定
	// 检测升级
	plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
		// console.log('检测升级...', widgetInfo)
		// console.log('appid: ' + plus.runtime.appid)
		uni.request({
			// url: config.domain + '/sys/app/update', //检查更新的服务器地址
			// url: 'https://www.nmgtjha.cn/prod-api' + '/sys/app/update', //检查更新的服务器地址
			data: {
				// appId: plus.runtime.appid,
				appId: '__UNI__3E0C2EE',
				// version: widgetInfo.version,
				version: '1.0.0',
				imei: plus.device.imei,
				name: widgetInfo.name,
				osName: plus.os.name
			},
			success: res => {
				console.log('升级请求成功', res)
				if (res.data.data.update && res.data.data.wgtUrl) {
					//hot-update
					uni.downloadFile({
						url: config.domain + res.data.data.wgtUrl,
						success: downloadResult => {
							if (downloadResult.statusCode === 200) {
								console.log(downloadResult.tempFilePath)
								plus.runtime.install(
									downloadResult.tempFilePath, {
										force: true
									},
									function() {
										console.log('install success...');
										uni.showToast({
											title: '更新成功, 重启中...'
										})
										setTimeout(() => {
											plus.runtime.restart();
										}, 1500)
									},
									function(e) {
										console.error('install fail...');
										uni.showToast({
											title: '更新失败',
											content: '请联系管理员'
										})
									}
								);
							}
						}
					});
				} else if (res.data.data.update && res.data.data.pkgUrl) {
					//package update
					// plus.runtime.openURL(config.domain + res.data.data.pkgUrl);
					//整包升级
					uni.downloadFile({
						// url: 'https://www.nmgtjha.cn/prod-api' + res.data.data.pkgUrl,
						success: (downloadResult) => {
							if (downloadResult.statusCode === 200) {
								plus.runtime.install(downloadResult.tempFilePath, {
									force: false
								}, function() {
									uni.showToast({
										title: '更新成功, 重启中...'
									})
									setTimeout(() => {
										plus.runtime.restart();
									}, 1500)
									
								}, function(e) {
									uni.showToast({
										title: '更新失败',
										content: '请联系管理员'
									})
								});
							}
						}
					});
				}
			},
			fail(e) {
				console.log('升级失败:', e)
			}
		});
	});
	// #endif
	// #ifndef H5 || APP-PLUS
	const updateManager = uni.getUpdateManager();

	updateManager.onCheckForUpdate(function(res) {
		// 请求完新版本信息的回调
		console.log(res.hasUpdate);
	});

	updateManager.onUpdateReady(function(res) {
		uni.showModal({
			title: '更新提示',
			content: '新版本已经准备好，是否重启应用？',
			success(res) {
				if (res.confirm) {
					// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
					updateManager.applyUpdate();
				}
			}
		});

	});

	updateManager.onUpdateFailed(function(res) {
		// 新的版本下载失败
	});
	// #endif

}
