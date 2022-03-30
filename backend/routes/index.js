const { authenticateMiddleWare } = require("../controllers");
const authRoutes = require("./auth");
const dashboardRoute = require("./dashboard");

module.exports = (app) => {
  app.use("/api/auth", authRoutes);

  //jwt secured routes
  app.use("/api/user_dashboard", authenticateMiddleWare, dashboardRoute);
};
