import request from '@/utils/request'

export default {

  //获取所有用户
  getAllUser() {
    return request({
      url: `/aircondition/user/getAllUser`,
      method: 'get',
    })
  },
}
