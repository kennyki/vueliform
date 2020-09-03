import { action } from '@storybook/addon-actions'
import Vueliform from '../src/components/Vueliform'
import { object, text } from '@storybook/addon-knobs'
import { withPadding } from './utils'
import { actionsData } from './01-Form.stories'

export default {
  title: 'Validations',
  excludeStories: /.*Data$/,
  decorators: [withPadding]
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

export const MinLength = () => ({
  components: { Vueliform },
  template: '<Vueliform :description="description" :schema="schema" @submit="onSubmit" @change="onChange"/>',
  props: {
    description: {
      default: '"minLength" works with string or array fields, e.g. "input", "textarea", "checkbox", "select" (with multiple mode), "tags"'
    },
    schema: {
      default: () => object('schema', [
        {
          name: 'name',
          label: 'Name',
          validations: {
            required: true,
            minLength: 3
          }
        },
        {
          name: 'favourite_food',
          label: 'Favourite food',
          type: 'checkbox',
          options: ['Rice', 'Bread', 'Noodle', 'Curry', 'Salad', 'Fruits'],
          validations: {
            required: true,
            minLength: 2
          }
        },
        {
          name: 'favourite_drinks',
          label: 'Favourite drinks',
          type: 'select',
          options: ['Coffee', 'Juice', 'Water'],
          multiple: true,
          validations: {
            required: true,
            minLength: 2
          }
        },
        {
          name: 'suggestions',
          label: 'Add at least 2 suggestions of food/drink',
          type: 'tags',
          validations: {
            required: true,
            minLength: 2
          }
        }
      ])
    }
  },
  methods: actionsData
})

export const MaxLength = () => ({
  components: { Vueliform },
  template: '<Vueliform :description="description" :schema="schema" @submit="onSubmit" @change="onChange"/>',
  props: {
    description: {
      default: '"maxLength" works with string or array fields, e.g. "input", "textarea", "checkbox", "select" (with multiple mode), "tags"'
    },
    schema: {
      default: () => object('schema', [
        {
          name: 'name',
          label: 'Name',
          validations: {
            required: true,
            maxLength: 10
          }
        },
        {
          name: 'favourite_food',
          label: 'Favourite food',
          type: 'checkbox',
          options: ['Rice', 'Bread', 'Noodle', 'Curry', 'Salad', 'Fruits'],
          validations: {
            required: true,
            maxLength: 2
          }
        },
        {
          name: 'favourite_drinks',
          label: 'Favourite drinks',
          type: 'select',
          options: ['Coffee', 'Juice', 'Water'],
          multiple: true,
          validations: {
            required: true,
            maxLength: 2
          }
        },
        {
          name: 'suggestions',
          label: 'Add not more than 2 suggestions of food/drink',
          type: 'tags',
          validations: {
            required: true,
            maxLength: 2
          }
        }
      ])
    }
  },
  methods: actionsData
})

export const MinValue = () => ({
  components: { Vueliform },
  template: '<Vueliform :description="description" :schema="schema" @submit="onSubmit" @change="onChange"/>',
  props: {
    description: {
      default: '"minValue" works with number fields, e.g. "input" (with number type), "rating", "spinbutton". Note: while it should work with "datepicker" field as well, we recommend to just use its "min" prop.'
    },
    schema: {
      default: () => object('schema', [
        {
          name: 'legal_age',
          label: 'Legal age',
          type: 'number',
          validations: {
            required: true,
            minValue: 18
          }
        },
        {
          name: 'rating',
          label: 'Rating',
          type: 'rating',
          validations: {
            required: true,
            minValue: 2
          }
        },
        {
          name: 'meals',
          label: 'Meals you had today',
          type: 'spinbutton',
          validations: {
            required: true,
            minValue: 2
          }
        }
      ])
    }
  },
  methods: actionsData
})

export const MaxValue = () => ({
  components: { Vueliform },
  template: '<Vueliform :description="description" :schema="schema" @submit="onSubmit" @change="onChange"/>',
  props: {
    description: {
      default: '"maxValue" works with number fields, e.g. "input" (with number type), "rating", "spinbutton". Note: while it should work with "datepicker" field as well, we recommend to just use its "max" prop.'
    },
    schema: {
      default: () => object('schema', [
        {
          name: 'children_age',
          label: 'Children age',
          type: 'number',
          validations: {
            required: true,
            maxValue: 12
          }
        },
        {
          name: 'rating',
          label: 'Rating',
          type: 'rating',
          validations: {
            required: true,
            maxValue: 4
          }
        },
        {
          name: 'meals',
          label: 'Meals you had today',
          type: 'spinbutton',
          validations: {
            required: true,
            maxValue: 3
          }
        }
      ])
    }
  },
  methods: actionsData
})

export const Between = () => ({
  components: { Vueliform },
  template: '<Vueliform :description="description" :schema="schema" @submit="onSubmit" @change="onChange"/>',
  props: {
    description: {
      default: '"between" works with number fields, e.g. "input" (with number type), "rating", "spinbutton". Note: while it should work with "datepicker" field as well, we recommend to just use its "min" and "max" props.'
    },
    schema: {
      default: () => object('schema', [
        {
          name: 'adult_age',
          label: 'Adult age',
          type: 'number',
          validations: {
            required: true,
            between: [18, 60]
          }
        }
      ])
    }
  },
  methods: actionsData
})

export const Alpha = () => ({
  components: { Vueliform },
  template: '<Vueliform :description="description" :schema="schema" @submit="onSubmit" @change="onChange"/>',
  props: {
    description: {
      default: 'Use "alpha" to allow only alphabets'
    },
    schema: {
      default: () => object('schema', [
        {
          name: 'name',
          label: 'Name',
          validations: {
            alpha: true
          }
        }
      ])
    }
  },
  methods: actionsData
})

export const AlphaNumeric = () => ({
  components: { Vueliform },
  template: '<Vueliform :description="description" :schema="schema" @submit="onSubmit" @change="onChange"/>',
  props: {
    description: {
      default: 'Use "alphaNum" to allow only alphabets and numerics'
    },
    schema: {
      default: () => object('schema', [
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          validations: {
            alphaNum: true
          }
        }
      ])
    }
  },
  methods: actionsData
})

