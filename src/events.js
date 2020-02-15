import {
  UNF,
  html
} from "./element.js";


export const onClick = f => ({
  type: "event",
  click: f
});

UNF.Events = (function () {
  /**
   * Passes the 'this' object to all the executing functions when node is mounted or unmounted
   * @param {THIS} elem - object that has reference to the current execution context
   * @param {function} f - onmount function to be called in the connectedCallback function
   */
  let bindCycle = (elem, f) => {
    if (typeof f !== "undefined") {
      f(elem);
    } else {
      console.log("Onmount is undefined");
    }
  };

  /**
   * Passes the 'this' object to all the executing functions providing reference to the current execution context
   * @param {THIS} elem - object that has reference to the current execution context
   * @param {*} args - methods object passed from the UI
   */
  let registerEvents = (elem, args) => {
    if (isEmpty(args)) {
      console.log("There are no events", args);
    } else {
      let arrayOfFuncs = Object.values(args);
      arrayOfFuncs.forEach(func => {
        func(elem);
      });
    }
  };

  /**
   * Passes the 'this' object to all the proxies providing reference to the current execution context
   * @param {THIS} elem - object that has reference to the current execution context
   * @param {*} proxies
   */
  let registerProxies = (elem, proxies) => {
    console.log("Registering proxies");
    if (isEmpty(proxies)) {
      console.log("There are no proxies", proxies);
    } else {
      let arrayOfFuncs = Object.values(proxies);
      arrayOfFuncs.forEach(func => {
        func(elem);
      });
    }
  };

  let initState = (ctx, state) => {
    ctx.state = state
  };

  let rerender = (elem, content) => {

    //The divs are separated by commas that are shown in the ui.
    // let res = content.doc.replace(/,/g, " ");
    console.log("THE RERENDER COMPONENT", content);
    elem.innerHTML = content.doc;
  };

  let bindRenderToStateChange = (ctx, elID, component, state) => {
    // let docToBind = UNF.Base.getELement(ctx, elID);
    let docToRerender = UNF.Base.getElement(ctx, elID);
    let res = component(state)
    if (res.doc === undefined) {
      UNF.Events.rerender(docToRerender, html `<div> TodoList is empty </div>,`)
    }
    UNF.Events.rerender(docToRerender, component(state))
  }

  var ePublic = {
    registerEvents: registerEvents,
    bindCycle: bindCycle,
    initState: initState,
    rerender: rerender,
    registerProxies: registerProxies,
    bindRenderToStateChange: bindRenderToStateChange
  };

  return ePublic;
})();

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}