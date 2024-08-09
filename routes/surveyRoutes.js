const requireCredits = require("../middlewares/requireCredits");
const requireLogin = require("../middlewares/requireLogin");
const Survey = require("../models/Survey");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
const Mailer = require("../services/Mailer");

module.exports = (app) => {
  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select(
      "-recipients"
    );
    res.send(surveys);
  });
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients
        .split(",")
        .map((email) => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      // Send the survey email
      await mailer.send();

      // Save the survey to the database
      await survey.save();

      // Deduct credits from the user
      req.user.credits -= 1;
      await req.user.save();

      // Send success response
      res.status(200).send({ message: "Survey sent successfully!" });
    } catch (err) {
      console.error("Error sending email:", err);

      // Ensure only one response is sent in case of error
      if (!res.headersSent) {
        res.status(500).send({ error: "Failed to send survey email" });
      }
    }
  });
};
