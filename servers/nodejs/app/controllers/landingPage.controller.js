const pinataConfig = require("../config/pinata.config");
const db = require("../models");
const LandingPage = db.landingPage;

const axios = require("axios");
const FormData = require("form-data");
const string2fileStream = require("string-to-file-stream");

exports.getAllLandingPage = (req, res) => {
  const size = parseInt(req.query.size || 20);
  const page = parseInt(req.query.page || 1);

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

  var total = 0;
  // const total = LandingPage.find(filter).countDocuments();

  LandingPage.find(filter)
    .limit(size)
    .skip(size * Math.max(0, page - 1))
    .exec((err, landingPages) => {
      LandingPage.find(filter).countDocuments((err, count) => {
        if (err) {
          res.status(200).send({ data: { message: err }, code: "404" });
          return;
        }

        res.status(200).send({
          data: landingPages,
          total: count,
          code: "200",
        });
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
    publish_url: null,
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
      created_by: req.body.created_by,
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

exports.publishLandingPage = async (req, res) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  let data = new FormData();

  data.append(
    "file",
    string2fileStream(req.body.publish_contents, {
      path: `index_${req.body._id}.html`,
    })
  );

  axios
    .post(url, data, {
      maxContentLength: "Infinity", //this is needed to prevent axios from erroring out with large files
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: pinataConfig.API_KEY,
        pinata_secret_api_key: pinataConfig.API_SECRET,
      },
    })
    .then(function (response) {
      console.log(response.data.IpfsHash);

      const filter = {
        modified_date: req.body.modified_date || new Date(),
        modified_by: req.body.modified_by || null,
        status: req.body.status || "published",
        styles: req.body.styles,
        publish_url: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`,
        //__v: req.body.__v,
      };
      //handle response here
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
            data: {
              cid: response.data.IpfsHash,
              message: "Publish landing page successfully !",
            },
            code: "200",
          });
        }
      );
    })
    .catch(function (error) {
      res.status(200).send({
        data: { message: "Cannot publish landing page !" },
        code: "404",
      });
      console.log(error);
    });
};
