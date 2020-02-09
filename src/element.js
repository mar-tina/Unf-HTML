import * as snabbdom from "snabbdom";
var patch = snabbdom.init([
  // Init patch function with chosen modules
  require("snabbdom/modules/class").default, // makes it easy to toggle classes
  require("snabbdom/modules/props").default, // for setting properties on DOM elements
  require("snabbdom/modules/style").default, // handles styling on elements with support for animations
  require("snabbdom/modules/eventlisteners").default // attaches event listeners
]);
var h = require("snabbdom/h").default;

export const html = (strings, ...args) =>
  strings.reduce(
    (acc, currElement, index) => acc + currElement + (args[index] || ""),
    ""
  );

export let UNF = UNF || {};

UNF.Core = (function() {
  let init = function(selector, component) {
    let el = document.querySelector(selector);
    el.attachShadow({ mode: "open" });

    el.shadowRoot;
    el.shadowRoot.host;

    console.log("THis is the component", component);
    el.shadowRoot.innerHTML = component;

    let childNodes = el.shadowRoot.childNodes;
    console.log("The child nodes", childNodes);
  };

  var uPublic = {
    init: init
  };

  return uPublic;
})();
