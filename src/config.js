import {
  BButton,
  BContainer,
  BCol,
  BForm,
  BFormCheckbox,
  BFormCheckboxGroup,
  BFormDatepicker,
  BFormGroup,
  BFormInput,
  BFormInvalidFeedback,
  BFormRadioGroup,
  BFormRating,
  BFormRow,
  BFormSelect,
  BFormSpinbutton,
  BFormTags,
  BFormTextarea,
  BFormTimepicker,
  BRow
} from 'bootstrap-vue'
import {
  required,
  requiredIf,
  requiredUnless,
  minLength,
  maxLength,
  minValue,
  maxValue,
  between
} from 'vuelidate/lib/validators'

const formComponents = {
  form: BForm,
  title: 'h1',
  description: 'p',
  divider: 'hr',
  button: BButton,
  formGroup: BFormGroup,
  invalidFeedback: BFormInvalidFeedback,
  input: BFormInput,
  textarea: BFormTextarea,
  radioGroup: BFormRadioGroup,
  checkbox: BFormCheckbox,
  checkboxGroup: BFormCheckboxGroup,
  select: BFormSelect,
  tags: BFormTags,
  rating: BFormRating,
  spinbutton: BFormSpinbutton,
  datepicker: BFormDatepicker,
  timepicker: BFormTimepicker,
  container: BContainer,
  row: BRow,
  formRow: BFormRow,
  col: BCol
}

const formValidators = {
  required: {
    fn: required,
    withParams: false,
    feedback: 'This field is required'
  },
  requiredIf: {
    fn: requiredIf,
    withParams: true,
    feedback: 'This field is required'
  },
  requiredUnless: {
    fn: requiredUnless,
    withParams: true,
    feedback: 'This field is required'
  },
  minLength: {
    fn: minLength,
    withParams: true,
    feedback: 'This field requires a minimum length of ${0}'
  },
  maxLength: {
    fn: maxLength,
    withParams: true,
    feedback: 'This field allows a maximum length of ${0}'
  },
  minValue: {
    fn: minValue,
    withParams: true,
    feedback: 'This field requires a minimum value of ${0}'
  },
  maxValue: {
    fn: maxValue,
    withParams: true,
    feedback: 'This field allows a maximum value of ${0}'
  },
  between: {
    fn: between,
    withParams: true,
    feedback: 'This field requires value between ${0} and ${1}'
  }
}

export const setFormComponents = (components) => {
  Object.assign(formComponents, components)
}

export const getFormComponents = () => {
  return formComponents
}

export const setFormValidators = (validators) => {
  Object.assign(formValidators, validators)
}

export const getFormValidators = () => {
  return formValidators
}
