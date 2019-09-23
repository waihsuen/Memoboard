import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home.vue'
import Memos from '@/components/Memos'

describe('Home.vue', () => {
  let wrapper;
  it('renders props.msg when passed', () => {
    wrapper = shallowMount(Home, { Memos })
  })
  it('renders without errors', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  })
})
