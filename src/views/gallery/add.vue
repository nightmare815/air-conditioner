<template>
  <div class="app-container">
    <el-container style="padding-top: 50px">
      <el-col :offset="8" :span="8">
        <el-form ref="gallery" :model="gallery" label-width="80px">
          <el-form-item label="廊道名称">
            <el-input v-model="gallery.name" placeholder="请输入廊道名称"></el-input>
          </el-form-item>
          <el-form-item label="机场名称">
            <el-select v-model="gallery.airportId" placeholder="请选择所属机场">
              <el-option v-for="airport in airportList" :key="airport.id" :value="airport.id" :label="airport.name"/>
            </el-select>
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
  import gallery from "@/api/air-condition/gallery";
  import airport from "@/api/air-condition/airport";

  export default {
    data() {
      return {
        gallery:{},
        airportList:[]
      }
    },
    created() {
      this.getAllAirport();
    },
    methods: {
      onSubmit() {
        gallery.addGallery(this.gallery).then(res=>{
          this.$message({
            type: 'success',
            message: '添加成功!'
          });
          this.$router.push({name: "galleryList"})
        }).catch(err => {
          this.$message({
            type: 'error',
            message: '添加出错了'
          });
        })
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
