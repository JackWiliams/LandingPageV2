const { authJwt } = require("../middlewares");
const controller = require("../controllers/customBlock.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/custom-blocks/all",
    [authJwt.verifyToken],
    controller.getAllCustomBlock
  );

  app.post(
    "/api/custom-blocks",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createBlock
  );

  app.delete(
    "/api/custom-blocks/id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteBlock
  );

  app.put(
    "/api/custom-blocks/id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateBlock
  );
};
