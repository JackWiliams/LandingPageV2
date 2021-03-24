import { COLLECTION_LIST, COLLECTION_LIST_ITEM } from "../constants";
import loadTraits from "./traits";
import template from "./template";
import style from "./style";

export default editor => {
  loadTraits(editor);
  const domComponent = editor.DomComponents;
  const cssc = editor.CssComposer;

  const createCssStyles = () => {
    cssc.getAll().add(style);
  };

  domComponent.addType(COLLECTION_LIST_ITEM, {
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
      },
      init() {
        const components = this.components();
        this.listenTo(components, "add", this.onAdd);
        this.listenTo(components, "remove", this.onRemove);
      },
      onRemove(model, value, opts = {}) {
        console.log("on remove", model);
        console.log("coll", this.collection);
      },
      onAdd(model, value, opts = {}) {
        console.log("on add", model);
        return;
      }
    }
  });

  domComponent.addType(COLLECTION_LIST, {
    model: {
      defaults: {
        name: "Collection List",
        classes: ["collection-list"],
        builtInBlock: true,
        customToolbar: [
          {
            id: "tlb-settings",
            command: () => editor.runCommand("cmd-open-list-settings"),
            label: `<i class="fa fa-gear"/>`
          }
        ],
        traits: [
          {
            label: "Source",
            name: "source",
            type: "select",
            default: "categories",
            options: [
              {
                id: "categories",
                name: "Categories"
              },
              {
                id: "products",
                name: "products"
              },
              {
                id: "sliders",
                name: "Sliders"
              }
            ]
          },
          {
            label: "UI State",
            type: "radio-group",
            name: "ui_state",
            options: [
              {
                id: "items",
                name: "Items"
              },
              {
                id: "empty",
                name: "Empty"
              }
            ]
          },
          {
            label: "Layout",
            type: "radio-group",
            name: "layout",
            options: [
              {
                id: "col-2",
                name: "2 Columns"
              },
              {
                id: "col-3",
                name: "3 Columns"
              },
              {
                id: "col-4",
                name: "4 Columns"
              },
              {
                id: "row-2",
                name: "2 Rows"
              }
            ]
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
        !cssc.getClassRule(`collection-list`) && createCssStyles();
        if (!components.length) {
          components.add(template);
        }
      },
      onRender() {
        const container = this.model.find(".container")[0];
        // container && container.components().each(tab => {
        //   container.onAdd(tab);
        // });
      }
    }
  });
};
