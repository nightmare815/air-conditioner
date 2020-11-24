import request from '@/utils/request'

export default {

  //添加航站楼
  addAirportStation(gallery) {
    return request({
      url: `/aircondition/station/addAirportStation`,
      method: 'post',
      data: gallery
    })
  },
  //获取所有航站楼
  findAllStation() {
    return request({
      url: `/aircondition/station/findAllStation`,
      method: 'get',
    })
  },

  //分页查询航站楼
  getPageAirportStation(current, limit) {
    return request({
      url: `/aircondition/station/getPageAirportStation/${current}/${limit}`,
      method: 'get',
    })
  },
  //带条件分页查询
  getPageStationByCondition(current, limit, data) {
    return request({
      url: `/aircondition/station/getPageStationByCondition/${current}/${limit}`,
      method: 'post',
      data
    })
  },

  //修改航站楼信息
  editAirportStation() {
    return request({
      url: `/aircondition/station/editAirportStation`,
      method: 'post',
    })
  },
  //根据id删除航站楼
  deleteAirportStation(id) {
    return request({
      url: `/aircondition/station/deleteAirportStation/${id}`,
      method: 'delete',
    })
  },
}
