

const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.userId === resourceUserId.toString()) return

  res.status(401).json({msg: 'Not authorized to access this route'})
}

module.exports = checkPermissions
