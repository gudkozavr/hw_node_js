const mustChangePassword = (req, res, next) => {
  const user = req.user;
  const isChange = user.mustChangePassword;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (isChange) {
    return res.redirect(`/change-password/${user._id}`);
  }
  next();
};

export default mustChangePassword;
