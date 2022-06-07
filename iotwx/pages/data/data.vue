<template>
	<view>
		<view class="data">
			<view class="curDev">
				<text>{{$store.state._devList[currentIdx].name}}</text>
				<button type="primary" size="mini" @click="changeDev">更换设备</button>
			</view>
			<view class="subMsg mgt-50">
				<switch :color="styleVar.main_color" @change="" />
				<text>会话监听</text>
				<view class="msg-box mgt-20">
				</view>
			</view>
			<view v-show="i==0 || exFlag" v-for="(v, i) in Array(2)" :key="i" class="subD mgt-50">
				<view class="subData">
					<view  v-for="(cv, ci) in Array(4)" :key="ci" class="data-container">
						<switch :color="styleVar.main_color" @change="switchChange(i, ci, $event)" :checked="Boolean(dataState[4*i+ci])"/>
						<text>数据{{String.fromCharCode(4*i+65+ci)}}</text>
						<view class="data-box mgt-20"></view>
					</view>
				</view>
				<button v-if="i==0" @click="exBtnClick" class="expand mgt-50">{{exIcon}}</button>
			</view>
		</view>
		<cf-tabbar :actTabIdx="2"></cf-tabbar>
		<cf-leftpop :isShowPop="isShowPop" @closePop="closePop"></cf-leftpop>
	</view>
</template>

<script>
	import styleVar from "@/static/css/base.scss"
	export default {
		data() {
			return {
				styleVar,
				isShowPop: false,
				msg: "",
				exIcon: "扩 展",
				exFlag: false,
			}
		},
		computed: {
			currentIdx () {return this.$store.state._curIdx},
			dataState () {return this.$store.state._dataState[this.currentIdx]}
		},
		methods: {
			changeDev () {
				this.isShowPop = true
			},
			closePop () {
				this.isShowPop = false
			},
			switchChange (i, ci, ev) {
				let j = 4*i + ci
				let curI = this.$store.state._curIdx
				let v = ev.detail.value ? 1 : 0
				this.$store.commit("changeArrVal", {k:"_dataState", v, idx:[curI, j]})
			},
			exBtnClick () {
				this.exFlag = !this.exFlag
				this.exIcon = this.exFlag ? "收 起" : "扩 展" 
			}
		},
		watch: {
			currentIdx () {
				this.exFlag = false
				this.exIcon = "扩展"
			}
		}
	}
</script>

<style lang="scss">
	.data {
		padding: 0 50rpx;
		font-family: $fontF;
		color: $fontC;
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
	.subMsg {
		width: 100%;
		height: 200rpx;
		padding: 20rpx;
		box-shadow: 1px 1px 1px 1px gainsboro;
		border-radius: 5rpx;
		box-sizing: border-box;
		switch {
			margin-right: 20rpx;
		}
		.msg-box {
			padding-left: 15rpx;
			font: 45rpx/70rpx $fontF;
			width: 100%;
			height: 70rpx;
			border: 1px solid rgb(200,200,200);
			border-radius: 5px;
			box-sizing: border-box;
		}
	}
	.subD {
		width: 100%;
		.subData {
			width: 100%;
			height: 530rpx;
			padding: 20rpx;
			box-shadow: 1px 1px 1px 1px gainsboro;
			border-radius: 5rpx;
			box-sizing: border-box;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			align-content: space-between;
			.data-container {
				width: 47%;
				height: 220rpx;
				flex: none;
				// background-color: olive;
				switch {
					margin-right: 20rpx;
				}
				.data-box {
					width: 100%;
					height: 120rpx;
		      border: 1px solid rgb(200,200,200);
				  border-radius: 5px;
					box-sizing: border-box;
					text-align: center;
					font: 50rpx/120rpx $fontF;
				}
			}
		}
		.expand {
			color: white;
			width: 100%;
			height: 60rpx;
			font: 35rpx/60rpx	$fontF;
			background-color: $mainColorA;
		}
	}
</style>
