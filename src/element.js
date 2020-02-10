export const html = (strings, ...args) => ({
  template: strings.reduce(
    (acc, currElement, index) => acc + currElement + (args[index] || ""),
    ""
  )
});

export let UNF = UNF || {};

UNF.Core = (function() {
  let init = function(selector, component) {
    let el = document.querySelector(selector);
    el.attachShadow({ mode: "open" });

    el.shadowRoot;
    el.shadowRoot.host;

    console.log("THis is the component", component);
    el.shadowRoot.innerHTML = component.template;

    let childNodes = el.shadowRoot.childNodes;

    // childNodes.forEach(element => {
    //   element.onclick = () => console.log("Been clicked");
    //   console.log("The child nodes", element.onclick);
    // });

    console.log("Shadow root props", el.shadowRoot.attributes);
  };

  let render = function(tagName, component, ...args) {
    customElements.define(
      tagName,
      class extends HTMLElement {
        connectedCallback() {
          console.log("Im running");
          console.log(args);
        }
        constructor() {
          super();
          const renderTemplate = document.createElement("template");
          this._shadowRoot = this.attachShadow({ mode: "open" });
          this._container = new Map();
          this._variables = {};

          renderTemplate.innerHTML = component.template;
          this._shadowRoot.appendChild(renderTemplate.content.cloneNode(true));

          this._registerEvents();
        }

        _registerEvents() {
          if (!Array.isArray(args) || !args.length) {
            console.log("There are no events");
          } else {
            args.map(arg => {
              arg.map(x => {
                this._container.set(`${x.elementID}`, x.elementID);
                this._container.set(`${x.eventName}`, x.eventName);

                //Get a reference to the element
                this._variables[
                  this._container.get(`${x.elementID}`)
                ] = this._shadowRoot.querySelector(`#${x.elementID}`);

                //create local event var holder
                let evt = this._container.get(`${x.eventName}`);

                let tempholder = this._variables[
                  this._container.get(`${x.elementID}`)
                ];

                // Manually set the property for the div
                //Why ? Because you cannot dynamically pass the event type
                //when calling add event listener
                tempholder[`${evt}`] = () =>
                  console.log(" I AM REALLYY CLICKING THIS ");
              });
              console.log("THE args", this._variables);
            });
          }
        }
      }
    );
  };

  var uPublic = {
    init: init,
    render: render
  };

  return uPublic;
})();
