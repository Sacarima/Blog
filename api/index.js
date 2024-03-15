import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

//  Load environment variables
dotenv.config()

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_STRING)
    .then(() => { 
        console.log('Connected to MongoDB') 
    })
    .catch((err) => {
         console.log('Error connecting to MongoDB', err) 
    })

// Create an express application
const app = express()

// Add middleware to parse JSON
app.use(express.json())

// Add middleware to parse JSON
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

// error handler middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

//  Start the server
app.listen(9000, () => {    
    console.log('Server is running on port 9000')
})