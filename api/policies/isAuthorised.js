module.exports = function(req, res, next) {

  if (req.session.authenticated) {
    return next();
  }

  return res.forbidden('You need to login to perform this action.');
};
