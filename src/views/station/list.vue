<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true">
      <el-form-item label="检索">
        <el-input size="mini" v-model="stationQuery.key" clearable placeholder="请输入关键字">
        </el-input>
      </el-form-item>

      <el-form-item label="注册时间">
        <el-date-picker
          size="mini"
          v-model="stationQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          size="mini"
          v-model="stationQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button style="margin-top: 5px" size="mini" type="primary" @click="queryStationList()">
        查询
      </el-button>
      <el-button size="mini" type="default" @click="resetData()">清空</el-button>
      <el-button size="mini" style="background-color: #17B3A3;color: white" @click="addStation()">新增</el-button>
    </el-form>

    <el-table
      border
      fit
      v-loading="loading"
      highlight-current-row
      :data="stationList"
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
        prop="id"
        label="航站楼编号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="航站楼名称">
      </el-table-column>
      <el-table-column
        label="所属机场">
        <template slot-scope="scope">
          {{getAirportName(scope.row.airportId)}}
        </template>
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
            @click="editAirportStation(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteAirportStation(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <div class="block">
      <el-pagination
        background
        @current-change="getPageStation"
        :current-page="current"
        :page-size="limit"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <!--新增航站楼对话框-->
    <el-dialog
      title="新增航站楼"
      :close-on-click-modal="false"
      :visible.sync="visible"
    >
      <el-form ref="station" :model="station" :rules="rules" label-width="100px">
        <el-form-item label="航站楼名称" prop="name">
          <el-input v-model="station.name"></el-input>
        </el-form-item>
        <el-form-item label="机场名称" prop="airportId">
          <el-select v-model="station.airportId">
            <el-option v-for="airport in airportList" :key="airport.id" :value="airport.id" :label="airport.name"/>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit('station')">确定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
  import station from "@/api/air-condition/station";
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
        stationQuery: {},
        airportList:[],
        stationList: [],
        loading: 'true',
        current: 1,
        limit: 10,
        total: 0,
        station:{
          name:'',
          airportId: '',
          addBy:''
        },
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
      this.getPageStation()
      this.getAllAirport()
    },
    methods: {
      getPageStation(current = 1) {
        this.current = current
        station.getPageAirportStation(this.current, this.limit)
          .then(res => {
            this.stationList = res.data.stationList
            this.total = res.data.total
            this.loading = false
          })
          .catch(err => {
            console.log(err)
          })
      },

      getAllAirport() {
        airport.getAllAirport().then(res=>{
          this.airportList = res.data.airportList
        })
      },
      getAirportName(id) {
        for (const airport of this.airportList) {
          if(airport.id == id) {
            return airport.name
            break
          }
        }
      },
      editAirportStation(index, row) {
        console.log(index, row);
      },
      deleteAirportStation(id) {
        this.$confirm('此操作将永久删除该航站楼, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          station.deleteAirportStation(id)
            .then(res => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getPageStation();
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: '删除失败!'
              });
            })
        })
      },

      stationDetail(index, row) {
        console.log(index, row);
      },
      handleSizeChange(val) {
        this.limit = val;
      },
      handleCurrentChange(val) {
        this.current = val
      },
      resetData() {
        this.stationQuery = {}
        this.getPageStation()
      },
      queryStationList() {
        station.getPageStationByCondition(this.current, this.limit, this.stationQuery).then(res=>{
          this.stationList = res.data.records
          this.total = res.data.total
        })
      },
      addStation() {
        this.visible = true;
      },
      dataFormSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.station.addBy = this.name
            station.addAirportStation(this.station).then(res=>{
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
              this.visible = false;
              this.station = {}
              this.getPageStation()
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
