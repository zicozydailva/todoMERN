const mongoose = require('mongoose')
const validator = require('validator')

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide title'],
  },
  message: {
    type: String,
    required: [true, 'Please provide message']
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please Provide user"]
  }
}, {timestamps: true})


module.exports = mongoose.model('Todo', TodoSchema)
