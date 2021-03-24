import template from "./template";
import utils from "../../../utils";

export default editor => {
  const domComponents = editor.DomComponents;

  domComponents.addType("slider", {
    model: {
      defaults: {
        name: "Slider",
        style: {
          padding: "20px",
          height: "340px"
        },
        data: utils.compressData([]),
        script: function() {
          window.$(".slides").slick({
            dots: true,
            infinite: true,
            speed: 500,
            fade: true,
            cssEase: "linear"
          });
        }
      }
    },
    view: {
      init() {
        const { model } = this;
        const components = model.components();
        if (components.length === 0) {
          components.add(template);
        }
      }
    }
  });
};
