import { UNF, html } from "../../../../src";

let initState = {
  todos: [{ todo: "sleep" }]
};

var targetProxy = new Proxy(initState, {
  set: function(initState, key, value) {
    initState[key] = value;
    return true;
  }
});

const handleInputChange = e => {
  e.preventDefault();
  targetProxy.todo = e.target.value;
  console.log(initState.todo);
};

const handleSubmit = e => {
  e.preventDefault();
  console.log("Button was clicked");

  //   initState.todos = [...initState.todos, initState.todo];
  targetProxy.todos = [...initState.todos, initState.todo];
  targetProxy.todoListTemplate = listTemplate;
  //   initState.todos.push(initState.todo);
  //   console.log("ALL TODOS", myComponent);
};

let listTemplate = `<div> Hello ${initState.todos.length} </div>`;

let createTodoTemplate = todo =>
  `
        <div> ${todo} </todo>
    `;

const methods = [
  {
    type: "dom-events",
    all: [
      UNF.Events.registerEvent("oninput", "todo-input", e => {
        handleInputChange(e);
      })
    ]
  },
  {
    type: "dom-events",
    all: [
      UNF.Events.registerEvent("onclick", "submit-button", e => {
        handleSubmit(e);
      })
    ]
  },
  {
    type: "state-events",
    all: [UNF.Events.bind("todo-val", "todo-input", initState)]
  },
  {
    type: "cycle-events",
    all: [
      UNF.Events.registerLifeCycle("on-mount", () => {
        console.log("Component did mount");
      })
    ]
  }
];

const todoTemplate = () =>
  html`
    <div id="parent-todos">
      <p>All Todos</p>
      <input id="todo-input" placeholder="Add Todo" />
      <button id="submit-button">Submit</button>
      <p id="todo-val"></p>
      <div id="todo-list">
        <div>
            
        </div>
      </div>
    </div>
  `;

UNF.Core.render("todo-app", todoTemplate(), methods);
