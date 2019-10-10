import config from '@/config'
import directives from './directives'

const { plugin } = config

export default (Vue) => {
  for (let name in plugin) {
    const value = plugin[name]
    Vue.use(require(`./${name}`).default, typeof value === 'object' ? value : undefined)
  }
  for (const name in directives) {
    const directive = directives[name]
    Vue.directive(name, directive)
  }
}
