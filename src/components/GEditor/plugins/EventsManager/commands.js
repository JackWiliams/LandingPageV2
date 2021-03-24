import { cmdEvents } from "./constants";

const layout = () => {
  return `
  <div class="form-group">
    <label>Element Trigger</label>
    <select name="event-name" id="event-name">
      <option value="">None</option>
      <option value="click">Click</option>
      <option value="hover">Hover</option>
      <option value="scroll">Scroll</option>
    </select>
  </div>
  <div class="form-group">
    <label>Action</label>
    <select name="actions" id="actions">
      <option value="showHide">Show/Hide Sticky Bar</option>
      <option value="showHide">Function 1</option>
      <option value="showHide">Function 2</option>
    </select>
  </div>
  <div class="form-group">
    <label>Select a element on canvas</label>
    <select name="selected-elements" id="selected-elements">
      <option value="">None</option>
    </select>
  </div>
  `;
};

export default (editor, config) => {
  const commands = editor.Commands;
  commands.add(cmdEvents, {
    run(editor, sender) {
      this.sender = sender;
      const pn = editor.Panels;
      const selected = editor.getSelected();
      const self = this;
      if (!selected) return;

      const $ = editor.Canvas.getWindow().$;

      const id = "views-container";
      const panels = pn.getPanel(id) || pn.addPanel({ id });

      if (!this.$eventsPanel) {
        const $eventsPanel = $("<div class='events-manager'></div>").append(
          layout()
        );

        $eventsPanel.find("#event-name").on("change", function(e) {
          const value = $(this).val();
          console.log("value", value);
        });

        $eventsPanel.find("#actions").on("change", function(e) {
          const value = $(this).val();
          console.log("value", value);
        });

        $eventsPanel.find("#selected-elements").on("change", function(e) {
          const value = $(this).val();
          console.log("value", value);
        });

        panels
          .set("appendContent", $eventsPanel)
          .trigger("change:appendContent");
        this.$eventsPanel = $eventsPanel;
      }
      this.$eventsPanel.show();
    },
    stop() {
      const $eventsPanel = this.$eventsPanel;
      $eventsPanel && $eventsPanel.hide();
    }
  });
};
