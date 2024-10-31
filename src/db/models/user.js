import mongoose from "mongoose";
import { emailRegexp } from "../../constants/users.js";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        match: emailRegexp,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}, { versionKey: false, timestamps: true });

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

const User = mongoose.model('User', userSchema);

export { User };