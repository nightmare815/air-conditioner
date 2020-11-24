import request from '@/utils/request'

export default {

  //添加登机桥
  addAirportBridge(gallery) {
    return request({
      url: `/aircondition/airportbridge/addAirportBridge`,
      method: 'post',
      data: gallery
    })
  },
  //获取所有登机桥
  findAllAirportBridge() {
    return request({
      url: `/aircondition/airportbridge/findAllAirportBridge`,
      method: 'get',
    })
  },

  //分页查询登机桥
  getPageAirportBridge(current, limit) {
    return request({
      url: `/aircondition/airportbridge/getPageAirportBridge/${current}/${limit}`,
      method: 'get',
    })
  },
  //带条件分页查询
  getPageBridgeByCondition(current, limit, data) {
    return request({
      url: `/aircondition/airportbridge/getPageBridgeByCondition/${current}/${limit}`,
      method: 'post',
      data
    })
  },

  //修改登机桥信息
  editAirportBridge() {
    return request({
      url: `/aircondition/airportbridge/editAirportBridge`,
      method: 'post',
    })
  },
  //根据id删除登机桥
  deleteAirportBridge(id) {
    return request({
      url: `/aircondition/airportbridge/deleteAirportBridge/${id}`,
      method: 'delete',
    })
  },
}
