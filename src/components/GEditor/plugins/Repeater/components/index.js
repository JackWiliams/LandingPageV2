import {
  REPEATER,
  COMPONENT_WRAPPER,
  LISTICLE,
  LISTICLE_ITEM
} from "../constants";
import template from "./template";

export default editor => {
  const domComponents = editor.DomComponents;

  domComponents.addType(LISTICLE, {
    model: {
      defaults: {
        name: "Listcle"
      }
    },
    view: {
      init() {
        const components = this.model.components();
        components.add(
          `<div data-gjs-type="${LISTICLE_ITEM}">${template({
            index: 0
          })}</div>`
        );
      }
    }
  });

  domComponents.addType(LISTICLE_ITEM, {
    model: {
      defaults: {
        name: "Listicle Item",
        draggable: false,
        droppable: false,
        selectable: false,
        highlightable: false,
        hoverable: false,
        editable: false,
        propagate: [
          "draggable",
          "droppable",
          "selectable",
          "highlightable",
          "hoverable"
          //"editable"
        ]
      }
    }
  });

  domComponents.addType(COMPONENT_WRAPPER, {
    model: {
      defaults: {
        name: "Component Wrapper",
        draggable: false,
        droppable: false,
        selectable: false,
        highlightable: false,
        hoverable: false,
        editable: false,
        propagate: [
          "draggable",
          "droppable",
          "selectable",
          "highlightable",
          "hoverable"
          //"editable"
        ]
      }
    }
  });

  domComponents.addType(REPEATER, {
    model: {
      defaults: {
        name: "Repeater",
        items: 1
      },
      init() {
        this.set("customToolbar", [
          {
            id: "tlb-" + this.cid,
            command: () =>
              editor.trigger("component:open-tlb-settings", { target: this }),
            label: `<i class="fa fa-gear"/>`
          }
        ]);
      },
      updateData(data) {
        this.set("items", data.items);
        this.view.render();
      }
    },
    view: {
      init() {
        const { model } = this;
        const components = model.components();
        if (!components.length) {
          components.add({ type: COMPONENT_WRAPPER });
        }
      }
    }
  });
};
