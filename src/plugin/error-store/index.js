export default {
  install (Vue, options) {
    if (options.developmentOff && process.env.NODE_ENV === 'development') return
    Vue.config.errorHandler = (error, vm, mes) => {
      console.log('errorHandle', error, vm, mes)
      // let info = {
      //   type: 'script',
      //   code: 0,
      //   mes: error.message,
      //   url: window.location.href
      // }
      // Vue.nextTick(() => {
      // })
    }
  }
}
