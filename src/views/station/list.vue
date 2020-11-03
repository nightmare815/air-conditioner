<template>
  <div class="app-container">
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
  </div>
</template>

<script>
  import station from "@/api/air-condition/station";
  import airport from "@/api/air-condition/airport";

  export default {
    data() {
      return {
        airportList:[],
        stationList: [],
        loading: 'true',
        current: 1,
        limit: 10,
        total: 0
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
          gallery.deleteAirportStation(id)
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
