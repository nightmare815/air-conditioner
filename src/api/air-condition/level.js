import request from '@/utils/request'

export default {

  //获取卷帘门的状态
  getAllLevel() {
    return request({
      url: `/aircondition/levelrelation/getAllLevel`,
      method: 'get',
    })
  },
}
