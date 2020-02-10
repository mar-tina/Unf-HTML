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

  var ePublic = {
    registerEvent: registerEvent
  };

  return ePublic;
})();
