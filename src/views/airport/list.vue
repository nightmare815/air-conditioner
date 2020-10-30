<template>
  <div class="app-container">
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
          {{(current - 1) * limit + scope.$index + 1}}
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import airport from "@/api/air-condition/airport";

  export default {
    data() {
      return {
        airportList: [],
        loading: 'true',
        current: 1,
        limit: 5,
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

      airportDetail(index, row) {
        console.log(index, row);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
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
