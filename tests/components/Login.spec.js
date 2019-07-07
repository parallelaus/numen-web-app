import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Login from '@/components/core/Login'

describe('Component: core/Login', () => {
  let wrapper
  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuetify)
    wrapper = shallowMount(Login, { localVue })
  })

  test('renders correctly', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.element).toMatchSnapshot()
  })

  test('username required', () => {})
})
