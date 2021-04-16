const { authJwt } = require("../middlewares");
const controller = require("../controllers/landingPage.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/landing-pages/all",
    [authJwt.verifyToken],
    controller.getAllLandingPage
  );

  app.get(
    "/api/landing-pages/id",
    [authJwt.verifyToken],
    controller.getLandingPageByID
  );

  app.post(
    "/api/landing-pages",
    [authJwt.verifyToken],
    controller.createLandingPage
  );

  app.put(
    "/api/landing-pages",
    [authJwt.verifyToken],
    controller.updateLandingPage
  );

  app.delete(
    "/api/landing-pages/id",
    [authJwt.verifyToken],
    controller.deleteLandingPage
  );

  app.post(
    "/api/landing-pages/publish",
    [authJwt.verifyToken],
    controller.publishLandingPage
  );
  //   app.get("/api/landing/all", controller.allAccess);

  //   app.get(
  //     "/api/test/mod",
  //     [authJwt.verifyToken, authJwt.isModerator],
  //     controller.moderatorBoard
  //   );

  //   app.get(
  //     "/api/test/admin",
  //     [authJwt.verifyToken, authJwt.isAdmin],
  //     controller.adminBoard
  //   );
};
