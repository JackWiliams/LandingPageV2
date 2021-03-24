export default editor => {
  const domComponents = editor.DomComponents;
  domComponents.addType("widget-list", {
    model: {
      defaults: {
        name: "Widget List"
      }
    },
    view: {
      init() {
        const { model } = this;
        const components = model.components();
        if (!components.length) {
          components.add(`<div>Widget List`);
        }
      }
    }
  });
};
