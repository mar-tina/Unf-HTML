import { UNF, html } from "../src";

const firstName = "Tina";

const events = UNF.Events.registerEvent(
  "onclick",
  "user-component",
  "myuser",
  () => console.log("hello")
);

let newtemplate = html`
  <div id="myuser">
    Hello This is my user ${firstName}
  </div>
`;

const myTemplate = () => newtemplate;

UNF.Core.render("user-component", myTemplate(), events);
