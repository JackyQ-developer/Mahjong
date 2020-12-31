<template>
	<view class="content">
		<view class="statistics">
			<text>总: {{ sum }}元</text>
			<text>入: {{ collect }}元</text>
			<text>出: {{ pay }}元</text>
		</view>
		<view class="list">
			<view class="item" v-for="(item, index) in items" :key="index">
				<text v-show="item.type === 1" class="icon green">入</text>
				<text v-show="item.type === 2" class="icon red">出</text>
				<text style="margin: 0 30rpx;">时间: {{ item.createdAt | datetimeFormatter }}</text>
				<text>金额: <text :class="item.type === 1? 'green' : 'red'">{{ item.money }}</text>元</text>
			</view>
		</view>

		<uni-load-more v-if="showLoadMore" :status="loadMoreStatus" />
    <text v-if="items.length === 0" class="no-data">暂无数据</text>

		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog title="请输入金额" mode="input" :value="defaultValue" :duration="2000" @confirm="confirm" />
		</uni-popup>

		<view class="sum-button" @click="open">
			+
		</view>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import ListMixIn from '@/mixins/list'
	import { getTime } from '@/utils'
	import { getRecordList, addRecord } from '@/api/record'
	import { getStatisticsRecord } from '@/api/statistics'
	export default {
		components: {
			uniPopup,
			uniPopupDialog
		},
		mixins: [ListMixIn],
		data() {
			return {
				title: 'Hello',
				defaultValue: '',
				listQuery: {
					page: 1,
					limit: 20,
          datetime: new Date(new Date().toLocaleDateString())
				},
				items: [],
				total: 0,
        collect: 0,
        pay: 0,
        sum: 0
			}
		},
		methods: {
			async getData(modeFunction) {
				const res = await getRecordList(this.listQuery)
				const res2 = await getStatisticsRecord(this.listQuery)
        const tmpData = {
          ...res.data,
          ...res2.data
        }
				this[modeFunction]({
          data: tmpData
        })
			},
			async confirm(done, value) {
				const money = Number(value)
				const type = money > 0 ? 1 : 2;
				if (value === '') {
					return uni.showToast({
						title: '不能为空'
					})
				} else if (isNaN(money)) {
					return uni.showToast({
						title: '请输入数字'
					})
				}

				await addRecord({
					money,
					type
				})
				done()
				uni.showToast({
					title: '保存成功',
					icon: 'success'
				})
				this.init()
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
		box-shadow: 0px 12px 8px -12px #000;
		border-radius: 10px;
	}

	.list {
		.item {
			position: relative;
			width: 96%;
			margin: 0 auto;
			display: flex;
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
