<template>
  <div class="app-container">
    <el-container style="padding-top: 50px">
        <el-col :offset="6" :span="12">
          <el-form ref="airport" :model="airport" :rules="rules" label-width="80px">
            <el-form-item label="机场名称" prop="name">
              <el-input v-model="airport.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('airport')">创建</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
    </el-container>
  </div>
</template>

<script>
  import airport from "@/api/air-condition/airport";
  import gallery from "@/api/air-condition/station";
  import {mapGetters} from "vuex";

  export default {
    name: "add",
    created() {
    },
    data() {
      return {
        airport:{
          name:'',
          addBy:'',
        },
        rules: {
          name: [
            {required: true, message: '请输入机场名称', trigger: 'blur'},
            {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
          ],
        },
      }
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
            this.airport.addBy = this.name;
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
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>

<style scoped>

</style>
