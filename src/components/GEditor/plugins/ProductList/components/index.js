import { PRODUCT_LIST } from "../constants";
import sampleData from "../sampleData";
import utils from "../../../utils";

export default editor => {
  const domComponents = editor.DomComponents;

  domComponents.addType("list-container", {
    model: {
      defaults: {
        name: "List Container",
        classes: ["slick-productlist"],
        removable: false,
        droppable: false,
        selectable: false,
        copyable: false,
        resizable: true,
        draggable: true,
        highlight: false,
        hoverable: false,
        propagate: [
          "removable",
          "droppable",
          "selectable",
          "copyable",
          "draggable",
          "highlight",
          "hoverable"
        ],
        script: function() {
          const el = this;
          const slider = window.$(el);
          function initSlider() {
            console.log("init slider");
            slider.slick({
              slidesToShow: el.dataset.desktopitem,
              dots: "true" === el.dataset.slickdots,
              infinite: !0,
              autoplay: "true" === el.dataset.autoplay,
              autoplaySpeed: el.dataset.autoplayspeed,
              nextArrow: el.parentNode.querySelector(".slick-next"),
              prevArrow: el.parentNode.querySelector(".slick-prev"),
              lazyLoad: "ondemand",
              responsive: [
                {
                  breakpoint: 991,
                  settings: {
                    slidesToShow: el.dataset.tabletitem,
                    infinite: !0,
                    dots: !0
                  }
                },
                {
                  breakpoint: 767,
                  settings: {
                    slidesToShow: el.dataset.mobileitem,
                    infinite: !0,
                    dots: "true" === el.dataset.showdotsonmobile
                  }
                }
              ]
            });
          }
          console.log("slider", slider);
          initSlider();
        }
      }
    },
    view: {
      async onRender({ model }) {
        let response = await fetch(
          `https://5d97fe589937f40014b68f21.mockapi.io/products`
        );
        let data = await response.json();
        model.set("data", utils.compressData(data));
        model.components().reset();
        data.forEach(item => {
          this.$el.append(`
          <div class="slide-item product-item">
            <div class="thumb">
              <a href="#" class="tmb-img" title="Germ Fix UV Sanitizer">
                <img src="${item.image}" alt="${
            item.name
          }" class="c-lazy img-cate">
              </a>
            </div>
            <div class="content">
              <h3 class="product-name"><a href="#" title="${item.name}">${
            item.name
          }</a></h3>
              <div class="product-inner">
                <div class="product-price">
                  <del class="js-full-price old-price">$${item.price}</del>
                  <ins class="js-discounted-price new-price">$${
                    item.price
                  }</ins>
                </div>
              </div>
            </div>
          </div>
          `);
        });
        console.log("aaaa");
        //this.updateScript();
      }
    }
  });

  domComponents.addType(PRODUCT_LIST, {
    model: {
      defaults: {
        name: "Product List",
        classes: ["products-grid"],
        data: utils.compressData(sampleData.prices),
        script: function() {}
      }
    },
    view: {
      init({ model }) {
        const comps = model.components();
        console.log("view", comps.length);
        if (comps.length === 0) {
          comps.add(`
          <div data-gjs-type="list-container"
          class="slick-productlist js-productlist w-productlist"
          data-slickdots="false" data-autoplayspeed="4000"
          data-autoplay="false" data-showdotsonmobile="false"
          data-desktopitem="4" data-tabletitem="3"
          data-mobileitem="2"></div>
          <div class="slick-controls">
            <button class="slick-prev slick-arrow" aria-label="Previous" type="button"><i class="icon-arrow-left"></i>Previous</button>
            <button class="slick-next slick-arrow" aria-label="Previous" type="button"><i class="icon-arrow-right"></i>Next</button>
          </div>
          `);
        }
      }
    }
  });
};
