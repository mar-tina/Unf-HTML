import { UNF, html } from "../src";

const firstName = "Tina";

const events = [
  {
    type: "dom-events",
    all: [
      UNF.Events.registerEvent("onclick", "myuser", () =>
        console.log("Clicked #myuser")
      ),
      UNF.Events.registerEvent("onblur", "myuser", () =>
        console.log("Blurred #myuser")
      )
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
  }
];

let newtemplate = html`
  <div id="myuser">
    Hello This is my user ${firstName}
  </div>
`;

const myTemplate = () => newtemplate;

UNF.Core.render("user-component", myTemplate(), events);
