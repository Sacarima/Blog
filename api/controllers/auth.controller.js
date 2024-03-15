import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'


// Create a new user
export const signup = async (req, res, next) => { 
    // Get the user data from the request body
    const { username, email, password } = req.body
    // Validate the request body
    if (
        !username || 
        !email || 
        !password || 
        username === '' || 
        email === '' || 
        password === ''
    ) {
        next(errorHandler(400, 'Please fill in all fields'))
    }
    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password, 10)

    //  Check if the user already exists in the database
    const newUser = new User({
        username, 
        email, 
        password: hashedPassword // save the hashed password
    })

    // Save the new user
    try {
        await newUser.save()
        res.status(201).json('User created successfully')

    } catch (error) {
        next(error)
    }

    
}

