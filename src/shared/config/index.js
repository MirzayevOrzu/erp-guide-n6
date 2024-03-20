require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  session: {
    secret: process.env.SESSION_SECRET,
    duration: +process.env.SESSION_DURATION,
  },
};
