import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import grapesjs from "grapesjs";
import { getAllCustomBlock } from "./../../appRedux/actions/CustomBlock";
import { statusCode } from "./../../constants/StatusCode";

import gjsBasicBlocks from "grapesjs-blocks-basic";
import parserPostCSS from "grapesjs-parser-postcss";
import gjsCustomCode from "grapesjs-custom-code";
import gjsTabs from "grapesjs-tabs";
import gjsSlider from "grapesjs-lory-slider";
import gjsFlexbox from "grapesjs-blocks-flexbox";
import gjsNav from "grapesjs-navbar";
import gjsExport from "grapesjs-plugin-export";
import gjsForm from "grapesjs-plugin-forms";
import gjsToolbox from "grapesjs-plugin-toolbox";
import pluginProductList from "./plugins/ProductList";
import pluginSlider from "./plugins/Slider";
import pluginRepeater from "./plugins/Repeater";
import pluginAuthor from "./plugins/Author";
import pluginForm from "./plugins/Form";
import pluginStickyBar from "./plugins/StickyBar";
import pluginCProductList from "./plugins/CProductList";
import pluginCollectionList from "./plugins/CollectionList";
import pluginGrid from "./plugins/Grid";
import pluginDropdown from "./plugins/Dropdown";
import loadEditorEvents from "./events";
import loadCommands from "./commands";
import loadPanels from "./panels";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import loadEventsManager from "./plugins/EventsManager";
import LeftMenu from "./components/LeftMenu";
import RightMenu from "./components/RightMenu";
import StyleManager from "./components/StyleManager";

import "grapesjs/dist/css/grapes.min.css";
import "grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css";

