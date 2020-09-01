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
      default: 'Using "required" validation on a field with "if". In this example, you can submit the form until the nickname field appears'
    },
    schema: {
      default: () => object('schema', [
        {
          name: 'name',
          label: 'Name'
        },
        {
          if: 'name',
          name: 'nickname',
          label: 'Nickname',
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
      default: 'Using "requiredIf". In this example, the comments field is only required when the agreement checkbox is checked'
    },
    schema: {
      default: () => object('schema', [
        {
          name: 'agreement',
          label: 'Agree to amendment',
          type: 'checkbox'
        },
        {
          name: 'comments',
          label: 'Comments',
          type: 'textarea',
          validations: {
            requiredIf: 'agreement'
          },
          description: 'Currently it only supports truthy check. Operators support will come soon.'
        }
      ])
    }
  },
  methods: actionsData
})

export const RequiredUnless = () => ({
  components: { Vueliform },
  template: '<Vueliform :description="description" :schema="schema" @submit="onSubmit" @change="onChange"/>',
  props: {
    description: {
      default: 'Using "requiredUnless". In this example, the comments field is required unless the agreement checkbox is checked'
    },
    schema: {
      default: () => object('schema', [
        {
          name: 'agreement',
          label: 'Agree to amendment',
          type: 'checkbox'
        },
        {
          name: 'comments',
          label: 'Comments',
          type: 'textarea',
          validations: {
            requiredUnless: 'agreement'
          },
          description: 'Currently it only supports truthy check. Operators support will come soon.'
        }
      ])
    }
  },
  methods: actionsData
})
