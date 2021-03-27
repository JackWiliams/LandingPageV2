import { FormSettingModal } from "./modals/index";
import { message, notification } from "antd";
import { statusCode } from "./../../constants/StatusCode";
import axios from "./../../util/Api";

export default (editor) => {
  const commands = editor.Commands;

  commands.add("cmd-open-form-settings", (editor) => {
    const selected = editor.getSelected();
    const modal = editor.Modal;
    const formSettingModal = FormSettingModal({ target: selected });
    const modalEl = modal.getContentEl().closest(".gjs-mdl-dialog");
    if (modalEl) {
      modalEl.classList.add("mdl-form-setting");
    }
    modal.open({
      title: formSettingModal.title,
      content: formSettingModal.content,
    });
    modal.onceClose(() => {
      formSettingModal.onClose();
    });
  });

  /**
   * Command ẩn component khi click hide on toolbar
   */
  commands.add("tlb-hide", (editor) => {
    const selected = editor.getSelected();
    if (selected) {
      selected.addAttributes({ style: "display : none" });
      notification.info({
        message: `You've just hidden an element`,
        description:
          "Please click sections button to find if you want to make that element visible again",
        duration: null,
        placement: "topLeft",
      });
    }
  });

  /**
   * Command open style manager
   */
  commands.add("tlb-style-detail", (editor) => {
    document.getElementById("ld-style-manager").classList.add("active");
  });

  commands.add("store", {
    run: function (editor, sender) {
      let templateStyles = {
        gjsHtml: editor.getHtml(),
        gjsCss: editor.getCss(),
        gjsComponents: editor.getComponents(),
        gjsStyle: editor.getStyle(),
      };

      const landingData = localStorage.getItem("landing_current_info")
        ? JSON.parse(localStorage.getItem("landing_current_info"))
        : null;
      if (landingData && landingData._id && landingData.landing_name) {
        axios
          .put("landing-pages", {
            _id: landingData._id,
            landing_name: landingData.landing_name,
            modified_date: new Date(),
            modified_by: localStorage.getItem("user")
              ? JSON.parse(localStorage.getItem("user")).username
              : null,
            status: landingData.status,
            styles: templateStyles,
          })
          .then((res) => {
            if (res.data && res.data.code === statusCode.Success) {
              message.success("Landing page was updated successfully !");
            } else {
              message.error("Failed! Error when update landing page !");
            }
          })
          .catch(function (error) {
            message.error("Failed! Error when update landing page !");
            console.log("Error****:", error.message);
          });
      }

      // message.success("Template Saved !");
      // editor.store();
    },
  });
  editor.on("storage:load", function (e) {
    console.log("Loaded ", e);
  });
  editor.on("storage:store", function (e) {
    console.log("Stored ", e);
  });
};