function Editor() {
  const dispatch = useDispatch();
  const [editor, setEditor] = useState(null);

  const initBlocks = (e) => {
    // Phan chia block theo category
    const blocks = e.BlockManager.getAll();

    const lstCustom = ["Header", "Button", "Footer", "Form"];
    // Load basic block
    const basicBlockFilter = blocks.filter(
      (block) => !lstCustom.includes(block.get("category").id)
    );
    const basicBlocksEl = e.BlockManager.render(basicBlockFilter, {
      external: true,
    });

    if (basicBlocksEl) {
      document.getElementById("basic-blocks").appendChild(basicBlocksEl);
    }

    // Load custom block
    const customBlockFilter = blocks.filter((block) =>
      lstCustom.includes(block.get("category").id)
    );
    const newBlocksEl = e.BlockManager.render(customBlockFilter, {
      external: true,
    });
    if (newBlocksEl) {
      document.getElementById("builtin-blocks").appendChild(newBlocksEl);
    }
  };

  useEffect(() => {
    if (!editor) {
      const e = grapesjs.init({
        container: "#gjs",
        // avoidInlineStyle: 1,
        fromElement: true,
        showOffsets: 1,
        modal: {
          backdrop: false,
        },
        // Avoid any default panel
        panels: { defaults: [] },
        storageManager: {
          //autoSave: 0,
          // id: "gjs", // Prefix identifier that will be used on parameters
          // type: "remote", // Type of the storage
          // autosave: false, // Store data automatically
          autoload: false, // Autoload stored data on init
          // stepsBeforeSave: 3,
          // urlStore: URL_STORE_GRAPES,
          // urlLoad: URL_STORE_GRAPES,
          // headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
        plugins: [
          gjsCustomCode,
          gjsBasicBlocks,
          gjsTabs,
          gjsSlider,
          gjsTabs,
          gjsNav,
          gjsFlexbox,
          gjsExport,
          gjsForm,
          //gjsToolbox,

          // gjsPresetWebpage,
          parserPostCSS,
          // pluginProductList,
          // pluginSlider,
          // pluginRepeater,
          // pluginAuthor,
          // pluginForm,
          // pluginStickyBar,
          // pluginCProductList,
          // pluginGrid,
          // pluginCollectionList,
          // pluginDropdown,
          // loadEventsManager,
        ],
        pluginsOpts: {},
        canvas: {
          styles: [
            "https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css",
            "https://stackpath.bootstrapcdn.com/bootstrap/4.4.0/css/bootstrap.min.css",
            "https://fonts.googleapis.com/css?family=Roboto&display=swap",
            "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css",
          ],
          scripts: [
            "//code.jquery.com/jquery-1.11.0.min.js",
            "//code.jquery.com/jquery-migrate-1.2.1.min.js",
            "//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js",
          ],
        },
        blockManager: {
          // appendTo: "#blocks",
          // blocks: [],
        },

        layerManager: {
          appendTo: "#layers",
        },

        styleManager: {
          appendTo: ".styles-container",
          sectors: [
            {
              name: "General",
              open: false,
              buildProps: [
                "float",
                "display",
                "position",
                "top",
                "right",
                "left",
                "bottom",
              ],
            },
            {
              name: "Dimension",
              open: false,
              buildProps: [
                "width",
                "height",
                "max-width",
                "min-height",
                "margin",
                "padding",
              ],
            },
            {
              name: "Typography",
              open: false,
              buildProps: [
                "font-family",
                "font-size",
                "font-weight",
                "letter-spacing",
                "color",
                "line-height",
                "text-align",
                "text-shadow",
              ],
            },
            {
              name: "Decorations",
              open: false,
              buildProps: [
                "border-radius-c",
                "background-color",
                "border-radius",
                "border",
                "box-shadow",
                "background",
              ],
            },
            {
              name: "Extra",
              open: false,
              buildProps: ["opacity", "transition", "perspective", "transform"],
              properties: [
                {
                  type: "slider",
                  property: "opacity",
                  defaults: 1,
                  step: 0.01,
                  max: 1,
                  min: 0,
                },
              ],
            },
          ],
        },

        // selectorManager: {
        //   appendTo: ".styles-container",
        // },

        deviceManager: {
          devices: [
            {
              id: "desktop",
              name: "Desktop",
              width: "",
            },
            {
              id: "tablet",
              name: "Tablet",
              width: "768px",
              widthMedia: "992px",
            },
            {
              id: "mobileLandscape",
              name: "Mobile landscape",
              width: "568px",
              widthMedia: "768px",
            },
            {
              id: "mobilePortrait",
              name: "Mobile portrait",
              width: "375px",
              widthMedia: "480px",
            },
          ],
        },
      });

      // Load template
      const landingData = localStorage.getItem("landing_current_info")
        ? JSON.parse(localStorage.getItem("landing_current_info")).styles
        : null;

      if (landingData) {
        e.setStyle(landingData.gjsStyle);
        e.setComponents(landingData.gjsComponents);
      }

      dispatch(
        getAllCustomBlock(1, 20, (status, listData) => {
          if (status === statusCode.Success && listData.length > 0) {
            listData.forEach((item) => {
              e.BlockManager.add(item.block_name, {
                label: `<div>
                        <img
                            style="max-width: 100%;
                                   display: inline-block;
                                   vertical-align: middle;"
                            src=${item.imgSrc} />
                        <div style="font-weight: bold;
                                    padding-top: 10px;
                                    font-size: 11px;"> ${item.label}</div>
                    </div>`,
                category: item.category,
                attributes: {
                  style: "width: 100%",
                },
                content: {
                  //   tagName: "div",
                  draggable: true,
                  attributes: {
                    //class: "filter-layer",
                  },
                  components: [
                    {
                      // tagName: "div",
                      components: item.html_components,
                    },
                  ],
                },
              });
            });
            initBlocks(e);
          } else {
            console.error("Error when getting custom blocks list !");
          }
        })
      );
      // load event+ command
      loadEditorEvents(e);
      // loadPanels(e);
      loadCommands(e);
      setEditor(e);
      e.setDevice("Desktop");
    }

    return function cleanup() {
      if (editor) {
        editor.destroy();
        grapesjs.editors = grapesjs.editors.filter((e) => e !== editor);
      }
    };
  }, []);

  return (
    <div className="ld-grapes-wrap">
      <div id="gjs"></div>
      <LeftMenu editor={editor} />
      <RightMenu editor={editor} />
      <StyleManager editor={editor} />
    </div>
  );
}

export default Editor;
