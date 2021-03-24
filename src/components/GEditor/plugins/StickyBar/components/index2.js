import style from "./style";

export default editor => {
  const domComponents = editor.DomComponents;
  const cssc = editor.CssComposer;

  const createCssStyles = () => {
    cssc.getAll().add(style);
  };

  function getElements(model, filter = null) {
    const result = [];
    let filterResult = true;
    const find = components =>
      components.forEach(item => {
        if (typeof filter === "function") {
          filterResult = filter(item);
        }
        if (filterResult && item.getView()) {
          item.addAttributes({ id: item.getId() });
          result.push({
            value: item.getId(),
            name: item.getView().el.textContent
              ? item.getView().el.textContent
              : item.getName() + "-" + item.cid
          });
        }
        find(item.components());
      });
    find(model.components());
    return result;
  }

  domComponents.addType("sticky-bar", {
    model: {
      defaults: {
        name: "Sticky Bar",
        classes: ["sticky-bar"],
        position: "top",
        //parentLayer: true,
        "position-element": "top",
        "is-depend": false,
        anchors: "",
        attributes: { "data-hidden": true },
        script() {
          const el = this;
          const bool = val => !!val;
          let anchors = `{[ anchors ]}`;
          if (anchors.length) {
            anchors = anchors.split(",");
          }
          console.log("anchors", anchors);
          function handleCTALinks(scrollHeight) {
            anchors.length > 0 &&
              anchors.forEach(id => {
                const anchor = document.getElementById(id);
                if (!anchor) return;
                const offsetHideEl = anchor.offsetTop;
                let e = scrollHeight + document.documentElement.clientHeight;
                if (e >= offsetHideEl) {
                  !el.classList.contains("hidden") &&
                    el.classList.add("hidden");
                  if (scrollHeight >= offsetHideEl) {
                    el.classList.remove("hidden");
                  }
                }
              });
          }

          function handleScroll() {
            const scrollHeight = window.scrollY;
            handleCTALinks(scrollHeight);
          }

          window.addEventListener("scroll", function() {
            handleScroll();
          });
        }
      },
      init() {
        this.loadTraits(this.getDefaultTraits());
        this.listenTo(this, "change:position", this.handlePropChange);
        this.listenTo(this, "change:is-depend", this.updateTraits);
        this.listenTo(this, "change:anchors", this.handlePropChange);
        this.updateTraits();
      },
      handlePropChange() {
        this.setClass(`sticky-bar sticky-${this.get("position")}`);
        this.trigger("change:script");
      },
      getDefaultTraits() {
        return [
          {
            name: "position",
            label: "Position",
            type: "select",
            options: [
              { value: "top", name: "Top" },
              { value: "bottom", name: "Bottom" }
            ],
            changeProp: 1
          },
          {
            name: "is-depend",
            label: "Conditional Visibility",
            type: "checkbox",
            value: false,
            changeProp: 1
          }
        ];
      },
      updateTraits() {
        const isDepend = this.get("is-depend");
        const wrapper = editor.getWrapper();
        let traits = [];
        let elements = getElements(
          wrapper,
          el => el.cid !== this.cid && el.attributes.tagName === "a"
        );
        if (isDepend) {
          traits = [
            ...this.getDefaultTraits(),
            {
              name: "anchors",
              label: "Anchors",
              type: "select-anchors",
              options: elements,
              changeProp: 1
            }
          ];
        } else {
          traits = this.getDefaultTraits();
        }
        this.loadTraits(traits);
        this.em.trigger("component:toggled");
        //this.trigger("change:script");
      }
    },
    view: {
      init() {
        const { model } = this;
        const components = model.components();
        !cssc.getClassRule(`sticky-bar`) && createCssStyles();
        if (!components.length) {
          components.add(`<div>Sticky Bar</div>`);
        }
      },
      onRender() {
        const { model } = this;
        model.addClass(`sticky-${model.get("position")}`);
      },
      events: {
        click: "handleClick"
      },
      handleClick() {
        this.model.updateTraits();
      }
    }
  });
};
