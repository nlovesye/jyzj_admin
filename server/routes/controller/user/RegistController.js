// 用户注册
const POST_ = async (ctx, next) => {
  let {
    userName,
    password,
    nickName
  } = ctx.request.body
  // console.log('regist', ctx.request.body)
  await ctx.service.user.addUser({ userName, password, nickName })
}

module.exports = {
  POST_
}
