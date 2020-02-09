import { UNF, html } from "../src";
import { User } from "./user.js";

const firstName = "Heloo";

function handleClick() {
  console.log("Clicked div");
}

const newtemplate = html`
  <div>
    Hello This is my ${User("Tina")} template ${firstName}
  </div>
`;

UNF.Core.init("#app", newtemplate);
