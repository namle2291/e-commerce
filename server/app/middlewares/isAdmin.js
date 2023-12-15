function isAdmin(req, res, next) {
  const { role } = req.user;
  if (role !== 229) throw new Error("You are not admin!!!");
  next();
}

module.exports = isAdmin;
