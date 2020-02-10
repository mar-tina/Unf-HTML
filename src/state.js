import { UNF } from "./element.js";

UNF.State = (function() {
  let getInitialState = tagName => {
    let theComponent = document.getElementById(`#${tagName}`);
    console.log("The component", theComponent);
  };

  var sPublic = {
    getInitialState: getInitialState
  };

  return sPublic;
})();
