const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
 msgschema = new mongoose.Schema({
        user:{type :String},
        text: {type:String}

 });
 module.exports = mongoose.model("msg", msgschema);

  