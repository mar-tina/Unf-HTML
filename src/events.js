import { UNF } from "./element.js";

export const onClick = f => ({
  type: "event",
  click: f
});

UNF.Events = (function() {
  /**
   * Passes the 'this' object to all the executing functions when node is mounted
   * @param {THIS} elem - object that has reference to the current execution context
   * @param {function} f - onmount function to be called in the connectedCallback function
   */
  let bindOnMount = (elem, f) => {
    if (typeof f !== "undefined") {
      f(elem);
    } else {
      console.log("Onmount is undefined");
    }
  };

  let bind = (id, inputID, ...args) => ({
    type: "el",
    args: args,
    id: id,
    inputID: inputID
  });

  let setAtrr = (cycleType, id, attr, f) => ({
    cycleType: cycleType,
    type: "attr",
    id: id,
    attr: { ...attr },
    f: f
  });

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

  var ePublic = {
    bind: bind,
    setAtrr: setAtrr,
    registerEvents: registerEvents,
    bindOnMount: bindOnMount
  };

  return ePublic;
})();

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}
