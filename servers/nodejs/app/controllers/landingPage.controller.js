const config = require("../config/auth.config");
const db = require("../models");
const LandingPage = db.landingPage;

exports.getAllLandingPage = (req, res) => {
  const size = parseInt(req.query.size);
  const page = parseInt(req.query.page);

  const landingName = req.query.landing_name;
  let filter = {};
  if (landingName) {
    filter = {
      landing_name: { $regex: landingName, $options: "i" },
      created_by: req.query.username,
    };
  } else {
    filter = {
      created_by: req.query.username,
    };
  }

  LandingPage.find(filter)
    .limit(size)
    .skip(size * Math.max(0, page - 1))
    .exec((err, landingPages) => {
      if (err) {
        res.status(200).send({ data: { message: err }, code: "404" });
        return;
      }

      res.status(200).send({
        data: landingPages,
        total: landingPages.length,
        code: "200",
      });
    });
};

exports.getLandingPageByID = (req, res) => {
  LandingPage.findById(req.query.landing_id).exec((err, landingPage) => {
    if (err) {
      res.status(200).send({ data: { message: err }, code: "404" });
      return;
    }
    res.status(200).send({
      data: landingPage,
      code: "200",
    });
  });
};

exports.createLandingPage = (req, res) => {
  const landingPage = new LandingPage({
    landing_name: req.body.landing_name,
    created_date: req.body.created_date || new Date(),
    created_by: req.body.created_by || null,
    modified_date: req.body.modified_date || null,
    modified_by: req.body.modified_by || null,
    status: req.body.status || "unpublished",
    styles: req.body.styles,
  });

  if (!req.body.landing_name) {
    res.status(200).send({
      data: { message: "Landing page name is required" },
      code: "404",
    });
    return;
  }

  LandingPage.findOne(
    {
      landing_name: req.body.landing_name,
    },
    (err, oldLanding) => {
      if (err) {
        res.status(200).send({ data: { message: err }, code: "400" });
        return;
      }

      if (oldLanding) {
        return res.status(200).send({
          data: { message: "Landing page name is already in use" },
          code: "1003",
        });
      } else {
        landingPage.save((err, landingPage) => {
          if (err) {
            res.status(200).send({ data: { message: err }, code: "400" });
            return;
          }

          res.send({
            data: landingPage,
            code: "200",
          });
        });
      }
    }
  );
};

exports.updateLandingPage = (req, res) => {
  const filter = {
    // _id: req.body._id,
    // landing_name: req.body.landing_name,
    // created_date: req.body.created_date,
    // created_by: req.body.created_by || null,
    modified_date: req.body.modified_date || new Date(),
    modified_by: req.body.modified_by || null,
    status: req.body.status || "unpublished",
    styles: req.body.styles,
    //__v: req.body.__v,
  };

  if (!req.body.landing_name) {
    res.status(200).send({
      data: { message: "Landing page name is required" },
      code: "404",
    });
    return;
  }

  LandingPage.findByIdAndUpdate(
    req.body._id,
    filter,
    { useFindAndModify: false },
    (err) => {
      if (err) {
        res.status(200).send({ data: { message: err }, code: "400" });
        return;
      }

      res.send({
        data: { message: "Update landing page successfully !" },
        code: "200",
      });
    }
  );
};

exports.deleteLandingPage = (req, res) => {
  LandingPage.findByIdAndDelete(req.query.landing_id).exec((err) => {
    if (err) {
      res.status(200).send({ data: { message: err }, code: "404" });
      return;
    }
    res.status(200).send({
      data: { message: "Delete landing page successfully !" },
      code: "200",
    });
  });
};
