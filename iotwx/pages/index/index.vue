<template>
	<view class="content flex-center">
		<view class="logbox">
			<image src="../../static/img/login/cflogo.png" mode="widthFix"></image>
			<text>创趣物联小程序</text>
			<view class="uni-form-item uni-column mgt-50">
				<view class="title">用户邮箱</view>
				<input v-model="info.mail"
				class="uni-input mgt-20" focus placeholder="name@example.com" placeholder-class="text-plh"/>
			</view>	
			<view class="uni-form-item uni-column mgt-20">
				<view class="title">密码</view>
				<input v-model="info.pwd"
				class="uni-input mgt-20" password type="text" placeholder-class="text-plh"/>
			</view>
			<button :disabled="!logOk" @click="reqLog"
			class="mgt-50" hover-class="btn-hover">登录</button>
			<image src="https://cfunweb.oss-cn-hangzhou.aliyuncs.com/img/cfiot/logincartoon.png" 
			mode="widthFix" class="cartoon"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {
					mail: "",
					pwd: ""
				}
			}
		},
		computed: {
			logOk: function () {
				return this.info.mail&&this.info.pwd
			}
		},
		onLoad() {

		},
		methods: {
			reqLog () {
				let th = this
				this.$reqPost({
					url: `${this.$baseUrl}/login`,
					body: this.info,
					rsv (data) {
						if (!data.err) {
							th.$store.commit("changeVal", {k:"token", v:data.tkid})
							th.init()
							setTimeout(()=>{
								uni.navigateTo({
									url: "/pages/main/main",
									success(){

									}
								})
							},500)
						} else uni.showToast({title:"邮箱或密码错误",icon:"error"})
					}
				})
			},
			init () {
				this.initDevList()
			},
			initDevList () {
				this.$reqGet({
					url:`${this.$baseUrl}/dev/getDevList`,
					rsv: (data) => {
						this.$store.commit("changeVal", {k:"_devList", v:data.data})
						this.$store.commit("resetData")
					}
				})
			},
			onShareAppMessage () {
				return {
					title: "创趣物联网小程序",
					path: '/pages/index/index'
				}
			},
			onShareTimeline () {
				return {
					title: "创趣物联网小程序",
					path: '/pages/index/index'
				}
			}
		
		},
	}
</script>

<style lang="scss">
	// @import "@/static/css/v.scss";
	.content {
		height: 100vh;
		.logbox {
			position: relative;
			width: 600rpx;
			height: 750rpx;
			border: 1px solid $mainColorAA;
			border-radius: 5px;
			position: relative;
			box-sizing: border-box;
			padding: 0 50rpx;
			color: $fontC;
			>image {
				width: 170rpx;
				position: absolute;
				top: 40rpx;
				left: 50%;
				transform: translateX(-50%);
			}
			>text {
				width: 100%;
				text-align: center;
				display: block;
				margin-top: 180rpx;
				font: 45rpx $fontF;
			}
			input {
				border: 1px solid rgb(180,180,180);
				border-radius: 5px;
				padding-left: 20rpx;
				font: 40rpx/50rpx;
			}
			button {
				font: 30rpx/80rpx $fontF;
				background-color: $mainColorA;
				color: white;
			}
			.cartoon {
				position: absolute;
				width: 360rpx;
				// width: 100rpx;
				left: 20%;
				top: -28%;
			}
		}
	}
	
	.btn-hover {
		background-color: $mainColor !important;
	}
</style>
