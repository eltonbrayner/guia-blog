const express = require("express");
const router = express.Router();

router.get("/categories", (req, res) => {
  res.send("Categories page");
});

router.get("/admin/categories/new", (req, res) => {
  res.send("Rota para criar novas categorias");
});

module.exports = router;
