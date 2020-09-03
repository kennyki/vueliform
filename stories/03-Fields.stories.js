import { action } from '@storybook/addon-actions'
import { object } from '@storybook/addon-knobs'
import { withPadding } from './utils'
import Vueliform from '../src/components/Vueliform'
import { actionsData } from './01-Form.stories'

export default {
  title: 'Fields',
  excludeStories: /.*Data$/,
  decorators: [withPadding]
}

export const Input = () => ({
  components: { Vueliform },
  template: '<Vueliform :description="description" :schema="schema" @submit="onSubmit" @change="onChange"/>',
  props: {
    description: {
      default: 'https://bootstrap-vue.org/docs/components/form-input'
    },
    schema: {
      default: () => object('schema', [
        {
          name: 'name',
          label: 'Name',
          type: 'input',
          placeholder: 'Enter name',
          description: 'This is the default type if unspecified',
          value: 'John Doe'
        },
        {
          name: 'age',
          label: 'Age',
          type: 'number',
          description: 'Convert value to native number'
        }
      ])
    }
  },
  methods: actionsData
})

export const Textarea = () => ({
  components: { Vueliform },
  template: '<Vueliform :description="description" :schema="schema" @submit="onSubmit" @change="onChange"/>',
  props: {
    description: {
      default: 'https://bootstrap-vue.org/docs/components/form-textarea'
    },
    schema: {
      default: () => object('schema', [
        {
          name: 'address',
          label: 'Address',
          type: 'textarea',
          rows: 3
        }
      ])
    }
  },
  methods: actionsData
})

export const Radio = () => ({
  components: { Vueliform },
  template: '<Vueliform :description="description" :schema="schema" @submit="onSubmit" @change="onChange"/>',
  props: {
    description: {
      default: 'https://bootstrap-vue.org/docs/components/form-radio'
    },
    schema: {
      default: () => object('schema', [
        {
          name: 'gender',
          label: 'Gender',
          type: 'radio',
          options: ['Male', 'Female'],
          value: 'Male'
        },
        {
          name: 'drink',
          label: 'Do you drink alcohol?',
          type: 'radio',
          options: [{ value: true, text: 'Yes' }, { value: false, text: 'No' }],
          // TODO: figure out why false doesn't work
          value: true
        }
      ])
    }
  },
  methods: actionsData
})

export const Checkbox = () => ({
  components: { Vueliform },
  template: '<Vueliform :description="description" :schema="schema" @submit="onSubmit" @change="onChange"/>',
  props: {
    description: {
      default: 'https://bootstrap-vue.org/docs/components/form-checkbox'
    },
    schema: {
      default: () => object('schema', [
        {
          name: 'like_fruits',
          label: 'I like fruits',
          type: 'checkbox',
          value: true
        },
        {
          name: 'online_purchase',
          label: 'I shop for fruits online',
          type: 'checkbox',
          value: 'yes',
          uncheckedValue: 'no'
        },
        {
          name: 'fruits',
          label: 'My favorite fruits',
          type: 'checkbox',
          options: ['Apple', 'Banana', 'Cherry', 'Durian'],
          value: ['Durian']
        },
        {
          name: 'eat_frequency',
          label: 'I eat fruits during',
          type: 'checkbox',
          options: [
            { text: 'Breakfast', value: 'breakfast' },
            { text: 'Lunch', value: 'lunch' },
            { text: 'Dinner', value: 'dinner' },
            { text: 'Supper', value: 'supper' }
          ],
          value: ['breakfast', 'dinner']
        }
      ])
    }
  },
  methods: actionsData
})

export const Select = () => ({
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
          options: ['Rice', 'Noodle', 'Meat', 'Vegetable', 'Fruit'],
          placeholder: '-- Choose a food --'
        },
        {
          name: 'drink',
          label: 'Drink',
          type: 'select',
          options: [{ value: 'coke', text: 'Coke' }, { value: 'juice', text: 'Juice' }, { value: 'coffee', text: 'Coffee' }],
          value: 'juice'
        }
      ])
    }
  },
  methods: actionsData
})

export const Tags = () => ({
  components: { Vueliform },
  template: '<Vueliform :description="description" :schema="schema" @submit="onSubmit" @change="onChange"/>',
  props: {
    description: {
      default: 'https://bootstrap-vue.org/docs/components/form-tags'
    },
    schema: {
      default: () => object('schema', [
        {
          name: 'frameworks',
          label: 'Javascript frameworks',
          placeholder: 'Add another...',
          type: 'tags',
          value: ['Vue']
        }
      ])
    }
  },
  methods: actionsData
})

export const Rating = () => ({
  components: { Vueliform },
  template: '<Vueliform :description="description" :schema="schema" @submit="onSubmit" @change="onChange"/>',
  props: {
    description: {
      default: 'https://bootstrap-vue.org/docs/components/form-rating'
    },
    schema: {
      default: () => object('schema', [
        {
          name: 'awesomeness',
          label: 'Awesomeness',
          type: 'rating',
          value: 4
        },
        {
          name: 'overall',
          label: 'Overall',
          type: 'rating',
          variant: 'warning',
          stars: 10,
          value: 5
        }
      ])
    }
  },
  methods: actionsData
})

export const Spinbutton = () => ({
  components: { Vueliform },
  template: '<Vueliform :description="description" :schema="schema" @submit="onSubmit" @change="onChange"/>',
  props: {
    description: {
      default: 'https://bootstrap-vue.org/docs/components/form-spinbutton'
    },
    schema: {
      default: () => object('schema', [
        {
          name: 'number',
          label: 'Roll a number',
          type: 'spinbutton',
          value: 8
        }
      ])
    }
  },
  methods: actionsData
})

export const Datepicker = () => ({
  components: { Vueliform },
  template: '<Vueliform :description="description" :schema="schema" @submit="onSubmit" @change="onChange"/>',
  props: {
    description: {
      default: 'https://bootstrap-vue.org/docs/components/form-datepicker'
    },
    schema: {
      default: () => object('schema', [
        {
          name: 'appointment_date',
          label: 'Appointment date',
          type: 'datepicker'
        }
      ])
    }
  },
  methods: actionsData
})

export const Timepicker = () => ({
  components: { Vueliform },
  template: '<Vueliform :description="description" :schema="schema" @submit="onSubmit" @change="onChange"/>',
  props: {
    description: {
      default: 'https://bootstrap-vue.org/docs/components/form-timepicker'
    },
    schema: {
      default: () => object('schema', [
        {
          name: 'appointment_time',
          label: 'Appointment time',
          type: 'timepicker'
        }
      ])
    }
  },
  methods: actionsData
})
