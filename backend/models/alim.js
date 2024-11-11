const mongoose = require("mongoose");

const AlimSchema = mongoose.Schema(
    {
        name : {type: String, required: true},
        fullname: {type: String},
        borntime : {type: String},
        deathtime : {type: String},
        century : {type: String},
        life : {type: String,},
        works : {type: String,},
        worktype:{type:String},
        picture:{type: String},
        civilization:{type:String},
        source:{type:String, required: true},
        organizer:{type:String, required:true},
    },{
        timestamps: true
    }
);

const Alim = mongoose.model("Alim",AlimSchema);
module.exports = Alim;