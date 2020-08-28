import {
  setFormComponents,
  setFormValidators
} from './config'
import Vueliform from './components/Vueliform'

export { Vueliform }

export default {
  install (Vue, options) {
    if (options.formComponents) {
      setFormComponents(options.formComponents)
    }

    if (options.formValidators) {
      setFormValidators(options.formValidators)
    }

    Vue.component('Vueliform', Vueliform)
  }
}
