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
  required
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
