<template>
	<view class="control">
		<view class="ctrl">
			<view class="curDev">
				<text>{{devName}}</text>
				<button type="primary" size="mini" @click="changeDev">更换设备</button>
			</view>
			<view class="sendMsg mgt-50">
			<view class="uni-form-item uni-column">
				<button size="mini" @click="sendMsg">发送</button>
				<input v-model="msgW" class="uni-input" maxlength="20" placeholder="最大输入长度为20" placeholder-class="text-plh"/>
			</view>				
			</view>
			<view class="sendData mgt-50">
				<button v-for="(v,i) in Array(4)" :key="i" 
				@click="btnChange(i)" :class="{btnActive: btnState[i]}"
				size="mini">按钮{{String.fromCharCode(65+i)}}</button>
			</view>
			<view class="sendRan mgt-50">
				<view v-for="(v,i) in Array(4)" :key="i" class="ran">
					<view class="uni-title">滑杆{{String.fromCharCode(65+i)}}</view>
					<view>
						<slider :value="ranState[i]" @change="sliderChange($event,i)" block-size="20" 
						:activeColor="styleVar.main_color" show-value />
					</view>
				</view>
			</view>			
		</view>
		<cf-tabbar :actTabIdx="1"></cf-tabbar>
		<cf-leftpop :isShowPop="isShowPop" @closePop="closePop"></cf-leftpop>
	</view>
</template>

<script>
	import throttle from "../../utils/throttle.js"
	import styleVar from "@/style/base.scss"
	
	export default {
		data() {
			return {
				styleVar,
				isShowPop: false,
				msgW: "",
			}
		},
		computed: {
			currentIdx () {return this.$store.state._curIdx},
			btnState () {return this.$store.state._btnState[this.currentIdx]},
			ranState () {return this.$store.state._ranState[this.currentIdx]},
			devName () {return this.$store.state._devList[this.currentIdx].name},
		},
		methods: {
			changeDev () {
				this.isShowPop = true
			},
			sendMsg: throttle.clickLimit(function(){
				this.$reqPost({
					url: `${this.$baseUrl}/ctrl/pubMsgW`,
					body: {
						user: this.$store.state._username,
						did: this.$store.state._devList[this.currentIdx].did,
						msgW: this.msgW
					}
				})
			}),
			btnChange: throttle.clickLimit(function(j){
				let i = this.currentIdx
				let v = parseInt(this.btnState[j]) ? 0 : 1
				this.$store.commit("changeArrVal", {k:"_btnState", v, idx:[i,j]})
				this.$reqPost({
					url: `${this.$baseUrl}/ctrl/btnVal`,
					body: {
						user: this.$store.state._username,
						did: this.$store.state._devList[this.currentIdx].did,
						btnArr: this.btnState
					}
				})
			}),
			sliderChange: throttle.clickLimit(function(ev,j){
				let i = this.currentIdx
				let v = ev.detail.value
				this.$store.commit("changeArrVal", {k:"_ranState", v, idx:[i,j]})
				this.$reqPost({
					url: `${this.$baseUrl}/ctrl/rangeVal`,
					body: {
						user: this.$store.state._username,
						did: this.$store.state._devList[this.currentIdx].did,
						ranArr: this.ranState
					}
				})
			}),
			closePop () {
				this.isShowPop = false
			},
		},
	}
</script>

<style lang="scss">
	.ctrl {
		padding: 0 50rpx;
	}
	.curDev {
		padding-top: 30rpx;
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
		.btnActive {
			background-color: $mainColor;
			color: white;
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
