<template>
	<view>
		<view class="profile flex-center">
			<!-- :style="{backgroundImage: `url(/static/img/user/av${userInfo.avatar}.jpg)` -->
			<view @click="modalInfo.isShow=true" :style="{backgroundImage: `url(https://cfunweb.oss-cn-hangzhou.aliyuncs.com/img/cfiot/av${userInfo.avatar}.jpg)`}"></view>
			<text>{{userInfo.name}}</text>
		</view>
		<view class="info">
			<ul class="flex-center">
				<li v-for="(v, i) in devInfo" :key="i" @click="liClick(i)">
					<view class="left">
						<text :class="v.icon" class="iconfont"></text>
					</view>
					<view class="right">
						<text>{{v.des}}</text>
						<text>{{v.count}}</text>
					</view>
				</li>
			</ul>
		</view>
		<cf-tabbar :actTabIdx="0"></cf-tabbar>
		<u-modal :show="modalInfo.isShow"  :content="modalInfo.content" showCancelButton 
		:cancelColor="styleVar.main_color" confirmColor="#606266" buttonReverse
		@confirm="logOut" @cancel="modalInfo.isShow=false"></u-modal>
	</view>
</template>

<script>
	//store _devList还未修改
	import throttle from "../../utils/throttle.js"
	import styleVar from "@/style/base.scss"
	
	export default {
		data() {
			return {
				devInfo: [
					{des: "设备总量", icon: "icon-shebei1", count: "0"},
					{des: "在线设备", icon: "icon-ai70", count: "0"},
					{des: "连接密钥", icon: "icon-miyue"},
					{des: "重置密钥", icon: "icon-zhongzhimima"}
				],
				userInfo: {
					avatar: 0,
					name: "loading",
					code: "",
				},
				devList: [],
				isShowCode: false,
				modalInfo: {
					isShow: false,
					content: "是否需要切换当前用户?"
				},
				styleVar
			}
		},
		computed: {
		},
		methods: {
			/* 退出登录 */
			logOut () {
				this.$store.commit("changeVal", {k:"token", v:""})
				setTimeout(()=>{
					uni.navigateTo({
						url: "/pages/index/index"
					})
				},200)
			},
			thLiClick: throttle.clickLimit(function(){
				this.resetCode()
			},{limit:500}),
			/* 连接/重置密钥点击逻辑 */
			liClick (i) {
				switch (i) {
					case 2:
						this.isShowCode = !this.isShowCode
						this.devInfo[i].des = this.isShowCode ? this.userInfo.code : "连接密钥"
						if (this.isShowCode) {
							uni.setClipboardData({
								data: this.userInfo.code
							});
						}
						break
					case 3:
						this.thLiClick()
						break
				}
			},
			/* 计算在线设备数量 */
			olCount () {
				let count = 0
				this.devList.forEach(e => {
					if (e.state) count++
				})
				return count
			},
			/* 重置密钥 */
			resetCode () {
				/* 1-重置 */
				this.$reqGet({
					url:`${this.$baseUrl}/user/getCode`,
					query: {i: 1},
					rsv: (data) => {
						console.log("reset--",data)
						if (!data.err) {
							this.userInfo.code = data.code
							this.devInfo[2].des = data.code
						}
						else uni.showToast({title: "重置失败", icon: "error"})
					}
				})	
			}
		},
		onLoad () {
			/* 获取用户基本信息 */
			this.$reqGet({
				url:`${this.$baseUrl}/user/getUserInfo`,
				rsv: (data) => {
					this.userInfo.name = data.name
					this.userInfo.avatar = data.avatar
					this.$store.commit("changeVal", {k:"_username", v:data.name})
				}
			}),
			/* 获取设备列表 */
			this.$reqGet({
				url:`${this.$baseUrl}/dev/getDevList`,
				rsv: (data) => {
					this.devList = data.data
					this.devInfo[0].count = this.devList.length
					this.devInfo[1].count = this.olCount()
				}
			}),
			/* 0-获取密钥 */
			this.$reqGet({
				url:`${this.$baseUrl}/user/getCode`,
				query: {i: 0},
				rsv: (data) => {
					this.userInfo.code = data.code
				}
			})
		},
	}
</script>

<style lang="scss">
	.profile {
		flex-direction: column;
		width: 100%;
		height: 350rpx;
		margin-top: 20rpx;
		view {
			width: 220rpx;
			height: 220rpx;
			box-sizing: border-box;
			border: 1px solid gainsboro;
			border-radius: 50%;
			background: center/cover no-repeat;
		}
		text {
			margin-top: 20rpx;
			font: 35rpx $fontF;
		}
	}
	.info {
		margin: 0 auto;
		width: 580rpx;
		height: 660rpx;
		// box-shadow: 1px 1px 2px 2px rgb(240,240,240);
		ul {
			width: 100%;
			height: 100%;
			flex-direction: column;
			li {
				display: flex;
				align-items: center;
				width: 100%;
				height: 140rpx;
				border-radius: 10rpx;
				background-image:linear-gradient(135deg, #85f7f4, #00A1E9);
				box-shadow: 1px 1px 2px 1px rgb(220,220,220);
				color: white;
				&:not(:last-of-type) {
					margin-bottom: 20rpx;
				}
				.left {
					margin-left: 10rpx;
					width: 120rpx;
					height: 120rpx;
					// background-color: yellow;
					text-align: center;
					text {
						line-height: 120rpx;
						font-size: 100rpx;
					}
				}
				.right {
					width: 350rpx;
					margin-left: 50rpx;
					font: 35rpx $fontF;
					text:last-child {
						float: right
					}
				}
			}
		}

	}
</style>
