import { action } from '@storybook/addon-actions'
import { helpers } from 'vuelidate/lib/validators'
import Vueliform from '../src/components/Vueliform'
import { object, text } from '@storybook/addon-knobs'
import { withPadding } from './utils'
import { actionsData } from './01-Form.stories'

export default {
  title: 'Custom Validations',
  excludeStories: /.*Data$/,
  decorators: [withPadding]
}

const equalLength = (equal) => {
  return helpers.withParams({ type: 'equalLength', equal }, (value) => {
    return !helpers.req(value) || helpers.len(value) === equal
  })
}

export const CustomValidator = () => ({
  components: { Vueliform },
  template: `<div>
    <Vueliform :description="description" :schema="schema" :validators="validators" @submit="onSubmit" @change="onChange"/>
    <hr>
    <pre>
import { helpers } from 'vuelidate/lib/validators'

// Vuelidate custom validator
const equalLength = (equal) => {
  return helpers.withParams({ type: 'equalLength', equal }, (value) => {
    return !helpers.req(value) || helpers.len(value) === equal
  })
}

// pass in an object to the "validators" prop
validators: {
  equalLength: {
    fn: equalLength,
    withParams: true,
    feedback: 'This field must have \$\{0\} characters'
  }
}
    </pre>
  </div>`,
  props: {
    description: {
      default: 'Compose a Vuelidate-compatible validator thru the "validators" prop'
    },
    schema: {
      default: () => object('schema', [
        {
          name: 'name',
          label: 'Name',
          validations: {
            required: true,
            equalLength: 10
          }
        }
      ])
    },
    validators: {
      default: () => ({
        equalLength: {
          fn: equalLength,
          withParams: true,
          feedback: 'This field must have ${0} characters'
        }
      })
    }
  },
  methods: actionsData
})

export const CustomFeedback = () => ({
  components: { Vueliform },
  template: '<Vueliform :description="description" :schema="schema" :validators="validators" @submit="onSubmit" @change="onChange"/>',
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
            required: true,
            equalLength: 10
          },
          validationFeedbacks: {
            required: 'Please enter your name',
            equalLength: 'Your name should have at least ${0} characters'
          }
        }
      ])
    },
    validators: {
      default: () => ({
        equalLength: {
          fn: equalLength,
          withParams: true,
          feedback: 'This field must have ${0} characters'
        }
      })
    }
  },
  methods: actionsData
})
