const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/dbConnect');
require("dotenv").config()
const userRoutes = require("./routes/users")
const todoRoutes = require("./routes/todos")
const helmet =  require('helmet')
const xss =  require('xss-clean')
const mongoSanitize =  require('express-mongo-sanitize');
const auth = require('./middlewares/auth');


const app = express();
const port = process.env.PORT || 5001

// MIDDLEWARES
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

// ROUTES
app.use("/api", userRoutes)
app.use("/api/todo", auth, todoRoutes)

const start = () => {
    try {
        connectDB()
        app.listen(port, () => console.log(`Server is listening on port ${port}`))
    } catch (error) {
        console.log(error);
    }
}

start();