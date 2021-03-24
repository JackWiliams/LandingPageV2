import { CTRWOW_FORM } from "../constants";
import template from "./template";
import style from "./style";
import utils from "../../../utils";

export default editor => {
  const domComponent = editor.DomComponents;
  const cssc = editor.CssComposer;

  const createCssStyles = () => {
    cssc.getAll().add(style);
  };

  domComponent.addType(CTRWOW_FORM, {
    model: {
      defaults: {
        name: "CTRWOW Form",
        classes: ["ctrwow-form"],
        builtInBlock: true,
        customToolbar: [
          {
            id: "tlb-settings",
            command: () => editor.runCommand("cmd-open-form-settings"),
            label: `<i class="fa fa-gear"/>`
          }
        ],
        tracking: "",
        traits: [
          {
            label: "Tracking Value",
            name: "tracking"
            //changeProp: 1
          }
        ],
        script() {
          const trackingValue = `{[ tracking ]}`;
          this.querySelector("button").addEventListener("click", function() {
            console.log("tracking value", trackingValue);
          });
          // this.addEventListener("keyup", function(e) {
          //   console.log("e", trackingValue);
          // });
        }
      },
      updateData(data) {
        console.log("data", data);
        const submitButton = this.findType("button");
        console.log("submitButton[0]", submitButton[0]);
        if (submitButton[0]) {
          const $window = editor.Canvas.getWindow();
          $window[data.formAction] = utils.formActions[data.formAction];
          submitButton[0].addAttributes({
            onclick: `window.${data.formAction}()`
          });
        }
      }
    },
    view: {
      init() {
        const { model } = this;
        const components = model.components();
        !cssc.getClassRule(`ctrwow-form`) && createCssStyles();
        if (!components.length) {
          components.add(template);
        }
      }
    }
  });
};
