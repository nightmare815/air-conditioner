<template>
	<div class="container-param">
		<el-container>
			<el-aside width="50%">
				<el-row>
					<el-col :span="18" :offset="3">
						<div class="contain-1 grid-content">
							<el-card class="card-1">
								<div slot="header" class="clearfix">
									<span style="font-weight: bold;color: #606266">温度</span>
									<el-button style="float: right; padding: 3px 0; width: 80px;height: 30px" type="danger" @click="update">确认修改</el-button>
								</div>
								<div class="temperature">
									<div class="current-tem">
										<el-tag style="margin-right: 70px">当前温度:</el-tag>
<!--										<input v-model="pageParam.temperature" type="text" class="input-handle color-1" disabled="true"/>-->
<!--										<button class="modify" @click="modifyTem">修改</button>-->
										<el-input-number v-model="pageParam.temperature" @change="" :min="16" :max="30" label="描述文字"></el-input-number>
									</div>
									<div class="current-mode">
										<el-tag type="success" style="margin-right: 70px">工作模式:</el-tag>
										<el-radio-group v-model="pageParam.mode" size="medium">
											<el-radio-button label="4">送风</el-radio-button>
											<el-radio-button label="1">自动</el-radio-button>
											<el-radio-button label="3">除湿</el-radio-button>
											<el-radio-button label="2">制冷</el-radio-button>
											<el-radio-button label="5">制热</el-radio-button>
										</el-radio-group>
									</div>
									<div class="show-temp">
										<el-tag type="warning" style="margin-right: 70px">显示温度:</el-tag>
										<el-select v-model="pageParam.showtemp" placeholder="请选择">
											<el-option
												v-for="item in temOptions"
												:key="item.value"
												:label="item.label"
												:value="item.value">
											</el-option>
										</el-select>
									</div>
								</div>
							</el-card>
						</div>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="18" :offset="3">
						<div class="contain-2 grid-content">
							<el-card class="card-2">
								<div slot="header" class="clearfix">
									<span style="font-weight: bold;color: #606266">扫风</span>
									<el-button style="float: right; padding: 3px 0; width: 80px;height: 30px" type="danger" @click="update">确认修改</el-button>
								</div>
								<div class="speed">
									<div class="current-speed">
										<el-tag type="success" style="margin-right: 70px;width: 75px;text-align: center;font-size: 14px">风速:</el-tag>
										<el-radio-group v-model="pageParam.wind" size="medium">
											<el-radio-button label="0">低速</el-radio-button>
											<el-radio-button label="1">中速</el-radio-button>
											<el-radio-button label="2">高速</el-radio-button>
											<el-radio-button label="3">自动</el-radio-button>
										</el-radio-group>
									</div>
									<div class="wind-mode">
										<el-tag type="info" style="margin-right: 70px">扫风模式:</el-tag>
										<el-select v-model="pageParam.weep" placeholder="请选择">
											<el-option
												v-for="item in weepOptions"
												:key="item.value"
												:label="item.label"
												:value="item.value">
											</el-option>
										</el-select>
									</div>

								</div>
							</el-card>
						</div>
					</el-col>
				</el-row>
			</el-aside>
			<el-main>
				<el-row>
					<el-col :span="18" :offset="1">
						<div class="contain-3 grid-content">
							<el-card class="card-3">
								<div slot="header" class="clearfix">
									<span style="font-weight: bold;color: #606266">系统设置</span>
									<el-button style="float: right; padding: 3px 0; width: 80px;height: 30px" type="danger" @click="update">确认修改</el-button>
								</div>
								<div class="setting">
									<div class="source">
										<el-tag type="danger" style="margin-right: 70px;width: 75px;text-align: center;font-size: 14px">电源:</el-tag>
										<el-switch
											class="show-button"
											v-model="pageParam.source"
											active-text="开启"
											inactive-text="关闭">
										</el-switch>
									</div>
									<div class="power-wind">
										<el-tag type="success" style="margin-right: 70px;width: 75px;text-align: center;font-size: 14px">超强风:</el-tag>
										<el-switch
											class="show-button"
											v-model="pageParam.power"
											active-text="开启"
											inactive-text="关闭">
										</el-switch>
									</div>
									<div class="light">
										<el-tag style="margin-right: 70px;width: 75px;text-align: center;font-size: 14px">灯光:</el-tag>
										<el-switch
											class="show-button"
											v-model="pageParam.light"
											active-text="开启"
											inactive-text="关闭">
										</el-switch>
									</div>
									<div class="save">
										<el-tag type="info" style="margin-right: 70px;width: 75px;text-align: center;font-size: 14px">节能:</el-tag>
										<el-switch
											class="show-button"
											v-model="pageParam.save"
											active-text="开启"
											inactive-text="关闭">
										</el-switch>
									</div>
									<div class="dry">
										<el-tag type="warning" style="margin-right: 70px;width: 75px;text-align: center;font-size: 14px">干燥:</el-tag>
										<el-switch
											class="show-button"
											v-model="pageParam.dry"
											active-text="开启"
											inactive-text="关闭">
										</el-switch>
									</div>
									<div class="sleep">
										<el-tag style="margin-right: 70px;width: 75px;text-align: center;font-size: 14px">睡眠:</el-tag>
										<el-switch
											class="show-button"
											v-model="pageParam.sleep"
											active-text="开启"
											inactive-text="关闭">
										</el-switch>
									</div>
									<div class="health">
										<el-tag type="info" style="margin-right: 70px">健康换气:</el-tag>
										<el-select v-model="pageParam.health" placeholder="请选择">
											<el-option
												v-for="item in healthOptions"
												:key="item.value"
												:label="item.label"
												:value="item.value">
											</el-option>
										</el-select>
									</div>
								</div>
							</el-card>
						</div>
					</el-col>
				</el-row>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	export default {
		props: {
			username: String
		},
		data() {
			return {
				pageParam: {
					"temperature": '',	//温度
					"mode": '1',	//工作模式
					"source": false,	//电源开关
					"wind": '3',	//风速
					"weep": '3',		//扫风模式
					"sleep": false,		//睡眠
					"power": false,		//超强风
					"light": false,		//灯光
					"health": '1',	//健康换气
					"dry": false,			//干燥
					"showtemp": '0',	//是否显示温度
					"save": true,			//节能
				},
				workOptions: [{			//工作模式选项
					value: '4',
					label: '送风'
				}, {
					value: '1',
					label: '自动'
				}, {
					value: '3',
					label: '除湿'
				}, {
					value: '2',
					label: '制冷'
				}, {
					value: '5',
					label: '制热'
				}],
				weepOptions: [{			//扫风模式选项
					value: '0',
					label: '上下扫风'
				}, {
					value: '1',
					label: '左右扫风'
				}, {
					value: '2',
					label: '上下左右扫风'
				}, {
					value: '3',
					label: '无扫风'
				}],
				healthOptions: [{			//健康换气模式选项
					value: '0',
					label: '健康'
				}, {
					value: '1',
					label: '换气'
				}, {
					value: '2',
					label: '健康、换气'
				}, {
					value: '3',
					label: '无'
				}],
				temOptions: [{			//显示温度选项
					value: '0',
					label: '不显示'
				}, {
					value: '1',
					label: '显示'
				}, {
					value: '2',
					label: '显示室内温度'
				}, {
					value: '3',
					label: '显示室外温度'
				}],
				subscribe_topic: ["/gree/product01/test001/updata"],    //订阅主题
				publish_topic: ["/gree/product01/test001/set"],         //发布主题
				sync_topic: ['/gree/product01/test001/set'],            //同步主题
				sync_message: '{"synchronize":"true"}',                 //同步时发送的消息
				userid: "",       //消息源设备唯一id?
				isShow: false,        //是否显示警告框, 默认不显示
				tip: '',
				description: '',
			};
		},
		// created() {
		// 	//随机生成长度为5的字符串, 模拟用户id, 创建客户端实例
		// 	this.userid = this.random(8)
		// 	console.log(this.userid)
		// 	let that = this;
		//
		// 	//创建客户端，并订阅主题
		// 	//callback回调函数, 收到订阅消息后执行
		// 	this.$mqtt.launch(this.userid, this.subscribe_topic, (topic, message) => {
		// 		let msg = message.toString();
		// 		//将收到的json字符串转换为json对象
		// 		let jsonObj = JSON.parse(msg);
		// 		// console.log(jsonObj, typeof jsonObj);
		// 		// 拼串显示
		// 		that.pageParam = that.formatPageParam(jsonObj)
		// 		console.log(that.pageParam)
		// 		// that.pageParam.temperature = jsonObj.temperature + "℃";
		//
		// 		//依然温度预警
		// 		that.temWarning()
		// 	});
		// },

		created() {
			let that = this
			new Promise((resolve, reject) => {
				this.$rabbitmq.initConnect(1111, this.subscribe_topic, (topic, message) => {
					let msg = message.toString();
					//将收到的json字符串转换为json对象
					let jsonObj = JSON.parse(msg);
					// console.log(jsonObj, typeof jsonObj);
					// 拼串显示
					that.pageParam = that.formatPageParam(jsonObj)
					console.log(that.pageParam)
					// that.pageParam.temperature = jsonObj.temperature + "℃";

					//依然温度预警
					that.temWarning()
				});
			}).then(res => {
				this.synchronized()
			})

		},
		mounted() {
			//在组件创建后就先主动发送一次同步请求
		},
		methods: {
			modifyTem() {
				let that = this;
				this.$prompt("请输入要修改的温度", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					inputPattern: /1[6-9]|2[0-9]|3[0]/,
					inputErrorMessage: "输入范围有误!可输入温度范围为16-30之间的整数"
				})
					.then(({value}) => {
						this.$message({
							type: "success",
							message: "修改成功!,当前温度是: " + value + "℃",
							center: true
						});
						//修改温度
						let temperature = parseInt(value);
						this.pageParam.temperature = temperature + "℃";

						// //若修改后温度过高或者过低, 则给出警告
						// this.temWarning()
						//
						// //修改温度后,向服务器发送修改的消息
						// let pushMsg = '{"temperature":"' + value + '"}';
						// //必须转换成json对象发送, 否则会有转移符
						// pushMsg = eval('(' + pushMsg + ')');
						// that.$mqtt.publish(that.publish_topic[0], pushMsg);
					})
					.catch((err) => {
						console.log(err)
						this.$message({
							type: "info",
							message: "取消输入",
							center: true
						});
					});
			},
			update() {
				this.$confirm('此操作将修改空调正在运行的参数, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let pageParam = this.enFormatPageParam(this.pageParam)
					console.log("已发送: ", pageParam)
					this.$rabbitmq.publish(this.publish_topic[0], pageParam)
					console.log(this.pageParam)
					this.$message({
						type: 'success',
						message: '修改成功!'
					});
				}).catch((err) => {
					console.log(err)
					this.$message({
						type: 'info',
						message: '已取消修改'
					});
				});
			},
			//获取当前温度
			getCurrentTem() {
				let temperature = Number.parseInt(this.pageParam.temperature);
				// console.log('当前温度:',temperature)
				return temperature
			},

			//温度预警函数
			temWarning() {
				let temperature = this.getCurrentTem()
				if (temperature > 35) {
					this.tip = '高温预警: 当前温度过高！！！'
					this.isShow = true;
				} else if (temperature < 8) {
					this.tip = '低温预警: 当前温度过低！！！'
					this.isShow = true;
				} else {
					this.isShow = false
				}
			},

			//立即同步
			synchronized() {
				console.log('同步一次')
				let sync_message = eval('(' + this.sync_message + ')');
				this.$rabbitmq.publish(this.sync_topic[0], sync_message);
			},

			btnSynchronized() {
				console.log('同步成功')
				let sync_message = eval('(' + this.sync_message + ')');
				this.$rabbitmq.publish(this.sync_topic[0], sync_message);
				this.$message({
					type: "success",
					message: "同步成功",
					center: true,
					customClass: 'sync-tip' //必须是全局样式
				})
			},
			random(length) {
				var str = Math.random().toString(36).substr(2);
				if (str.length >= length) {
					return str.substr(0, length);
				}
				str += random(length - str.length);
				return str;
			},
			formatPageParam(obj) {		//将对象中的 0 || 1 转为false或者true
				// const boolKey = "source|sleep|power|light|dry|save"
				const boolKey = ['source', 'sleep', 'power', 'light', 'dry', 'save']
				for (let i in obj) {
					// if (boolKey.indexOf(i) != -1) {
					if (boolKey.includes(i)) {
						obj[i] = obj[i] == 0 ? false : true;
					}
				}
				return obj
			},
			enFormatPageParam(states) {		//将对象中的 false或者true转为0或1
				//由于obj和data中的pageParam引用的相同地址, 为了避免改变原数据, 需要把数据来回转化一下
				const obj = JSON.parse(JSON.stringify(states))
				const boolKey = ['source', 'sleep', 'power', 'light', 'dry', 'save']
				for (let i in obj) {
					if (boolKey.includes(i)) {
						obj[i] = obj[i] == false ? '0' : '1';
					}
				}
				//由于温度的计数器是number类型, 这里转换为string发出
				obj['temperature'] = obj['temperature'].toString()

				return obj
			},
		}
	};
