<template>
  <view class="content">
    <text @click="datepickerVisiable = !datepickerVisiable">页面 - 1</text>
    <mx-datepicker :show="datepickerVisiable" :type="type" :show-tips="true" :begin-text="'开始'" :end-text="'结束'" :show-seconds="true" @confirm="getDate" @cancel="handleCancelDatePicker" />
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: 'Hello',
        datepickerVisiable: false,
        type: 'rangetime',
      };
    },
    onLoad() {},
    methods: {
      getDate(date) {
        console.log(date)
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
    height: 400upx;
    margin-top: 200upx;
  }
</style>
