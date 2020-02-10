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
    args: args,
    id: id,
    inputID: inputID
  });

  var ePublic = {
    registerEvent: registerEvent,
    registerLifeCycle: registerLifeCycle,
    bind: bind
  };

  return ePublic;
})();
