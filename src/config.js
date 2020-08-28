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

export const setFormComponents = (components) => {
  Object.assign(formComponents, components)
}

export const getFormComponents = () => {
  return formComponents
}
