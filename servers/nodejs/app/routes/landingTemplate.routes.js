const { authJwt } = require("../middlewares");
const controller = require("../controllers/landingTemplate.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/landing-templates/all",
    [authJwt.verifyToken],
    controller.getAllLandingTemplate
  );

  app.get(
    "/api/landing-templates/id",
    [authJwt.verifyToken],
    controller.getLandingTemplateByID
  );
};
