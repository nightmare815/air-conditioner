//获取某个空调的信息
import request from '@/utils/request'

export default {
  //获取空调最新状态
  getConditionInfo(deviceId) {
    return request({
      url: `/aircondition/condition/getConditionInfo/${deviceId}`,
      method: 'get',
    })
  },
  //提交空调状态修改
  publishMessage(status, sender) {
    return request({
      url: `/aircondition/msgsend/publishMessage/${sender}`,
      method: 'post',
      data: status
    })
  },
}
