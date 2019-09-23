import { mount, shallowMount } from '@vue/test-utils'
import TrashedMemoHolder from "@/components/TrashedMemosHolder";

describe('TrashedMemoHolder.vue', () => {
  it('Renders props.msg when passed', () => {
    const msg = 'this is a test message'
    const wrapper = shallowMount(TrashedMemoHolder, {
      propsData: { msg }
    })

    expect(wrapper.text()).toMatch(msg)
  })

  test('Page renders correctly', () => {
    const wrapper = mount(TrashedMemoHolder)
    expect(wrapper.isVueInstance()).toBeTruthy();
    // NO NEED TO TAKE ANY SNAPSHOT AS THE PAGE ISN'T GOING TO BE STYLED
    //expect(wrapper.element).toMatchSnapshot()
  })
  
})
