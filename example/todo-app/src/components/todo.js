import {
  UNF,
  html,
  unfBaseElement
} from '../../../../src'


async function TodoApp() {
  this.lifecyle.onMount = (ctx) => {
    console.log("I have the context", ctx);
  }

  this.proxies = {
    onFoodChanged: (ctx, elID) => {
      console.log("Running food change proxy");
      let todos = ctx.state["todos"]

      let f = () => {
        UNF.Events.bindRenderToStateChange(ctx, elID, todoList, todos);
      }

      let foodProxy = ctx.state.watcher(f, {
        todos: todos
      })

      return foodProxy
    }
  }

  this.methods = {
    handleBtnClick: (ctx) => {
      let changeElButton = UNF.Base.getElement(ctx, "change-state");
      UNF.Base.addListener("onclick", changeElButton, (e) => {
        ctx.state.food = "nsnjsd";
        let watchFood = this.proxies.onFoodChanged(ctx, "todos-list");
        console.log("PROXY OBJECT", watchFood.todos);
      })
    },
  }

  this.template = html `
    <div> Hello how are you <button id="change-state"> Change state </button> </div>
    <div id="todos-list"> </div>
  `
}

function isArrayEmpty(arr) {
  if (arr === undefined || arr.length == 0) {
    return true;
  }
  return false;
}

let todoList = (todos) => {
  if (isArrayEmpty(todos) || todos == undefined) {
    return html `<div> TodoList is empty </div>`
  } else {
    return html `<div> We see you at work </div>`
  }
}

TodoApp.call(unfBaseElement)

UNF.Base.render("todo-app", unfBaseElement.ci);