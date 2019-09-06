// 匹配查找用户
const findUser = async (ctx, next, payload) => {
  try {
    const user = await ctx.mdb.findOne('user', payload)
    if (user) {
      return true
    } else {
      return false
    }
  } catch (error) {
    return false
  }
}

// 添加用户
const addUser = async (ctx, next, user) => {
  if (user) {
    const u = await ctx.mdb.findOne('user', { userName: user.userName })
    if (u) {
      ctx.retErr({
        message: '用户名已存在!'
      })
      return
    }
    await ctx.mdb.insert('user', user)
    ctx.retJson(user)
  } else {
    ctx.retErr({
      message: '用户名和密码必填'
    })
  }
}

// 获取用户信息
const getUserInfo = async (ctx, next, userName) => {
  const u = await ctx.mdb.findOne('user', { userName })
  return u
}

// 获取所有用户
const findAll = async (ctx, next) => {
  try {
    const list = await ctx.mdb.find('user', {})
    if (list) {
      return list
    } else {
      return false
    }
  } catch (error) {
    return false
  }
}

module.exports = {
  namespace: 'user',
  service: {
    addUser,
    findUser,
    findAll,
    getUserInfo
  }
}
