### [05301734]
- 登录页样式搭建
  全局scss放app.vue的style里没用, scss要全局使用的话，每个文件都需要导入，所以还是要放在uni.scss里
### [05311732]
- 封装post请求
  小程序不支持fetch,只能用uniapp的原生uni-request
- 封装baseUrl
  开发环境h5存在跨域问题,需要在manifest.json中设置devServer proxy; 小程序直接用完整路径既可以了，所以针对两种情况要分类讨论
- iconfont.css文件里关联文件引用需要绝对路径	
- page.json使用easycom，省去注册，声明
- main页面tabbar样式搭建
### [06011725]
- 注意回调里的this
- 关于登录后的token
  小程序里没有cookie,sessionStorage,后端给cookie没用
  变通方法: 后端把生成的token作为正常数据返回，
	小程序里把它存在vuex状态机里，需要令牌的请求在请求头headers里加相应字段，后端再增加对应字段的判断;
	另外,w3c设定了headers里的保留字段，像cookie就不能用，可以用authorization，当然避开保留就可以了
### [06021725]
- 昨天的问题续
  微信小程序原生sessionStorage不行，应该用uni.setStorage相关就可以了
- 封装了节流工具模块throttle
  再次复习下闭包
	```
	function foo () {
		;(()=>{ return 1})()
	}
	```
	并不是foo() `return 1`;
	export default xx, 貌似不能用解构的形式去import
- 设备信息页面基本OK, 智能控制页面搭好了样式
- 引入uview ui, 对照github指南操作
### [06061738]	
- 左侧弹出组件
- 状态机增加		_curIdx: 0,
		_devList: [],
		_btnState: [],
		_ranState: []
### [06071745]
- control页面完成
- scss 样式变量导入js文件方法
```
<!-- a.scss文件里 -->
$mainColor: red
:export {
  main_color: $mainColor;
}
<!-- js 文件 -->
import xxx from a.scss

let a = xxx.main_color
```
- cf-leftpop组件抽离
- data页面样式基本完成
- store状态机新增_username, _curIdx, _dataState
### [06081522]
- data页面网络请求接口完成
创建计时器数组tim 0- Cnum1，1-Cnum2, 2-Cmsg
onload、切换设备时重置；
unload、数据组均关闭时清空；
数据组第一个打开时，打开
- main页面增加退出登录模态框
- 密钥点击自动复制到剪切板
[问题？]微信小程序不支持在DOM里直接写$store
### [06081735]
- 修改了baseUrl, 已同步微信小程序里的白名单
- 将static里的scss ttf css 文件移至根目录下style文件夹，因为小程序static有后缀名白名单
- 图片资源大小不合格，需要改CDN