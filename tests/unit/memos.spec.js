import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import Memos from '@/components/Memos'
import sinon from 'sinon'

Vue.config.ignoredElements = ['v-snackbar', 'v-btn', 'v-container', 'v-row', 'v-col'];

// const spy = sinon.spy()
const createNewMemo = sinon.stub()

const localVue = createLocalVue();
localVue.use(Vuex)

describe('Actions.vue', () => {
  let actions
  let store
  let getters

  beforeEach(() => {
    actions = {
      fetchMemos: jest.fn(),
      addMemo: jest.fn()
    },
      getters = {
        allMemos: () => { },
        saveState: () => { }
      },
      store = new Vuex.Store({
        actions,
        getters
      })
  })

  it('Click on button and trigger for createNewMemo', () => {
    const wrapper = shallowMount(Memos, { store, localVue })
    wrapper.find('.button').trigger('click')
    expect(createNewMemo.called);
  })

  it('By default the values should not be enabled', () => {
    const defaultData = Memos.data()
    expect(defaultData.snackbar).toBe(false)
    expect(defaultData.isAppFullloaded).toBe(false)
  })
})

