const healthCheck = (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "CollabFlow server is healthy 🚀"
  });
};

module.exports = { healthCheck };
