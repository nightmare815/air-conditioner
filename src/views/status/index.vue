<template>
  <div class="app-container">
    <el-container class="container-1">
      <el-header height="154px">
        <el-row>
          <el-col>
            <div class="airport">
              <ul>
                <span class="title">机场: </span>
                <li>全部</li>
                <li v-for="(airport, index) in deviceData" @click="getAllGallery(index)"
                    :class="{active: index == airportIndex}">{{airport.airport}}
                </li>
              </ul>
              <ul>
                <span class="title">廊道: </span>
                <li>全部</li>
                <li v-for="(gallery, index) in galleries" @click="getAllConditions(index)"
                    :class="{active: index == galleryIndex}">{{gallery.gallery}}
                </li>
              </ul>
              <ul>
                <span class="title">空调: </span>
                <li>全部</li>
                <li v-for="(condition, index) in conditions" @click="getConditionInfo(index)"
                    :class="{active: index == conditionIndex}">{{condition.condition}}
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container class="container-2">
        <el-aside width="15vw" style="height: 680px;background-color: #FFF;margin-top: 5px">
          <el-card class="box-card-aside" style="background-color: rgba(217,236,255,0.3);">
            <div slot="header" class="clearfix" style="height: 15px">
              <span style="font-weight: bold;color: #606266;line-height: 28px">全部设置</span>
              <el-button style="float: right; padding: 3px 0;width: 80px;height: 28px" type="danger">确认修改</el-button>
            </div>
            <div class="text item" style="display: flex">
              <div class="tag">温度:</div>
              <el-input-number size="mini" v-model="setting.temperature" @change="" :min="16" :max="30" label="描述文字"></el-input-number>
            </div>
            <div class="text item">
              <div class="tag">湿度:</div>
              <el-input-number size="mini" v-model="setting.humi" @change="" :min="16" :max="30" label="描述文字"></el-input-number>
            </div>
            <div class="text item">
              <div class="tag">工作模式:</div>
              <el-select size="mini" v-model="setting.mode">
                <el-option
                  v-for="item in modeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="text item">
              <div class="tag">温度显示:</div>
              <el-select size="mini" v-model="setting.showtemp">
                <el-option
                  v-for="item in temOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="text item">
              <div class="tag">风速:</div>
              <el-select size="mini" v-model="setting.wind">
                <el-option
                  v-for="item in windOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="text item">
              <div class="tag">扫风模式:</div>
              <el-select size="mini" v-model="setting.weep">
                <el-option
                  v-for="item in weepOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="text item">
              <div class="tag">健康换气:</div>
              <el-select size="mini" v-model="setting.health">
                <el-option
                  v-for="item in healthOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="text item">
              <div class="tag">超强风:</div>
              <el-switch
                v-model="setting.power"
                class="show-button"
                active-text="开启"
                inactive-text="关闭">
              </el-switch>
            </div>
            <div class="text item">
              <div class="tag">灯光:</div>
              <el-switch
                v-model="setting.light"
                class="show-button"
                active-text="开启"
                inactive-text="关闭">
              </el-switch>
            </div>
            <div class="text item">
              <div class="tag">节能:</div>
              <el-switch
                v-model="setting.save"
                class="show-button"
                active-text="开启"
                inactive-text="关闭">
              </el-switch>
            </div>
            <div class="text item">
              <div class="tag">干燥:</div>
              <el-switch
                v-model="setting.dry"
                class="show-button"
                active-text="开启"
                inactive-text="关闭">
              </el-switch>
            </div>
            <div class="text item">
              <div class="tag">睡眠:</div>
              <el-switch
                v-model="setting.sleep"
                class="show-button"
                active-text="开启"
                inactive-text="关闭">
              </el-switch>
            </div>
            <div class="text item">
              <div class="tag">电源:</div>
              <el-switch
                v-model="setting.source"
                class="show-button"
                active-text="开启"
                inactive-text="关闭">
              </el-switch>
            </div>
          </el-card>
        </el-aside>
        <el-main>
          <el-row>
            <el-col>
              <div class="conditions" v-if="conditionObj.status == null">
                <el-card shadow="hover" class="box-card" v-for="(condition, index) in conditions" :key="condition.id">
                  <div slot="header" class="clearfix">
                    <span style="font-weight: bold;color: #606266">{{condition.condition}}</span>
                    <el-button style="float: right; padding: 3px 0" type="text">查看详情</el-button>
                  </div>
                  <div class="text item">
                    温度: {{condition.status.temperature}}
                  </div>
                  <div class="text item">
                    模式: {{condition.status.mode}}
                  </div>
                </el-card>
              </div>
              <div class="conditions" v-if="conditionObj.status != null">
                <show-detail v-if="loadSuccess" :status="conditionObj.status" :disable="true" :text-color="textColor"></show-detail>
              </div>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import showDetail from "@/views/param/showDetail";
