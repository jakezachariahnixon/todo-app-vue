import { mount, shallowMount } from '@vue/test-utils'
import TaskList from '@/components/TaskList.vue';

const noPropWrapper = mount(TaskList);

describe('TaskList', () => {
  test('is a Vue instance', () => {
    expect(noPropWrapper.isVueInstance()).toBeTruthy()
  })
  test('renders correctly', () => {
    expect(noPropWrapper.element).toMatchSnapshot()
  })
})
