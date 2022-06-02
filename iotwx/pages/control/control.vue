<template>
	<view class="control">
		<view class="ctrl">
			<view class="curDev">
				<text>当前设备:xxx</text>
				<button type="primary" size="mini" @click="changeDev">更换设备</button>
			</view>
			<view class="sendMsg mgt-50">
			<view class="uni-form-item uni-column">
				<button size="mini">发送</button>
				<input class="uni-input" maxlength="20" placeholder="最大输入长度为20" placeholder-class="text-plh"/>
			</view>				
			</view>
			<view class="sendData mgt-50">
				<button v-for="(v,i) in Array(4)" :key="i" size="mini">按钮{{String.fromCharCode(65+i)}}</button>
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
		
		<u-popup :show="isShowPopup" mode="left"  @close="close" @open="open">
		      <view>
		          <text>人生若只如初见，何事秋风悲画扇</text>
		      </view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShowPopup: false,
			}
		},
		methods: {
			changeDev () {
				this.isShowPopup = true
			}
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
</style>
