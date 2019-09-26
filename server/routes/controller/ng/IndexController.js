/**
 * 批量新增内功
 */
const PUT_addBatch = async (ctx, next) => {
  try {
    const data = ctx.request.body
    // console.log('d', data)
    await ctx.mdb.insertMany('ng', data)
    ctx.retJson('操作成功')
  } catch (error) {
    console.log(error)
    ctx.retErr({
      message: '服务器出错!'
    })
  }
}

/**
 * @description 编辑
 * @param {*} ctx
 * @param {*} next
 */
// const POST_save = async (ctx, next) => {
//   try {
//     const { _id, ...json } = ctx.request.body
//     await ctx.mdb.updateOneById('hermits', _id, json)
//     ctx.retJson('操作成功')
//   } catch (error) {
//     ctx.retErr({
//       message: '服务器出错!'
//     })
//   }
// }

/**
 * 删除内功
 */
const DELETE_del = async (ctx, next) => {
  try {
    const query = ctx.request.query
    // console.log('d', query)
    await ctx.mdb.deleteOneById('ng', query.id)
    ctx.retJson('操作成功')
  } catch (error) {
    console.log(error)
    ctx.retErr({
      message: '服务器出错!'
    })
  }
}

/**
 * 删除内功ALL
 */
const DELETE_delAll = async (ctx, next) => {
  try {
    // const query = ctx.request.query
    // console.log('d', query)
    await ctx.mdb.removeMany('ng', {})
    ctx.retJson('操作成功')
  } catch (error) {
    console.log(error)
    ctx.retErr({
      message: '服务器出错!'
    })
  }
}

/**
 * 获取内功列表
 */
const GET_list = async (ctx, next) => {
  try {
    // const query = ctx.request.query
    // console.log('d', data)
    const res = await ctx.mdb.find('ng', {})
    ctx.retJson(res)
  } catch (error) {
    console.log(error)
    ctx.retErr({
      message: '服务器出错!'
    })
  }
}

module.exports = {
  PUT_addBatch,
  GET_list,
  DELETE_del,
  DELETE_delAll
}
