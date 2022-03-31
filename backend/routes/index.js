const { authenticateMiddleWare } = require("../controllers");
const authRoutes = require("./auth");
const dashboardRoute = require("./dashboard");

function allowCors(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
}

module.exports = (app) => {
  app.use(allowCors);
  app.use("/api/auth", authRoutes);

  //jwt secured routes
  app.use("/api/user_dashboard", authenticateMiddleWare, dashboardRoute);
};
