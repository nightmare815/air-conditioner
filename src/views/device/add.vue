<template>
  <div class="app-container">
    <el-container style="padding-top: 50px">
      <el-col :offset="6" :span="12">
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
          <el-form-item>
            <el-button type="primary" @click="submitForm('device')">创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-container>
  </div>
</template>

<script>
  import device from "@/api/air-condition/device";
  import station from "@/api/air-condition/station";
  import bridge from "@/api/air-condition/bridge";
  import airport from "@/api/air-condition/airport";
  import config from "@/api/air-condition/config";
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
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
        selectStationList:[],
        selectBridgeList:[],
        rules: {
          deviceId: [
            {required: true, message: '请输入设备的编号', trigger: 'blur'},
            {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
          ],
          airportId: [
            {required: true, message: '请选择所属机场', trigger: 'change'}
          ],
          stationId: [
            {required: true, message: '请选择所属航站楼', trigger: 'change'}
          ],
          bridgeId: [
            {required: true, message: '请选择所属登机桥', trigger: 'change'}
          ],
        },
      }
    },
    created() {
      this.getAllAirport();
      this.getAllStation();
      this.getAllBridge();
    },
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    methods: {
      submitForm(formName) {
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
              this.$router.push({name: "deviceList"})
            }).catch(err => {
              this.$message({
                type: 'error',
                message: '添加出错了'
              });
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getAllAirport() {
        airport.getAllAirport().then(res => {
          this.airportList = res.data.airportList
        })
      },
      //获取所有航站
      getAllStation() {
        station.findAllStation().then(res => {
          this.stationList = res.data.airportStationList
        })
      },
      //获取所有登机桥
      getAllBridge() {
        bridge.findAllAirportBridge().then(res => {
          this.bridgeList = res.data.airportBridgeList
        })
      },
      //会自动把value即airportid传过来
      getAirportStation(airportId) {
        this.selectStationList = []
        for (const station of this.stationList) {
          if(station.airportId == airportId) {
            this.selectStationList.push(station)
          }
        }
        this.device.stationId = ''
        this.device.bridgeId = ''
      },

      getStationBridge(stationId) {
        this.selectBridgeList = []
        for (const bridge of this.bridgeList) {
          if(bridge.stationId == stationId) {
            this.selectBridgeList.push(bridge)
          }
        }
        this.device.bridgeId = ''
      },
    }
  }
</script>

<style scoped>

</style>
