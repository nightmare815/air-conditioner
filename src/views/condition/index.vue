<template>
  <div class="app-container">
    <show-detail :status-manager="true" v-if="loadSuccess" :status="status" :disable="false" :text-color="textColor"></show-detail>
  </div>
</template>

<script>
  import condition from "@/api/air-condition/condition";
  import showDetail from "@/views/param/showDetail";
  import {mapGetters} from "vuex";
  import config from "@/api/air-condition/config";

  export default {
    name: "index",
    components: {
      showDetail
    },
    data() {
      return {
        loadSuccess: false,   //获取到status数据后置为true
        textColor: '#FFFFFF',
        deviceId: '',
        status:{}
      }
    },
    created() {
      if(this.$route.params.id) {
        this.deviceId = this.$route.params.id
        this.status.deviceId = this.deviceId
        this.getConditionInfo();
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
          that.getConditionInfo();
        },config.DELAY)
      }
    },
    methods: {
      getConditionInfo() {
        condition.getConditionInfo(this.deviceId).then(res => {
          //传递数据时, 要先解码, 将0和1转换为false和true
          this.status = this.formatPageParam(res.data.status)
          this.loadSuccess = true
        })
        .catch(err => {
          console.log(err)
        })
      },
      submit() {

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
    }
  }
</script>

<style scoped>

</style>
