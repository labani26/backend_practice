const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    }, 
    description: {
        type: String,
        require: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
}, 

{timeStamps : true}

);
module.exports = mongoose.model("Note", NoteSchema) ;

