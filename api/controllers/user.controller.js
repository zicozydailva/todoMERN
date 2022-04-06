const User = require("../models/User");

const register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = await user.createJWT();
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const login = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password) {
        res.status(401).json({msg: "All fields are requiredr"})
    }
  try {
   const user = await User.findOne({email})
   !user && res.status(404).json({msg: "Invalid Login credentials"})

   const isPasswordCorrect = await user.comparePassword(password)
   !isPasswordCorrect && res.status(400).json({msg: "Invalid/Wrong Login credentials"})

   const token = await user.createJWT()
   res.status(200).json({user, token})
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = { register, login };
