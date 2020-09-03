import { action } from '@storybook/addon-actions'
import { object } from '@storybook/addon-knobs'
import { withPadding } from './utils'
import Vueliform from '../src/components/Vueliform'
import { actionsData } from './01-Form.stories'

export default {
  title: 'Layout',
  excludeStories: /.*Data$/,
  decorators: [withPadding]
}

export const AutoGrid = () => ({
  components: { Vueliform },
  template: '<Vueliform :description="description" :schema="schema" @submit="onSubmit" @change="onChange"/>',
  props: {
    description: {
      default: 'Using a grid will auto-contruct the necessary container (fluid), form-row, and cols (with "sm" breakpoint)'
    },
    schema: {
      default: () => object('schema', [
        {
          type: 'grid',
          children: [
            { name: 'name', label: 'Name' },
            { name: 'birthday', label: 'Birthday', type: 'datepicker' },
            { name: 'age', label: 'Age', type: 'number' }
          ]
        }
      ])
    }
  },
  methods: actionsData
})

export const Manual = () => ({
  components: { Vueliform },
  template: '<Vueliform :description="description" :schema="schema" @submit="onSubmit" @change="onChange"/>',
  props: {
    description: {
      default: 'https://bootstrap-vue.org/docs/components/layout'
    },
    schema: {
      default: () => object('schema', [
        {
          type: 'container',
          fluid: true,
          children: [
            {
              type: 'row',
              children: [
                {
                  type: 'col',
                  sm: true,
                  children: [{ name: 'name', label: 'Name' }]
                },
                {
                  type: 'col',
                  sm: true,
                  children: { name: 'nickname', label: 'Nickname' }
                }
              ]
            },
            {
              type: 'formRow',
              children: [
                {
                  type: 'col',
                  sm: '8',
                  children: { name: 'birthday', label: 'Birthday', type: 'datepicker' }
                },
                {
                  type: 'col',
                  sm: '4',
                  children: { name: 'age', label: 'Age', type: 'number' }
                }
              ]
            }
          ]
        }
      ])
    }
  },
  methods: actionsData
})
