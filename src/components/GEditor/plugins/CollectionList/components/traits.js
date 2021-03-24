// Source, UI State, Layout, Filter, Sort Order, Paginate items, Limit items
const settings = [
  {
    label: "Source",
    name: "source",
    type: "select",
    options: [
      {
        name: "Categories",
        value: "categories"
      },
      {
        name: "Products",
        value: "product"
      }
    ]
  },
  {
    label: "UI State",
    name: "ui_state",
    type: "select",
    options: [
      {
        name: "Items",
        value: "items"
      },
      {
        name: "Empty",
        value: "empty"
      }
    ]
  },
  {
    label: "Layout",
    name: "layout",
    type: "select",
    options: [
      {
        name: "Categories",
        value: "categories"
      },
      {
        name: "Products",
        value: "product"
      }
    ]
  }
];

export default editor => {
  editor.TraitManager.addType("radio-group", {
    // Expects as return a simple HTML string or an HTML element
    createInput({ trait }) {
      // Here we can decide to use properties from the trait
      const traitOpts = trait.get("options") || [];
      const options = traitOpts.length ? traitOpts : [];

      // Create a new element container and add some content
      const el = document.createElement("div");
      el.innerHTML = `
        <div class="radio-group radio-group-outline">
        ${options
          .map(
            opt => `<label class="radio-button-wrapper">
          <input type="radio" class="radio-button-input" value="${opt.id}" />
          <span>${opt.name}</span>
          </label>`
          )
          .join("")}
        </div>
      `;

      return el;
    },
    onEvent({ elInput, component, event }) {}
  });
};
