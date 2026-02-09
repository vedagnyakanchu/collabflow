const app = require("./app");

const PORT = 5050;
const HOST = "127.0.0.1";

app.listen(PORT, HOST, () => {
  console.log(`🚀 Express running at http://${HOST}:${PORT}`);
});
