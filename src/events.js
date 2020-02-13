import {
  UNF
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

  let registerProps = elem => {
    let props = elem.getAttribute("props");
    console.log("The props", JSON.parse(props));
  };

  let initState = (ctx, state) => {
    ctx.state = state
    console.log(ctx.state);
  };

  let rerender = (elem, content) => {
    console.log("This is the template being passed", content);
    elem.innerHTML = content.doc;
  };

  var ePublic = {
    registerEvents: registerEvents,
    bindCycle: bindCycle,
    registerProps: registerProps,
    initState: initState,
    rerender: rerender
  };

  return ePublic;
})();

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}