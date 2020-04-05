<template>
  <div id="app">
    <div id="print"></div>
    <div id="logo"></div>
    <h1 id="appTitle">To Do List</h1>
    <ListContainer title="Things to Do List" />
  </div>
</template>

<script>
import ListContainer from "./components/ListContainer.vue";
export default {
  name: "App",
  components: {
    ListContainer
  }
};
</script>

<style lang="scss">
@import "./scss/color.scss";
// Reset HTML & BODY
html,
body {
  margin: 0 0 0 0;
  width: 100%;
  height: 100%;
}
// App container styling
#app {
  width: 100%;
  height: 100%;
  background-color: $backgroundColor;
}
// Background imaging & branding
#print {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 55px;
  height: 59px;
  background: transparent url("./assets/Layer 2.svg") 0% 0% no-repeat
    padding-box;
  opacity: 1;
}
#logo {
  position: fixed;
  bottom: 40px;
  left: 41px;
  width: 182px;
  height: 26px;
  background: transparent url("./assets/dblx-text.svg") 0% 0% no-repeat
    padding-box;
  opacity: 1;
}
#appTitle {
  position: fixed;
  width: 100%;
  text-align: center;
  top: calc(50% - 200px);
  font: Bold 15vw/314px Proxima Nova;
  letter-spacing: 0px;
  color: $white;
  opacity: 0.03;
  margin: 0 0 0 0;
}
</style>
