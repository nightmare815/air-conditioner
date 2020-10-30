<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select size="mini" v-model="deviceQuery.airport" clearable placeholder="机场名">
          <el-option v-for="airport in airportList" :key="airport.id" :value="airport.id" :label="airport.name"/>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-select size="mini" v-model="deviceQuery.gallery" clearable placeholder="廊道名">
          <el-option v-for="gallery in galleryList" :key="gallery.id" :value="gallery.id" :label="gallery.name"/>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-input size="mini" v-model="deviceQuery.deviceId" clearable placeholder="设备号">
        </el-input>
      </el-form-item>

      <el-form-item label="注册时间">
        <el-date-picker
          size="mini"
          v-model="deviceQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          size="mini"
          v-model="deviceQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button style="margin-top: 5px" size="mini" type="primary" icon="el-icon-search" @click="queryDeviceList()">
        查询
      </el-button>
      <el-button size="mini" type="default" @click="resetData()">清空</el-button>
    </el-form>
    <el-table
      border
      fit
      v-loading="loading"
      highlight-current-row
      :data="deviceList"
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
        prop="deviceId"
        label="设备id">
      </el-table-column>
      <el-table-column
        prop="type"
        label="设备型号">
      </el-table-column>
      <el-table-column
        prop="routingKey"
        label="绑定路由">
      </el-table-column>
      <el-table-column
        label="所属机场">
        <template slot-scope="scope">
          {{getAirportName(scope.row.airportId)}}
        </template>
      </el-table-column>
      <el-table-column
        label="所属廊道">
        <template slot-scope="scope">
          {{getGalleryName(scope.row.galleryId)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="gmtCreate"
        label="注册时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="editDeviceInfo(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="deviceDetail(scope.$index, scope.row)">查看
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="removeDevice(scope.row.id)">删除
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
  import device from "@/api/air-condition/device"
  import airport from "@/api/air-condition/airport"
  import gallery from "@/api/air-condition/gallery"

  export default {
    data() {
      return {
        loading: 'true',
        current: 1,
        limit: 5,
        total: 0,
        airportList:[],
        galleryList:[],
        deviceList: [],
        deviceQuery: {}
      }
    },
    created() {
      this.queryDeviceList();
      this.getAllAirport();
      this.getAllGallery();
    },
    methods: {
      //条件分页查询
      queryDeviceList(current = 1) {
        this.current = current;
        device.getPageOnConditional(this.deviceQuery, this.current, this.limit)
          .then(res => {
            this.deviceList = res.data.deviceList;
            this.total = res.data.total;
            this.loading = false
          })
          .catch(err => {
            console.log(err)
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
      getGalleryName(id) {
        for (const gallery of this.galleryList) {
          if(gallery.id == id) {
            return gallery.name
            break
          }
        }
      },
      editDeviceInfo(index, row) {
        console.log(index, row);
      },
      removeDevice(id) {
        this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          device.removeDevice(id)
            .then(res => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.queryDeviceList(1);
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: '删除失败!'
              });
            })
        })
      },

      //获取所有机场
      getAllAirport() {
        airport.getAllAirport().then(res=>{
          this.airportList = res.data.airportList
        })
      },
      //获取所有廊道
      getAllGallery() {
        gallery.getAllGallery().then(res=>{
          this.galleryList = res.data.galleryList
        })
      },

      deviceDetail(index, row) {
        let deviceId = row.deviceId;
        this.$router.push({name: "detail", params:{"id": deviceId}})
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      resetData() {
        this.deviceQuery = {}
        this.queryDeviceList(1)
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
