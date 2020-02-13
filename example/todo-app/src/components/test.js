import {
  UNF,
  html
} from "../../../../src";
import "./todo.js";

let stuff = ["hi", "hello", "now"];

let styleObject = `
    color: blue;
    font-size: 50px;
`;


//
// const handleInputChange = e => {
//   e.preventDefault();
//   targetProxy.name = e.target.value;
// };

let localState = {
  state: {}
}

var targetProxy = new Proxy(localState, {
  set: function (localState, key, value) {
    localState[key] = value;
    return true;
  },
  get: function (localState, name) {
    return (
      name in localState
    );
  }
});

function updateLocalState(newState) {
  localState.state = newState
}

let BaseEL = {
  data: {
    name: "",
    email: "tina@gmail"
  },
  methods: {
    loadState: function (elem) {
      console.log("State in UI", elem.state);
    },
    handleClick: function (elem) {
      let resEL = UNF.Base.getElement(elem, "hello-test");
      UNF.Base.addListener("onclick", resEL, () => console.log("Clicking div"));
    },
    bindInputValue: function (ctx) {
      let inputEl = UNF.Base.getElement(ctx, "todo-id");
      UNF.Base.addListener("oninput", inputEl, (e) => {
        console.log("Input Value", e.target.value)
        ctx.state.name = e.target.value
        console.log("THE state", ctx.state);
        updateLocalState(ctx.state);
        targetProxy.state = ctx.state;

        let i = 0;

        let docToRerender = UNF.Base.getElement(ctx, "todo-list");
        UNF.Events.rerender(docToRerender, todoList() + "hsihs" + localState.state.name)
        console.log("IN LOCAL STATE", localState.state.name);
      })
    }
  },
  lifecycle: {
    onMount: function (ctx) {
      console.log("The context", ctx.state);

      localState.state = ctx.state;
      console.log("IN LOCAL STATE", localState);
    },
    onUnMount: function (ctx) {
      console.log("The context on exit", ctx);
    }
  }
};

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

let todoList = () => {
  console.log("Proxy name", targetProxy.state);
  if (targetProxy.state.name === "") {
    return `<div> List is empty </div>`
  }
  return `<div> Hello there new div </div>`
}

let testTemplate = html `
  <div style="${styleObject}" id="hello-test">
    <input id="todo-id" placeholder="TODO" value />
    <div id="todo-list"> ${todoList()} </div>
  </div>
`;


BaseEL.template = testTemplate;

console.log("In UI The Lifecycle", BaseEL.lifecycle);

let base = UNF.Base.createElement(BaseEL);

UNF.Base.render("test-list", base.ci);