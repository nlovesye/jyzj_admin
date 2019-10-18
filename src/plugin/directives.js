import store from '@/store'

export default {
  /**
   * 权限验证指令
   */
  verify: {
    inserted: function (el, { value }) {
      const { access } = store.state.user
      const isValid = access.filter(item => item.type === 'ele').some(item => item.key === value)
      // console.log('verify', store.state, access, value, isValid)
      if (isValid) {
        return
      }
      el.parentNode.removeChild(el)
    }
  }
}
