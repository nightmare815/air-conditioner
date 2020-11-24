<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true">
      <el-form-item label="检索">
        <el-input size="mini" v-model="bridgeQuery.key" clearable placeholder="请输入关键字">
        </el-input>
      </el-form-item>

      <el-form-item label="注册时间">
        <el-date-picker
          size="mini"
          v-model="bridgeQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          size="mini"
          v-model="bridgeQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button style="margin-top: 5px" size="mini" type="primary" @click="querBridgeList()">
        查询
      </el-button>
      <el-button size="mini" type="default" @click="resetData()">清空</el-button>
      <el-button size="mini" style="background-color: #17B3A3;color: white" @click="addBridge()">新增</el-button>
    </el-form>

    <el-table
      border
      fit
      v-loading="loading"
      highlight-current-row
      :data="airportBridgeList"
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
        label="登机桥编号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="登机桥名称">
      </el-table-column>
      <el-table-column
        label="所属机场">
        <template slot-scope="scope">
          {{getAirportName(scope.row.airportId)}}
        </template>
      </el-table-column>
      <el-table-column
        label="所属航站楼">
        <template slot-scope="scope">
          {{getStationName(scope.row.stationId)}}
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
            @click="editBridgeInfo(scope.$index, scope.row)">编辑
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
        @current-change="getPageAirportBridge"
        :current-page="current"
        :page-size="limit"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <!--新增登机桥对话框-->
    <el-dialog
      title="新增登机桥"
      :close-on-click-modal="false"
      :visible.sync="visible"
    >
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
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit('bridge')">确定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
  import gallery from "@/api/air-condition/station";
  import airport from "@/api/air-condition/airport";
  import bridge from "@/api/air-condition/bridge";
  import station from "@/api/air-condition/station";

  export default {
    data() {
      return {
        visible: false,
        bridge:{
          name:'',
          airportId: '',
          stationId: '',
          addBy:''
        },
        bridgeQuery:{},
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
        airportBridgeList: [],
        loading: 'true',
        current: 1,
        limit: 10,
        total: 0
      }
    },
    created() {
      this.getPageAirportBridge()
      this.getAllAirport()
      this.getAllStation()
    },
    methods: {
      getPageAirportBridge(current = 1) {
        this.current = current
        bridge.getPageAirportBridge(this.current, this.limit)
          .then(res => {
            this.airportBridgeList = res.data.bridgeList
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
      getAllStation() {
        station.findAllStation().then(res=>{
          this.stationList = res.data.airportStationList
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
      getStationName(id) {
        for (const station of this.stationList) {
          if(station.id == id) {
            return station.name
            break
          }
        }
      },
      editBridgeInfo(index, row) {
        console.log(index, row);
      },
      deleteAirportStation(id) {
        this.$confirm('此操作将永久删除该登机桥, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          bridge.deleteAirportBridge(id)
            .then(res => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getPageAirportBridge();
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: '删除失败!'
              });
            })
        })
      },

      bridgeDetail(index, row) {
        console.log(index, row);
      },
      handleSizeChange(val) {
        this.limit = val;
      },
      handleCurrentChange(val) {
        this.current = val
      },
      querBridgeList() {
        bridge.getPageBridgeByCondition(this.current, this.limit, this.bridgeQuery).then(res=>{
          this.airportBridgeList = res.data.records
          this.total = res.data.total
        })
      },
      resetData(){
        this.bridgeQuery = {}
        this.getPageAirportBridge()
      },
      addBridge() {
        this.visible = true
      },
      dataFormSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.bridge.addBy = this.name
            bridge.addAirportBridge(this.bridge).then(res=>{
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
              this.bridge = {}
              this.visible = false;
              this.getPageAirportBridge()
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
  .block {
    margin: 50px auto;
    text-align: center;
  }

  * {
    font-size: 13px;
  }
</style>
