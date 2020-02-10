import { UNF } from "./element.js";

export const onClick = f => ({
  type: "event",
  click: f
});

UNF.Events = (function() {
  let registerEvent = (eventName, tagName, elementID, f) => ({
    eventName: eventName,
    tagName: tagName,
    elementID: elementID,
    f: f
  });

  var ePublic = {
    registerEvent: registerEvent
  };

  return ePublic;
})();
