const express = require("express");
const passport = require("../config/passport");
const router = express.Router();
const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");

// GET login or calendar if logged in
router.get("/", (req, res) => {
  if (req.user) {
    res.render("calendar");
  }
  res.render("login");
});

// GET signup or calendar if logged in
router.get("/signup", (req, res) => {
  if (req.user) {
    res.render("calendar");
  }
  res.render("signup");
});

// GET calendar if logged in, render handle-bars pg
router.get("/calendar", isAuthenticated, (req, res) => {
  res.render("calendar", { goals: true });
});

// GET calendar if logged in, render handle-bars pg
router.get("/addgoal", isAuthenticated, (req, res) => {
  res.render("calendar", { add: true });
});

// POST method for user login
router.post("/api/login", passport.authenticate("local"), (req, res) => {
  res.json(req.user);
});

// POST to db User info
router.post("/api/signup", (req, res) => {
  db.User.create({
    email: req.body.email,
    password: req.body.password
  })
    .then(() => {
      res.redirect(307, "/api/login");
    })
    .catch(err => {
      res.status(401).json(err);
    });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/api/goals/:id", (req, res) => {
  if (!req.user) {
    res.json({});
  } else {
    db.Goals.findAll({
      where: {
        UserID: req.params.id
      }
    }).then(dbGoals => {
      res.json(dbGoals);
    });
  }
});

router.get("/api/goals/:id/shortterm", (req, res) => {
  if (!req.user) {
    res.json({});
  } else {
    db.Goals.findAll({
      where: {
        UserID: req.params.id,
        longterm: 0
      }
    }).then(dbGoals => {
      res.json(dbGoals);
    });
  }
});

router.get("/api/goals/:goal/:id", (req, res) => {
  if (!req.user) {
    res.json({});
  } else {
    db.Goals.findAll({
      where: {
        UserID: req.params.id,
        goalDes: req.params.goal
      }
    }).then(dbGoals => {
      res.json(dbGoals);
    });
  }
});

router.get("/api/user_data", (req, res) => {
  if (!req.user) {
    res.json({});
  } else {
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  }
});

// GET goals
router.get("/api/goals", (req, res) => {
  if (!req.user) {
    res.json({});
  } else {
    db.Goals.findAll({
      include: [db.User]
    }).then(dbGoals => {
      res.json(dbGoals);
    });
  }
});

// POST goals
router.post("/api/goals", isAuthenticated, (req, res) => {
  db.Goals.create(req.body).then(data => {
    res.json(data);
  });
});

router.delete("/api/goals/:name/:userid", (req, res) => {
  if (!req.user) {
    res.json({});
  } else {
    db.Goals.destroy({
      where: {
        goalDes: req.params.name,
        UserId: req.params.userid
      }
    }).then(dbGoals => {
      res.json(dbGoals);
    });
  }
});

router.put("/api/goals/:id/:bool", req => {
  db.Goals.update(
    { completed: req.params.bool },
    {
      where: {
        id: req.params.id
      }
    }
  );
});

module.exports = router;
