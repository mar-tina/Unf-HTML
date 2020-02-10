import { UNF, html } from "../src";
import "./user.js";

let appTemplate = html`
  <div>
    <h1> TO-DOs </h1
    <div>
        
    </div>
  </div>
`;

const appPage = () => appTemplate;

UNF.Core.init("#app", appPage);
