const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        username: {type:String, required: true},
        password: {type: String, required: true},
        role: {type: String, default:"Foj35J0Mky9L9QsxtTOsPlYl", enum:["user", "Foj35J0Mky9L9QsxtTOsPlYl"]},
    },{
        timestamps: true
    }
);

const User = mongoose.model("User",UserSchema);
module.exports = User;