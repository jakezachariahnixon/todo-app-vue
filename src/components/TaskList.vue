<template>
  <ul id="listTasks">
    <div v-for="todo in rootTasks" v-bind:key="todo.title">
      <!-- Create Root -->
      <li
        :class="{
          complete: todo.completed,
          highP: todo.priority == 'high',
          midP: todo.priority == 'mid',
          lowP: todo.priority == 'low'
        }"
        class="task"
      >
        {{ todo.title }}
        <span
          v-if="getChildren(todo).length > 0"
          class="toggleChildren"
          v-on:click="todo.toggle = !todo.toggle"
          :value="todo.toggle"
          >&darr;</span
        >
        <label class="checkContainer">
          <input type="checkbox" v-model="todo.completed" />
          <span class="checkmark"></span>
        </label>
      </li>
      <!-- Create any children if they exist -->
      <!-- First check toggle setting -->
      <transition name="slide">
        <div v-if="todo.toggle">
          <div
            v-for="childTodo in getChildren(todo)"
            v-bind:key="childTodo.title"
          >
            <li
              :class="{
                complete: childTodo.completed,
                highP: childTodo.priority == 'high',
                midP: childTodo.priority == 'mid',
                lowP: childTodo.priority == 'low'
              }"
              class="child task"
            >
              {{ childTodo.title }}
              <label class="checkContainer">
                <input type="checkbox" v-model="childTodo.completed" />
                <span class="checkmark"></span>
              </label>
            </li>
          </div>
        </div>
      </transition>
    </div>
  </ul>
</template>

<script>
export default {
  name: "TaskList",
  props: {
    childTasks: Array,
    rootTasks: Array
  },
  methods: {
    getChildren: function(parentItem) {
      return this.childTasks.filter(function(childTask) {
        return childTask.parent == parentItem.title;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../scss/color.scss";
@import "../scss/animation.scss";
#listTasks {
  margin: 0 0 0 0;
  padding: 0 0 10% 0;
  height: 430px;
  overflow: auto;
}
.task {
  position: relative;
  list-style: none;
  width: 80%;
  padding-top: 5%;
  padding-bottom: 5%;
  padding-left: 5%;
  margin-top: 3%;
  margin-bottom: 3%;
  margin-left: 20px;
  background: $backgroundColor 0% 0% no-repeat padding-box;
  border-radius: 10px;
  font-family: "Proxima Nova";
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0px;
  color: $white;
  opacity: 1;
  transition: 0.3s;
  z-index: 2;
}
.complete {
  opacity: 0.68;
  transition: 0.3s;
}
.lowP {
  border-left: 15px solid $lowPriority;
}
.midP {
  border-left: 15px solid $midPriority;
}
.highP {
  border-left: 15px solid $highPriority;
}
.child {
  background-color: $white;
  color: $backgroundColor;
  border-left: none !important;
  padding-left: 5%;
  margin-left: 50px;
  width: 290px;
  padding-top: 3%;
  padding-bottom: 3%;
  border-bottom: 1px solid $offWhite;
  border-radius: 0px;
  z-index: 0;
}
// Custom checkbox
.checkContainer {
  position: relative;
  padding-left: 35px;
  margin-bottom: 0px;
  cursor: pointer;
  font-size: 24px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border-radius: 25px;
  float: right;
  margin-right: 5%;
}
.checkContainer input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.checkmark {
  position: absolute;
  top: -5px;
  left: 0;
  height: 24px;
  width: 24px;
  background-color: $almostWhite;
  border-radius: 24px;
}
.checkContainer:hover input ~ .checkmark {
  background-color: $offWhite;
}
.checkContainer input:checked ~ .checkmark {
  background-color: $green;
}
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}
.checkContainer input:checked ~ .checkmark:after {
  display: block;
}
.checkContainer .checkmark:after {
  top: 6px;
  left: 6px;
  width: 24px;
  height: 24px;
  background: transparent url("../assets/tick.svg") 0% 0% no-repeat padding-box;
  background-size: 12px 12px;
}
.child .checkContainer {
  font-size: 20px;
}
.child .checkmark {
  height: 20px;
  width: 20px;
}
.child .checkmark:after {
  top: 5px;
  left: 5px;
  width: 20px;
  height: 20px;
  background-size: 10px 10px;
}
</style>
