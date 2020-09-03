import { action } from '@storybook/addon-actions'
import { object } from '@storybook/addon-knobs'
import { withPadding } from './utils'
import Vueliform from '../src/components/Vueliform'
import { actionsData } from './01-Form.stories'

export default {
  title: 'Custom Fields',
  excludeStories: /.*Data$/,
  decorators: [withPadding]
}

export const CustomComponent = () => ({
  components: { Vueliform },
  template: `<div>
    <Vueliform :description="description" :components="components" :schema="schema" @submit="onSubmit" @change="onChange"/>
    <hr>
    <pre>
// pass in an object to the "components" prop
components: {
  customInput: {
    props: ['value', 'color'],
    render (h) {
      return h('input', {
        style: { color: this.color || '#333' },
        attrs: { value: this.value },
        on: {
          input: (e) => {
            this.$emit('input', e.target.value)
          }
        }
      })
    }
  }
}
    </pre>
  </div>`,
  props: {
    description: {
      default: 'Make sure the component supports the default v-model behaviour (has prop "value" and emits "input" event)'
    },
    schema: {
      default: () => object('schema', [
        { name: 'name', label: 'Name', value: 'John Doe', type: 'customInput', color: 'red' }
      ])
    },
    components: {
      default: () => ({
        customInput: {
          props: ['value', 'color'],
          render (h) {
            return h('input', {
              style: { color: this.color || '#333' },
              attrs: { value: this.value },
              on: {
                input: (e) => {
                  this.$emit('input', e.target.value)
                }
              }
            })
          }
        }
      })
    }
  },
  methods: actionsData
})

export const OverrideComponent = () => ({
  components: { Vueliform },
  template: `<div>
    <Vueliform :title="title" :description="description" :components="components" :schema="schema" @submit="onSubmit" @change="onChange"/>
    <hr>
    <pre>
// pass in an object to the "components" prop
components: {
  title: 'h4'
}
    </pre>
  </div>`,
  props: {
    title: {
      default: 'This title is overridden with the "components" prop from <h1> to a <h4>'
    },
    description: {
      default: 'Note: the prop is not watched so it\'s not reactive'
    },
    schema: {
      default: () => ([{ name: 'name', label: 'Name' }])
    },
    components: {
      default: () => object('components', { title: 'h4' })
    }
  },
  methods: actionsData
})

export const OverrideComponentGlobally = () => ({
  template: `<pre>
import VueliformPlugin from 'vueliform'

Vue.use(VueliformPlugin, {
  formComponents: {
    title: {
      render (h) {
        return h('h1', { style: 'color: red' }, this.$slots.default)
      }
    }
  }
})
  </pre>`
})
