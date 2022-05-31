<template>
	<view class="tabbar">
		<ul>
			<li v-for="(v,i) in tabInfo" :key="i" :class="{actTab: actTabIdx===i}"
			@click="changeTab(i)" class="flex-center" >
				<text :class="v.icon" class="iconfont"></text>
			  <text>{{v.text}}</text>
			</li>
		</ul>
	</view>
</template>

<script>
	export default {
		name:"cf-tabbar",
		data() {
			return {
				tabInfo: [
					{text:"设备信息", icon:"icon-shebei"},
					{text:"智能控制", icon:"icon-xitongkongzhi"},
					{text:"数据监控", icon:"icon-shuju"}
				],
				actTabIdx: 0,
			};
		},
		methods: {
			changeTab (i) {
				this.actTabIdx = i
			}
		}
	}
</script>

<style lang="scss">
	.tabbar {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 120rpx;
		ul {
			display: flex;
			box-shadow: 0px -1px 2px 1px rgba(200,200,200,0.1);
			li {
				flex-direction: column;
				flex: 1;
				line-height: 60rpx;
				color: $fontC;
				font-family: $fontF;
				text {
					&:first-child {
						font-size: 60rpx;
					}
					&:last-child {
						font-size: 20rpx;
					}
				}
			}
		}
	}
	.actTab {
		color: $mainColor !important;
	}
</style>