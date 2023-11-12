const mongoose = require('mongoose');


// define a schema for a collection
// const taskSchema = new mongoose.Schema({
//     name: String,
//     is_completed: Boolean
// });

// we can also add some validators to our schema
const taskSchema = new mongoose.Schema({
    name: {
        type        : String,
        required    : true, // or we can use required: [boolean, custom message if "name" is invalid]
        trim        : true,
        maxlength   : [20, 'Name must not exceed 20 characters']
    },
    is_completed: {
        type    : Boolean,
        default : false
    }
});

module.exports = mongoose.model('Tasks', taskSchema);
// .model basically creates a sample document with the defined schema where 1st arguent is the name of the collection the model is for and 2nd 
// argument is the schema 