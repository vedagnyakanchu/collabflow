const express = require("express");
const app = express();
const PORT = 5000;

// middleware to parse JSON
app.use(express.json());

// import routes
const healthRoutes = require("./routes/health.routes");

// use routes
app.use("/api", healthRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
