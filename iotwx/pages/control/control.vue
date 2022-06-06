<template>
	<view class="control">
		<view class="ctrl">
			<view class="curDev">
				<text>{{devList[currentIdx].name}}</text>
				<button type="primary" size="mini" @click="changeDev">更换设备</button>
			</view>
			<view class="sendMsg mgt-50">
			<view class="uni-form-item uni-column">
				<button size="mini">发送</button>
				<input class="uni-input" maxlength="20" placeholder="最大输入长度为20" placeholder-class="text-plh"/>
			</view>				
			</view>
			<view class="sendData mgt-50">
				<button v-for="(v,i) in Array(4)" :key="i" 
				@click="btnChange(i)"
				size="mini">按钮{{String.fromCharCode(65+i)}}</button>
			</view>
			<view class="sendRan mgt-50">
				<view v-for="(v,i) in Array(4)" :key="i" class="ran">
					<view class="uni-title">滑杆{{String.fromCharCode(65+i)}}</view>
					<view>
						<slider value="50" @change="sliderChange" block-size="20" 
						activeColor="#00A1E9" show-value />
					</view>
				</view>
			</view>			
		</view>
		<cf-tabbar :actTabIdx="1"></cf-tabbar>
		
		<u-popup :show="isShowPopup" mode="left" bgColor="rgb(250,250,250)" @close="close" @open="open">
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
	import throttle from "../../utils/throttle.js"
	
	export default {
		data() {
			return {
				isShowPopup: false,
				devList: [
					{name:"loading ...", value:"0"},
			  ],
			}
		},
		computed: {
			currentIdx () {return this.$store.state._curIdx},
			btnState () {return this.$store.state._btnState[this.currentIdx]},
			ranState () {return this.$store.state._ranState[this.currentIdx]},
		},
		methods: {
			changeDev () {
				this.isShowPopup = true
			},
			btnChange: throttle.clickLimit(function(j){
				// let i = this.currentIdx
				// let v = parseInt(this.btnState[i][j]) ? 0 : 1
				// this.$store.commit("changeArrVal", {k:"_btnState", v, idx:[i,j]})
			}),
			sliderChange () {
				
			},
			closePop () {
				this.isShowPopup = false
			},
			radioChange (ev) {
				this.currentIdx = ev.detail.value
				this.$store.commit("changeVal", {k:"_curIdx", v:this.currentIdx})
			}
		},
		// watch: {
		// 	currentIdx (newVal) {
		// 		this.btnState = this._btnState[newVal]
		// 		this.ranState = this._ranState[newVal]
		// 	}
		// },
		onLoad () {
			let tempDevList = []
			this.$store.state._devList.forEach((v,i) => {
				tempDevList.push({name:v.name, value:i+""})
			})
			this.devList = tempDevList
		}
	}
</script>

<style lang="scss">
	.ctrl {
		padding: 0 50rpx;
	}
	.curDev {
		margin-top: 30rpx;
		width: 100%;
		height: 100rpx;
		border-bottom: 1px solid rgb(230,230,230);
		display: flex;
		align-items: center;
		position: relative;
		text {
			color: $fontC;
			font-weight: bold;
			font-family: $fontF;
		}
		button {
			right: 0;
			position: absolute;
			// width: 200rpx;
			float:right;
		}
	}
	.sendMsg {
		position: relative;
		display: flex;
		input {
			width:  510rpx;
			height: 60rpx;
			padding-left: 20rpx;
			box-sizing: border-box;
			border: 1px solid gainsboro;
			border-radius: 5px;
		}
		button {
			width: 150rpx;
			height: 60rpx;
			position: absolute;
			z-index: 2;
			right: 0;
		}
	}
	.sendData {
		width: 100%;
		height: 250rpx;
		// background-color: orange;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-content: space-between;
		button {
			width: 300rpx;
			height: 100rpx;
			margin: 0;
			line-height: 100rpx;
			
		}
	}
	.sendRan {
		width: 100%;
		.ran {
				width: 100%;
			>view:first-child {
				font-size: 25rpx;
			}
			slider {
				width: 600rpx;
			}
		}
	}
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
				// &:last-child {
				// 	color: lightseagreen;
				// }
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
