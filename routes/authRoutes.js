const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  // Check current user
  app.get("/api/current/user", (req, res) => {
    if (req.user) {
      res.send(req.user);
    } else {
      res.status(401).send("User not authenticated");
    }
  });

  // Logout route
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};
