const getUserDashboard = (req, res) => {
  res.send(req.user);
};

module.exports = {
  getUserDashboard,
};
