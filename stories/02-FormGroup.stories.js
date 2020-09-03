import { action } from '@storybook/addon-actions'
import { object } from '@storybook/addon-knobs'
import { withPadding } from './utils'
import Vueliform from '../src/components/Vueliform'
import { actionsData } from './01-Form.stories'

export default {
  title: 'Form Group',
  excludeStories: /.*Data$/,
  decorators: [withPadding]
}

export const Label = () => ({
  components: { Vueliform },
  template: '<Vueliform :schema="schema" @submit="onSubmit" @change="onChange"/>',
  props: {
    schema: {
      default: () => object('schema', [
        { name: 'name', label: 'Full name' }
      ])
    }
  },
  methods: actionsData
})

export const Description = () => ({
  components: { Vueliform },
  template: '<Vueliform :schema="schema" @submit="onSubmit" @change="onChange"/>',
  props: {
    schema: {
      default: () => object('schema', [
        { name: 'name', label: 'Name', description: 'Describe something here' }
      ])
    }
  },
  methods: actionsData
})
