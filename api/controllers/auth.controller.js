import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'

// Create a new user
export const signup = async (req, res) => { 
    // Get the user data from the request body
    const { username, email, password } = req.body
    // Validate the request body
    if (!username || !email || !password || username === '' || email === '' || password === '') {
        return res.status(400).json({message: 'All fields are required'})
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
        res.status(409).json({message: error.message})
    }

    
}

