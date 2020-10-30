import request from '@/utils/request'

export default {

  //添加廊道
  addGallery(gallery) {
    return request({
      url: `/aircondition/gallery/addGallery`,
      method: 'post',
      data: gallery
    })
  },
  //获取所有廊道
  getAllGallery() {
    return request({
      url: `/aircondition/gallery/findAllGallery`,
      method: 'get',
    })
  },

  //分页查询廊道
  getPageGallery(current, limit) {
    return request({
      url: `/aircondition/gallery/getPageGallery/${current}/${limit}`,
      method: 'get',
    })
  },
  //修改廊道信息
  editGallery() {
    return request({
      url: `/aircondition/gallery/editGallery`,
      method: 'post',
    })
  },
  //根据id删除廊道
  removeGallery(id) {
    return request({
      url: `/aircondition/gallery/deleteGallery/${id}`,
      method: 'delete',
    })
  },
}
