<template>
  <div id="listContainer">
    <h1 id="listName">{{ title }}</h1>
    <TaskList v-bind:childTasks="childTasks" v-bind:rootTasks="rootTasks" />
    <button id="addTaskBtn" v-on:click="this.handleAddButton">
      +
    </button>
    <div id="addTaskInterface">
      <div id="closeAddTaskInterface" v-on:click="this.closeAddTask">
        &times;
      </div>
      <textarea
        id="taskName"
        v-model="newTask"
        placeholder="What do you need to do?"
      >
      </textarea>
      <div id="priorityContainer">
        <h2>Priority</h2>
        <button
          class="priorityBtn"
          id="lowPriority"
          v-on:click="this.handleLowPriority"
        >
          Low
        </button>
        <button
          class="priorityBtn"
          id="midPriority"
          v-on:click="this.handleMidPriority"
        >
          Medium
        </button>
        <button
          class="priorityBtn"
          id="highPriority"
          v-on:click="this.handleHighPriority"
        >
          High
        </button>
      </div>
      <div id="parentContainer">
        <h2>Parent</h2>
        <select v-model="newParent">
          <option value="">None</option>
          <option
            v-for="rootTask in rootTasks"
            v-bind:key="rootTask.title"
            :value="rootTask.title"
            >{{ rootTask.title }}</option
          >
        </select>
      </div>
    </div>
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
      todos: [],
      newTask: "",
      newPriority: "",
      newParent: "",
      addOpen: false
    };
  },
  computed: {
    rootTasks: function() {
      return this.todos.filter(function(task) {
        return task.parent == "";
      });
    },
    childTasks: function() {
      return this.todos.filter(function(task) {
        return task.parent != "";
      });
    }
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
  },
  methods: {
    resetPriorityButtons() {
      document.getElementById("lowPriority").style.color = "#808080";
      document.getElementById("lowPriority").style.backgroundColor = "#e5e5e5";
      document.getElementById("midPriority").style.color = "#e29155";
      document.getElementById("midPriority").style.backgroundColor = "#e5e5e5";
      document.getElementById("highPriority").style.color = "#e25555";
      document.getElementById("highPriority").style.backgroundColor = "#e5e5e5";
    },
    handleLowPriority() {
      this.resetPriorityButtons();
      document.getElementById("lowPriority").style.color = "#e5e5e5";
      document.getElementById("lowPriority").style.backgroundColor = "#808080";
      this.newPriority = "low";
    },
    handleMidPriority() {
      this.resetPriorityButtons();
      document.getElementById("midPriority").style.color = "#e5e5e5";
      document.getElementById("midPriority").style.backgroundColor = "#e29155";
      this.newPriority = "mid";
    },
    handleHighPriority() {
      this.resetPriorityButtons();
      document.getElementById("highPriority").style.color = "#e5e5e5";
      document.getElementById("highPriority").style.backgroundColor = "#e25555";
      this.newPriority = "high";
    },
    addTodo() {
      if (this.newTask.length < 1) {
        document.getElementById("taskName").style.borderColor = "#e25555";
      } else if (this.newPriority == "") {
        alert("Must enter a priority");
      } else {
        this.todos.push({
          title: this.newTask,
          completed: false,
          priority: this.newPriority,
          parent: this.newParent,
          toggle: false
        });
        this.newTask = "";
        this.newPriority = "";
        this.resetPriorityButtons();
        this.newParent = "";
        document.getElementById("taskName").style.borderColor = "#e5e5e5";
        this.closeAddTask();
      }
    },
    displayNoNameError() {
      document.getElementById("taskName").style.borderColor = "#e25555";
    },
    handleAddButton() {
      if (!this.addOpen) {
        this.openAddTask();
      } else {
        this.addTodo();
      }
    },
    openAddTask() {
      document.getElementById("addTaskInterface").style.display = "block";
      document.getElementById("addTaskInterface").style.opacity = "1";
      document.getElementById("addTaskBtn").style.backgroundColor = "#65D57E";
      document.getElementById("listTasks").style.filter = "blur(2px)";
      this.addOpen = true;
    },
    closeAddTask() {
      this.addOpen = false;
      document.getElementById("addTaskInterface").style.opacity = "0";
      document.getElementById("listTasks").style.filter = "blur(0px)";
      setTimeout(function() {
        document.getElementById("addTaskInterface").style.display = "none";
      }, 500);
      document.getElementById("addTaskBtn").style.backgroundColor = "#061a27";
    }
  }
};
</script>

