const express = require("express");
const app = express();
const Page = require("./db/Page");

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Welcome!`);
});
app.get("/api/pages", (req, res, next) => {
  Page.findAll()
    .then(data => res.send(data))
    .catch(next);
});

app.get("/api/pages/:id/children", (req, res, next) => {
  Page.findAll({ where: { parentId: req.params.id } })
    .then(data => res.send(data))
    .catch(next);
});

app.get("/api/pages/:id/siblings", (req, res, next) => {
  const pid = Page.findByPK(req.params.id).then(data => data.parentId);

  Page.findAll({ where: { parentId: pid, id: { ne: req.params.id } } })
    .then(resp => res.send(resp))
    .catch(next);
});

//return error message
app.use((err, req, res, next) => {
  res.status(500).send({ error: err });
});

module.exports = app;
