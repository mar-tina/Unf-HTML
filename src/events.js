import { UNF } from "./element.js";

export const onClick = f => ({
  type: "event",
  click: f
});

UNF.Events = (function() {
  let registerEvent = (eventName, elementID, f) => ({
    eventName: eventName,
    elementID: elementID,
    f: f
  });

  let registerLifeCycle = (cycleType, f) => ({
    cycleType: cycleType,
    f: f
  });

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
        console.log("The func", func(elem));
      });
    }
  };

  var ePublic = {
    registerEvent: registerEvent,
    registerLifeCycle: registerLifeCycle,
    bind: bind,
    setAtrr: setAtrr,
    registerEvents: registerEvents
  };

  return ePublic;
})();

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}
