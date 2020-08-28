import { setFormComponents } from './config'
import Vueliform from './components/Vueliform'

export { Vueliform }

export default {
  install (Vue, options) {
    if (options.formComponents) {
      setFormComponents(options.formComponents)
    }

    Vue.component('Vueliform', Vueliform)
  }
}
