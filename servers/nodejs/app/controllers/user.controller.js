const db = require("../models");
const User = db.user;
const Role = db.role;

var bcrypt = require("bcryptjs");

exports.getAllUser = (req, res) => {
  const size = parseInt(req.query.size || 20);
  const page = parseInt(req.query.page || 1);

  const userName = req.query.username;
  let filter = {};
  if (userName) {
    filter = {
      username: { $regex: userName, $options: "i" },
    };
  }
  // const total = LandingPage.find(filter).countDocuments();

  User.find(filter)
    .limit(size)
    .skip(size * Math.max(0, page - 1))
    .populate("roles", "-__v")
    .exec((err, users) => {
      User.find(filter).countDocuments((err, count) => {
        if (err) {
          res.status(200).send({ data: { message: err }, code: "404" });
          return;
        }

        res.status(200).send({
          data: users,
          total: count,
          code: "200",
        });
      });
    });
};

exports.getUserById = (req, res) => {
  User.findById(req.query.user_id).exec((err, user) => {
    if (err) {
      res.status(200).send({ data: { message: err }, code: "404" });
      return;
    }
    res.status(200).send({
      data: user,
      code: "200",
    });
  });
};

exports.createUser = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  User.findOne({ username: req.body.username }, (err, oldUser) => {
    if (err) {
      res.status(200).send({ data: { message: err }, code: "400" });
      return;
    }

    if (oldUser) {
      return res.status(200).send({
        data: { message: "User name is already in use" },
        code: "1001",
      });
    } else {
      user.save((err, user) => {
        if (err) {
          res.status(200).send({ data: { message: err }, code: "400" });
          return;
        }

        if (req.body.roles) {
          Role.find(
            {
              name: { $in: req.body.roles },
            },
            (err, roles) => {
              if (err) {
                res.status(200).send({ data: { message: err }, code: "400" });
                return;
              }

              user.roles = roles.map((role) => role._id);
              user.save((err) => {
                if (err) {
                  res.status(200).send({ data: { message: err }, code: "400" });
                  return;
                }

                res.send({
                  data: { message: "User was created successfully!" },
                  code: "200",
                });
              });
            }
          );
        } else {
          Role.findOne({ name: "user" }, (err, role) => {
            if (err) {
              res.status(200).send({ data: { message: err }, code: "400" });
              return;
            }

            user.roles = [role._id];
            user.save((err) => {
              if (err) {
                res.status(200).send({ data: { message: err }, code: "400" });
                return;
              }

              res.send({
                data: { message: "User was created successfully!" },
                code: "200",
              });
            });
          });
        }
      });
    }
  });
};

exports.updateUser = (req, res) => {
  const filter = {
    // _id: req.body._id,
    username: req.body.username,
    email: req.body.email,
    // password: req.body.password ? bcrypt.hashSync(req.body.password, 8) : null,
  };

  if (!req.body.username) {
    res.status(200).send({
      data: { message: "User name is required" },
      code: "404",
    });
    return;
  }

  User.findOne({ username: req.body.username }, (err, oldUser) => {
    if (err) {
      res.status(200).send({ data: { message: err }, code: "400" });
      return;
    }

    if (oldUser) {
      return res.status(200).send({
        data: { message: "User name is already in use" },
        code: "1001",
      });
    } else {
      User.findByIdAndUpdate(
        req.body._id,
        filter,
        { useFindAndModify: false },
        (err) => {
          if (err) {
            res.status(200).send({ data: { message: err }, code: "400" });
            return;
          }

          res.send({
            data: { message: "Update user successfully !" },
            code: "200",
          });
        }
      );
    }
  });
};

exports.deleteUser = (req, res) => {
  User.findByIdAndDelete(req.query.user_id).exec((err) => {
    if (err) {
      res.status(200).send({ data: { message: err }, code: "404" });
      return;
    }
    res.status(200).send({
      data: { message: "Delete user successfully !" },
      code: "200",
    });
  });
};