export const Numeric = () => ({
  components: { Vueliform },
  template: '<Vueliform :description="description" :schema="schema" @submit="onSubmit" @change="onChange"/>',
  props: {
    description: {
      default: 'Use "numeric" to allow only numerics'
    },
    schema: {
      default: () => object('schema', [
        {
          name: 'phone',
          label: 'Phone number',
          validations: {
            numeric: true
          }
        }
      ])
    }
  },
  methods: actionsData
})

export const Integer = () => ({
  components: { Vueliform },
  template: '<Vueliform :description="description" :schema="schema" @submit="onSubmit" @change="onChange"/>',
  props: {
    description: {
      default: 'Use "integer" to allow only positive and negative integers'
    },
    schema: {
      default: () => object('schema', [
        {
          name: 'headcount',
          label: 'Headcount',
          validations: {
            integer: true
          }
        }
      ])
    }
  },
  methods: actionsData
})

export const Decimal = () => ({
  components: { Vueliform },
  template: '<Vueliform :description="description" :schema="schema" @submit="onSubmit" @change="onChange"/>',
  props: {
    description: {
      default: 'Use "decimal" to allow only positive and negative decimal numbers'
    },
    schema: {
      default: () => object('schema', [
        {
          name: 'price',
          label: 'Price',
          validations: {
            decimal: true
          }
        }
      ])
    }
  },
  methods: actionsData
})

export const Email = () => ({
  components: { Vueliform },
  template: '<Vueliform :description="description" :schema="schema" @submit="onSubmit" @change="onChange"/>',
  props: {
    description: {
      default: 'Use "email" to allow only email addresses'
    },
    schema: {
      default: () => object('schema', [
        {
          name: 'email',
          label: 'Email',
          validations: {
            email: true
          }
        }
      ])
    }
  },
  methods: actionsData
})

export const IPAddress = () => ({
  components: { Vueliform },
  template: '<Vueliform :description="description" :schema="schema" @submit="onSubmit" @change="onChange"/>',
  props: {
    description: {
      default: 'Use "ipAddress" to allow only IPv4 addresses'
    },
    schema: {
      default: () => object('schema', [
        {
          name: 'server_ip',
          label: 'Server IP address',
          validations: {
            ipAddress: true
          }
        }
      ])
    }
  },
  methods: actionsData
})

export const MACAddress = () => ({
  components: { Vueliform },
  template: '<Vueliform :description="description" :schema="schema" @submit="onSubmit" @change="onChange"/>',
  props: {
    description: {
      default: 'Use "macAddress" to allow only MAC addresses, i.e. 00:1B:44:11:3A:B7. Defaults to ":" seperator'
    },
    schema: {
      default: () => object('schema', [
        {
          name: 'sender_mac',
          label: 'Sender MAC address',
          validations: {
            macAddress: true
          }
        },
        {
          name: 'receiver_mac',
          label: 'Receiver MAC address',
          description: 'This requires a format without the colon, i.e. 001B44113AB7',
          validations: {
            macAddress: ''
          }
        }
      ])
    }
  },
  methods: actionsData
})

export const SameAs = () => ({
  components: { Vueliform },
  template: '<Vueliform :description="description" :schema="schema" @submit="onSubmit" @change="onChange"/>',
  props: {
    description: {
      default: 'Use "sameAs" to match values'
    },
    schema: {
      default: () => object('schema', [
        {
          name: 'password',
          label: 'Password',
          type: 'password',
          validations: {
            required: true
          }
        },
        {
          name: 'repeat_password',
          label: 'Repeat password',
          type: 'password',
          validations: {
            required: true,
            sameAs: 'password'
          }
        }
      ])
    }
  },
  methods: actionsData
})

export const URL = () => ({
  components: { Vueliform },
  template: '<Vueliform :description="description" :schema="schema" @submit="onSubmit" @change="onChange"/>',
  props: {
    description: {
      default: 'Use "url" to allow only URLs'
    },
    schema: {
      default: () => object('schema', [
        {
          name: 'website',
          label: 'Website',
          validations: {
            url: true
          }
        }
      ])
    }
  },
  methods: actionsData
})
