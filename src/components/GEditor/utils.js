import LZString from "lz-string";

function compressData(data) {
  return LZString.compressToEncodedURIComponent(JSON.stringify(data));
}

function decompressData(data) {
  return LZString.decompressFromEncodedURIComponent(data);
}

function findComponentByProperty(model, property) {
  const result = [];
  const find = components =>
    components.forEach(item => {
      item.get(property) && result.push(item);
      find(item.components());
    });
  find(model.components());
  return result;
}

function updateComponent(model, attrs) {
  model.set(attrs);
  model.get("components").each(model => {
    if (!model.get("builtInBlock")) {
      updateComponent(model, attrs);
    }
  });
}

function getElements(model, filter = null) {
  const result = [];
  let filterResult = true;
  const find = components =>
    components.forEach(item => {
      if (typeof filter === "function") {
        filterResult = filter(item);
      }
      if (filterResult) {
        result.push({
          value: item.getId(),
          name: item.getName() + "-" + item.cid
        });
      }
      find(item.components());
    });
  find(model.components());
  return result;
}

function formActions() {
  return {
    submitOrder: () => console.log("submit order")
  };
}

function matchedRules(component, rules) {
  const el = component.getEl();
  let result = [];

  rules.forEach(rule => {
    try {
      if (
        rule
          .selectorsToString()
          .split(",")
          .some(selector => el.matches(selector))
      ) {
        result.push(rule);
      }
    } catch (err) {}
  });

  component.components().forEach(component => {
    result = result.concat(matchedRules(component, rules));
  });

  return result;
}

function getComponentRules(editor, component) {
  const allRules = editor.CssComposer.getAll();
  const componentRules = matchedRules(component, allRules);
  let selectors = [];
  componentRules.forEach(rule => selectors.push(rule.toJSON()));
  return selectors;
}

export default {
  compressData,
  decompressData,
  findComponentByProperty,
  updateComponent,
  formActions,
  getElements,
  getComponentRules
};
