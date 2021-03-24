import style from "./style";

export default editor => {
  const domComponent = editor.DomComponents;
  const cssc = editor.CssComposer;

  const createCssStyles = () => {
    cssc.getAll().add(style);
  };

  domComponent.addType("float-button", {
    model: {
      defaults: {
        name: "Author",
        classes: ["author"],
        builtInBlock: true
      }
    },
    view: {
      init() {
        const { model } = this;
        const components = model.components();
        !cssc.getClassRule(`author`) && createCssStyles();
        if (!components.length) {
          components.add(`
          <a href="#0" class="author__img-wrapper">
            <img src="https://codyhouse.co/app/assets/img/author-img-1.jpg" alt="Author picture">
          </a>
        
          <div class="author__content text-component v-space-xxs">
            <h4>Hi! I'm <a href="#0" rel="author">Olivia Gribben</a></h4>
            <p class="color-contrast-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, accusantium consequatur. Perspiciatis!</p>
            <p class="text-sm"><a href="#0">@oliviagribben</a></p>
          </div>
          `);
        }
      }
    }
  });
};
