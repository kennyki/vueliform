import { action } from '@storybook/addon-actions'
import { withKnobs, object } from '@storybook/addon-knobs'
import { withPadding } from './utils'
import Vueliform from '../src/components/Vueliform'
import { actionsData } from './01-Form.stories'

export default {
  title: 'Conditional Rendering',
  excludeStories: /.*Data$/,
  decorators: [withPadding, withKnobs]
}

export const SelectWithDynamicOptions = () => ({
  components: { Vueliform },
  template: '<Vueliform :description="description" :schema="schema" @submit="onSubmit" @change="onChange"/>',
  props: {
    description: {
      default: 'https://bootstrap-vue.org/docs/components/form-select'
    },
    schema: {
      default: () => object('schema', [
        {
          name: 'food',
          label: 'Food',
          type: 'select',
          options: ['Rice', 'Noodle'],
          placeholder: '-- Choose a food --'
        },
        {
          name: 'sauce',
          label: 'Sauce',
          description: 'The options will change depending on the selection of food',
          type: 'select',
          placeholder: '-- Choose a sauce after choosing your food --',
          optionsMap: {
            name: 'food',
            options: {
              'Rice': [{ value: 'soy', text: 'Soy Sauce' }, { value: 'tomato', text: 'Tomato sauce' }],
              'Noodle': [{ value: 'chili', text: 'Chili Sauce' }, { value: 'tomato', text: 'Tomato sauce' }]
            }
          }
        }
      ])
    }
  },
  methods: actionsData
})
