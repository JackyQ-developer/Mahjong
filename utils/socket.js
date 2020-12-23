import { initIM } from '@/utils/call.js'
import { update } from '@/utils/socketUpdate.js'
import store from '@/store'
import Common from '@/common/common'


export default {
  // 初始化IM
  ClientReceive: async function(data){
	  console.log(data)
	  await initIM(data)
	  store.dispatch("home/saveUserId", data.userId)
  },
  
  // 合格证
  PushCertificate: async function(data) {
	console.log(data, '合格证')
	const res = await Common.downloadAndSaveFile(data)
	store.dispatch("home/PushCertificate", res)
  },
  // 广告视频
  PushAdvertisement: async function(data) {
	   console.log(data,'广告视频')
	   const res = await Common.downloadAndSaveFile(data.src)
	   const duration = parseInt(data.duration);
	   const tmp = {
		   ...data
	   }
	   tmp.src = res
	   tmp.duration = duration
	   store.dispatch("home/pushAdervertisement", tmp)
  },
  // 三个swiper图片
  PushAffiche: async function(data) {
  	  console.log(data,'三个swiper图片')
  },
  // 公告
  PushAffiche: async function(data) {
	  console.log(data,'公告')
	  store.dispatch("home/pushAffiche", data)
  },
  // 更新App
  PushAppUpdate: async function(data) {
	  const res = await update(data)
	  console.log(res, '123')
  },
  // 紧急通知
  PushEmergency: async function(data) {
	  console.log(data,'紧急通知')
  },
  // 删除广告视频
  RemoveAdvertisement: function(data) {
	  console.log(data, '删除广告视频')
	  if(data.status == true) {
		  store.dispatch("home/deleteAdervertisement", data.id)
	  }
  },
  // 删除公告
  RemoveAffiche: function(data) {
	  console.log(data, '删除公告')
	  store.dispatch("home/deleteAffich", data)
  },
  //
  PushBindingMessage: function(data) {
  }
}