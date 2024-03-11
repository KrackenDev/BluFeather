const testPlaidConnection = require("./controllers/plaidController");
const express = require("express");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/testPlaidConnection", async (req, res) => {
  const authToken = await testPlaidConnection();
  res.send(authToken);
});
