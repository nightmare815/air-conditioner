<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true">
      <el-form-item label="检索">
        <el-input size="mini" v-model="gateQuery.key" clearable placeholder="请输入关键字">
        </el-input>
      </el-form-item>

      <el-form-item label="注册时间">
        <el-date-picker
          size="mini"
          v-model="gateQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          size="mini"
          v-model="gateQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button style="margin-top: 5px" size="mini" type="primary" @click="queryGateList()">
        查询
      </el-button>
      <el-button size="mini" type="default" @click="resetData()">清空</el-button>
      <el-button size="mini" style="background-color: #17B3A3;color: white" @click="addGate()">新增</el-button>
    </el-form>

    <el-table
      border
      fit
      v-loading="loading"
      highlight-current-row
      :data="gates"
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
        label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.gateStatus"
            :active-value="1"
            :inactive-value="0"
            :active-text="activeText"
            :inactive-text="inactiveText">
          </el-switch>
<!--          {{statusInfo[scope.row.gateStatus]}}-->
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="卷帘门名称">
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
            @click="deleteGate(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <div class="block">
      <el-pagination
        background
        @current-change="getPageGateStates"
        :current-page="current"
        :page-size="limit"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <!--新增卷帘门对话框-->
    <el-dialog
      title="新增卷帘门"
      :close-on-click-modal="false"
      :visible.sync="visible"
    >
      <el-form ref="gate" :model="gate" :rules="rules" label-width="100px">
        <el-form-item label="卷帘门名称" prop="name">
          <el-input v-model="gate.name" ></el-input>
        </el-form-item>
        <el-form-item label="绑定设备id" prop="name">
          <el-input v-model="gate.deviceId" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit('gate')">确定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
  import gate from "@/api/air-condition/gate";
  import {mapGetters} from "vuex";
  import config from "@/api/air-condition/config";

  export default {
    computed: {
      ...mapGetters([
        'name'
      ]),
      getLastMessageMillis() {
        return this.$store.state.onmessage.lastMessageMillis;
      }
    },
    //监听新消息到达, 查询数据库
    watch: {
      getLastMessageMillis(newVal, oldVal) {
        const that = this;
        let timer = setTimeout(() => {
          that.getPageGateStates();
        },config.DELAY)
      }
    },
    data() {
      return {
        visible:false,
        gateQuery:{},
        gate:{},
        gates:[],
        status: [],
        statusInfo:['关','开','正在开','正在关'],
        loading: 'true',
        current: 1,
        limit: 10,
        total: 0,
        activeText: '开',
        inactiveText: '关',
        rules: {
          name: [
            {required: true, message: '请输入卷帘门名称', trigger: 'blur'},
            {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
          ],
          deviceId:[
            {required: true, message: '请输入卷帘门绑定的设备id', trigger: 'blur'},
            {min: 8, max: 18, message: '长度在 8 到 18 个字符', trigger: 'blur'}
          ]
        },
      }
    },
    created() {
      this.getPageGateStates()
    },
    methods: {
      editBridgeInfo(index, row) {
        console.log(index, row);
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
      getPageGateStates(current = 1) {
        this.current = current
        gate.getPageGateStates(this.current, this.limit).then(res => {
          this.gates = res.data.records
          this.total = res.data.total;
          this.loading = false
        })
      },
      resetData() {
        this.gateQuery = {}
        this.getPageGateStates()
      },
      queryGateList(){
        gate.getPageGateByCondition(this.current, this.limit, this.gateQuery).then(res=>{
          this.gates = res.data.records
          this.total = res.data.total
        })
      },
      addGate(){
        this.visible = true;
      },
      dataFormSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.gate.addBy = this.name;
            gate.addGate(this.gate).then(res=>{
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
              this.gate = {}
              this.visible =false
              this.getPageGateStates()
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
      deleteGate(id) {
        this.$confirm('此操作将永久删除该卷帘门, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          gate.deleteGateById(id).then(res=>{
            this.$message({
              type:"success",
              message: "卷帘门删除成功"
            })
            this.getPageGateStates()
          })
            .catch(err => {
              this.$message({
                type: 'error',
                message: '删除失败!'
              });
            })
        })

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
