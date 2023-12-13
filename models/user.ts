import mongoose from "mongoose";
import bcrypt from 'bcrypt';
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
    password: {
        type: String,
        required: true,
    }
});

//signup method

userSchema.statics.signup = async function (
    firstname:string,
    lastname:string,
    email:string,
    password:string
) {
    const exists = await this.findOne({ email });
    if (exists) {
        throw Error("email already in use.");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({
        firstname,
        lastname,
        email,
        password: hash
    });
    return user;
};

//login method

userSchema.statics.login = async function (email:string, password:string) {
    if (!email && !password) {
        throw Error("Email and Password is Required");
    }

    //finding user in database
    const user = await this.findOne({ email });
    if (!user) {
        throw Error("Incorrect Email");
    }

    //compairing password

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error("Incorrect password");
    }
    return user;
};

module.exports = mongoose.model("User", userSchema);