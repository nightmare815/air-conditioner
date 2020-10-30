import request from '@/utils/request'

export default {

  //获取所有设备
  getAllDevice() {
    return request({
      url: `/aircondition/device/getAllDevice`,
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
}