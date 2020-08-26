import _cloneDeep from 'lodash/cloneDeep'
import { mount } from '@vue/test-utils'
import { BFormCheckbox, BFormSelect } from 'bootstrap-vue'
import Vueliform from '../../src/components/Vueliform'

const schemaData = [
  { name: 'name', label: 'Name' }
]
const TEST = 'test'

it('renders default values if they are present', () => {
  const schema = _cloneDeep(schemaData)
  schema[0].value = TEST

  const wrapper = mount(Vueliform, {
    propsData: { schema }
  })

  expect(wrapper.vm.updates.name).toBe(TEST)
})

it('emits submit event with data', () => {
  const schema = _cloneDeep(schemaData)
  schema[0].value = TEST

  const wrapper = mount(Vueliform, {
    attachToDocument: true,
    propsData: { schema }
  })

  wrapper.find('button[type=submit]').trigger('click')

  const emitted = wrapper.emitted('submit')

  expect(emitted).toBeTruthy()
  expect(emitted[0][0].name).toBe(TEST)

  wrapper.destroy()
})

it('emits change event with data', async () => {
  const schema = _cloneDeep(schemaData)
  schema[0].value = 'abc'

  const wrapper = mount(Vueliform, {
    propsData: { schema }
  })

  wrapper.setData({ updates: { name: TEST } })

  await wrapper.vm.$nextTick()

  const emitted = wrapper.emitted('change')

  expect(emitted).toBeTruthy()
  expect(emitted[0][0].name).toBe(TEST)
})

it('does not watch over value prop reactively', async () => {
  const schema = _cloneDeep(schemaData)
  schema[0].value = TEST

  const wrapper = mount(Vueliform, {
    propsData: { schema }
  })

  wrapper.setData({ updates: { name: 'abc' } })

  await wrapper.vm.$nextTick()

  expect(wrapper.vm.updates.name).not.toBe(TEST)
})

it('performs validations on submit and abort if it fails', () => {
  const schema = _cloneDeep(schemaData)
  schema[0].required = true

  const wrapper = mount(Vueliform, {
    propsData: { schema }
  })

  wrapper.find('button[type=submit]').trigger('click')

  const emitted = wrapper.emitted('submit')

  expect(emitted).toBeFalsy()
})

it('casts number field\'s value', () => {
  const wrapper = mount(Vueliform, {
    propsData: {
      schema: [
        { name: 'age', label: 'Age', number: true }
      ]
    }
  })

  wrapper.find('input').setValue('1')

  expect(wrapper.vm.updates.age).toBe(1)
})

it('renders placeholder for select', () => {
  const placeholder = '-- Select --'
  const wrapper = mount(Vueliform, {
    propsData: {
      schema: [
        {
          name: 'alphabet',
          type: 'select',
          placeholder,
          options: ['A', 'B', 'C']
        }
      ]
    }
  })

  const option = wrapper.find('option')

  expect(option.attributes('value')).toBe('')
  expect(option.text()).toBe(placeholder)
})

it('supports dynamic options for select', async () => {
  const optionsA = [1, 2, 3]
  const optionsB = [4, 5, 6]
  const wrapper = mount(Vueliform, {
    propsData: {
      schema: [
        {
          name: 'alphabet',
          type: 'select',
          options: ['A', 'B', 'C']
        },
        {
          name: 'number',
          type: 'select',
          optionsMap: {
            name: 'alphabet',
            options: {
              'A': optionsA,
              'B': optionsB
            }
          }
        }
      ]
    }
  })

  const numberSelect = wrapper.findAllComponents(BFormSelect).at(1)

  expect(numberSelect.props('options')).toEqual([])

  wrapper.setData({ updates: { alphabet: 'A' } })
  await wrapper.vm.$nextTick()
  expect(numberSelect.props('options')).toEqual(optionsA)

  wrapper.setData({ updates: { alphabet: 'B' } })
  await wrapper.vm.$nextTick()
  expect(numberSelect.props('options')).toEqual(optionsB)

  wrapper.setData({ updates: { alphabet: 'C' } })
  await wrapper.vm.$nextTick()
  expect(numberSelect.props('options')).toEqual([])
})

it('supports "if" with truthy check on value (on length if value is an array)', async () => {
  const wrapper = mount(Vueliform, {
    propsData: {
      schema: [
        {
          name: 'had_breakfast',
          label: 'Have you eaten your breakfast?',
          type: 'checkbox'
        },
        {
          name: 'breakfast_food',
          label: 'What did you have?',
          type: 'checkbox',
          options: ['Bread'],
          if: 'had_breakfast'
        },
        {
          name: 'breakfast_quality',
          label: 'Was it good?',
          type: 'checkbox',
          if: 'breakfast_food'
        }
      ]
    }
  })

  expect(wrapper.findAllComponents(BFormCheckbox).length).toBe(1)

  wrapper.setData({ updates: { had_breakfast: true } })
  await wrapper.vm.$nextTick()

  expect(wrapper.findAllComponents(BFormCheckbox).length).toBe(2)

  wrapper.setData({ updates: { breakfast_food: ['Bread'] } })
  await wrapper.vm.$nextTick()
  expect(wrapper.findAllComponents(BFormCheckbox).length).toBe(3)

  wrapper.setData({ updates: { breakfast_food: [] } })
  await wrapper.vm.$nextTick()
  expect(wrapper.findAllComponents(BFormCheckbox).length).toBe(2)
})

it('clears existing field value when the depending "if" condition is falsy', async () => {
  const wrapper = mount(Vueliform, {
    propsData: {
      schema: [
        {
          name: 'had_breakfast',
          label: 'Have you eaten your breakfast?',
          type: 'checkbox',
          value: true
        },
        {
          name: 'breakfast_quality',
          label: 'Was it good?',
          type: 'checkbox',
          if: 'had_breakfast'
        }
      ]
    }
  })

  expect(wrapper.findAllComponents(BFormCheckbox).length).toBe(2)

  wrapper.setData({ updates: { breakfast_quality: true } })
  await wrapper.vm.$nextTick()

  wrapper.setData({ updates: { had_breakfast: false } })
  await wrapper.vm.$nextTick()

  expect(wrapper.vm.updates.breakfast_quality).toBe(null)
})
