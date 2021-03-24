import { FormSettingModal } from "./modals/index";
import { message, notification } from "antd";

export default (editor) => {
  const commands = editor.Commands;

  commands.add("cmd-open-form-settings", (editor) => {
    const selected = editor.getSelected();
    const modal = editor.Modal;
    const formSettingModal = FormSettingModal({ target: selected });
    const modalEl = modal.getContentEl().closest(".gjs-mdl-dialog");
    if (modalEl) {
      modalEl.classList.add("mdl-form-setting");
    }
    modal.open({
      title: formSettingModal.title,
      content: formSettingModal.content,
    });
    modal.onceClose(() => {
      formSettingModal.onClose();
    });
  });

  /**
   * Command ẩn component khi click hide on toolbar
   */
  commands.add("tlb-hide", (editor) => {
    const selected = editor.getSelected();
    if (selected) {
      selected.addAttributes({ style: "display : none" });
      notification.info({
        message: `You've just hidden an element`,
        description:
          "Please click sections button to find if you want to make that element visible again",
        duration: null,
        placement: "topLeft",
      });
    }
  });

  /**
   * Command open style manager
   */
  commands.add("tlb-style-detail", (editor) => {
    document.getElementById("ld-style-manager").classList.add("active");
  });

  commands.add("store", {
    exportCss: function (component) {
      const target = component || editor.getWrapper();
      const styles = editor.CssComposer.getAll();
      this.selectors = {};
      const rules = Object.values(this.matchedRules(target, styles));
      console.log("rules", rules);
      let s = this.splitRules(rules),
        c = s.atRules,
        l = s.notAtRules,
        a = "";

      l.forEach(function (t) {
        return (a += t.toCSS());
      });
      console.log("css", a);
      return a;
    },
    selectors: {},
    matchedRules: function (t, e) {
      var n = this,
        r = t.getEl(),
        o = [];
      e.forEach(function (t) {
        try {
          if (
            t
              .selectorsToString()
              .split(",")
              .some(function (t) {
                return r.matches(n.cleanSelector(t));
              })
          ) {
            if (!n.selectors[t.selectorsToString()]) {
              n.selectors[t.selectorsToString()] = t;
            }
            //o.push(t);
          }
        } catch (t) {}
      });
      t.components().forEach(function (t) {
        t && n.matchedRules(t, e);
      });
      return n.selectors;
    },
    cleanSelector: function (t) {
      return t
        .split(" ")
        .map(function (t) {
          return t.split(":")[0];
        })
        .join(" ");
    },
    splitRules: function (t) {
      var e = {},
        n = [];
      return (
        t.forEach(function (t) {
          var r = t.getAtRule();
          if (r) {
            var o = e[r];
            o ? o.push(t) : (e[r] = [t]);
          } else n.push(t);
        }),
        {
          atRules: e,
          notAtRules: n,
        }
      );
    },
    getQueryLength: function (t) {
      var e = /(-?\d*\.?\d+)\w{0,}/.exec(t);
      return e ? parseFloat(e[1]) : Number.MAX_VALUE;
    },
    // run: function (t, e) {
    //   var params =
    //       arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
    //     result = {
    //       html: "",
    //       css: "",
    //     },
    //     selected = params.component || t.getSelected();
    //   console.log("selected", selected);
    //   const self = this;
    //   selected = Array.isArray(selected)
    //     ? selected
    //     : [selected].forEach(function (component) {
    //         if (component) {
    //           result.html += component.toHTML();
    //           // result.css += editor
    //           //   .getModel()
    //           //   .get("CodeManager")
    //           //   .getCode(component, "css");
    //           result.css += self.exportCss(component);
    //         }
    //       });
    //   console.log("result.html", result.html);
    //   //console.log("result.css", result.css);
    // },
    run: function (editor, sender) {
      message.success("Template Saved !");
      editor.store();
    },
  });
  editor.on("storage:load", function (e) {
    console.log("Loaded ", e);
  });
  editor.on("storage:store", function (e) {
    console.log("Stored ", e);
  });
};
