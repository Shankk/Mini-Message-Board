// controllers/usersController.js
const usersStorage = require("../storages/usersStorage");
const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";
const ageErr = "must be a number between 18 and 120.";
const bioErr = "maximum 200 characters";

const validateUser = [
  body("firstName").trim()
    .isAlpha().withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`First name ${lengthErr}`),
  body("lastName").trim()
    .isAlpha().withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`Last name ${lengthErr}`),
  body("age")
    .optional({ values: "falsy"})
    .isInt({ min: 18, max: 120 }).withMessage(`Age ${ageErr}`),
  body("bio").trim()
    .optional({ values: "falsy"})
    .isLength({ min: 0, max: 200 }).withMessage(`Bio ${bioErr}`),
];

exports.usersListGet = (req, res) => {
  res.render("userIndex", {
    title: "User list",
    users: usersStorage.getUsers(),
  });
};

exports.usersCreateGet = (req, res) => {
  res.render("userCreate", {
    title: "Create user",
  });
};

exports.usersCreatePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("userCreate", {
        title: "Create user",
        errors: errors.array(),
      });
    }
    const { firstName, lastName, email, age, bio } = req.body;
    usersStorage.addUser({ firstName, lastName, email, age, bio });
    res.redirect("/");
  }
];

exports.usersSearchGet = (req, res) => {
  const {firstName} = req.query
  const users = usersStorage.getUsers()
  const results = users.filter(user => {
    const firstMatch = firstName ? user.firstName.toLowerCase().includes(firstName.toLowerCase()) : true;
    return firstMatch;
  })
  res.render("userSearch", {title: "Search Results", results, firstName});
}

exports.usersUpdateGet = (req, res) => {
  const user = usersStorage.getUser(req.params.id);
  res.render("userUpdate", {
    title: "Update user",
    user: user,
  });
};

exports.usersUpdatePost = [
  validateUser,
  (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("userUpdate", {
        title: "Update user",
        user: user,
        errors: errors.array(),
      });
    }
    const { firstName, lastName, email, age, bio} = req.body;
    usersStorage.updateUser(req.params.id, { firstName, lastName, email, age, bio});
    res.redirect("/");
  }
];

// Tell the server to delete a matching user, if any. Otherwise, respond with an error.
exports.usersDeletePost = (req, res) => {
  usersStorage.deleteUser(req.params.id);
  res.redirect("/");
};


