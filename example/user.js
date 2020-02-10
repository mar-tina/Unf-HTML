import { UNF, html } from "../src";

let initState = {};

var targetProxy = new Proxy(initState, {
  set: function(initState, key, value) {
    initState[key] = value;
    return true;
  }
});

const handleInputChange = e => {
  e.preventDefault();
  targetProxy.name = e.target.value;
};

const methods = [
  {
    type: "dom-events",
    all: [
      UNF.Events.registerEvent("onclick", "myuser", () =>
        console.log("Clicked #myuser")
      ),
      UNF.Events.registerEvent("oninput", "first-name", e => {
        handleInputChange(e);
      })
    ]
  },
  {
    type: "cycle-events",
    all: [
      UNF.Events.registerLifeCycle("on-mount", () =>
        console.log("Component did mount")
      ),
      UNF.Events.registerLifeCycle("on-unmount", () =>
        console.log("Component did unmount")
      )
    ]
  },
  {
    type: "state-events",
    all: [UNF.Events.bind("user-details", "first-name", initState)]
  }
];

let newtemplate = html`
  <div id="myuser">
    Hello This is my user
    <p id="user-details">${initState.name}</p>

    <div>
      <input id="first-name" value=""/>
    </div>
  </div>
`;

const myTemplate = () => newtemplate;

UNF.Core.render("user-component", myTemplate(), methods);
