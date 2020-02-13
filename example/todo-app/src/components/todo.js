import {
  UNF,
  html,
  UNFBaseElement
} from '../../../../src'

let localState = {}

function TodoApp() {
  this.lifecyle.onMount = (ctx) => {
    localState = ctx;
    console.log("The local state", localState);
    setExternalState(ctx)
    console.log("Outside state", ctx.state)
  }
}

function setExternalState(ctx) {
  localState = ctx
  console.log("LOCAL STATE", localState)

}


TodoApp.call(UNFBaseElement)

UNF.Base.render("todo-app", UNFBaseElement.ci);