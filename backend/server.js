const express = require("express");
const app = express();

// VERY IMPORTANT
app.use(express.json());

app.post("/test", (req, res) => {
  res.status(200).json({
    message: "POST working",
    body: req.body,
  });
});

app.get("/test", (req, res) => {
  res.send("GET working");
});

app.listen(5000, () => {
  console.log("✅ Server running on port 5000");
});
