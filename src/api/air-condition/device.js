import request from '@/utils/request'

export default {

  //添加设备
  addDevice(device) {
    return request({
      url: `/aircondition/device/addDevice`,
      method: 'post',
      data: device
    })
  },
  //获取所有设备
  getAllDevice() {
    return request({
      url: `/aircondition/device/getAllDevice`,
      method: 'get',
    })
  },

  //获取单个设备
  getDeviceById(id) {
    return request({
      url: `/aircondition/device/getDeviceById/${id}`,
      method: 'get',
    })
  },

  //分页获取所有设备
  getPageDevice(current, limit) {
    return request({
      url: `/aircondition/device/getPageDevice/${current}/${limit}`,
      method: 'get',
    })
  },

  //分页根据条件获取设备
  getPageOnConditional(deviceQuery ,current, limit) {
    return request({
      url: `/aircondition/device/getPageConditional/${current}/${limit}`,
      method: 'post',
      data: deviceQuery
    })
  },
  //根据id删除设备
  removeDevice(id) {
    return request({
      url: `/aircondition/device/deleteDevice/${id}`,
      method: 'delete',
    })
  },
  //获取设备的历史修改记录
  getHistoryData(id) {
    return request({
      url: `/aircondition/msgsend/getHistoryData/${id}`,
      method: 'get',
    })
  },
  //获取设备收到的历史消息
  getReceiveMsg(id) {
    return request({
      url: `/aircondition/msgreceive/getReceiveMsg/${id}`,
      method: 'get',
    })
  },

  //条件分页获取设备的历史修改记录
  getHistoryDataByCondition(id, current, limit, data) {
    return request({
      url: `/aircondition/msgsend/getPageHistoryDataByCondition/${id}/${current}/${limit}`,
      method: 'post',
      data
    })
  },
  //条件分页获取设备收到的历史消息
  getReceiveMsgByCondition(id, current, limit, data) {
    return request({
      url: `/aircondition/msgreceive/getPageReceiveMsgByCondition/${id}/${current}/${limit}`,
      method: 'post',
      data
    })
  },

  //分页获取设备的历史修改记录
  getPageHistoryData(id, current, limit) {
    return request({
      url: `/aircondition/msgsend/getPageHistoryData/${id}/${current}/${limit}/`,
      method: 'get',
    })
  },
  //分页获取设备收到的历史消息
  getPageReceiveMsg(id, current, limit) {
    return request({
      url: `/aircondition/msgreceive/getPageReceiveMsg/${id}/${current}/${limit}/`,
      method: 'get',
    })
  },

  //批量删除历史修改消息
  deleteBatchHistoryModifyData(data) {
    return request({
      url: `/aircondition/msgsend/deleteBatchHistoryData/`,
      method: 'post',
      data
    })
  },

  //批量删除历史消息记录
  deleteBatchHistoryReceive(data) {
    return request({
      url: `/aircondition/msgreceive/deleteBatchHistoryReceive/`,
      method: 'post',
      data
    })
  },
}
