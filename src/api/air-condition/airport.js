import request from '@/utils/request'

export default {

  //添加机场
  addAirport(airport) {
    return request({
      url: `/aircondition/airport/addAirport`,
      method: 'post',
      data: airport
    })
  },
  //获取所有机场
  getAllAirport() {
    return request({
      url: `/aircondition/airport/findAllAirport`,
      method: 'get',
    })
  },

  //带条件分页查询
  getPageAirportByCondition(current, limit, data) {
    return request({
      url: `/aircondition/airport/getPageAirportByCondition/${current}/${limit}`,
      method: 'post',
      data
    })
  },

  //分页查询机场
  getPageAirport(current, limit) {
    return request({
      url: `/aircondition/airport/getPageAirport/${current}/${limit}`,
      method: 'get',
    })
  },
  //修改机场信息
  editAirport() {
    return request({
      url: `/aircondition/airport/editAirport`,
      method: 'post',
    })
  },
  //根据id删除机场
  removeAirport(id) {
    return request({
      url: `/aircondition/airport/deleteAirport/${id}`,
      method: 'delete',
    })
  },
}
