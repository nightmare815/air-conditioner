<template>
  <div class="app-container">
    <div class="source">
      <el-tag type="danger" style="margin-right: 70px;width: 75px;text-align: center;font-size: 14px">卷闸门:
      </el-tag>
      <el-switch
        v-model="status.source"
        class="show-button"
        active-text="开启"
        inactive-text="关闭">
      </el-switch>
    </div>
  </div>
</template>

<script>
  import condition from "@/api/air-condition/condition";
  import config from "@/api/air-condition/config";

  export default {
    name: "gate",
    data() {
      return {
        gateNum: 638133070050,
        status:{}
      }
    },
    computed: {
      getLastMessageMillis() {
        return this.$store.state.onmessage.lastMessageMillis;
      }
    },

    //监听新消息到达, 查询数据库
    watch: {
      getLastMessageMillis(newVal, oldVal) {
        const that = this;
        let timer = setTimeout(() => {
          that.getGateState();
        },config.DELAY)
      }
    },
    created() {
      this.getGateState();
    },
    methods: {
      getGateState() {
        condition.getConditionInfo(this.gateNum).then(res => {
          let temp = res.data.status
          this.status = this.formatPageParam(temp)
        })
      },
      formatPageParam(obj) {		//将对象中的 0 || 1 转为false或者true
        // const boolKey = "source|sleep|power|light|dry|save"
        const boolKey = ['source', 'sleep', 'power', 'light', 'dry', 'save']
        for (let i in obj) {
          // if (boolKey.indexOf(i) != -1) {
          if (boolKey.includes(i)) {
            obj[i] = obj[i] == 0 ? false : true;
          }
        }
        return obj
      },
      enFormatPageParam(states) {		//将对象中的 false或者true转为0或1
        //由于obj和data中的pageParam引用的相同地址, 为了避免改变原数据, 需要把数据来回转化一下
        const obj = JSON.parse(JSON.stringify(states))
        const boolKey = ['source', 'sleep', 'power', 'light', 'dry', 'save']
        for (let i in obj) {
          if (boolKey.includes(i)) {
            obj[i] = obj[i] == false ? '0' : '1';
          }
        }
        //由于温度的计数器是number类型, 这里转换为string发出
        obj['temperature'] = obj['temperature'].toString()

        return obj
      },
    }
  }
</script>

<style scoped>
  .source {
    margin-top: 100px;
    text-align: center;
  }
</style>