</script>

<style scoped>
	.param-content {
		display: flex;
		flex-direction: column;
		margin-top: calc(100px - 35px);
		padding-left: 30vw;
	}
	.temperature{
		display: flex;
		flex-direction: column;
		padding-left: 3vw;
		height: 200px;
		justify-content: space-evenly;
	}
	 .speed, .setting {
		/*text-align: center;*/
		display: flex;
		flex-direction: column;
		padding-left: 3vw;
		height: 150px;
		justify-content: space-evenly;
	}

	.setting {
		height: 511px;
		padding-left: 120px;
	}

	.grid-content {
		min-height: 200px;
	}

	.el-row {
		margin-top: 50px;
		margin-bottom: 50px;
	}

	.el-main {
		padding: 0;
	}

	.humidity {
		/*margin-top: 0px;*/
		/*text-align: center;*/
	}

	.workstate {
		margin-top: 50px;
		/*text-align: center;*/
	}

	.input-handle {
		width: 100px;
		height: 24px;
		border-radius: 12px;
		text-align: center;
	}

	.color-1 {
		border: 1px solid #53a8ff;
	}

	.color-2 {
		border: 1px solid #67c23a;
	}

	.color-3 {
		border: 1px solid #e6a23c;
	}

	.color-4 {
		border: 1px solid #909399;
	}

	input {
		background: none;
		outline: none;
		padding: 0 15px;
	}

	input:focus {
		border: none;
	}

	.modify {
		width: 80px;
		height: 24px;
		margin-left: 30px;
		background-color: #f56c6c;
		border: none;
		border-radius: 12px;
		color: white;
		outline: none;
		cursor: pointer;
	}

	.modify:hover {
		background-color: #f78989;
	}

	.modify:active {
		background-color: #C6593C;
	}

	/*.sync:hover {*/
	/*  background-color: #E6A23C;*/
	/*}*/

	/*.sync:active {*/
	/*  background-color: #bae426;*/
	/*}*/

	.no-button {
		padding-right: 110px
	}

	.alert {
		height: 35px;
		justify-content: center;
		font-weight: bold;
	}

	.sync {
		width: 90px;
		height: 30px;
		margin-left: 60px;
		/*background: linear-gradient(90deg,#0162c8,#55e7fc);*/
		background-color: #2F86DA;
		border: none;
		border-radius: 20px;
		color: white;
		outline: none;
		overflow: hidden;
		cursor: pointer;
	}

	.sync:active {
		opacity: 0.8;
	}

	.contain-1 {
	}

	.contain-2 {
		/*display: inline-block;*/
		/*margin-left: 100px;*/
		/*width: 500px;*/
	}

	.show-button {
	}
	.el-card {
		border-radius: 20px;
	}
	.card-1{
	}
	.card-2{
	}

</style>
<style>
	.sync-tip {
		min-width: 150px;
		width: 200px;
	}

	/*.el-message {*/
	/*  min-width: 60px;*/
	/*  width: 80px;*/
	/*}*/
	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}


</style>
