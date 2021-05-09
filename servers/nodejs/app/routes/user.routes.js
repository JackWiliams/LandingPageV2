const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/users/all",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllUser
  );

  app.get(
    "/api/users/id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getUserById
  );

  app.post(
    "/api/users",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createUser
  );

  app.delete(
    "/api/users/id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteUser
  );

  app.put(
    "/api/users/id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateUser
  );
  // app.get("/api/test/all", controller.allAccess);

  // app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  // app.get(
  //   "/api/test/mod",
  //   [authJwt.verifyToken, authJwt.isModerator],
  //   controller.moderatorBoard
  // );
};
