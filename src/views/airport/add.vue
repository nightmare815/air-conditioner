<template>
  <div class="app-container">
    <el-container style="padding-top: 50px">
        <el-col :offset="8" :span="8">
          <el-form ref="airport" :model="airport" label-width="80px">
            <el-form-item label="机场名称">
              <el-input v-model="airport.name" placeholder="请输入机场名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">创建</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
    </el-container>
  </div>
</template>

<script>
  import airport from "@/api/air-condition/airport";
  export default {
    name: "add",
    data() {
      return {
        airport:{}
      }
    },
    methods: {
      onSubmit() {
        airport.addAirport(this.airport).then(res=>{
          this.$message({
            type: 'success',
            message: '添加成功!'
          });
          this.$router.push({name: "airportList"})
        }).catch(err => {
          this.$message({
            type: 'error',
            message: '添加出错了'
          });
        })
      }

    }
  }
</script>

<style scoped>

</style>
