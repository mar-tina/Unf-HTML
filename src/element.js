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

    el.shadowRoot.innerHTML = component.template;
  };

  let render = function(tagName, component, ...args) {
    customElements.define(
      tagName,
      class extends HTMLElement {
        connectedCallback() {
          console.log(args);
          this._onMount();
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
                if (x.type === "dom-events") {
                  x.all.map(el => {
                    this._container.set(`${el.elementID}`, el.elementID);
                    this._container.set(`${el.eventName}`, el.eventName);
                    //Get a reference to the element
                    this._variables[
                      this._container.get(`${el.elementID}`)
                    ] = this._shadowRoot.querySelector(`#${el.elementID}`);
                    //create local event var holder
                    let evt = this._container.get(`${el.eventName}`);
                    let tempholder = this._variables[
                      this._container.get(`${el.elementID}`)
                    ];
                    //   Manually set the property for the div
                    //   Why ? Because you cannot dynamically pass the event type
                    //   when calling addEventListener
                    tempholder[`${evt}`] = el.f;
                  });
                } else {
                  console.log("There are no dom events");
                }
                console.log("The val", x.type);
              });
              console.log("THE args", this._variables);
            });
          }
        }

        _onMount() {
          args.map(arg => {
            arg.map(y => {
              if (y.type === "cycle-events") {
                y.all.map(el => {
                  if (el.cycleType === "on-mount") {
                    el.f();
                  }
                });
              }
            });
          });
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
