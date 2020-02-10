import { UNF, html } from "../src";
import "./user.js";

const firstName = "Heloo";

let newtemplate = html`
  <div>
    Hello This is my template ${firstName}
    <div>
      <user-component></user-component>
    </div>
  </div>
`;

const myTemplate = () => newtemplate;

UNF.Core.init("#app", myTemplate());
