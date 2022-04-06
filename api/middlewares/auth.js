const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
  const authHeader = req.headers.token
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    res.status(401).json({msg:'Authentication Invalid'})
  }
  const token = authHeader.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { userId: payload.userId }

    next()
  } catch (error) {
    res.status(401).json({msg:'Authentication Invalid'})
  }
}

module.exports =  auth
