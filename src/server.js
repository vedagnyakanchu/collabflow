const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");          // app.js is in SAME folder
const connectDB = require("../config/db"); // 👈 FIXED PATH

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
