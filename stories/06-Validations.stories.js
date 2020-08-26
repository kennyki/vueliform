import { action } from '@storybook/addon-actions'
import Vueliform from '../src/components/Vueliform'
import { withKnobs, object, text } from '@storybook/addon-knobs'
import { withPadding } from './utils'
import { actionsData } from './01-Form.stories'

export default {
  title: 'Validations',
  excludeStories: /.*Data$/,
  decorators: [withPadding, withKnobs]
}

export const Required = () => ({
  components: { Vueliform },
  template: '<Vueliform :description="description" :schema="schema" @submit="onSubmit" @change="onChange"/>',
  props: {
    description: {
      default: 'Click submit button to trigger form validations'
    },
    schema: {
      default: () => object('schema', [
        { name: 'name', label: 'Name', required: true }
      ])
    }
  },
  methods: actionsData
})

export const CustomFeedbacks = () => ({
  components: { Vueliform },
  template: '<Vueliform :description="description" :schema="schema" @submit="onSubmit" @change="onChange"/>',
  props: {
    description: {
      default: 'Click submit button to trigger form validations'
    },
    schema: {
      default: () => object('schema', [
        {
          name: 'name',
          label: 'Name',
          required: true,
          feedbacks: {
            required: 'Please enter your name'
          }
        }
      ])
    }
  },
  methods: actionsData
})
