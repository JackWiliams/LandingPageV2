import template from "lodash/template";
import templateSettings from "lodash/templateSettings";
import utils from "./utils";
import { RepeaterSettingModal } from "./modals";
import { cmdEvents } from "./plugins/EventsManager/constants";

function renderItems(data) {
  templateSettings.interpolate = /{{([\s\S]+?)}}/g;
  var compiled = template("<div>{{ name }}</div>");
  return compiled(data);
}

function updateBuiltInBlock(model, opts = {}) {
  const defaultAttrs = {
    selectable: opts.isEdit,
    editable: opts.isEdit,
    hoverable: opts.isEdit,
    highlightable: opts.isEdit,
    resizable: true,
  };
  //if (!model) return;
  const components = model.components();
  if (!components.length) return;
  components.forEach((component) =>
    utils.updateComponent(component, defaultAttrs)
  );
}

export default (editor) => {
  let builtInBlockSelected = null;
  const domComponents = editor.DomComponents;

  var extendComponent = function (t) {
    var e = t.model.prototype.init;
    domComponents.addType(t.id, {
      model: {
        init: function () {
          e.apply(this, arguments);
          var t = "open-tlb-settings",
            n = this.get("toolbar");
          n.some(function (e) {
            return e.command === t;
          }) ||
            n.push({
              attributes: {
                class: "fa fa-gear",
              },
              command: t,
            });
        },
      },
    });
  };

  editor.on("load", () => {
    console.log("on load editor");
    //domComponents.getTypes().forEach(o);
  });

  editor.on("change:device", () =>
    console.log("Current device: ", editor.getDevice())
  );

  //editor.on("component:type:add", o);

  editor.on("component:mount", (model) => {
    const editorWindow = editor.Canvas.getWindow();

    if (!editorWindow.utils) {
      editorWindow.utils = utils;
    }
    if (!editorWindow.renderItems) {
      editorWindow.renderItems = renderItems;
    }

    const toolbar = model.get("toolbar");
    const customToolbar = model.get("customToolbar");
    if (customToolbar) {
      customToolbar.forEach((t) => {
        toolbar.push(t);
      });
    }

    if (model.get("builtInBlock")) {
      model.addAttributes({ builtInBlock: model.cid });
      model.set("resizable", true);
      updateBuiltInBlock(model, { isEdit: false });
    }
  });

  editor.on("component:selected", (model) => {
    // const blockWrapper = model.closest("[builtinblock]");
    // if (
    //   blockWrapper &&
    //   builtInBlockSelected &&
    //   blockWrapper.cid !== builtInBlockSelected.cid
    // ) {
    //   updateBuiltInBlock(builtInBlockSelected, { isEdit: false });
    // }
    // if (model.get("builtInBlock")) {
    //   builtInBlockSelected = model;
    //   updateBuiltInBlock(model, { isEdit: true });
    // }
    // if (!blockWrapper) {
    //   builtInBlockSelected &&
    //     updateBuiltInBlock(builtInBlockSelected, { isEdit: false });
    // }

    // get the selected componnet and its default toolbar
    const selectedComponent = editor.getSelected();
    //const defaultToolbar = selectedComponent.get("toolbar");

    selectedComponent.set({
      toolbar: [
        {
          attributes: { class: "fa fa-text-height", title: "Auto height" },
          command: "tlb-auto-height",
        },
        {
          attributes: { class: "fa fa-text-width", title: "Auto width" },
          command: "tlb-auto-width",
        },
        {
          attributes: { class: "fa fa-arrows-h", title: "Auto space" },
          command: "tlb-auto-space",
        },
        {
          attributes: { class: "fa fa-outdent", title: "Align left" },
          command: "tlb-align-left",
        },
        {
          attributes: { class: "fa fa-align-center", title: "Align center" },
          command: "tlb-align-center",
        },
        {
          attributes: { class: "fa fa-indent", title: "Align right" },
          command: "tlb-align-right",
        },
        {
          attributes: { class: "fa fa-cog", title: "Style Managers" },
          command: "tlb-style-detail",
        },
        {
          attributes: { class: "fa fa-arrows", title: "Move" },
          command: "tlb-move",
        },
        {
          attributes: { class: "fa fa-clone", title: "Duplicate" },
          command: "tlb-clone",
        },
        {
          attributes: { class: "fa fa-eye-slash", title: "Hide" },
          command: "tlb-hide",
        },
        {
          attributes: { class: "fa fa-trash", title: "Delete" },
          command: "tlb-delete",
        },
      ],
    });
  });

  // editor.on("component:add", model => {
  //   const rules = utils.getComponentRules(editor, model);
  //   console.log("rules", rules);
  // });

  editor.on("component:open-tlb-settings", (params) => {
    const modal = editor.Modal;
    const repeaterSettingModal = RepeaterSettingModal(params);
    const modalEl = modal.getContentEl().closest(".gjs-mdl-dialog");
    if (modalEl) {
      modalEl.classList.add("mdl-repeater");
    }
    modal.open({
      title: repeaterSettingModal.title,
      content: repeaterSettingModal.content,
    });
    modal.onceClose(() => {
      repeaterSettingModal.onClose();
    });
  });
};
