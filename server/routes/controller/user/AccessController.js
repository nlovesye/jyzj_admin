const col = 'access-ele'

// 获取元素权限列表
const GET_eleList = async (ctx, next) => {
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

// 添加元素权限
const PUT_add = async (ctx, next) => {
  const json = ctx.request.body
  try {
    const ret = await ctx.mdb.findOne(col, { key: json.key })
    if (ret) {
      throw Error('key已存在')
    }
    const d = { ...json }
    await ctx.mdb.insert(col, d)
    ctx.retJson('操作成功')
  } catch (error) {
    ctx.retErr({
      message: error.message || '服务器出错!'
    })
  }
}

// 删除权限
const DELETE_del = async (ctx, next) => {
  const query = ctx.request.query
  try {
    await ctx.mdb.deleteOneById(col, query.id)
    ctx.retJson('操作成功')
  } catch (error) {
    ctx.retErr({
      message: '服务器出错!'
    })
  }
}

module.exports = {
  GET_eleList,
  PUT_add,
  DELETE_del
}
