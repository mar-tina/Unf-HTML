import { UNF, html } from "../src";

const firstName = "Tina";

const events = [
  UNF.Events.registerEvent("onclick", "myuser", () =>
    console.log("Clicked #myuser")
  ),
  UNF.Events.registerEvent("onblur", "myuser", () =>
    console.log("Blurred #myuser")
  )
];

let newtemplate = html`
  <div id="myuser">
    Hello This is my user ${firstName}
  </div>
`;

const myTemplate = () => newtemplate;

UNF.Core.render("user-component", myTemplate(), events);
