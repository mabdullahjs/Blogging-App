import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({

    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true
    },
    profileUrl: {
        type: String,
        required: true
    }
});


const users = mongoose.model("User", userSchema);
export default users