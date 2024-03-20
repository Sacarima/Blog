import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'


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

    // check for duplicate email
    const user = await User.findOne({
        email
    })
    if (user) {
        next(errorHandler(400, 'User already exists'))
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

// Login a user

export const login = async (req, res, next) => {
    // Get the user data from the request body
    const { email, password } = req.body
    // Validate the request body
    if (!email || !password || email === '' || password === '') {
        next(errorHandler(400, 'Please fill in all fields'))
    }

    // Check if the user exists in the database
    try {
        const validUser = await User.findOne({
            email
        })
        // If the user does not exist
        if (!validUser) {
           return next(errorHandler(404, 'wrong credentials'))
        }
        // Compare the password
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) {
            return next(errorHandler(400, 'wrong credentials'))
        }

        // Create a token
        const token = jwt.sign({
            _id: validUser._id
        }, process.env.JWT_SECRET_TOKEN)

        // remove the password from the user object
        const { password: pass, ...rest } = validUser._doc
        res
            .status(200)
            .cookie('access_token', token , {
                httpOnly: true,
            })
            .json(rest)
    } catch (error) {
        next(error)
    }
}

// google auth controller
export const google = async (req, res, next) => {
    // Get the user data from the request body
    const { email, name, googlePhotoUrl } = req.body
    try {
        // Check if the user already exists
        const user = await User.findOne({
            email
        })
        // If the user does not exist
        if (user) {
            const token = jwt.sign({
                _id: user._id
            }, process.env.JWT_SECRET_TOKEN)
        //  remove the password from the user object
        const { password, ...rest } = user._doc
        res
            .status(200)
            .cookie('access_token', token , {
                httpOnly: true,
            })
            .json(rest)
        } else {
            //  generate a random password
            const generartePassword = 
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8)
            // Hash the password
            const hashedPassword = bcryptjs.hashSync(generartePassword, 10)
            // Create a new user
            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') + 
                Math.random().toString(9).slice(-4), 
                email, 
                password: hashedPassword, 
                profilePicture: googlePhotoUrl,
            })
            // Save the new user
            await newUser.save()
            // Create a token
            const token = jwt.sign({
                _id: newUser._id
            }, process.env.JWT_SECRET_TOKEN)
            // remove the password from the user object
            const { password, ...rest } = newUser._doc
            res
                .status(200)
                .cookie('access_token', token , {
                    httpOnly: true,
                })
                .json(rest)
        }
    } catch (error) {
        next(error)
    }
}