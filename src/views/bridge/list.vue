<template>
  <div class="app-container">
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
        airportList:[],
        stationList:[],
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
