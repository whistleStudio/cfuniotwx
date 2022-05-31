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
				this.$reqPost({
					url: `${this.$baseUrl}/login`,
					body: this.info,
					rsv (res) {
						if (!res.data.err) {
							uni.navigateTo({
								url: "/pages/main/main",
								success(){console.log("s")},
								fail(){console.log("f")}
							})
						} else uni.showToast({title:"邮箱或密码错误",icon:"error"})
					},
					rej (err) {
						uni.showToast({
							title: "数据访问错误",
							icon: "error"
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	// @import "@/static/css/v.scss";
	.content {
		height: 100vh;
		.logbox {
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
				text-indent: 10rpx;
				font: 40rpx/50rpx;
			}
			button {
				font: 30rpx/80rpx $fontF;
				background-color: $mainColorA;
				color: white;
			}
		}
	}
	
	.btn-hover {
		background-color: $mainColor !important;
	}
</style>
