import { CTRWOW_PRODUCT_LIST } from "../constants";
import template from "./template";
import style from "./style";

export default editor => {
  const domComponent = editor.DomComponents;
  const cssc = editor.CssComposer;

  const createCssStyles = () => {
    cssc.getAll().add(style);
  };

  domComponent.addType("c-list-item", {
    model: {
      defaults: {
        name: "Item",
        classes: ["list-item"],
        builtInBlock: true,
        script() {
          this.addEventListener("click", event => {
            console.log("selected product");
          });
        }
      }
    }
  });

  domComponent.addType(CTRWOW_PRODUCT_LIST, {
    model: {
      defaults: {
        name: "CTRWOW Form",
        classes: ["ctrwow-product-list"],
        //builtInBlock: true,
        customToolbar: [
          {
            id: "tlb-settings",
            command: () => editor.runCommand("cmd-open-list-settings"),
            label: `<i class="fa fa-gear"/>`
          }
        ],
        script() {}
      },
      updateData(data) {
        console.log("data", data);
      }
    },
    view: {
      init() {
        const { model } = this;
        const components = model.components();
        !cssc.getClassRule(`ctrwow-product-list`) && createCssStyles();
        if (!components.length) {
          components.add(template);
        }
      }
    }
  });
};
