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
    name: "showDetail",
    props: {
      pageParam: Object
    },
    data() {
      return {
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
        }]
      }
    },
    methods: {
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
      }
    }
  }
</script>

<style scoped>

</style>
