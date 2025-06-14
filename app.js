const express = require("express");
const app = express();
const indexRouter = require("./routes/indexRouter");
const usersRouter = require("./routes/usersRouter");
const path = require("node:path");

app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", usersRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`User/Message Board - listening on port ${PORT}!`);
});
