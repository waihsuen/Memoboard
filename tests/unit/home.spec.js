import { shallowMount, createLocalVue } from '@vue/test-utils'
import Home from '@/views/Home.vue'

describe('Home.vue', () => {
  let wrapper;
  const localVue = createLocalVue();

  it('renders props.msg when passed', () => {
    wrapper = shallowMount(Home, { localVue })
  })
  
  it('Page renders correctly', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  })
  
})
