<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true">
      <el-form-item label="检索">
        <el-input size="mini" v-model="airportQuery.key" clearable placeholder="请输入关键字">
        </el-input>
      </el-form-item>

      <el-form-item label="注册时间">
        <el-date-picker
          size="mini"
          v-model="airportQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          size="mini"
          v-model="airportQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button style="margin-top: 5px" size="mini" type="primary" @click="queryAirportList()">
        查询
      </el-button>
      <el-button size="mini" type="default" @click="resetData()">清空</el-button>
      <el-button size="mini" style="background-color: #17B3A3;color: white" @click="addAirport()">新增</el-button>
    </el-form>

    <el-table
      border
      fit
      v-loading="loading"
      highlight-current-row
      :data="airportList"
      style="width: 100%">
      <el-table-column
        label="序号"
        width="100px"
        align="center">
        <template slot-scope="scope">
          {{ (current - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="id"
        label="机场编号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="机场名称">
      </el-table-column>
      <el-table-column
        prop="gmtCreate"
        label="注册时间">
      </el-table-column>
      <el-table-column
        prop="addBy"
        label="创建者">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="editAirportInfo(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="removeAirport(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <div class="block">
      <el-pagination
        background
        @current-change="getPageAirport"
        :current-page="current"
        :page-size="limit"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <!--新增机场对话框-->
    <el-dialog
      title="新增机场"
      :close-on-click-modal="false"
      :visible.sync="visible"
    >
      <el-form ref="airport" :model="airport" :rules="rules" label-width="100px">
        <el-form-item label="机场名称" prop="name">
          <el-input v-model="airport.name" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit('airport')">确定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
import airport from "@/api/air-condition/airport";
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      visible: false,
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
      airportQuery: {},
      airportList: [],
      loading: 'true',
      current: 1,
      limit: 10,
      total: 0
    }
  },
  created() {
    this.getPageAirport()
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

    editAirportInfo(index, row) {
      console.log(index, row);
    },
    removeAirport(id) {
      this.$confirm('此操作将永久删除该机场, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        airport.removeAirport(id)
          .then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getPageAirport();
          })
          .catch(err => {
            this.$message({
              type: 'error',
              message: '删除失败!'
            });
          })
      })
    },
    resetData() {
      this.airportQuery = {};
      this.getPageAirport();
    },

    airportDetail(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    queryAirportList() {
      airport.getPageAirportByCondition(this.current, this.limit, this.airportQuery).then(res=>{
        this.airportList = res.data.records
        this.total = res.data.total
      })
    },
    addAirport() {
      this.visible = true;
    },
    dataFormSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.airport.addBy = this.name;
          airport.addAirport(this.airport).then(res=>{
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
            this.airport = {}
            this.visible =false
            this.getPageAirport()
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
