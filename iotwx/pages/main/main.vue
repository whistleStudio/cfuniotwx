<template>
	<view>
		<view class="profile flex-center">
			<view ></view>
			<text>{{userInfo.nm}}</text>
		</view>
		<view class="info">
			<ul class="flex-center">
				<li v-for="(v, i) in devInfo" :key="i" @click="testClick">
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
	</view>
</template>

<script>
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
					nm: "loading"
				}
			}
		},
		methods: {
			testClick () {
				this.devInfo[0].count = 1
			},
			// getUserInfoRsv (data) {
			// 	console.log(data)
			// 	this.userInfo.name = data.name
			// 	this.userInfo.avatar = data.avatar
			// }
		},
		onLoad () {
			this.$reqGet({
				url:`${this.$baseUrl}/user/getUserInfo`,
				rsv: (data) => {
					console.log(this,data)
					this.userInfo.nm = data.name
					console.log(this.userInfo.nm)
					this.userInfo.avatar = data.avatar					
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
