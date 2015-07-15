module.exports = function(req, res, next) {

  if (req.session.admin) {
    return next();
  }

  return res.forbidden('You need to be an admin to perform this action.');
};
