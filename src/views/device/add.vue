<template>
  <div class="app-container">
    <el-container style="padding-top: 50px">
      <el-col :offset="8" :span="8">
        <el-form ref="device" :model="device" :rules="rules" label-width="80px">
          <el-form-item label="设备编号" prop="deviceId">
            <el-input v-model="device.deviceId" placeholder="请输入设备的编号"></el-input>
          </el-form-item>
          <el-form-item label="机场名称" prop="airportId">
            <el-select v-model="device.airportId" placeholder="请选择所属机场">
              <el-option v-for="airport in airportList" :key="airport.id" :value="airport.id" :label="airport.name"/>
            </el-select>
          </el-form-item>
          <el-form-item label="廊道名称" prop="galleryId">
            <el-select v-model="device.galleryId" placeholder="请选择所属廊道">
              <el-option v-for="gallery in galleryList" :key="gallery.id" :value="gallery.id" :label="gallery.name"/>
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
  import gallery from "@/api/air-condition/gallery";
  import airport from "@/api/air-condition/airport";
  import config from "@/api/air-condition/config";
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
        device: {
          deviceId: '',
          galleryId: '',
          airportId: '',
          routingKey: '',
          addBy:''
        },
        airportList: [],
        galleryList: [],
        rules: {
          deviceId: [
            {required: true, message: '请输入设备的编号', trigger: 'blur'},
            {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
          ],
          airportId: [
            {required: true, message: '请选择所属机场', trigger: 'change'}
          ],
          galleryId: [
            {required: true, message: '请选择所属廊道', trigger: 'change'}
          ],
        },
      }
    },
    created() {
      this.getAllAirport();
      this.getAllGallery();
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
      //获取所有廊道
      getAllGallery() {
        gallery.getAllGallery().then(res => {
          this.galleryList = res.data.galleryList
        })
      },
    }
  }
</script>

<style scoped>

</style>
