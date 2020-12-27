//
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  - /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//
//
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
//           佛祖保佑       永不宕机     永无BUG
//
export default {
	data() {
		return {
			// 滑动需要
			listTouchStart: 0,
			modalName: null,
			
			showLoadMore: false,
			loadMoreStatus: 'noMore',
			// listQuery可覆盖
			listQuery: {
				page: 1,
				limit: 20
			},
			items: [],
			total: 0
		};
	},
	onLoad() {
		this.init()
	},
	onPullDownRefresh() {
		this.init()
	},
	onReachBottom() {
		this.handleOnReachBottom()
	},
	methods: {
		async handleOnReachBottom() {
			this.showLoadMore = true
			this.loadMoreStatus = 'loading'
			if (this.items.length === this.total) {
				setTimeout(() => {
					this.loadMoreStatus = 'noMore'
				}, 800)
			} else {
				await this.getData('addData')
				this.showLoadMore = false
			}
		},
		/**
		 * @description 初始化数据
		 */
		init() {
			this.listQuery.page = 1
			this.getData('initData')
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		/**
		 * @description !!!!!!!!!!!!!!这个方法一定要重写!!!!!!!!!!!!!!!!!!!!
		 * @param {String} mode 'initData'初始化, 'addData'追加
		 */
		async getData(mode) {},
		/**
		 * @description 初始化数据，下拉刷新用
		 * @param {Object} res 列表请求接口返回体
		 */
		initData(res) {
			this.items = res.data.items
			this.listQuery.page = 2
			this.total = res.data.total
			
			for (let key in res.data) {
				if (this.hasOwnProperty(key)) this[key] = res.data[key]
			}
		},
		/**
		 * @description 追加数据
		 * @param {Object} res 列表请求接口返回体
		 */
		addData(res) {
			this.items = this.items.concat(res.data.items)
			this.listQuery.page++
			this.total = res.data.total
			
			for (let key in res.data) {
				if (this.hasOwnProperty(key)) this[key] = res.data[key]
			}
		},
		// ListTouch触摸开始
		ListTouchStart(e) {
			this.listTouchStart = e.touches[0].pageX
		},
		
		// ListTouch计算方向
		ListTouchMove(e) {
			this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
		},
		
		// ListTouch计算滚动
		ListTouchEnd(e) {
			if (this.listTouchDirection == 'left') {
				this.modalName = e.currentTarget.dataset.target
			} else {
				this.modalName = null
			}
			this.listTouchDirection = null
		}
	}
}