const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const logger = require("./logger");
require("./models/User");
require("./models/Survey");
require("./services/passport");
const keys = require("./config/keys");

mongoose
  .connect(keys.mongoURI)
  .then(() => logger.success("Connected to MongoDB!"))
  .catch((err) => logger.error("Error connecting to MongoDB: ", err));

const app = express();
app.use(bodyParser.json());

app.use(
  cookieSession({
    name: "session",
    keys: [keys.cookieKey],
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline'; img-src 'self' https://lh3.googleusercontent.com;"
  );
  next();
});

require("./routes/authRoutes")(app);
require("./routes/rootRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.notice("Node App working!!");
  logger.magentaBold(`Server started on port ${PORT}`);
});
