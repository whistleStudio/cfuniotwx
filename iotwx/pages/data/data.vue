<template>
	<view>
		<view class="data">
			<view class="curDev">
				<text>{{devName}}</text>
				<button type="primary" size="mini" @click="changeDev">更换设备</button>
			</view>
			<view class="subMsg mgt-50">
				<switch :color="styleVar.main_color" @change="msgSwitchChange" />
				<text>会话监听</text>
				<view class="msg-box mgt-20">{{msg}}
				</view>
			</view>
			<view v-show="i==0 || exFlag" v-for="(v, i) in Array(2)" :key="i" class="subD mgt-50">
				<view class="subData">
					<view  v-for="(cv, ci) in Array(4)" :key="ci" class="data-container">
						<switch :color="styleVar.main_color" @change="switchChange(i, ci, $event)" :checked="Boolean(dataState[4*i+ci])"/>
						<text>数据{{String.fromCharCode(4*i+65+ci)}}</text>
						<view class="data-box mgt-20">
							<text v-show="dataState[4*i+ci]">{{dataShow[4*i+ci]}}</text>
						</view>
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
				dataShow: Array(8).fill(""),
				exIcon: "扩 展",
				exFlag: false,
				// 0-Cnum1, 1-Cnum2, 2-Cmsg
				tim: Array(3)
			}
		},
		computed: {
			currentIdx () {return this.$store.state._curIdx},
			dataState () {return this.$store.state._dataState[this.currentIdx]},
			devid () {return this.$store.state._devList[this.currentIdx]._id},
			devName () {return this.$store.state._devList[this.currentIdx].name},
		},
		methods: {
			changeDev () {
				this.isShowPop = true
			},
			closePop () {
				this.isShowPop = false
			},
			/* 会话框数据请求 */
			msgSwitchChange (ev) {
				if (ev.detail.value) {
					this.tim[2] = setInterval(()=>{
						this.$reqPost({
							url: `${this.$baseUrl}/data/reqMsg`,
							body: {_id: this.devid},
							rsv: data => {
								// console.log(data.val)
								this.msg = data.val
							}
						})
					},2000)
				} else {
					clearInterval(this.tim[2])
					this.msg = ""
				}
			},
			/* 数据框状态机改变及显示 */
			switchChange (i, ci, ev) {
				//状态机
				let j = 4*i + ci
				let curI = this.$store.state._curIdx
				let v = ev.detail.value ? 1 : 0
				this.$store.commit("changeArrVal", {k:"_dataState", v, idx:[curI, j]})
				// 显示
				let arr = i? this.dataState.slice(4) : this.dataState.slice(0,4)
				if (v) {
					if (this.isTimOpen(arr)==1) {
						this.tim[i] = setInterval(()=>{
							this.reqData(4*i)
						},2000)
					}
				} else {
					if (this.isTimOpen(arr)==0) {
						clearInterval(this.tim[i])
					}
				}
			},
			/* 小组内计时器是否已开 */
			isTimOpen (arr) {
				let count = 0
				for (let v of arr) {
					if (v) count++
				}
				return count
			},
			/* 数据请求 */
			reqData (i) {
				this.$reqPost({
					url: `${this.$baseUrl}/data/reqData`,
					body: {
						_id: this.devid,
						i
					},
					rsv: data => {
						this.dataShow.splice(i,4, ...data.val)
					}
				})
			},
			/* EFGH数据显示 */
			exBtnClick () {
				this.exFlag = !this.exFlag
				this.exIcon = this.exFlag ? "收 起" : "扩 展" 
			},
			dataReload () {
				Array(2).fill(0).forEach((v,i) => {
					let arr = i? this.dataState.slice(4) : this.dataState.slice(0,4) 
					if (this.isTimOpen(arr)>0) {
						this.tim[i] = setInterval(()=>{
							this.reqData(4*i)
						},2000)
					}
				})				
			}
		},
		watch: {
			/* 当前设备改变时触发 */
			currentIdx () {
				this.exFlag = false
				this.exIcon = "扩展"
				this.tim.forEach(e => clearInterval(e))
				this.dataShow = Array(8).fill("")
				this.dataReload()
			}
		},
		onLoad () {
			this.dataReload()
		},
		onUnload () {
			this.tim.forEach(e => clearInterval(e))
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
			font: 35rpx/70rpx $fontF;
			width: 100%;
			height: 70rpx;
			border: 1px solid rgb(200,200,200);
			border-radius: 5px;
			box-sizing: border-box;
		}
	}
	.subD {
		width: 100%;
		&:last-of-type {margin-bottom: 150rpx;}
		.subData {
			width: 100%;
			height: 510rpx;
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
