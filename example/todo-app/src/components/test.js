import { UNF, html } from "../../../../src";

let styleObject = `
    color: blue;
    font-size: 50px;
`;

let BaseEL = {
  data: {
    name: "Tina",
    email: "tina@gmail"
  },
  methods: {
    loadData: function(elem) {
      return "Loaded data";
    },
    handleClick: function(elem) {
      let resEL = UNF.Base.getElement(elem, "hello-test");
      UNF.Base.addListener("onclick", resEL, () => console.log("Clicking div"));
    }
  },
  lifecycle: {
    onMount: function(elem) {
      console.log("The context", elem);
    }
  }
};

let testTemplate = html`
  <div style="${styleObject}" id="hello-test">Hello Test World</div>
`;

BaseEL.template = testTemplate;

console.log("In UI The Lifecycle", BaseEL.lifecycle);

let base = UNF.Base.createElement(BaseEL);

UNF.Base.render("test-list", base.ci);
