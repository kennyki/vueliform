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
        {
          name: 'name',
          label: 'Name',
          validations: {
            required: true
          }
        }
      ])
    }
  },
  methods: actionsData
})

export const RequiredWithIf = () => ({
  components: { Vueliform },
  template: '<Vueliform :description="description" :schema="schema" @submit="onSubmit" @change="onChange"/>',
  props: {
    description: {
      default: 'Click submit button to trigger form validations'
    },
    schema: {
      default: () => object('schema', [
        {
          name: 'id',
          label: 'ID',
          validations: {
            required: true
          }
        },
        {
          if: 'id',
          name: 'name',
          label: 'Name',
          validations: {
            required: true
          },
          description: 'The form cannot be submitted until this field has a value'
        }
      ])
    }
  },
  methods: actionsData
})

export const RequiredIf = () => ({
  components: { Vueliform },
  template: '<Vueliform :description="description" :schema="schema" @submit="onSubmit" @change="onChange"/>',
  props: {
    description: {
      default: 'Click submit button to trigger form validations'
    },
    schema: {
      default: () => object('schema', [
        {
          name: 'first_agreement',
          label: 'Agree to first amendment',
          type: 'checkbox'
        },
        {
          name: 'second_agreement',
          label: 'Agree to second amendment',
          type: 'checkbox',
          validations: {
            requiredIf: 'first_agreement'
          },
          description: 'Currently it only supports truthy check. Operators support will come soon.'
        }
      ])
    }
  },
  methods: actionsData
})
