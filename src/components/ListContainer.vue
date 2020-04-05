<template>
  <div id="listContainer">
    <h1 id="listName">{{ title }}</h1>
  </div>
</template>

<script>
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
</style>
