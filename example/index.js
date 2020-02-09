import { UNF, html, onClick } from "../src";
import { User } from "./user.js";

const firstName = "Heloo";

// function handleClick() {
//   console.log("Clicked div");
// }

let newtemplate = html`
  <div ${onClick(() => console.log("Been clicked"))}>
    Hello This is my ${User("Tina")} template ${firstName}
  </div>
`;

const myTemplate = () => newtemplate;

UNF.Core.init("#app", myTemplate());
