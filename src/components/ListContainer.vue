<template>
  <div id="listContainer">
    <h1 id="listName">{{ title }}</h1>
    <TaskList v-bind:tasks="todos" />
    <button id="addTaskBtn">
      +
    </button>
  </div>
</template>

<script>
import TaskList from "./TaskList.vue";
export default {
  name: "ListContainer",
  props: {
    title: String
  },
  data() {
    return {
      todos: []
    };
  },
  mounted() {
    if (localStorage.getItem("todos"))
      this.todos = JSON.parse(localStorage.getItem("todos"));
  },
  watch: {
    todos: {
      handler() {
        localStorage.setItem("todos", JSON.stringify(this.todos));
      },
      deep: true
    }
  },
  components: {
    TaskList
  }
};
</script>

<style scoped lang="scss">
@import "../scss/color.scss";
// Container positioning and style
#listContainer {
  position: fixed;
  width: 25%;
  height: 60%;
  top: 20%;
  left: 37.5%;
  background: $white 0% 0% no-repeat padding-box;
  border-radius: 10px;
}
// Add fade out at bottom of the tasks list
#listContainer:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  pointer-events: none;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 1) 90%
  );
  width: 100%;
  height: 4em;
  border-radius: 10px;
  z-index: 1;
}
// Style list name
#listName {
  padding-top: 4%;
  padding-bottom: 4%;
  text-align: center;
  font-family: Proxima Nova;
  font-weight: Bold;
  font-size: 2vw;
  height: 5%;
  letter-spacing: 0px;
  color: $titleColor;
}
#addTaskBtn {
  position: fixed;
  width: 64px;
  height: 64px;
  top: calc(80% - 32px);
  left: calc(50% - 32px);
  background: #061a27 0% 0% no-repeat padding-box;
  border: 4px solid $green;
  border-radius: 100px;
  opacity: 1;
  text-align: center;
  font-size: 50px;
  font-weight: 250;
  line-height: 50px;
  color: #ffffffcc;
  transition: 0.3s;
  z-index: 3;
}
#addTaskBtn:hover {
  background: #162a37;
  color: #ffffff;
  border: 6px solid $highlightGreen;
  // transform: translateX(-2px) translateY(-2px) scale(1.1);
  transform: scale(1.1);
  transition: 0.3s;
  z-index: 3;
}
</style>
