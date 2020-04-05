<template>
  <ul id="listTasks">
    <li
      v-for="todo in tasks"
      v-bind:key="todo.title"
      :class="{ complete: todo.completed }"
      class="task"
    >
      {{ todo.title }}
      <label class="checkContainer">
        <input type="checkbox" v-model="todo.completed" />
        <span class="checkmark"></span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  name: "TaskList",
  props: {
    tasks: Array
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../scss/color.scss";
#listTasks {
  margin: 0 0 0 0;
  padding: 0 0 10% 0;
  height: 70%;
  overflow: auto;
}
.task {
  list-style: none;
  width: 80%;
  padding-top: 5%;
  padding-bottom: 5%;
  padding-left: 5%;
  margin-top: 3%;
  margin-bottom: 3%;
  margin-left: 4%;
  background: $backgroundColor 0% 0% no-repeat padding-box;
  border-radius: 10px;
  font-family: "Proxima Nova";
  font-size: 1vw;
  line-height: 18px;
  letter-spacing: 0px;
  color: $white;
  opacity: 1;
  transition: 0.3s;
}
.complete {
  opacity: 0.68;
  transition: 0.3s;
}
// Custom checkbox
.checkContainer {
  position: relative;
  padding-left: 35px;
  margin-bottom: 0px;
  cursor: pointer;
  font-size: 1.5vw;
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
  top: -0.3vw;
  left: 0;
  height: 1.5vw;
  width: 1.5vw;
  background-color: $almostWhite;
  border-radius: 1000px;
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
  top: 0.38vw;
  left: 0.38vw;
  width: 1vw;
  height: 1vw;
  background: transparent url("../assets/tick.svg") 0% 0% no-repeat padding-box;
  background-size: 0.75vw 0.75vw;
}
</style>
