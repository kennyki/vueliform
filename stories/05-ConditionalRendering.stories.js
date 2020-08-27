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
      default: 'Using "optionsMap"'
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

export const If = () => ({
  components: { Vueliform },
  template: '<Vueliform :description="description" :schema="schema" @submit="onSubmit" @change="onChange"/>',
  props: {
    description: {
      default: 'Using "if" on any field or layout. Defaults to truthy check on the value (on length if the value is an array)'
    },
    schema: {
      default: () => object('schema', [
        {
          name: 'had_breakfast',
          label: 'Have you eaten your breakfast?',
          type: 'checkbox'
        },
        {
          if: 'had_breakfast',
          name: 'breakfast_quality',
          label: 'Was it good?',
          type: 'checkbox'
        },
        {
          if: 'breakfast_quality',
          name: 'breakfast_food',
          label: 'What did you have?',
          type: 'checkbox',
          options: ['Bread', 'Noodle', 'Oat', 'Milkshake']
        },
        {
          if: 'breakfast_food',
          type: 'grid',
          children: [
            { name: 'brand', label: 'Brand' },
            { name: 'price', label: 'Price' }
          ]
        },
        {
          if: 'breakfast_food',
          type: 'container',
          fluid: true,
          children: [
            {
              type: 'formRow',
              children: [
                {
                  type: 'col',
                  sm: '6',
                  children: { name: 'quantity', label: 'Quantity' }
                },
                {
                  type: 'col',
                  sm: '6',
                  children: { name: 'rating', label: 'Rating', type: 'rating' }
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

// export const IfWithOperators = () => ({
//   components: { Vueliform },
//   template: '<Vueliform :description="description" :schema="schema" @submit="onSubmit" @change="onChange"/>',
//   props: {
//     description: {
//       default: 'Using "if" with operators'
//     },
//     schema: {
//       default: () => object('schema', [
//         {
//           name: 'had_breakfast',
//           label: 'Have you eaten your breakfast?',
//           type: 'checkbox'
//         },
//         {
//           name: 'breakfast_food',
//           label: 'What did you have for breakfast?',
//           type: 'radio',
//           options: ['Bread', 'Noodle', 'Oat', 'Milkshake'],
//           if: 'had_breakfast'
//         },
//         {
//           name: 'slices',
//           label: 'How many slices?',
//           type: 'number',
//           if: {
//             had_breakfast: true,
//             breakfast_food: { $eq: 'Bread' }
//           }
//         },
//         {
//           name: 'bowls',
//           label: 'How many bowls?',
//           type: 'number',
//           if: {
//             had_breakfast: true,
//             breakfast_food: { $in: ['Noodle', 'Oat'] }
//           }
//         },
//         {
//           name: 'temperature',
//           label: 'Served hot?',
//           type: 'checkbox',
//           if: {
//             had_breakfast: true,
//             $or: {
//               breakfast_food: { $eq: 'Noodle' },
//               breakfast_food: { $eq: 'Oat' }
//             }
//           }
//         }
//       ])
//     }
//   },
//   methods: actionsData
// })
