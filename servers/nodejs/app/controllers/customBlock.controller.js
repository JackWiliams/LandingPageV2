const { Label } = require("recharts");
const config = require("../config/auth.config");
const db = require("../models");
const CustomBlock = db.customBlock;

exports.getAllCustomBlock = (req, res) => {
  const size = parseInt(req.query.size);
  const page = parseInt(req.query.page);

  const label = req.query.label;
  let filter = {};
  if (label) {
    filter = {
      label: { $regex: label, $options: "i" },
    };
  }

  CustomBlock.find(filter)
    .limit(size)
    .skip(size * Math.max(0, page - 1))
    .exec((err, customBlocks) => {
      CustomBlock.find(filter).countDocuments((err, count) => {
        if (err) {
          res.status(200).send({ data: { message: err }, code: "404" });
          return;
        }

        res.status(200).send({
          data: customBlocks,
          total: count,
          code: "200",
        });
      });
    });
};

exports.createBlock = (req, res) => {
  const customBlock = new CustomBlock({
    block_name: req.body.block_name,
    label: req.body.label,
    imgSrc: req.body.imgSrc,
    category: req.body.category,
    html_components: req.body.html_components,
  });

  if (!req.body.block_name) {
    res.status(200).send({
      data: { message: "Block name is required" },
      code: "404",
    });
    return;
  }

  CustomBlock.findOne(
    {
      block_name: req.body.block_name,
    },
    (err, oldBlock) => {
      if (err) {
        res.status(200).send({ data: { message: err }, code: "400" });
        return;
      }

      if (oldBlock) {
        return res.status(200).send({
          data: { message: "Block name is already in use" },
          code: "1004",
        });
      } else {
        customBlock.save((err, customBlock) => {
          if (err) {
            res.status(200).send({ data: { message: err }, code: "400" });
            return;
          }

          res.send({
            data: customBlock,
            code: "200",
          });
        });
      }
    }
  );
};

exports.updateBlock = (req, res) => {
  const filter = {
    block_name: req.body.block_name,
    label: req.body.label,
    imgSrc: req.body.imgSrc,
    category: req.body.category,
    html_components: req.body.html_components,
  };

  if (!req.body.block_name) {
    res.status(200).send({
      data: { message: "Block name is required" },
      code: "404",
    });
    return;
  }

  CustomBlock.findOne(
    {
      block_name: req.body.block_name,
    },
    (err, oldBlock) => {
      if (err) {
        res.status(200).send({ data: { message: err }, code: "400" });
        return;
      }

      if (oldBlock && oldBlock._id != req.body._id) {
        return res.status(200).send({
          data: { message: "Block name is already in use" },
          code: "1004",
        });
      } else {
        CustomBlock.findByIdAndUpdate(
          req.body._id,
          filter,
          { useFindAndModify: false },
          (err) => {
            if (err) {
              res.status(200).send({ data: { message: err }, code: "400" });
              return;
            }

            res.send({
              data: { message: "Update block successfully !" },
              code: "200",
            });
          }
        );
      }
    }
  );
};

exports.deleteBlock = (req, res) => {
  CustomBlock.findByIdAndDelete(req.query.block_id).exec((err) => {
    if (err) {
      res.status(200).send({ data: { message: err }, code: "404" });
      return;
    }
    res.status(200).send({
      data: { message: "Delete block successfully !" },
      code: "200",
    });
  });
};
