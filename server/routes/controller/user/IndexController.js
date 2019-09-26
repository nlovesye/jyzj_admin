const col = 'user'

// 获取用户列表
const GET_list = async (ctx, next) => {
  // const { ...permission } = ctx.request.body
  try {
    const ret = await ctx.mdb.find(col, {})
    ctx.retJson(ret)
  } catch (error) {
    ctx.retErr({
      message: '服务器出错!'
    })
  }
}

module.exports = {
  GET_list
}
