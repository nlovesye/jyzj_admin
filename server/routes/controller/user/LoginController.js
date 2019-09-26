const colAccess = 'access-ele'

// 用户登录
const POST_ = async (ctx, next) => {
  let {
    userName,
    password
  } = ctx.request.body
  const user = await ctx.service.user.findUser({ userName, password })
  if (user) {
    const userInfo = await ctx.service.user.getUserInfo(userName)
    const allAccess = await ctx.mdb.find(colAccess)
    const access = allAccess.filter(item => item.roles.some(r => r === userInfo.role))
    // console.log('user', Date.now(), userInfo, access)
    ctx.retJson({
      token: Date.now(),
      userName: userInfo.userName,
      nickName: userInfo.nickName,
      access
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
