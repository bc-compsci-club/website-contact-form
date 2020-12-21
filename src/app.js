const express = require("express");
const cors = require("cors");
const sendGrid = require("@sendgrid/mail");

// Initialize Express
const app = express();
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Change later to only allow our server
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Email API endpoint
app.post("/api/email", (req, res) => {
  sendGrid.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: "contact@bccompsci.club",
    from: "bccompsciclub@no-reply.company",
    replyTo: req.body.email,
    subject: req.body.name + " asked a question",
    text: req.body.name + "\n \n" + req.body.email + "\n \n" + req.body.message,
  };

  sendGrid
    .send(msg)
    .then((result) => {
      res.json({
        success: true,
      });
    })
    .catch((err) => {
      console.error("error: ", err);
      res.status(401).json({
        success: false,
      });
    });
});

app.listen(process.env.PORT || 8080);
console.log("Contact form service started.");
