import request from '@/utils/request'

export default {

  //获取卷帘门的状态
  getPageGateStates(current, limit) {
    return request({
      url: `/aircondition/gate/getGateStates/${current}/${limit}`,
      method: 'get',
    })
  },

  //改变卷帘门的状态
  updateGateStatus(data, sender) {
    return request({
      url: `/aircondition/gate/updateGateStatus/${sender}`,
      method: 'post',
      data
    })
  },

  //带条件分页查询
  getPageGateByCondition(current, limit, data) {
    return request({
      url: `/aircondition/gate/getPageGateByCondition/${current}/${limit}`,
      method: 'post',
      data
    })
  },

  //添加卷帘门
  addGate(data) {
    return request({
      url: `/aircondition/gate/addGate`,
      method: 'post',
      data
    })
  },
  //删除卷帘门
  deleteGateById(gateId) {
    return request({
      url: `/aircondition/gate/deleteGateById/${gateId}`,
      method: 'delete',
    })
  }
}
