const { App } = require("@slack/bolt");
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET)

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN
});

app.message("Am I rich yet?", async ({ message, say }) => {
  const { available } = await stripe.balance.retrieve()
  say(`Here's your 💸\n$${available[0].amount.toFixed(2)}`);
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running!");
})();
