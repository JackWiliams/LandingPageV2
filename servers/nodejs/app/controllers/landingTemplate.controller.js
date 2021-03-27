const config = require("../config/auth.config");
const db = require("../models");
const LandingTemplate = db.landingTemplate;

exports.getAllLandingTemplate = (req, res) => {
  const templateName = req.query.template_name;
  const categoryType = req.query.category_type;
  const size = parseInt(req.query.size);
  const page = parseInt(req.query.page);

  let filter = {};
  if (categoryType) {
    if (templateName) {
      filter = {
        category_type: categoryType,
        template_name: { $regex: templateName, $options: "i" },
      };
    } else {
      filter = {
        category_type: categoryType,
      };
    }
  } else {
    if (templateName) {
      filter = {
        template_name: { $regex: templateName, $options: "i" },
      };
    } else {
      filter = {};
    }
  }
  LandingTemplate.find(filter)
    .limit(size)
    .skip(size * Math.max(0, page - 1))
    .exec((err, landingTemplates) => {
      if (err) {
        res.status(200).send({ data: { message: err }, code: "404" });
        return;
      }

      res.status(200).send({
        data: landingTemplates,
        code: "200",
      });
    });
};

exports.getLandingTemplateByID = (req, res) => {
  LandingTemplate.findById(req.query.template_id).exec(
    (err, landingTemplate) => {
      if (err) {
        res.status(200).send({ data: { message: err }, code: "404" });
        return;
      }
      res.status(200).send({
        data: landingTemplate,
        code: "200",
      });
    }
  );
};
