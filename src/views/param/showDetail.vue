<template>
  <div class="container-param" v-if="hasStatus">
    <div v-if="statusManager">
      <!--只在设备管理界面显示此div-->
      <div class="submit">
        <el-button size="mini" type="danger" @click="submit()">提交修改</el-button>
        <el-button size="mini" type="primary" @click="showPageHistoryDataClick()">历史修改记录</el-button>
        <el-button size="mini" type="primary" @click="showPageMsgReceiveClick()">历史消息记录</el-button>
      </div>
    </div>

    <div class="main-content">
      <el-container>
        <el-aside width="50%">
          <div class="temp-humi">
            <el-card class="card-1">
              <div slot="header" class="clearfix">
                <span style="font-weight: bold;color: #606266">温度</span>
              </div>
              <div class="temperature">
                <div class="">
                  <el-tag style="margin-right: 70px">当前温度:</el-tag>
                  <el-input-number :disabled="disable" v-model="status.temperature" @change="" :min="16" :max="30"
                                   label="描述文字"></el-input-number>
                </div>
                <div class="">
                  <el-tag style="margin-right: 70px">当前室温:</el-tag>
                  <el-input-number title="当前室温无法修改" disabled v-model="status.temp" @change="" :min="16" :max="30"
                                   label="描述文字"></el-input-number>
                </div>
                <div class="">
                  <el-tag style="margin-right: 70px">当前湿度:</el-tag>
                  <el-input-number :disabled="disable" v-model="status.humi" @change="" :min="0" :max="200"
                                   label="描述文字"></el-input-number>
                </div>
                <div class="current-mode">
                  <el-tag type="success" style="margin-right: 70px">工作模式:</el-tag>
                  <el-radio-group v-model="status.mode" size="medium" :disabled="disable" :text-color="textColor">
                    <el-radio-button label="1">自动</el-radio-button>
                    <el-radio-button label="2">制冷</el-radio-button>
                    <el-radio-button label="3">除湿</el-radio-button>
                    <el-radio-button label="4">送风</el-radio-button>
                    <el-radio-button label="5">制热</el-radio-button>
                  </el-radio-group>
                </div>
                <div class="show-temp">
                  <el-tag type="warning" style="margin-right: 70px">显示温度:</el-tag>
                  <el-select v-model="status.showtemp" :disabled="disable">
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

          <div class="wind">
            <el-card class="card-2">
              <div slot="header" class="clearfix">
                <span style="font-weight: bold;color: #606266">扫风</span>
              </div>
              <div class="speed">
                <div class="current-speed">
                  <el-tag type="success" style="margin-right: 70px;width: 75px;text-align: center;font-size: 14px">风速:
                  </el-tag>
                  <el-radio-group v-model="status.wind" :disabled="disable" :text-color="textColor">
                    <el-radio-button label="0">低速</el-radio-button>
                    <el-radio-button label="1">中速</el-radio-button>
                    <el-radio-button label="2">高速</el-radio-button>
                    <el-radio-button label="3">自动</el-radio-button>
                  </el-radio-group>
                </div>
                <div class="wind-mode">
                  <el-tag type="info" style="margin-right: 70px">扫风模式:</el-tag>
                  <el-select v-model="status.weep" :disabled="disable">
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
        </el-aside>
        <el-main style="padding:0;margin-left: 10px;height: 600px">
          <el-card class="card-3">
            <div slot="header" class="clearfix">
              <span style="font-weight: bold;color: #606266">系统设置</span>
            </div>
            <div class="setting">
              <div class="source">
                <el-tag type="danger" style="margin-right: 70px;width: 75px;text-align: center;font-size: 14px">电源:
                </el-tag>
                <el-switch
                  :disabled="disable"
                  v-model="status.source"
                  class="show-button"
                  active-text="开启"
                  inactive-text="关闭">
                </el-switch>
              </div>
              <div class="power-wind">
                <el-tag type="success" style="margin-right: 70px;width: 75px;text-align: center;font-size: 14px">
                  超强风:
                </el-tag>
                <el-switch
                  :disabled="disable"
                  v-model="status.power"
                  class="show-button"
                  active-text="开启"
                  inactive-text="关闭">
                </el-switch>
              </div>
              <div class="light">
                <el-tag style="margin-right: 70px;width: 75px;text-align: center;font-size: 14px">灯光:</el-tag>
                <el-switch
                  :disabled="disable"
                  v-model="status.light"
                  class="show-button"
                  active-text="开启"
                  inactive-text="关闭">
                </el-switch>
              </div>
              <div class="save">
                <el-tag type="info" style="margin-right: 70px;width: 75px;text-align: center;font-size: 14px">节能:
                </el-tag>
                <el-switch
                  :disabled="disable"
                  v-model="status.save"
                  class="show-button"
                  active-text="开启"
                  inactive-text="关闭">
                </el-switch>
              </div>
              <div class="dry">
                <el-tag type="warning" style="margin-right: 70px;width: 75px;text-align: center;font-size: 14px">干燥:
                </el-tag>
                <el-switch
                  :disabled="disable"
                  v-model="status.dry"
                  class="show-button"
                  active-text="开启"
                  inactive-text="关闭">
                </el-switch>
              </div>
              <div class="sleep">
                <el-tag style="margin-right: 70px;width: 75px;text-align: center;font-size: 14px">睡眠:</el-tag>
                <el-switch
                  :disabled="disable"
                  v-model="status.sleep"
                  class="show-button"
                  active-text="开启"
                  inactive-text="关闭">
                </el-switch>
              </div>
              <div class="health">
                <el-tag type="info" style="margin-right: 70px">健康换气:</el-tag>
                <el-select v-model="status.health" :disabled="disable" placeholder="请选择">
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
        </el-main>
      </el-container>
    </div>

    <!--历史修改记录对话框-->
    <el-dialog title="历史修改记录" :visible.sync="dialogTableVisible_modify" width="85%">
      <!--查询表单-->
      <el-form :inline="true">
        <el-form-item label="修改时间">
          <el-date-picker
            size="mini"
            v-model="messageQuery.begin"
            type="datetime"
            placeholder="选择开始时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="00:00:00"
          />
        </el-form-item>
        <el-form-item>
          <el-date-picker
            size="mini"
            v-model="messageQuery.end"
            type="datetime"
            placeholder="选择截止时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="00:00:00"
          />
        </el-form-item>
        <el-form-item>
          <el-select size="mini" v-model="messageQuery.user" clearable placeholder="请选择修改人">
            <el-option :label="user.username" v-for="user in userList" :key="user.id" :value="user.username"/>
          </el-select>
        </el-form-item>

        <el-button style="margin-top: 5px" size="mini" type="primary" @click="queryMessageList(0)">
          查询
        </el-button>
        <el-button size="mini" type="default" @click="resetData(0)">清空</el-button>
        <el-button size="mini" type="danger" @click="deleteBatch(0)">批量删除</el-button>
      </el-form>

      <el-table :data="historyData" border fit highlight-current-row height="380"
                @selection-change="handleSelectionChange" style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="序号"
          width="60px"
          align="center">
          <template slot-scope="scope">
            {{ (current - 1) * limit + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="gmtCreate" label="修改时间" width="160" header-align="center"></el-table-column>
        <el-table-column prop="content" label="修改内容" header-align="center">
          <el-table-column label="温度">
            <template slot-scope="scope">
              {{ getContent(scope.row.content).temperature }}
            </template>
          </el-table-column>
          <el-table-column label="室温">
            <template slot-scope="scope">
              {{ getContent(scope.row.content).temp }}
            </template>
          </el-table-column>
          <el-table-column label="湿度">
            <template slot-scope="scope">
              {{ getContent(scope.row.content).humi }}
            </template>
          </el-table-column>
          <el-table-column label="模式">
            <template slot-scope="scope">
              {{ workOptions[getContent(scope.row.content).mode - 1].label }}
            </template>
          </el-table-column>
          <el-table-column label="温显">
            <template slot-scope="scope">
              {{ temOptions[getContent(scope.row.content).showtemp].label }}
            </template>
          </el-table-column>
          <el-table-column label="风速">
            <template slot-scope="scope">
              {{ windOptions[getContent(scope.row.content).wind].label }}
            </template>
          </el-table-column>
          <el-table-column label="扫风">
            <template slot-scope="scope">
              {{ weepOptions[getContent(scope.row.content).weep].label }}
            </template>
          </el-table-column>
          <el-table-column label="电源">
            <template slot-scope="scope">
              {{ getContent(scope.row.content).source == 0 ? "关闭" : "打开" }}
            </template>
          </el-table-column>
          <el-table-column label="超强风">
            <template slot-scope="scope">
              {{ getContent(scope.row.content).power == 0 ? "关闭" : "打开" }}
            </template>
          </el-table-column>
          <el-table-column label="灯光">
            <template slot-scope="scope">
              {{ getContent(scope.row.content).light == 0 ? "关闭" : "打开" }}
            </template>
          </el-table-column>
          <el-table-column label="节能">
            <template slot-scope="scope">
              {{ getContent(scope.row.content).save == 0 ? "关闭" : "打开" }}
            </template>
          </el-table-column>
          <el-table-column label="干燥">
            <template slot-scope="scope">
              {{ getContent(scope.row.content).dry == 0 ? "关闭" : "打开" }}
            </template>
          </el-table-column>
          <el-table-column label="睡眠">
            <template slot-scope="scope">
              {{ getContent(scope.row.content).sleep == 0 ? "关闭" : "打开" }}
            </template>
          </el-table-column>
          <el-table-column label="健康">
            <template slot-scope="scope">
              {{ healthOptions[getContent(scope.row.content).health].label }}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="sender" label="修改人" width="120" header-align="center"></el-table-column>
      </el-table>
      <!--历史修改分页-->
      <div class="block">
        <el-pagination
          background
          @current-change="showPageHistoryData"
          :current-page="current"
          :page-size="limit"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-dialog>


    <!--历史消息对话框-->
    <el-dialog title="历史消息记录" :visible.sync="dialogTableVisible_receive" width="85%">
      <!--查询表单-->
      <el-form :inline="true">
        <el-form-item label="修改时间">
          <el-date-picker
            size="mini"
            v-model="messageQuery.begin"
            type="datetime"
            placeholder="选择开始时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="00:00:00"
          />
        </el-form-item>
        <el-form-item>
          <el-date-picker
            size="mini"
            v-model="messageQuery.end"
            type="datetime"
            placeholder="选择截止时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="00:00:00"
          />
        </el-form-item>
        <el-form-item>
          <el-select size="mini" v-model="messageQuery.type" clearable placeholder="请选择消息类型">
            <el-option label="定时发送" value="0"/>
            <el-option label="主动上报" value="1"/>
          </el-select>
        </el-form-item>

        <el-button style="margin-top: 5px" size="mini" type="primary" @click="queryMessageList(1)">
          查询
        </el-button>
        <el-button size="mini" type="default" @click="resetData(1)">清空</el-button>
        <el-button size="mini" type="danger" @click="deleteBatch(1)">批量删除</el-button>
      </el-form>

      <el-table :data="historyReceiveMsg" border fit highlight-current-row height="380"
                @selection-change="handleSelectionChange" style="width: 100%">
        <!--        <el-table-column prop="sender" label="设备id" width="120" header-align="center"></el-table-column>-->
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="序号"
          width="60px"
          align="center">
          <template slot-scope="scope">
            {{ (current - 1) * limit + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="gmtCreate" label="上报时间" width="160" header-align="center"></el-table-column>
        <el-table-column prop="content" label="修改内容" header-align="center">
          <el-table-column label="温度">
            <template slot-scope="scope">
              {{ getContent(scope.row.content).temperature }}
            </template>
          </el-table-column>
          <el-table-column label="室温">
            <template slot-scope="scope" v-if="scope.row.type==1">
              {{ getContent(scope.row.content).temp }}
            </template>
          </el-table-column>
          <el-table-column label="湿度">
            <template slot-scope="scope">
              {{ getContent(scope.row.content).humi }}
            </template>
          </el-table-column>
          <el-table-column label="模式">
            <template slot-scope="scope" v-if="scope.row.type==1">
              {{ workOptions[getContent(scope.row.content).mode - 1].label }}
            </template>
          </el-table-column>
          <el-table-column label="温显">
            <template slot-scope="scope" v-if="scope.row.type==1">
              {{ temOptions[getContent(scope.row.content).showtemp].label }}
            </template>
          </el-table-column>
          <el-table-column label="风速">
            <template slot-scope="scope" v-if="scope.row.type==1">
              {{ windOptions[getContent(scope.row.content).wind].label }}
            </template>
          </el-table-column>
          <el-table-column label="扫风">
            <template slot-scope="scope" v-if="scope.row.type==1">
              {{ weepOptions[getContent(scope.row.content).weep].label }}
            </template>
          </el-table-column>
          <el-table-column label="电源">
            <template slot-scope="scope" v-if="scope.row.type==1">
              {{ getContent(scope.row.content).source == 0 ? "关闭" : "打开" }}
            </template>
          </el-table-column>
          <el-table-column label="超强风">
            <template slot-scope="scope" v-if="scope.row.type==1">
              {{ getContent(scope.row.content).power == 0 ? "关闭" : "打开" }}
            </template>
          </el-table-column>
          <el-table-column label="灯光">
            <template slot-scope="scope" v-if="scope.row.type==1">
              {{ getContent(scope.row.content).light == 0 ? "关闭" : "打开" }}
            </template>
          </el-table-column>
          <el-table-column label="节能">
            <template slot-scope="scope" v-if="scope.row.type==1">
              {{ getContent(scope.row.content).save == 0 ? "关闭" : "打开" }}
            </template>
          </el-table-column>
          <el-table-column label="干燥">
            <template slot-scope="scope" v-if="scope.row.type==1">
              {{ getContent(scope.row.content).dry == 0 ? "关闭" : "打开" }}
            </template>
          </el-table-column>
          <el-table-column label="睡眠">
            <template slot-scope="scope" v-if="scope.row.type==1">
              {{ getContent(scope.row.content).sleep == 0 ? "关闭" : "打开" }}
            </template>
          </el-table-column>
          <el-table-column label="健康">
            <template slot-scope="scope" v-if="scope.row.type==1">
              {{ healthOptions[getContent(scope.row.content).health].label }}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="消息类型" width="80" header-align="center">
          <template slot-scope="scope">
            {{ scope.row.type == 0 ? "定时发送" : "主动发送" }}
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <div class="block">
        <el-pagination
          background
          @current-change="showPageMsgReceive"
          :current-page="current"
          :page-size="limit"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import condition from "@/api/air-condition/condition";
import airport from "@/api/air-condition/airport";
import device from "@/api/air-condition/device";
import user from "@/api/air-condition/user";
import {mapGetters} from "vuex";

export default {
  name: "showDetail",
  props: {
    status: Object,
    statusManager: {
      type: Boolean,
      default: false
    },
    disable: Boolean,
    textColor: String     //指定工作模式和风速两个单选按钮的激活时的颜色
  },
  created() {
    if (this.status) {
      this.hasStatus = true
      this.deviceId = this.status.deviceId
      // this.status = this.formatPageParam(this.status)
      // console.log(this.status)
    } else {
      this.hasStatus = false
      this.tip();
    }
    this.getAllUser()
  },
  data() {
    return {
      messageQuery: {
        begin: '',
        end: '',
        type: '',
        user: ''
      },
      multiSelectList: [],
      userList: [],
      lastMessageMillis: this.$store.getters.lastMessageMillis,
      current: 1,
      limit: 5,
      total: 0,
      historyData: [],  //历史修改记录
      historyReceiveMsg: [], //收到的历史消息
      hasStatus: false,
      dialogTableVisible_modify: false,
      dialogTableVisible_receive: false,
      windOptions: [
        {//风速选项
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
        }
      ],
      workOptions: [
        {//工作模式选项
          value: '1',
          label: '自动'
        }, {
          value: '2',
          label: '制冷'
        }, {
          value: '3',
          label: '除湿'
        }, {
          value: '4',
          label: '送风'
        }, {
          value: '5',
          label: '制热'
        }],
      weepOptions: [
        {			//扫风模式选项
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
      healthOptions: [
        {			//健康换气模式选项
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
      temOptions: [
        {			//显示温度选项
          value: '0',
          label: '不显示'
        }, {
          value: '1',
          label: '显示'
        }, {
          value: '2',
          label: '显示室内'
        }, {
          value: '3',
          label: '显示室外'
        }]
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ]),
  },
  methods: {
    getPageAirport(current = 1) {
      this.current = current
      airport.getPageAirport(this.current, this.limit)
        .then(res => {
          this.airportList = res.data.airportList
          this.total = res.data.total
          this.loading = false
        })
        .catch(err => {
          console.log(err)
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
    //提交页面修改的数据
    submit() {
      let status = this.enFormatPageParam(this.status)
      condition.publishMessage(status, this.name).then(res => {
        this.$message({
          type: "success",
          message: "修改成功!"
        })
      })
        .catch(err => {
          this.$message({
            type: "error",
            message: "修改出错了!"
          })
        })
    },
    tip() {
      this.$alert('此设备还有没有相关状态消息! 点击确认返回设备列表页面', '消息提示', {
        confirmButtonText: '确定',
        callback: action => {
          this.$router.push({name: "deviceList"})
        }
      });
    },
    getContent(content) {
      let status = JSON.parse(content)
      return status
    },
    //历史修改分页
    showPageHistoryData(current = 1) {
      this.current = current;
      device.getHistoryDataByCondition(this.status.deviceId, this.current, this.limit, this.messageQuery)
        .then(res => {
          this.historyData = res.data.records;
          this.total = res.data.total
        }).catch(err => {
        this.$message({
          type: "error",
          message: "获取历史数据失败!"
        })
      })
    },
    //历史消息分页
    showPageMsgReceive(current = 1) {
      this.current = current
      device.getReceiveMsgByCondition(this.status.deviceId, this.current, this.limit, this.messageQuery).then(res => {
        this.historyReceiveMsg = res.data.records
        this.total = res.data.total
      }).catch(err => {
        this.$message({
          type: "error",
          message: "获取历史数据失败!"
        })
      })
    },
    handleSelectionChange(val) {
      this.multiSelectList = val;
      console.log(val)
    },
    resetData(flag) {
      this.messageQuery = {}
      if (flag == 0) {
        this.showPageHistoryData()
      }
      if (flag == 1) {
        this.showPageMsgReceive()
      }
    },
    queryMessageList(flag) {
      if (flag == 0) {
        this.showPageHistoryData();
      }
      if (flag == 1) {
        this.showPageMsgReceive();
      }
    },
    deleteBatch(flag) {
      this.$confirm('此操作将永久删除消息记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (flag == 0) {
          //删除的是修改消息
          device.deleteBatchHistoryModifyData(this.multiSelectList).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.showPageHistoryData()
          }).catch(err => {
            this.$message({
              type: "error",
              message: "批量删除失败!"
            });
          })
        } else {
          //删除的是接受到的历史消息
          device.deleteBatchHistoryReceive(this.multiSelectList).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.showPageMsgReceive()
          }).catch(err => {
            this.$message({
              type: "error",
              message: "批量删除失败!"
            });
          })
        }
      })

    },
    getAllUser() {
      user.getAllUser().then(res => {
        this.userList = res.data.user
      })
    },
    showPageHistoryDataClick() {
      this.messageQuery = {}
      this.showPageHistoryData()
      this.dialogTableVisible_modify = true
    },
    showPageMsgReceiveClick() {
      this.messageQuery = {}
      this.showPageMsgReceive()
      this.dialogTableVisible_receive = true
    }
  }
}
</script>

<style scoped>
.main-content {
  width: 100%;
  height: 100%;
}

.temp-humi, .wind, .setting {
}

.el-icon-s-opportunity {
  color: pink;
}

.card-1 {
  width: 100%;
  margin-bottom: 10px;
}

.card-1, card-2, .card-3 {
  margin-right: 10px;
  box-shadow: none;
}

.card-1 div:nth-child(n-1), .card-2 div:nth-child(n-1), .card-3 div:nth-child(n-1) {
  margin: 0 0 10px 10px;
}

.setting div:nth-child(n) {
  margin-bottom: 20px;
}

.submit {
  margin: 30px 0 30px 30px;
}

.block {
  margin: 50px auto;
  text-align: center;
}
</style>
<style>
</style>
