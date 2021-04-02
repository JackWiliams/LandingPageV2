const config = require("../config/auth.config");
const db = require("../models");
const CustomBlock = db.customBlock;

exports.getAllCustomBlock = (req, res) => {
  const size = parseInt(req.query.size);
  const page = parseInt(req.query.page);

  CustomBlock.find()
    .limit(size)
    .skip(size * Math.max(0, page - 1))
    .exec((err, customBlocks) => {
      if (err) {
        res.status(200).send({ data: { message: err }, code: "404" });
        return;
      }

      res.status(200).send({
        data: customBlocks,
        code: "200",
      });
    });
};
