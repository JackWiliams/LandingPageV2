export default function(editor, opt = {}) {
  const trm = editor.TraitManager;

  trm.addType("select-anchors", {
    events: {
      keyup: "onChange"
    },
    getInputEl: function() {
      if (!this.$input) {
        const options = this.model.get("options");
        const target = this.target;
        let data = target.get("anchors");
        if (data.length) {
          data = data.split(",");
        }
        let selectHTML = "";
        selectHTML = options
          .map(
            opt =>
              `<label id="${
                opt.value
              }" class="input-group"><input type="checkbox" ${
                data.includes(opt.value) ? "checked" : ""
              } name="anchor" value="${opt.value}" />${opt.name}</label>`
          )
          .join("\n");
        if (!options.length) {
          selectHTML = "<p class='input-group'>No anchor.</p>";
        }
        const input = document.createElement("div");
        input.className = "select-anchors";
        input.innerHTML = `<div class="dropdown">Select anchors</div>${selectHTML}`;
        input.onclick = function(e) {
          if (e.target.matches("input")) {
            const checked = e.target.checked;
            const value = e.target.value;
            if (checked) {
              data = [...data, value];
            } else {
              data = data.filter(item => item !== value);
            }

            target && target.set("anchors", data.length ? data.join(",") : "");
            editor.trigger("component:toggled");
          }
        };
        this.$input = input;
      }
      return this.$input;
    }
  });
}
