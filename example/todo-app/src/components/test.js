import {
  UNF,
  html
} from "../../../../src";
import "./todo.js";

var delLogo = require('./del.svg');

import {
  styleObject,
  inputObject,
  buttonObject,
  svgObject,
  todoItem
} from "./teststyle.js";

let localState = {
  state: {}
}

function updateLocalState(newState) {
  localState.state = newState
}

let BaseEL = {
  data: {
    name: "",
    email: "tina@gmail",
    todo: {
      id: 0,
      label: "",
      done: false,
    },
    todos: []
  },
  methods: {
    handleSubmit: function (ctx) {
      let submitEl = UNF.Base.getElement(ctx, "submit");
      UNF.Base.addListener("onclick", submitEl, (e) => {
        e.preventDefault();
        // ctx.state.todos.push(ctx.state.todo);
        ctx.state.todos = [...ctx.state.todos, ctx.state.todo];

        let tempTodo = {}
        tempTodo = ctx.state.todo
        //Update the local state object
        updateLocalState(ctx.state);

        //Get reference to element that is to be rerendered
        let docToRerender = UNF.Base.getElement(ctx, "todo-list");
        UNF.Events.rerender(docToRerender, todoList(ctx.state.todos))

        addListenerForAllTodos(ctx, docToRerender)

      })
    },

    bindInputValue: function (ctx) {
      let inputEl = UNF.Base.getElement(ctx, "todo-id");
      UNF.Base.addListener("oninput", inputEl, (e) => {
        let todo = {}

        todo.label = e.target.value;
        todo.done = false;

        let parsedID = todo.label.replace(/\s+/g, '-').toLowerCase();
        console.log("New id", parsedID);

        todo.id = parsedID;

        ctx.state.todo = todo
        updateLocalState(ctx.state);
      })
    },
    //

  },
  lifecycle: {
    onMount: function (ctx) {
      localState.state = ctx.state;
    },
    onUnMount: function (ctx) {
      console.log("The context on exit", ctx);
    }
  }
};

function isArrayEmpty(arr) {
  if (arr === undefined || arr.length == 0) {
    return true;
  }
  return false;
}

let addListenerForAllTodos = function (ctx, docToRerender) {
  let element = {}

  ctx.state.todos.map(todo => {
    element = UNF.Base.getElement(ctx, `${todo.id}`)
    UNF.Base.addListener("onclick", element, (e) => {


      ctx.state.todos = ctx.state.todos.filter(function (value, index, arr) {
        return value.id != todo.id;
      });

      updateLocalState(ctx.state);

      let element = UNF.Base.getElement(ctx, "todo-list")
      let res = todoList(ctx.state.todos);
      if (res.doc === undefined) {
        element.innerHTML = `<div> TodoList is empty </div> `
      }
      addListenerForAllTodos(ctx, docToRerender)
    });
  })

}


let todoList = (todos) => {
  if (isArrayEmpty(todos) || todos == undefined) {
    return `<div> TodoList is empty </div>`
  } else {
    return (
      html `
          ${todos.map(x => (
            `<div>
              <p style"${todoItem}"> ${x.id} ${x.label} ${x.done}
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="${
                  x.done ? `green` : `grey`
                }" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </span>
              <span id="${x.id}">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
              </span>
              </p>
            </div>`
          ))}
        `
    )
  }


}

let testTemplate = html `
  <div style="${styleObject}" id="hello-test">
    <p> TODOS </p>
    <input style="${inputObject}" id="todo-id" placeholder="TODO" value />
    <button style="${buttonObject}" id="submit"> Submit </button>
    <div id="todo-list"> ${todoList()} </div>
  </div>
`;


BaseEL.template = testTemplate;

let base = UNF.Base.createElement(BaseEL);

UNF.Base.render("test-list", base.ci);