import getters from "@/store/getters";
import {mapGetters} from "vuex";

  export default {
    name: "index",
    components: {
      showDetail
    },
    created() {
      this.loadSuccess = true;
    },
    data() {
      return {
        textColor: '#E6A23C',
        loadSuccess: false,
        status: {
          "deviceID": '',   //消息发往那个设备
          "temperature": '18',	//温度
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
          "temp": '',		//当前室温
          "humi": '',   //当前湿度
        },
        deviceData:
          [
            {
              id: '1',
              airport: '1号机场',
              children: [
                {
                  id: '1-1',
                  gallery: '1号廊道',
                  children: [
                    {
                      id: '1-1-1',
                      condition: '1号空调',
                      status: {
                        "temperature": '18',	//温度
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
                        "temp": '',		//当前室温
                        "humi": '',   //当前湿度
                      }
                    },
                    {
                      id: '1-1-2',
                      condition: '2号空调',
                      status: {
                        "temperature": '',	//温度
                        "mode": '1',	//工作模式
                        "source": true,	//电源开关
                        "wind": '3',	//风速
                        "weep": '3',		//扫风模式
                        "sleep": true,		//睡眠
                        "power": true,		//超强风
                        "light": true,		//灯光
                        "health": '1',	//健康换气
                        "dry": true,			//干燥
                        "showtemp": '0',	//是否显示温度
                        "save": true,			//节能
                        "temp": '',		//当前室温
                        "humi": '',   //当前湿度
                      }
                    },
                  ]
                },
                {
                  id: '1-2',
                  gallery: '2号廊道',
                  children: [
                    {
                      id: '1-2-1',
                      condition: '3号空调',
                      status: {
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
                        "temp": '',		//当前室温
                        "humi": '',   //当前湿度
                      }
                    },
                    {
                      id: '1-2-2',
                      condition: '4号空调',
                      status: {
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
                        "temp": '',		//当前室温
                        "humi": '',   //当前湿度
                      }
                    },
                    {
                      id: '1-2-3',
                      condition: '4号空调',
                      status: {
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
                        "temp": '',		//当前室温
                        "humi": '',   //当前湿度
                      }
                    },
                    {
                      id: '1-2-4',
                      condition: '4号空调',
                      status: {
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
                        "temp": '',		//当前室温
                        "humi": '',   //当前湿度
                      }
                    },
                    {
                      id: '1-2-5',
                      condition: '5号空调',
                      status: {
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
                        "temp": '',		//当前室温
                        "humi": '',   //当前湿度
                      }
                    },
                    {
                      id: '1-2-6',
                      condition: '6号空调',
                      status: {
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
                        "temp": '',		//当前室温
                        "humi": '',   //当前湿度
                      }
                    },
                  ]
                },
              ]
            },
            {
              id: '2',
              airport: '2号机场',
              children: [
                {
                  id: '2-1',
                  gallery: '3号廊道',
                  children: [
                    {
                      id: '2-1-1',
                      condition: '5号空调',
                      status: {
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
                        "temp": '',		//当前室温
                        "humi": '',   //当前湿度
                      }
                    },
                    {
                      id: '2-1-2',
                      condition: '6号空调',
                      status: {
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
                        "temp": '',		//当前室温
                        "humi": '',   //当前湿度
                      }
                    },
                  ]
                },
                {
                  id: '2-2',
                  gallery: '4号廊道',
                  children: [
                    {
                      id: '2-2-1',
                      condition: '7号空调',
                      status: {
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
                        "temp": '',		//当前室温
                        "humi": '',   //当前湿度
                      }
                    },
                    {
                      id: '2-2-2',
                      condition: '8号空调',
                      status: {
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
                        "temp": '',		//当前室温
                        "humi": '',   //当前湿度
                      }
                    },
                  ]
                },
              ]
            },
            {
              id: '3',
              airport: '3号机场',
              children: [
                {
                  id: '3-1',
                  gallery: '5号廊道',
                  children: [
                    {
                      id: '3-1-1',
                      condition: '9号空调',
                      status: {
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
                        "temp": '',		//当前室温
                        "humi": '',   //当前湿度
                      }
                    },
                    {
                      id: '3-1-2',
                      condition: '10号空调',
                      status: {
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
                        "temp": '',		//当前室温
                        "humi": '',   //当前湿度
                      }
                    },
                  ]
                },
                {
                  id: '3-2',
                  gallery: '6号廊道',
                  children: [
                    {
                      id: '3-2-1',
                      condition: '11号空调',
                      status: {
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
                        "temp": '',		//当前室温
                        "humi": '',   //当前湿度
                      }
                    },
                    {
                      id: '3-2-2',
                      condition: '12号空调',
                      status: {
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
                        "temp": '',		//当前室温
                        "humi": '',   //当前湿度
                      }
                      // status: {
                      //   "dry": "0",
                      //   "health": "1",
                      //   "light": "0",
                      //   "mode": "1",
                      //   "power": "0",
                      //   "save": "1",
                      //   "showtemp": "0",
                      //   "sleep": "0",
                      //   "source": "0",
                      //   "temperature": "16",
                      //   "weep": "3",
                      //   "wind": "3"
                      // }
                    },
                  ]
                },
              ]
            },
          ],
        modeOptions: [{			//工作模式选项
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
        windOptions: [{			//工作模式选项
          value: '0',
          label: '低速'
        }, {
          value: '1',
          label: '中速'
        }, {
          value: '2',
          label: '高速'
        }, {
          value: '3',
          label: '自动'
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
        setting: {},
        galleries: [],
        conditions: [],
        airportIndex: -1,
        galleryIndex: -1,
        conditionIndex: -1,
        conditionObj: {},
      }
    },
    methods: {
      getAllGallery(index) {
        this.galleries = this.deviceData[index].children
        this.airportIndex = index
        this.galleryIndex = -1
        this.conditionIndex = -1
        this.conditions = []
        this.conditionObj = {}
      },
      getAllConditions(index) {
        this.conditions = this.galleries[index].children
        this.galleryIndex = index
        this.conditionIndex = -1
        this.conditionObj = {}
      },
      getConditionInfo(index) {
        this.conditionObj = this.conditions[index]
        this.conditionIndex = index;
      },
    }
  }
</script>

<style scoped>
.airport{
  padding: 0 15vw;
  background-color: #FFFFFF;
}
ul {
  border: 1px dashed #E4ECF3;
  padding: 10px 10px;
  margin:0px 0px -1px -1px;

}
  ul li {
    display: inline-block;
    line-height: 30px;
    text-align: center;
    height: 30px;
    /*width: 90px;*/
    margin: 0 10px;
    padding: 0 5px;
    color: #424242;
  }
ul li:hover {
  cursor: pointer;
  color: red;
}
.active {
  background-color: #67C23A;
   color: #FFFFFF;
  border-radius: 5px;
}
  .title{
    font-weight: bold;
    font-size: 14px;
    margin-left: 100px;
    color: black;
  }
  .box-card{
    display: inline-block;
    margin: 5px 5px;
    width: 305px;
  }
  .app-container {
    height: calc(100vh - 50px);
    overflow: auto;
  }
.app-main .app-container {
  background-color: #F5F8FA;
}
  .conditions{
    border-radius: 5px;
    /*text-align: center;*/
  }

  .container-2{
    padding: 0 20px;
  }
  .el-aside {
    /*box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)*/
    box-shadow: 0 2px 4px rgba(0,0,0,.12);
  }
  .el-main {
    /*padding: 5px;*/
    margin: 5px 0 0 5px;
    background-color: #FFFFFF;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }
  .airport {
    border-radius: 5px;
  }
.box-card-aside{
  width: 15vw;
}
  .box-card-aside .item:nth-child(n-1) {
    margin: 15px 0 0 0;
  }
.item .tag{
  display: inline-block;
  line-height: 28px;
  width: 80px;
  margin-right: 20px;
}
</style>
<style>
  .airport {
    font-size: 13px;
  }
  .conditions .el-card {
    cursor: pointer;
  }
  .item {
    font-size: 14px;
  }
  .item .el-select {
    width: 130px;
  }
</style>
