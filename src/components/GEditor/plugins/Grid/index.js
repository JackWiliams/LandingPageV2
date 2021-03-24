import style from "./style";

export default editor => {
  const blockManager = editor.BlockManager;
  const domComponents = editor.DomComponents;

  // Grid Row
  const ROW = "grid-row",
    COLUMN = "grid-item";

  let keyWidth = "flex-basis",
    minDim = 1,
    currentUnit = 1,
    step = 0.2;

  domComponents.addType(ROW, {
    model: {
      defaults: {
        name: "Grid",
        classes: ["ctrwow-row"],
        droppable: "[data-gjs-type=".concat(COLUMN, "]"),
        resizable: {
          tl: 0,
          tc: 0,
          tr: 0,
          cl: 0,
          bl: 0,
          br: 0,
          keyHeight: "min-height"
        },
        icon:
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 14c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v4M4 14h4v-4H4v4m6 0h4v-4h-4v4m6 0h4v-4h-4v4z"></path></svg>',
        traits: [
          {
            name: "add-column",
            labelButton: "Add Column",
            type: "button",
            full: 1,
            command: function(e) {
              e.getSelected()
                .components()
                .add({ type: COLUMN });
            }
          }
        ]
      }
    }
  });

  domComponents.addType(COLUMN, {
    model: {
      defaults: {
        name: "Column",
        classes: ["cell"],
        draggable: "[data-gjs-type=".concat(ROW, "]"),
        resizable: {
          tl: 0,
          tc: 0,
          tr: 0,
          cl: 0,
          bl: 0,
          br: 0,
          bc: 0,
          keyWidth: keyWidth,
          currentUnit: currentUnit,
          minDim: minDim,
          step: step
        },
        icon:
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8 2h8c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2m0 8v4h8v-4H8m0 6v4h8v-4H8M8 4v4h8V4H8z"></path></svg>',
        traits: [
          {
            label: "Center content",
            name: "center-content",
            type: "checkbox",
            changeProp: 1
          }
        ]
      },
      init() {
        this.listenTo(this, "change:center-content", this.handleCenter);
      },
      handleCenter() {
        let isCenterContent = this.get("center-content");
        this.addStyle({
          display: isCenterContent ? "flex" : "block",
          "align-items": isCenterContent ? "center" : "",
          "justify-content": isCenterContent ? "center" : ""
        });
      }
    }
  });

  blockManager.add("Grid", {
    label: "Grid",
    category: "Basic",
    attributes: {
      class: "gjs-fonts gjs-f-b3"
    },
    content: `<div data-gjs-type="${ROW}"><div data-gjs-type="${COLUMN}"></div><div data-gjs-type="${COLUMN}"></div><div data-gjs-type="${COLUMN}"></div></div><style>${style}</style>`
  });
};
