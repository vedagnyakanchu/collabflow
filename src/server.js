const app = require('./app');
const connectDB = require('../config/db');      // ✅ ADDED
require('dotenv').config();

const PORT = process.env.PORT || 5050;

// ✅ FIXED: Use connectDB function
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
