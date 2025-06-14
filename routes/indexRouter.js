// routes/indexRouter.js
const { Router } = require("express");

const indexRouter = Router();

const messages = [
    {
      text: "Hi there!",
      user: "Amando",
      added: new Date()
    },
    {
      text: "Hello World!",
      user: "Charles",
      added: new Date()
    }
  ];
  

indexRouter.get("/", (req, res) => {
  res.render("msgIndex", { title: "Mini Messageboard", messages: messages })
});

indexRouter.get("/new", (req, res) => {
  res.render("msgForm")
});

indexRouter.post("/new", (req, res) => {
  messages.push({ text: req.body.messageText, user: req.body.messageAuthor, added: new Date() });
  res.redirect("/");
});

module.exports = indexRouter;
