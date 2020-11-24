<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select size="mini" v-model="deviceQuery.airport" clearable placeholder="请选择机场名" @change="getAirportStation">
          <el-option v-for="airport in airportList" :key="airport.id" :value="airport.id" :label="airport.name"/>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-select size="mini" v-model="deviceQuery.station" clearable placeholder="请选择航站楼" @change="getStationBridge">
          <el-option v-for="station in selectStationList" :key="station.id" :value="station.id" :label="station.name"/>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-select size="mini" v-model="deviceQuery.bridge" clearable placeholder="请选择登机桥">
          <el-option v-for="bridge in selectBridgeList" :key="bridge.id" :value="bridge.id" :label="bridge.name"/>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-input size="mini" v-model="deviceQuery.deviceId" clearable placeholder="请输入设备号">
        </el-input>
      </el-form-item>

      <el-form-item label="注册时间">
        <el-date-picker
          size="mini"
          v-model="deviceQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          size="mini"
          v-model="deviceQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button style="margin-top: 5px" size="mini" type="primary" @click="queryDeviceList()">
        查询
      </el-button>
      <el-button size="mini" type="default" @click="resetData()">清空</el-button>
      <el-button size="mini" style="background-color: #17B3A3;color: white" @click="addDevice()">新增</el-button>
    </el-form>
    <el-table
      border
      fit
      v-loading="loading"
      highlight-current-row
      :data="deviceList"
      style="width: 100%">
      <el-table-column
        label="序号"
        width="100px"
        align="center">
        <template slot-scope="scope">
          {{(current - 1) * limit + scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column
        prop="deviceId"
        label="设备id"
        width="150px">
      </el-table-column>
<!--      <el-table-column-->
<!--        prop="type"-->
<!--        label="设备型号"-->
<!--        width="150px">-->
<!--      </el-table-column>-->
      <el-table-column
        prop="routingKey"
        label="绑定路由">
      </el-table-column>
      <el-table-column
        label="所属机场"
        width="150px">
        <template slot-scope="scope">
          {{getAirportName(scope.row.airportId)}}
        </template>
      </el-table-column>
      <el-table-column
        label="所属航站楼"
        width="150px">
        <template slot-scope="scope">
          {{getStationName(scope.row.stationId)}}
        </template>
      </el-table-column>
      <el-table-column
        label="所属登记桥"
        width="150px">
        <template slot-scope="scope">
          {{getBridgeName(scope.row.bridgeId)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="gmtCreate"
        label="注册时间">
      </el-table-column>
      <el-table-column
        prop="addBy"
        label="创建者"
        width="200px">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="editDeviceInfo(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="deviceDetail(scope.$index, scope.row)">查看
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="removeDevice(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="block">
      <el-pagination
        background
        @current-change="queryDeviceList"
        :current-page="current"
        :page-size="limit"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <!--新增设备对话框-->
    <el-dialog
      title="新增设备"
      :close-on-click-modal="false"
      :visible.sync="visible"
    >
      <el-form ref="device" :model="device" :rules="rules" label-width="100px">
        <el-form-item label="设备编号" prop="deviceId">
          <el-input v-model="device.deviceId" ></el-input>
        </el-form-item>
        <el-form-item label="机场名称" prop="airportId">
          <el-select v-model="device.airportId" @change="getAirportStation">
            <el-option v-for="airport in airportList" :key="airport.id" :value="airport.id" :label="airport.name"/>
          </el-select>
        </el-form-item>
        <el-form-item label="航站楼名称" prop="stationId">
          <el-select v-model="device.stationId" @change="getStationBridge">
            <el-option v-for="station in selectStationList" :key="station.id" :value="station.id" :label="station.name"/>
          </el-select>
        </el-form-item>
        <el-form-item label="登机桥名称" prop="bridgeId">
          <el-select v-model="device.bridgeId" >
            <el-option v-for="bridge in selectBridgeList" :key="bridge.id" :value="bridge.id" :label="bridge.name"/>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit('device')">确定</el-button>
    </span>
    </el-dialog>

  </div>
</template>

<script>
  import device from "@/api/air-condition/device"
  import airport from "@/api/air-condition/airport"
  import station from "@/api/air-condition/station"
  import bridge from "@/api/air-condition/bridge";
  import {mapGetters} from "vuex";
  import config from "@/api/air-condition/config";

  export default {
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    data() {
      return {
        loading: 'true',
        current: 1,
        limit: 10,
        total: 0,
        visible:false,
        options:[],
        device: {
          deviceId: '',
          bridgeId: '',
          stationId: '',
          airportId: '',
          routingKey: '',
          addBy:''
        },
        airportList: [],
        stationList: [],
        bridgeList: [],
        deviceList: [],
        deviceQuery: {
          airport: '',
          station: '',
          bridge: '',
          deviceId: '',
          begin:  '',
          end: '',
        },
        selectStationList:[], //选择机场后的StationList
        selectBridgeList: [],
        rules: {
          deviceId: [
            {required: true, message: '请输入设备的编号', trigger: 'blur'},
            {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
          ],
          airportId: [
            {required: true, message: '请选择所属机场', trigger: 'blur'}
          ],
          stationId: [
            {required: true, message: '请选择所属航站楼', trigger: 'blur'}
          ],
          bridgeId: [
            {required: true, message: '请选择所属登机桥', trigger: 'blur'}
          ],
        },
      }
    },
    created() {
      this.queryDeviceList();
      this.getAllAirport();
      this.getAllStation();
      this.getAllBridge();
    },
    methods: {

      //条件分页查询
      queryDeviceList(current = 1) {
        this.current = current;
        device.getPageOnConditional(this.deviceQuery, this.current, this.limit)
          .then(res => {
            this.deviceList = res.data.deviceList;
            this.total = res.data.total;
            this.loading = false
          })
          .catch(err => {
            console.log(err)
          })
      },
      getAirportName(id) {
        for (const airport of this.airportList) {
          if (airport.id == id) {
            return airport.name
            break
          }
        }
      },
      getStationName(id) {
        for (const station of this.stationList) {
          if (station.id == id) {
            return station.name
            break
          }
        }
      },
      getBridgeName(id) {
        for (const bridge of this.bridgeList) {
          if (bridge.id == id) {
            return bridge.name
            break
          }
        }
      },
      editDeviceInfo(index, row) {
        console.log(list, row);
      },
      removeDevice(id) {
        this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          device.removeDevice(id)
            .then(res => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.queryDeviceList(1);
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: '删除失败!'
              });
            })
        })
      },

      //获取所有机场
      getAllAirport() {
        airport.getAllAirport().then(res => {
          this.airportList = res.data.airportList
        })
      },
      //获取所有廊道
      getAllStation() {
        station.findAllStation().then(res => {
          this.stationList = res.data.airportStationList
        })
      },
      getAllBridge() {
        bridge.findAllAirportBridge().then(res=>{
          this.bridgeList = res.data.airportBridgeList
        })
      },

      deviceDetail(index, row) {
        let deviceId = row.deviceId;
        this.$router.push({name: "detail", params: {"id": deviceId}})
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      resetData() {
        this.deviceQuery = {}
        this.selectStationList = []
        this.queryDeviceList(1);
        this.getAllAirport();
        this.getAllStation();
      },
      //会自动把value即airportid传过来
      getAirportStation(airportId) {
        this.selectStationList = []
        for (const station of this.stationList) {
          if(station.airportId == airportId) {
            this.selectStationList.push(station)
          }
        }
        this.deviceQuery.station = ''
      },
      getStationBridge(stationId) {
        this.selectBridgeList = []
        for (const bridge of this.bridgeList) {
          if(bridge.stationId == stationId) {
            this.selectBridgeList.push(bridge)
          }
        }
        this.deviceQuery.bridge = ''
      },
      addDevice() {
        this.visible = true;
      },
      dataFormSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //生成并添加设备路由信息
            this.device.addBy = this.name
            let deviceId = this.device.deviceId;
            this.device.routingKey = config.ROUTING_KEY_PREFIX + deviceId + config.ROUTING_KEY_SUFFIX;
            device.addDevice(this.device).then(res => {
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
              this.visible = false;
              this.device = {}
              this.queryDeviceList();
            }).catch(err => {
              this.$message({
                type: 'error',
                message: '添加出错了'
              });
              this.device = {}
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>
  .block {
    margin: 50px auto;
    text-align: center;
  }

  * {
    font-size: 13px;
  }
</style>
