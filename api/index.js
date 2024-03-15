import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

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


//  Start the server
app.listen(9000, () => {    
    console.log('Server is running on port 9000')
})  