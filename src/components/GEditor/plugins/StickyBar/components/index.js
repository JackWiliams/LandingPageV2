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
        url: "",
        attributes: { "data-hidden": true },
        script() {
          const el = this;
          let anchors = [];
          let url = `{[ url ]}`;
          if (url) {
            console.log("url", url);
            let markers = document.querySelectorAll("a");
            if (!markers.length) return;
            let i;
            for (i = 0; i < markers.length; i++) {
              const reg = new RegExp(url, "gi");
              const href = markers[i].href;
              if (href.match(reg) && !markers[i].closest(".sticky-bar")) {
                anchors.push(markers[i]);
              }
            }
          }
          console.log("anchors", anchors);
          function handleCTALinks(scrollHeight) {
            anchors.length > 0 &&
              anchors.forEach(anchor => {
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
            console.log("anchors", anchors);
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
        this.listenTo(this, "change:url", this.handlePropChange);
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
          },
          {
            name: "typelink",
            label: "Type Link",
            type: "select",
            options: [
              { value: "internal", name: "Internal" },
              { value: "external", name: "External" }
            ],
            changeProp: 1
          }
        ];
      },
      updateTraits() {
        const isDepend = this.get("is-depend");
        let traits = [];
        if (isDepend) {
          traits = [
            ...this.getDefaultTraits(),
            {
              name: "url",
              label: "URL",
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
