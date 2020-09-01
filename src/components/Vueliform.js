import { validationMixin } from 'vuelidate'
import {
  getFormComponents,
  getFormValidators
} from '../config'

const LAYOUT_TYPES = ['container', 'row', 'formRow', 'col']

export default {
  name: 'Vueliform',
  mixins: [
    validationMixin
  ],
  props: {
    btnReset: {
      type: Boolean,
      default: false
    },
    btnResetLabel: {
      type: String,
      default: 'Reset'
    },
    btnResetVariant: {
      type: String,
      default: 'secondary'
    },
    btnSubmitLabel: {
      type: String,
      default: 'Submit'
    },
    btnSubmitVariant: {
      type: String,
      default: 'primary'
    },
    components: {
      type: Object,
      default: () => ({})
    },
    description: {
      type: String
    },
    schema: {
      type: Array,
      required: true
    },
    title: {
      type: String
    },
    validators: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      useComponents: {
        ...getFormComponents(),
        ...this.components
      },
      useValidators: {
        ...getFormValidators(),
        ...this.validators
      },
      updates: {}
    }
  },
  watch: {
    updates: {
      deep: true,
      handler (val) {
        this.$emit('change', val)
      }
    }
  },
  validations () {
    const validationsData = {
      updates: {}
    }

    this.schema.forEach((field) => {
      const { if: condition, name, validations } = field

      if (!validations) {
        return
      }

      const v = validationsData.updates[name] || {}

      Object.keys(validations).forEach((validationName) => {
        let validator = this.useValidators[validationName]
        let params = validations[validationName]

        // special handling
        if (validationName === 'required' && condition) {
          validator = this.useValidators.requiredIf
          params = () => this.checkIfPass(field, false)
        } else if (validationName === 'requiredIf') {
          params = () => this.checkIfPass(field, false, validations[validationName])
        }

        if (!validator) {
          // TODO: should we throw an error?
          return
        }

        // user must pass in correct params (an array for multiple arguments) to the schema
        v[validationName] = validator.withParams
          ? validator.fn(...(Array.isArray(params) ? params : [params]))
          : validator.fn
      })

      if (Object.keys(v).length !== 0) {
        validationsData.updates[name] = v
      }
    })

    return validationsData
  },
  render (h) {
    return h(this.useComponents.form, {
      props: { novalidate: true },
      on: {
        submit: (e) => {
          e.preventDefault()

          if (this.$v.$invalid) {
            this.$v.$touch()
            return
          }

          this.$v.$reset()
          this.$emit('submit', this.updates)
        }
      }
    }, [
      this.renderHeader(h),
      this.renderFields(h),
      this.renderFooter(h)
    ])
  },
  methods: {
    renderHeader (h) {
      let children = []

      if (this.title) {
        children.push(h(this.useComponents.title, this.title))
      }

      if (this.description) {
        children.push(h(this.useComponents.description, {
          class: 'text-muted'
        }, this.description))
      }

      if (this.$scopedSlots.header) {
        children = this.$scopedSlots.header({
          title: this.title,
          description: this.description
        }, children)
      }

      return h('header', children)
    },
    renderFooter (h) {
      let children = [
        h(this.useComponents.button, {
          props: { type: 'submit', variant: this.btnSubmitVariant }
        }, this.btnSubmitLabel)
      ]
      const reset = () => {
        this.$v.$reset()
        this.updates = {}
      }

      if (this.btnReset) {
        children.push(h(this.useComponents.button, {
          class: 'ml-2',
          props: { type: 'reset', variant: this.btnResetVariant },
          on: { click: reset }
        }, this.btnResetLabel))
      }

      if (this.$scopedSlots.footer) {
        children = this.$scopedSlots.footer({ reset }, children)
      }

      return h('footer', children)
    },
    renderFields (h) {
      return this.schema.map((field) => {
        return this.renderField(h, field)
      })
    },
    renderField (h, field) {
      const { label = '', type } = field
      let component = null

      if (type === 'divider') {
        component = h(this.useComponents.divider)
      } else if (this.checkIfPass(field)) {
        if (type === 'grid') {
          component = this.renderGrid(h, field)
        } else if (LAYOUT_TYPES.indexOf(type) !== -1) {
          component = this.renderLayout(h, field)
        } else {
          component = this.renderFormGroup(h, field)
        }
      }

      return component
    },
    renderGrid (h, field) {
      const layout = {
        type: 'container',
        fluid: true,
        children: [
          {
            type: 'formRow',
            children: field.children.map((child) => {
              return {
                type: 'col',
                sm: true,
                children: child
              }
            })
          }
        ]
      }

      return this.renderLayout(h, layout)
    },
    renderLayout(h, field) {
      const { children, type, ...props } = field
      const childFields = Array.isArray(children) ? children : [children]

      return h(this.useComponents[type], {
        // this is to align with the form consistently
        class: type === 'container' ? 'px-0' : '',
        props
      }, childFields.map((field) => {
        return this.renderField(h, field)
      }))
    },
    renderFormGroup (h, field) {
      const {
        description = '',
        label = '',
        name,
        type,
        value
      } = field
      const currentValue = this.updates[name]
      let shouldRenderLabel = true

      if (currentValue === null || currentValue === undefined && value) {
        // use default value from the schema
        this.$set(this.updates, name, value)
      }

      let component = null

      if (type === 'checkbox') {
        if (!field.options) {
          // NOTE: label will be inlined for single checkbox
          shouldRenderLabel = false
        }

        component = this.renderFormCheckbox(h, field)
      } else if (type === 'radio') {
        component = this.renderFormRadio(h, field)
      } else if (type === 'textarea') {
        component = this.renderFormTextarea(h, field)
      } else if (type === 'select') {
        component = this.renderFormSelect(h, field)
      } else if (type === 'tags') {
        component = this.renderFormTags(h, field)
      } else if (type === 'rating') {
        component = this.renderFormRating(h, field)
      } else if (type === 'spinbutton') {
        component = this.renderFormSpinbutton(h, field)
      } else if (type === 'datepicker') {
        component = this.renderFormDatepicker(h, field)
      } else if (type === 'timepicker') {
        component = this.renderFormTimepicker(h, field)
      } else if (this.useComponents[type]) {
        component = this.renderCustomComponent(h, field)
      } else {
        component = this.renderFormInput(h, field)
      }

      const state = this.$v.updates[name] && this.$v.updates[name].$error ? false: null
      const children = [
        component,
        h(this.useComponents.invalidFeedback, {
          props: { state }
        }, this.getValidationMessages(field).join('<br>'))
      ]

      if (shouldRenderLabel) {
        children.unshift(h('template', { slot: 'label' }, this.renderLabel(h, field)))
      }

      return h(this.useComponents.formGroup, {
        props: { description }
      }, children)
    },
    renderLabel (h, field) {
      const { label, validations = {} } = field
      const children = [label]

      if (validations.required) {
        children.push(h('span', { class: 'ml-1 text-danger' }, '*'))
      }

      return children
    },
    renderFormCheckbox (h, field) {
      const { options, value } = field
      const data = this.getComponentData({
        field,
        vModelProp: 'checked',
        vModelEvent: 'input'
      })

      if (options) {
        data.props.options = options

        return h(this.useComponents.checkboxGroup, data)
      }

      // NOTE: expecting label to be user-defined for single checkbox
      return h(this.useComponents.checkbox, data, this.renderLabel(h, field))
    },
    renderFormInput (h, field) {
      const data = this.getComponentData({
        field,
        vModelProp: 'value',
        vModelEvent: 'update'
      })

      if (field.type === 'number') {
        data.props.number = true
        data.props.type = 'number'
      }

      return h(this.useComponents.input, data)
    },
    renderFormRadio (h, field) {
      const { options, value } = field
      const data = this.getComponentData({
        field,
        vModelProp: 'checked',
        vModelEvent: 'input'
      })

      data.props.options = options

      return h(this.useComponents.radioGroup, data)
    },
    renderFormTextarea (h, field) {
      return h(this.useComponents.textarea, this.getComponentData({
        field,
        vModelProp: 'value',
        vModelEvent: 'update'
      }))
    },
    renderFormSelect (h, field) {
      const { name, placeholder } = field
      const { optionsMap, ...filteredField } = field
      const data = this.getComponentData({
        field: filteredField,
        vModelProp: 'value',
        vModelEvent: 'input'
      })

      if (optionsMap) {
        const targetValue = this.updates[optionsMap.name]

        data.props.options = optionsMap.options[targetValue] || []
      }

      if (placeholder) {
        data.props.options = [...data.props.options]
        data.props.options.unshift({
          text: placeholder
        })
        data.class = {
          'text-muted': this.updates[name] === null || this.updates[name] === undefined
        }
      }

      return h(this.useComponents.select, data)
    },
    renderFormTags (h, field) {
      return h(this.useComponents.tags, this.getComponentData({
        field,
        vModelProp: 'value',
        vModelEvent: 'input'
      }))
    },
    renderFormRating (h, field) {
      return h(this.useComponents.rating, this.getComponentData({
        field,
        vModelProp: 'value',
        vModelEvent: 'change'
      }))
    },
    renderFormSpinbutton (h, field) {
      return h(this.useComponents.spinbutton, this.getComponentData({
        field,
        vModelProp: 'value',
        vModelEvent: 'input'
      }))
    },
    renderFormDatepicker (h, field) {
      return h(this.useComponents.datepicker, this.getComponentData({
        field,
        vModelProp: 'value',
        vModelEvent: 'input'
      }))
    },
    renderFormTimepicker (h, field) {
      return h(this.useComponents.timepicker, this.getComponentData({
        field,
        vModelProp: 'value',
        vModelEvent: 'input'
      }))
    },
    renderCustomComponent(h, field) {
      return h(this.useComponents[field.type], this.getComponentData({
        field,
        vModelProp: 'value',
        vModelEvent: 'input'
      }))
    },
    getComponentData ({ field, vModelProp, vModelEvent }) {
      // omit props specific to b-form-group/vueliform
      // and pass everything else (to support all props per component)
      const {
        label,
        description,
        if: condition,
        type,
        validations,
        validationFeedbacks,
        ...props
      } = field
      const { name } = props

      props[vModelProp] = this.updates[name]
      props.state = this.$v.updates[name] && this.$v.updates[name].$error ? false: null

      return {
        props,
        on: {
          [vModelEvent]: (value) => {
            this.$set(this.updates, name, value)
          }
        }
      }
    },
    getValidationMessages (field) {
      const { name, validations = {}, validationFeedbacks = {} } = field
      const messages = []
      const $v = this.$v.updates[name]

      if (!$v || !$v.$error) {
        return messages
      }

      Object.keys(validations).forEach((validationName) => {
        if ($v[validationName] === false) {
          const validator = this.useValidators[validationName]
          let message = validationFeedbacks[validationName] || validator.feedback

          if (validator.withParams) {
            let params = validations[validationName]
            params = Array.isArray(params) ? params : [params]

            // TODO: should we use a library for this?
            // TODO: support custom sigil (instead of just $)
            params.forEach((param, i) => {
              message = message.replace(new RegExp('\\\$\\\{' + i + '\\\}', 'g'), param)
            })
          }

          messages.push(message)
        }
      })

      return messages
    },
    checkIfPass (field, resetValue = true, condition = field.if) {
      let pass = true

      if (typeof condition === 'string') {
        const value = this.updates[condition]

        pass = !!(Array.isArray(value) ? value.length : value)
      }
      // TODO: support "if" with operators

      if (!pass && resetValue) {
        // clear existing value if there is any
        this.resetValue(field)
      }

      return pass
    },
    resetValue (field) {
      let { children, name } = field

      if (!children) {
        this.$set(this.updates, name, null)
      } else {
        children = Array.isArray(children) ? children : [children]

        children.forEach((child) => {
          this.resetValue(child)
        })
      }
    }
  }
}
