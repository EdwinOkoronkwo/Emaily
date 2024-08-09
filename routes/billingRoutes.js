const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = (app) => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    try {
      const charge = await stripe.charges.create({
        amount: 500,
        currency: "usd",
        description: "$5 for 5 credits",
        source: req.body.id,
      });
      req.user.credits += charge.amount / 100;
      const user = await req.user.save();
      res.status(200).send(user);
    } catch (error) {
      console.error("Error processing charge:", error);
      res.status(500).send({ error: "Charge creation failed" });
    }
  });
};
