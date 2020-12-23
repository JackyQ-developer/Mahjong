 // #ifdef APP-PLUS
 // const txCall = uni.requireNativePlugin('HG-TxCall');
 const jqCall = uni.requireNativePlugin("JQUniPlugin-Trtc")
 const modal = uni.requireNativePlugin('modal');

// IM初始化
export function initIM(config) {
	return new Promise((resolve, reject)=>{
		jqCall.config({
			"userId": config.userId, //我的用户ID
		    "userSig": config.userSig, //UserSig的密钥
		    "nickName": config.userName, //用户昵称
		    "useDefaultRandomAvatar": true, //是否使用随机头像
		    "userAvatar": "", //头像地址
		    "appid":config.sdkappID,
			 "api": "userMsgById"
		}
		, (ret) => {
			console.log('初始化： ', ret)
			resolve(ret)
		})
	})
	.catch(error => {
		reject(error)
	})
}
// 一对一视频
export function startOneToOneVideoCall(config, userId) {
	return new Promise((resolve, reject)=>{
		jqCall.call({
			"userId": "userId",
			"callType": "video", //audio表示语音，video表示视屏通话
		    "mode": "call", //call表示通话  meeting表示会议
		    "roomId": "1108", //会议ID 房间号不存在，则自动创建
		    "targetInfo": { //目标信息
				"userId": config.targetId, //被呼叫方的ID
				"nickName": config.userName, //用户昵称
				"userAvatar": "", //头像地址 
		    }
		}, (ret) => {
			resolve(ret)
		}, (err) => {
			console.log('视频通话报错:', err)
		})
	})
	.catch(error => {
		console.log(error)
        reject(error)
     })
}

// 一对一语音
export function	startOneToOneAudioCall(config) { //一对一语音
	return new Promise((resolve, reject)=>{
		txCall.startCall({
				"callType": "audio", //audio表示语音，video表示视屏通话
		      "mode": "call", //call表示通话  meeting表示会议
		      "roomId": 1101, //会议ID 房间号不存在，则自动创建
		      "targetInfo": { //目标信息
		        "userId": config.targetId, //被呼叫方的ID
		        "nickName": "张三", //用户昵称
		        "userAvatar": "", //头像地址 
		      }
		  }, (ret) => {
			resolve(ret)
		})
	})
	.catch(error => {
        reject(error)
     })
}

// 多对多语音
export function muliAudioCall(config) { //多对多语音
	txCall.startCall({
		"callType": "audio", //audio表示语音，video表示视屏通话
         "mode": "meeting", //call表示通话  meeting表示会议
         "roomId": 1101, //会议ID 房间号不存在，则自动创建
         "targetInfo": { //目标信息
			"userId": config.targetId, //被呼叫方的ID
            "nickName": "张三", //用户昵称
            "userAvatar": "", //头像地址 
          }
    }, (ret) => {
		modal.toast({
		   message: ret.code + "," + ret.message,
		   duration: 1.5
       });
   });
}

// 多对多视频
 export function muliVideoCall(config) { //多对多视屏
	txCall.startCall({
		"callType": "video", //audio表示语音，video表示视屏通话
         "mode": "meeting", //call表示通话  meeting表示会议
         "roomId": 1101, //会议ID 房间号不存在，则自动创建
         "targetInfo": { //目标信息
           "userId": config.targetId, //被呼叫方的ID
           "nickName": "张三", //用户昵称
           "userAvatar": "", //头像地址 
         }
    }, (ret) => {
         modal.toast({
          message: ret.code + "," + ret.message,
          duration: 1.5
       });
   });
}
// #endif
