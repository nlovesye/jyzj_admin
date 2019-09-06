// 用户登录
const POST_ = async (ctx, next) => {
  let {
    userName,
    password
  } = ctx.request.body
  const user = await ctx.service.user.findUser({ userName, password })
  if (user) {
    const userInfo = await ctx.service.user.getUserInfo(userName)
    // console.log('user', Date.now(), userInfo)
    ctx.retJson({
      token: Date.now(),
      userName: userInfo.userName,
      nickName: userInfo.nickName
    })
  } else {
    ctx.retErr({
      message: '用户名或密码错误!'
    })
  }
}

module.exports = {
  POST_
}
