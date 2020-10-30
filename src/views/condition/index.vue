<template>
  <div class="app-container">
    <show-detail :status-manager="true" v-if="loadSuccess" :status="status" :disable="false" :text-color="textColor"></show-detail>
  </div>
</template>

<script>
  import condition from "@/api/air-condition/condition";
  import showDetail from "@/views/param/showDetail";

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
    methods: {
      getConditionInfo() {
        condition.getConditionInfo(this.deviceId).then(res => {
          this.status = res.data.status
          this.loadSuccess = true
          // console.log(this.status)
          // console.log(typeof this.status)
        })
        .catch(err => {
          console.log(err)
        })
      },
      submit() {

      }
    }
  }
</script>

<style scoped>

</style>
