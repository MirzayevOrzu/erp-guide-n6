const express = require("express");

function hasRole(allowedRoles) {
  /**
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  return function (req, res, next) {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).send("Ruxsat yo'q");
    }

    next();
  };
}

module.exports = hasRole;
