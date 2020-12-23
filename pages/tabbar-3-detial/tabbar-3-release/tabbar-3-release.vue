<template>
	<view class="content">
		<view class="statistics">
		  <text>总: 10000元</text>
		  <text>入: 11000元</text>
		  <text>出: 1000元</text>
		</view>
    <view class="list">
      <view class="item">
        <text class="icon green">入</text>
        <text class="icon red">出</text>
        <text>时间: 2020-12-23 16:00:00</text>
        <text>金额: <text class="red">200</text>元</text>
      </view>
    </view>
    
    <uni-popup ref="popup" type="dialog">
        <uni-popup-dialog title="请输入金额" mode="input" :value="defaultValue" :duration="2000" @confirm="confirm">
          214214214214
        </uni-popup-dialog>
    </uni-popup>
    
    <view class="sum" @click="open">
      +
    </view>
	</view>
</template>

<script>
  import uniPopup from '@/components/uni-popup/uni-popup.vue'
  import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
    components: {
        uniPopup,
        uniPopupDialog
    },
		data() {
			return {
				title: 'Hello',
        defaultValue: 0
			}
		},
		onLoad() {

		},
		methods: {
      confirm(done, value) {
        console.log(value)
      },
      open() {
        this.$refs.popup.open()
      }
		}
	}
</script>

<style lang="scss" scoped>
  .statistics {
    display: flex;
    justify-content: space-around;
    width: 600rpx;
    margin: 20px auto;
    padding: 10px 40rpx;
    background-color: #E7E7E7;
    border-bottom: 1px solid #EEEEEE;
    box-shadow:0px 12px 8px -12px #000; border-radius:10px;
  }
  
  .sum {
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
  }
  
  .list {
    .item {
      position: relative;
      width: 96%;
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
      border-top: 1px solid #999;
      padding: 8px 0;
      
      &:last-child {
        border-bottom: 1px solid #999;
      }
      
      .icon {
        position: absolute;
        top: 0;
        left: 0;
        font-size: 12px;
        display: block;
        width: 12px;
        border: 1px solid #333;
        height: 12px;
        text-align: center;
        line-height: 12px;
        border-radius: 12px;
      }
      .red {
        border-color: red;
        color: red;
      }
      
      .green {
        border-color: green;
        color: green;
      }
    }
  }
</style>
