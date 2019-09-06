'use strict'
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const db = require('./extend/db')
const setResponse = require('./extend/middleware/response')
const connectDb = require('./extend/middleware/mongoDB')
const setService = require('./extend/middleware/setService')
const router = require('./routes')
const path = require('path')

// error handler
onerror(app, {
  text: 'error!!!'
})

// middlewares
app.use(cors({
  credentials: true,
  allowMethods: ['GET', 'POST', 'OPTIONS', 'DELETE'],
  allowHeaders: ['Content-type', 'Authorization', 'Accept', 'x-access-token', 'anonymous']
}))
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(path.join(__dirname, '/static')))

// 返回数据格式中间件
app.use(setResponse())
// 连接mongoDB数据库
app.use(connectDb(db))
// service中间件
app.use(setService())

// 视图模板
app.use(views(path.join(__dirname, '/views'), {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 注入路由控制器
app.use(router.routes(), router.allowedMethods())

// error-handling
app.on('error', async (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
