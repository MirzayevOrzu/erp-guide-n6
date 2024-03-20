const express = require("express");
const path = require("node:path");
const session = require("express-session");
const expressEjsLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const config = require("./shared/config");
const routes = require("./routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layouts/main");

app.use("/static", express.static(path.join(__dirname, "..", "public")));
app.use(expressEjsLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    name: "session_id",
    secret: config.session.secret,
    saveUninitialized: false,
    resave: false,
    cookie: {
      httpOnly: true, // faqat http o'qiy oladi, javascript o'qiy olmaydi, xavfsizlik uchun
      maxAge: config.session.duration, // qancha vaqt session davom etsin
    },
  })
);
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.warning = req.flash("warning");

  next();
});

app.use(routes);

app.use((req, res) => {
  res.render("not-found", { layout: "layouts/auth" });
});

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});
