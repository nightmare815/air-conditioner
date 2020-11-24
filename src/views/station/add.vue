<template>
  <div class="app-container">
    <el-container style="padding-top: 50px">
      <el-col :offset="6" :span="12">
        <el-form ref="station" :model="station" :rules="rules" label-width="100px">
          <el-form-item label="航站楼名称" prop="name">
            <el-input v-model="station.name"></el-input>
          </el-form-item>
          <el-form-item label="机场名称" prop="airportId">
            <el-select v-model="station.airportId">
              <el-option v-for="airport in airportList" :key="airport.id" :value="airport.id" :label="airport.name"/>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('station')">创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-container>
  </div>
</template>

<script>
  import station from "@/api/air-condition/station";
  import airport from "@/api/air-condition/airport";
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
        station:{
          name:'',
          airportId: '',
          addBy:''
        },
        airportList:[],
        rules: {
          name: [
            {required: true, message: '请输入航站楼名称', trigger: 'blur'},
            {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
          ],
          airportId: [
            {required: true, message: '请选择所属机场', trigger: 'blur'}
          ],
        },
      }
    },
    created() {
      this.getAllAirport();
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
            this.station.addBy = this.name
            station.addAirportStation(this.station).then(res=>{
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
              this.$router.push({name: "stationList"})
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
      }

    }
  }
</script>

<style scoped>

</style>
