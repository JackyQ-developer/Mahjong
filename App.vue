<!-- <template>
  <view style="height: 100px;"></view>
</template> -->
<script>
export default {
	onLaunch: function() {
		console.log('App Launch');

		setTimeout(() => {
			uni.setTabBarBadge({
				index: 1,
				text: '31'
			});
			uni.showTabBarRedDot({
				index: 3
			});
		}, 1000);
    
    uni.onTabBarMidButtonTap(() => {
      uni.navigateTo({
        url: '/pages/tabbar-3-detial/tabbar-3-release/tabbar-3-release'
      })
    })
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
/*每个页面公共css */ 

  /**
   * 无数据提示样式
   */
  .no-data {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    color: #EEEEEE;
    letter-spacing: 4rpx;
    font-size: 32rpx;
  }

	.sum-button {
		position: fixed;
		font-size: 80rpx;
		width: 100rpx;
		height: 100rpx;
		text-align: center;
		vertical-align: middle;
		line-height: 90rpx;
		border-radius: 100rpx;
		background: rgba($color: #333, $alpha: 0.1);
		color: #333;
		right: 40rpx;
		bottom: 60px;
    animation: rotate 2s linear infinite;
	}
  
  @keyframes rotate {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
