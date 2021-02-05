<template>
  <view class="content">
    <view @click="datepickerVisiable = !datepickerVisiable">
      <view v-if="dateRange.length > 0">
        <text>{{ dateRange[0] }}</text>
        <text>-</text>
        <text>{{ dateRange[1] }}</text>
      </view>
      <view v-else>
        请选择日期
      </view>
    </view>
    <view :class="statisticsStyle">
      <text>{{ statistics.total }}局</text>
    	<text>总: {{ statistics.sum }}元</text>
    	<text>入: {{ statistics.collect }}元</text>
    	<text>出: {{ statistics.pay }}元</text>
    </view>
    <mx-datepicker :show="datepickerVisiable" :value="dateRange" :type="type" :show-tips="true" :begin-text="'开始'" :end-text="'结束'" :show-seconds="true" @confirm="getDate" @cancel="handleCancelDatePicker" />
  </view>
</template>

<script>
  import { getStatisticsRecord } from '@/api/statistics'
  export default {
    data() {
      return {
        statisticsStyle: 'statistics',
        title: 'Hello',
        datepickerVisiable: false,
        type: 'rangetime',
        dateRange: [],
        statistics: {
          total: 0,
          sum: 0,
          collect: 0,
          pay: 0,
        }
      };
    },
    onShow() {
      const startOfYear = this.$moment('2021-01-01').format('YYYY/MM/DD HH:mm:ss');
      const now = this.$moment().format('YYYY/MM/DD HH:mm:ss')
      this.dateRange = [startOfYear, now]
    },
    onPageScroll(scroll) {
      if (scroll.scrollTop >= 20 && this.statisticsStyle != 'statistics-fixed') {
        this.statisticsStyle = 'statistics-fixed'
      } else if (scroll.scrollTop < 20 && this.statisticsStyle != 'statistics') {
        this.statisticsStyle = 'statistics'
      }
    },
    watch: {
      dateRange: {
        deep: true,
        async handler() {
          const res = await getStatisticsRecord({
            startTime: this.dateRange[0],
            endTime: this.dateRange[1]
          });
          this.statistics = res.data
        }
      }
    },
    methods: {
      getDate(date) {
        this.dateRange = date.value
        this.datepickerVisiable = false
      },
      handleCancelDatePicker() {
        this.datepickerVisiable = false
      }
    }
  };
</script>

<style>
  .content {
    text-align: center;
  }
  .statistics {
  	display: flex;
  	justify-content: space-around;
  	margin: 0 auto;
  	padding: 10px 40rpx;
  	background-color: #E7E7E7;
  	border-bottom: 1px solid #EEEEEE;
  	box-shadow: 0px 12px 8px -12px #000;
  }
  
  .statistics-fixed {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
  	display: flex;
  	justify-content: space-around;
  	margin: 0 auto;
  	padding: 10px 40rpx;
  	background-color: #E7E7E7;
  	border-bottom: 1px solid #EEEEEE;
  	box-shadow: 0px 12px 8px -12px #000;
  	border-radius: 10px;
    animation: navbar 0.5s linear forwards;
  }
</style>
