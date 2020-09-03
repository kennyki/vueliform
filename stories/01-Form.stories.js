import { action } from '@storybook/addon-actions'
import { withKnobs, object, text, boolean } from '@storybook/addon-knobs'
import { withPadding } from './utils'
import Vueliform from '../src/components/Vueliform'

export default {
  title: 'Form',
  excludeStories: /.*Data$/,
  decorators: [withPadding, withKnobs]
}

export const actionsData = {
  onChange: action('onChange'),
  onSubmit: action('onSubmit')
}

export const Header = () => ({
  components: { Vueliform },
  template: '<Vueliform :title="title" :description="description" :schema="schema" @submit="onSubmit" @change="onChange"/>',
  props: {
    title: {
      default: () => text('title', 'This is the form title')
    },
    description: {
      default: () => text('description', 'Add a description if you like')
    },
    schema: {
      default: () => [
        { name: 'name', label: 'Name' }
      ]
    }
  },
  methods: actionsData
})

export const Divider = () => ({
  components: { Vueliform },
  template: '<Vueliform :schema="schema" @submit="onSubmit" @change="onChange"/>',
  props: {
    schema: {
      default: () => object('schema', [
        { name: 'name', label: 'Name' },
        { type: 'divider' }
      ])
    }
  },
  methods: actionsData
})

export const Footer = () => ({
  components: { Vueliform },
  template: '<Vueliform :schema="schema" :btn-submit-label="btnSubmitLabel" :btn-submit-variant="btnSubmitVariant" :btn-reset="btnReset" :btn-reset-label="btnResetLabel" :btn-reset-variant="btnResetVariant" @submit="onSubmit" @change="onChange"/>',
  props: {
    schema: {
      default: () => [
        { name: 'name', label: 'Name', value: 'John Doe' }
      ]
    },
    btnSubmitLabel: {
      default: () => text('btn-submit-label', 'Next')
    },
    btnSubmitVariant: {
      default: () => text('btn-submit-variant', 'outline-primary')
    },
    btnReset: {
      default: () => boolean('btn-reset', true)
    },
    btnResetLabel: {
      default: () => text('btn-reset-label', 'Try reset')
    },
    btnResetVariant: {
      default: () => text('btn-reset-variant', 'outline-secondary')
    }
  },
  methods: actionsData
})

export const Slots = () => ({
  components: { Vueliform },
  template: `<Vueliform title="Title is rendered within the header slot" description="Description as well" :schema="schema" @submit="onSubmit" @change="onChange">
    <template v-slot:header="{ title, description }">
      <h4 style="color: red">{{ title }}</h4>
      <p><em>{{ description }}</em></p>
    </template>
    <template v-slot:footer="{ reset }">
      <button type="submit">Custom submit</button>
      <button type="reset" @click="reset">Custom reset</button>
    </template>
  </Vueliform>
  `,
  props: {
    schema: {
      default: () => [
        { name: 'name', label: 'Name', value: 'John Doe' }
      ]
    }
  },
  methods: actionsData
})
