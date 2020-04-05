import { mount, shallowMount } from '@vue/test-utils'
import ListContainer from '@/components/ListContainer.vue';


const title = "Example List Title";
const noPropWrapper = mount(ListContainer);
const titledWrapper = mount(ListContainer, {
    propsData: {
        title: "Example List Title"
    }
});
const taskedWrapper = mount(ListContainer, {
    data () {
        return {
            todos: [{"title":"Root Task One","completed":false,"priority":"mid","parent":"","toggle":false},{"title":"Root Task Two","completed":false,"priority":"high","parent":"","toggle":false},{"title":"Root Task Three","completed":false,"priority":"low","parent":"","toggle":false},{"title":"Sub-task One","completed":true,"priority":"low","parent":"Root Task One","toggle":false},{"title":"Sub-task Two","completed":false,"priority":"low","parent":"Root Task One","toggle":false},{"title":"Root Task Four","completed":false,"priority":"mid","parent":"","toggle":false},{"title":"Root Task Five","completed":false,"priority":"low","parent":"","toggle":false},{"title":"Root Task Six","completed":false,"priority":"high","parent":"","toggle":false},{"title":"Sub-task Three","completed":false,"priority":"mid","parent":"Root Task Three","toggle":false}],
        }
    }
});
const completeWrapperInvalidTaskName = mount(ListContainer, {
    data () {
        return {
            todos: [{"title":"Root Task One","completed":false,"priority":"mid","parent":"","toggle":false},{"title":"Root Task Two","completed":false,"priority":"high","parent":"","toggle":false},{"title":"Root Task Three","completed":false,"priority":"low","parent":"","toggle":false},{"title":"Sub-task One","completed":true,"priority":"low","parent":"Root Task One","toggle":false},{"title":"Sub-task Two","completed":false,"priority":"low","parent":"Root Task One","toggle":false},{"title":"Root Task Four","completed":false,"priority":"mid","parent":"","toggle":false},{"title":"Root Task Five","completed":false,"priority":"low","parent":"","toggle":false},{"title":"Root Task Six","completed":false,"priority":"high","parent":"","toggle":false},{"title":"Sub-task Three","completed":false,"priority":"mid","parent":"Root Task Three","toggle":false}],
            newTask: "",
            newPriority: "high",
            newParent: "",
            addOpen: true
        }
    }
});

describe('ListContainer', () => {
  test('is a Vue instance', () => {
    expect(noPropWrapper.isVueInstance()).toBeTruthy()
  })
  test('renders correctly', () => {
    expect(noPropWrapper.element).toMatchSnapshot()
  })
  it("renders correct list title", () => {
    expect(titledWrapper.find('h1').text()).toEqual(title)
  })
  it("computes rootTasks correctly", () => {
    expect(taskedWrapper.vm.rootTasks).toEqual([{"title":"Root Task One","completed":false,"priority":"mid","parent":"","toggle":false},{"title":"Root Task Two","completed":false,"priority":"high","parent":"","toggle":false},{"title":"Root Task Three","completed":false,"priority":"low","parent":"","toggle":false},{"title":"Root Task Four","completed":false,"priority":"mid","parent":"","toggle":false},{"title":"Root Task Five","completed":false,"priority":"low","parent":"","toggle":false},{"title":"Root Task Six","completed":false,"priority":"high","parent":"","toggle":false}])
  })
  it("computes childTasks correctly", () => {
    expect(taskedWrapper.vm.childTasks).toEqual([{"title":"Sub-task One","completed":true,"priority":"low","parent":"Root Task One","toggle":false},{"title":"Sub-task Two","completed":false,"priority":"low","parent":"Root Task One","toggle":false},{"title":"Sub-task Three","completed":false,"priority":"mid","parent":"Root Task Three","toggle":false}])
  })
})
