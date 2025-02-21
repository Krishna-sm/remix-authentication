import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lower:true,
        trim:true

    },
    password: {
        type: String,
        required: true,
    },
     
},{
    timestamps:true,
    versionKey:false
})

export const UserModel = mongoose.models.User || mongoose.model("User",Schema)