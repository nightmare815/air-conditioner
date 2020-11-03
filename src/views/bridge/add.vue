<template>
  <div class="app-container">
    <el-container style="padding-top: 50px">
      <el-col :offset="6" :span="12">
        <el-form ref="bridge" :model="bridge" :rules="rules" label-width="100px">
          <el-form-item label="登机桥名称" prop="name">
            <el-input v-model="bridge.name"></el-input>
          </el-form-item>
          <el-form-item label="机场名称" prop="airportId">
            <el-select v-model="bridge.airportId" @change="getAirportStation">
              <el-option v-for="airport in airportList" :key="airport.id" :value="airport.id" :label="airport.name"/>
            </el-select>
          </el-form-item>
          <el-form-item label="航站楼名称" prop="stationId">
            <el-select v-model="bridge.stationId">
              <el-option v-for="station in selectStationList" :key="station.id" :value="station.id" :label="station.name"/>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('bridge')">创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-container>
  </div>
</template>

<script>
  import station from "@/api/air-condition/station";
  import bridge from "@/api/air-condition/bridge";
  import airport from "@/api/air-condition/airport";
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
        bridge:{
          name:'',
          airportId: '',
          stationId: '',
          addBy:''
        },
        airportList:[],
        stationList:[],
        selectStationList: [],
        rules: {
          name: [
            {required: true, message: '请输入登机桥名称', trigger: 'blur'},
            {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
          ],
          airportId: [
            {required: true, message: '请选择所属机场', trigger: 'change'}
          ],
          stationId: [
            {required: true, message: '请选择所属航站楼', trigger: 'change'}
          ],
        },
      }
    },
    created() {
      this.getAllAirport();
      this.getAllStation();
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
            this.bridge.addBy = this.name
            bridge.addAirportBridge(this.bridge).then(res=>{
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
              this.$router.push({name: "bridgeList"})
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
        airport.getAllAirport().then(res=>{
          this.airportList = res.data.airportList
        })
      },
      getAllStation() {
        station.findAllStation().then(res=>{
          this.stationList = res.data.airportStationList
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
        this.bridge.stationId = this.selectStationList[0].id
      },

    }
  }
</script>

<style scoped>

</style>
