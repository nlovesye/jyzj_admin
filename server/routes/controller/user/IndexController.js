// 获取用户列表
const GET_ = async (ctx, next) => {
  // const { ...permission } = ctx.request.body
  const ret = await ctx.service.user.findAll({})
  if (ret) {
    ctx.retJson(ret)
  } else {
    ctx.retErr('服务器错误!')
  }
}

module.exports = {
  GET_
}
