const config = require('../../config/db')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

/* Mongodb数据库类 */
class Db {
  /* 单例 */
  static getInstance () {
    if (!Db.instance) {
      Db.instance = new Db()
    }
    return Db.instance
  }
  /* 单例 */

  constructor () {
    this.dbClient = null
    this.connect()
  }

  /* 连接数据库 */
  async connect () {
    const pms = await new Promise((resolve, reject) => {
      if (!this.dbClient) {
        // console.log(2)
        MongoClient.connect(config.dbUrl, (err, client) => {
          if (err) {
            console.log(`----数据库连接失败----`)
            reject(err)
          } else {
            console.log(`----MongoDB数据库连接成功----数据库名称:[${config.dbName}]`)
            this.dbClient = client.db(config.dbName)
            resolve(this.dbClient)
          }
        })
      } else {
        // console.log(2)
        resolve(this.dbClient)
      }
    })
    return pms
  }
  /* 连接数据库 */

  /* 插入数据 */
  insert (cName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(cName).insertOne(json, (err, rt) => {
          if (err) {
            reject(err)
          } else {
            resolve(rt)
          }
        })
      })
    })
  }
  /* 插入数据 */

  /* 插入多条数据 */
  insertMany (cName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(cName).insertMany(json, (err, rt) => {
          if (err) {
            console.log('插入多条数据错误 insertMany>>>>>>>>>', err)
            reject(err)
          } else {
            resolve(rt)
          }
        })
      })
    })
  }
  /* 插入多条数据 */

  /* 查询数据 */
  find (cName, json = {}, projection = {}) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        let rt
        if (projection._limit) {
          rt = db.collection(cName).find(json, projection).skip(projection._skip || 0).limit(projection._limit)
        } else {
          rt = db.collection(cName).find(json, projection)
        }
        rt.toArray((err, docs) => {
          if (err) {
            console.log('查询出错----')
            reject(err)
          } else {
            resolve(docs)
          }
        })
      })
    })
  }
  /* 查询数据 */

  /* 查询一条数据 */
  findOne (cName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(async db => {
        try {
          let rt = await db.collection(cName).findOne(json)
          resolve(rt)
        } catch (error) {
          reject(error)
        }
      })
    })
  }
  /* 查询一条数据 */

  /* 更新数据 */
  updateOne (cName, targetJson, newJson) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(cName).updateOne(targetJson, {
          $set: newJson
        }, (err, rt) => {
          if (err) {
            console.log(err)
            reject(err)
          } else {
            resolve(rt)
          }
        })
      })
    })
  }
  /* 更新数据 */

  /* 删除数据 */
  remove (cName, targetJson) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(cName).removeOne(targetJson, (err, rt) => {
          if (err) {
            console.log('删除错误>>>>>>>>>', err)
            reject(err)
          } else {
            resolve(rt)
          }
        })
      })
    })
  }
  /* 删除数据 */

  /* 删除表数据 */
  removeMany (cName, targetJson) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(cName).remove(targetJson, (err, rt) => {
          if (err) {
            console.log('删除表数据>>>>>>>>>', err)
            reject(err)
          } else {
            resolve(rt)
          }
        })
      })
    })
  }
  /* 删除表数据 */

  /**
   * @description 根据id删除
   * @param {*} cName
   * @param {*} id
   */
  deleteOneById (cName, id) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(cName).removeOne({ _id: ObjectID(id) }, (err, rt) => {
          if (err) {
            console.log('删除错误 deleteOneById>>>>>>>>>', err)
            reject(err)
          } else {
            resolve(rt)
          }
        })
      })
    })
  }

  /**
   * @description 根据id更新数据
   * @param {*} cName
   * @param {*} id
   * @param {*} json
   */
  updateOneById (cName, id, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(cName).updateOne({ _id: ObjectID(id) }, { $set: json }, {}, (err, rt) => {
          if (err) {
            console.log('更新错误 updateOneById>>>>>>>>>', err)
            reject(err)
          } else {
            resolve(rt)
          }
        })
      })
    })
  }
}

module.exports = Db.getInstance()
