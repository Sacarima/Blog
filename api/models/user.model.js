import mongoose from 'mongoose'

// Define the user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }, 
    //
}, {timestamps: true}, // this will add createdAt and updatedAt fields)

)
// Create the model from the schema and export it
const User = mongoose.model('User', userSchema)

export default User