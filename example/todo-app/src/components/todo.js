import {
  UNF,
  html,
  unfBaseElement
} from '../../../../src'

import {
  styleObject,
  inputObject,
  buttonObject,
  svgObject,
  todoItem
} from "./teststyle.js";

async function TodoApp() {
  this.data = {
    todos: []
  }
  this.lifecyle.onMount = (ctx) => {
    console.log("I have the context", ctx);
  }

  this.watchers = {
    onTodoChanged: (ctx, elID) => {

      let f = () => {
        UNF.Events.bindRenderToStateChange(ctx, elID, todoList, ctx.state["todos"]);
      }

      let todoProxy = ctx.state.watcher(f, {
        todos: ctx.state["todos"]
      })

      return todoProxy
    },
  }

  this.methods = {
    handleBtnClick: (ctx) => {
      let changeElButton = UNF.Base.getElement(ctx, "change-state");
      UNF.Base.addListener("onclick", changeElButton, (e) => {
        ctx.state.todos.push(ctx.state.todo);
        let watchTodo = this.watchers.onTodoChanged(ctx, "todos-list");
        watchTodo.todos = ctx.state.todos;

        addListenerForAllTodos(ctx, this.watchers);
      })
    },

    bindInputValue: function (ctx) {
      let inputEl = UNF.Base.getElement(ctx, "todo-input");
      UNF.Base.addListener("oninput", inputEl, (e) => {
        let todo = {}

        todo.label = e.target.value;
        todo.done = false;

        let parsedID = todo.label.replace(/\s+/g, '-').toLowerCase();
        todo.id = parsedID;

        ctx.state.todo = todo
      })
    },
  }

  this.template = html `
    <div style="${styleObject}">
      <p> TODOs Shop </p>
      <input style="${inputObject}" id="todo-input" placeholder="todo"/>
      <button style="${buttonObject}" id="change-state"> Add Todo </button>
      <div id="todos-list"> ${todoList().doc} </div>
    </div>
  `
}

function isArrayEmpty(arr) {
  if (arr === undefined || arr.length == 0) {
    return true;
  }
  return false;
}


let addListenerForAllTodos = function (ctx, watchers) {
  let element = {}

  ctx.state.todos.map(todo => {
    element = UNF.Base.getElement(ctx, todo.id)
    UNF.Base.addListener("onclick", element, (e) => {

      let watchTodo = watchers.onTodoChanged(ctx, "todos-list");
      ctx.state.todos = ctx.state.todos.filter(function (value, index, arr) {
        return value.id != todo.id;
      });

      watchTodo.todos = ctx.state.todos
      addListenerForAllTodos(ctx, watchers);
    });
  })
}


let todoList = (todos) => {
  if (isArrayEmpty(todos) || todos == undefined) {
    return html `<div> TodoList is empty </div>`
  } else {
    return html `
      ${todos.map(x => (
        `<p style"${todoItem}"> ${x.label} ${x.done}
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="${
            x.done ? `green` : `grey`
          }" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </span>
        <span id="${x.id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        </span>
        </p>`
      ))}`
  }
}

TodoApp.call(unfBaseElement)

UNF.Base.render("todo-app", unfBaseElement.ci);