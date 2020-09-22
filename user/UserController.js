const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");

router.get("/admin/users", (req, res) => {
  User.findAll().then((element) => {
    res.render("admin/users/index", {
      users: element,
    });
  });
});

router.get("/admin/users/create", (req, res) => {
  res.render("admin/users/create");
});

router.post("/users/create", (req, res) => {
  const { login, password, admin } = req.body;

  User.findOne({
    where: {
      login: login,
    },
  }).then((user) => {
    if (user == undefined) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      return User.create({
        login: login,
        password: hash,
        admin: admin,
      })
        .then(() => {
          console.log(hash);
          res.redirect("/admin/users");
        })
        .catch((e) => {
          console.log(e);
          res.redirect("/admin/users");
        });
    }
    return res.redirect("/admin/users/create");
  });
});

router.post("/users/delete", (req, res) => {
  const id = req.body.id;
  //Diferente de undefined e não for um numero
  if (id != undefined && !isNaN(id)) {
    //Destroy deleta uma categoria
    return User.destroy({
      where: {
        id: id,
      },
    }).then(() => {
      return res.redirect("/admin/users");
    });
  }
  return res.redirect("/admin/users");
});

module.exports = router;
