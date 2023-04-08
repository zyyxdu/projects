// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'iset-4gn377ux3077be62'
})   // 初始化 cloud

const db = cloud.database({ env: 'iset-4gn377ux3077be62' })
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const Post_id = event.youid
console.log(Post_id)
  return db.collection('locations').doc(Post_id).remove({
  }).then(res => { 
    console.log(res);
  },error=>{
    console.log(error);
  })
}