<template>
  <div class="app-container">
    <el-container>
      <el-header height="160px">
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
        <el-aside width="15vw" style="height: 100vh;background-color: #FFF">Aside</el-aside>
        <el-main>
          <el-row>
            <el-col>
              <div class="conditions" v-if="conditionObj.status == null">
                <el-card shadow="hover" class="box-card" v-for="(condition, index) in conditions" :key="condition.id">
                  <div slot="header" class="clearfix">
                    <span>{{condition.condition}}</span>
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
                <show-detail :page-param="conditionObj"></show-detail>
<!--                <el-card shadow="hover" class="box-card">-->
<!--                  <div slot="header" class="clearfix">-->
<!--                    <span>{{conditionObj.condition}}</span>-->
<!--                    <el-button style="float: right; padding: 3px 0" type="text">查看详情</el-button>-->
<!--                  </div>-->
<!--                  <div class="text item">-->
<!--                    温度: {{conditionObj.status.temp}}-->
<!--                  </div>-->
<!--                  <div class="text item">-->
<!--                    模式: {{conditionObj.status.mode}}-->
<!--                  </div>-->
<!--                </el-card>-->
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
  export default {
    name: "index",
    components: {
      showDetail
    },
    data() {
      return {
        deviceData:
          [
            {
              id: '1',
              airport: '一号机场',
              children: [
                {
                  id: '1-1',
                  gallery: '一号廊道',
                  children: [
                    {
                      id: '1-1-1',
                      condition: '1号空调',
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
                      }
                    },
                    {
                      id: '1-1-2',
                      condition: '2号空调',
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
                      }
                    },
                  ]
                },
                {
                  id: '1-2',
                  gallery: '二号廊道',
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
                      }
                    },
                  ]
                },
              ]
            },
            {
              id: '2',
              airport: '二号机场',
              children: [
                {
                  id: '2-1',
                  gallery: '三号廊道',
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
                      }
                    },
                  ]
                },
                {
                  id: '2-2',
                  gallery: '四号廊道',
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
                      }
                    },
                  ]
                },
              ]
            },
            {
              id: '3',
              airport: '三号机场',
              children: [
                {
                  id: '3-1',
                  gallery: '五号廊道',
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
                      }
                    },
                  ]
                },
                {
                  id: '3-2',
                  gallery: '六号廊道',
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
      }
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
  background-color: #E5E5E5;
}
  .title{
    margin-left: 100px;
    color: rgba(0,0,0,0.65);
  }
  .box-card{
    display: inline-block;
    margin: 5px 5px;
    width: 305px;
  }
  .app-container {
    height: 100vh;
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
</style>
<style>
  .airport {
    font-size: 13px;
  }
  .conditions .el-card {
    cursor: pointer;
  }
</style>