<style scoped lang="scss">
@import "../scss/color.scss";
// Container positioning and style
#listContainer {
  position: fixed;
  width: 400px;
  height: 600px;
  top: 10%;
  left: calc(50% - 200px);
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
  z-index: 5;
}
// Style list name
#listName {
  padding-top: 30px;
  padding-bottom: 30px;
  text-align: center;
  font-family: Proxima Nova;
  font-weight: Bold;
  font-size: 30px;
  height: 30px;
  letter-spacing: 0px;
  color: $titleColor;
}
#addTaskBtn {
  position: fixed;
  width: 64px;
  height: 64px;
  top: calc(10% + 600px - 32px);
  left: calc(50% - 32px);
  background: #061a27 0% 0% no-repeat padding-box;
  border: 4px solid $green;
  border-radius: 100px;
  opacity: 1;
  text-align: center;
  font-size: 50px;
  font-weight: 250;
  line-height: 30px;
  color: #ffffffcc;
  transition: 0.3s;
  z-index: 6;
}
#addTaskBtn:hover {
  background: #162a37;
  color: #ffffff;
  border: 6px solid $highlightGreen;
  transform: scale(1.1);
  transition: 0.3s;
}
#addTaskBtn:focus {
  outline: 0;
}
// Add Task styling
#closeAddTaskInterface {
  width: 100%;
  height: 0%;
  font-size: 24px;
  margin-left: 93%;
  transform: translateY(8px);
  color: #808080;
  transition: 0.1s;
  cursor: pointer;
}
#closeAddTaskInterface:hover {
  color: #404040;
  transition: 0.1s;
}
#addTaskInterface {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50%;
  background-color: $lightHighlight;
  border-radius: 0 0 10px 10px;
  z-index: 2;
  display: none;
  opacity: 0;
  transition: opacity 0.5s;
}
#taskName {
  width: 80%;
  background-color: $white;
  border: 3px solid $lightHighlight;
  border-radius: 5px;
  outline: none;
  box-shadow: none !important;
  margin-top: 10%;
  margin-left: 5%;
  padding: 5%;
  height: 30%;
  font-family: Proxima Nova;
  font-size: 18px;
  resize: none;
}
#taskName:focus {
  border-color: $lightHighlight;
  transition: 0.25s;
}
#priorityContainer {
  width: 100%;
  height: 10%;
  padding-top: 2%;
  font-family: Proxima Nova;
  font-size: 12px;
}
#priorityContainer h2 {
  margin: 0 0 0 0;
  padding: 0 0 0 0;
  display: inline-block;
  margin-left: 10%;
  width: 25%;
}
.priorityBtn {
  width: 70px;
  height: 20px;
  border-radius: 15px;
  border: 1px solid;
  margin-right: 5px;
  cursor: pointer;
}
.priorityBtn:focus {
  outline: 0;
}
#lowPriority {
  color: $lowPriority;
  border-color: $lowPriority;
}
#lowPriority:focus {
  color: $lightHighlight;
  background-color: $lowPriority;
}
#midPriority {
  color: $midPriority;
}
#midPriority:focus {
  color: $lightHighlight;
  background-color: $midPriority;
}
#highPriority {
  color: $highPriority;
}
#highPriority:focus {
  color: $lightHighlight;
  background-color: $highPriority;
}
#parentContainer {
  width: 100%;
  height: 10%;
  font-family: Proxima Nova;
  font-size: 12px;
}
#parentContainer h2 {
  margin: 0 0 0 0;
  padding: 0 0 0 0;
  display: inline-block;
  margin-left: 10%;
  width: 25%;
}
#parentContainer select {
  width: 220px;
  cursor: pointer;
}
</style>
