const express = require("express");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
function isLoggedIn(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  req.user = req.session.user;
  res.locals.currentUser = req.session.user;

  next();
}

module.exports = isLoggedIn;
