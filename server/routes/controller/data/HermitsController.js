// 获取隐士门派列表
const GET_list = async (ctx, next) => {
  try {
    const list = await ctx.mdb.find('hermits', {})
    ctx.retJson(list)
  } catch (error) {
    ctx.retErr({
      message: '服务器出错!'
    })
  }
}

/**
 * 新增隐士门派
 */
const PUT_add = async (ctx, next) => {
  try {
    const hermits = ctx.request.body
    const isExist = await ctx.mdb.findOne('hermits', { name: hermits.name })
    if (isExist) {
      ctx.retErr({
        message: '门派已存在!'
      })
    } else {
      await ctx.mdb.insert('hermits', ctx.request.body)
      ctx.retJson('操作成功')
    }
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
const POST_save = async (ctx, next) => {
  try {
    const { _id, ...json } = ctx.request.body
    await ctx.mdb.updateOneById('hermits', _id, json)
    ctx.retJson('操作成功')
  } catch (error) {
    ctx.retErr({
      message: '服务器出错!'
    })
  }
}

/**
 * 删除隐士门派
 */
const DELETE_delete = async (ctx, next) => {
  try {
    await ctx.mdb.deleteOneById('hermits', ctx.request.body)
    ctx.retJson('操作成功')
  } catch (error) {
    ctx.retErr({
      message: '服务器出错!'
    })
  }
}

module.exports = {
  GET_list,
  PUT_add,
  DELETE_delete,
  POST_save
}
