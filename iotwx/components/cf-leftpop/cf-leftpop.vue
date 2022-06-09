<template>
	<view>
		<u-popup :show="isShowPop" mode="left" bgColor="rgb(250,250,250)">
			<view class="popup">
				<view class="pop-head">
					<text @click="closePop" class="iconfont icon-tuichu"></text>
				</view>
				<view class="pop-list uni-list">
					<radio-group @change="radioChange">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in devList" :key="item.value">
							<view>
								<radio :value="item.value" :checked="index == currentIdx" />
							</view>
							<view>{{item.name}}</view>
						</label>
					</radio-group>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name:"cf-leftpop",
		data() {
			return {
				devList: [
					{name:"loading ...", value:"0"},
				],
			};
		},
		props: {
			isShowPop: Boolean
		},
		computed: {
			currentIdx () {return this.$store.state._curIdx}
		},
		methods: {
			closePop () {
				this.$emit("closePop")
			},
			radioChange (ev) {
				this.$store.commit("changeVal", {k:"_curIdx", v:ev.detail.value})
			},
		},
		created () {
			let tempDevList = []
			this.$store.state._devList.forEach((v,i) => {
				tempDevList.push({name:v.name, value:i+""})
			})
			this.devList = tempDevList
			console.log(this.devList)
		}
	}
</script>

<style lang="scss">
	.popup {
		width: 500rpx;
		padding: 50rpx 0;
		box-sizing: border-box;
		.pop-head {
			padding: 0 50rpx;
			height: 80rpx;
			text {
				text-align: center;
				display: inline-block;
				font: 40rpx/70rpx $fontF;
				float: right;
				&:first-child {
					color: white;
					background-color: lightseagreen;
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;	
					margin-left: 20rpx;
				}
			}
		}
		.pop-list {
			margin-top: 30rpx;
			label {
				height: 100rpx;
				line-height: 100rpx;
				padding: 0 50rpx;
				background-color: white;
				display: block;
				box-sizing: border-box;
				&:not(:last-of-type) {
					border-bottom: 1px solid rgb(240,240,240);
				}
				view {
					display: inline-block;
					&:last-child {
						margin-left: 20rpx;
					}
				}
			}
		}
	}
</style>