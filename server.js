require("dotenv").config();
const express = require("express");
const app = express();

// Allow the server to read JSON data sent from the frontend
app.use(express.json());

// Serve your HTML/CSS/JS store from the "public" folder
app.use(express.static("public"));

// Backend API route to handle checkout securely
app.post("/api/checkout", (req, res) => {
  const { itemCount, totalPrice } = req.body;

  // Access the secret key safely from .env (never exposed to the browser!)
  const secretKeyLoaded = Boolean(process.env.PAYMENT_SECRET_KEY);

  console.log(`New order received: ${itemCount} items | Total: R${totalPrice}`);
  console.log(`Secret payment key loaded securely: ${secretKeyLoaded}`);

  res.json({
    success: true,
    message: `Order for ${itemCount} item(s) totaling R${totalPrice} received by server!`
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Store server running at http://localhost:${PORT}`);
});