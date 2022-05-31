### [05301734]
登录页样式搭建, 
全局scss放app.vue的style里没用, scss要全局使用的话，每个文件都需要导入，所以还是要放在uni.scss里
### [05311732]
- 封装post请求
  小程序不支持fetch,只能用uniapp的原生uni-request
- 封装baseUrl
  开发环境h5存在跨域问题,需要在manifest.json中设置devServer proxy; 小程序直接用完整路径既可以了，所以针对两种情况要分类讨论
- iconfont.css文件里关联文件引用需要绝对路径	
- page.json使用easycom，省去注册，声明
- main页面tabbar样式搭建
	