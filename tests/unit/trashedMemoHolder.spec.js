import { shallowMount } from '@vue/test-utils'
import TrashedMemoHolder from "@/components/TrashedMemosHolder";

describe('TrashedMemoHolder.vue', () => {
  it('Renders props.msg when passed', () => {
    const msg = 'this is a test message'
    const wrapper = shallowMount(TrashedMemoHolder, {
      propsData: { msg }
    })

    expect(wrapper.text()).toMatch(msg)
  })
  
})
