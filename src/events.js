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

  var ePublic = {
    registerEvent: registerEvent,
    registerLifeCycle: registerLifeCycle,
    bind: bind,
    setAtrr: setAtrr
  };

  return ePublic;
})();
