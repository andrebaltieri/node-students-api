var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var StudentSchema = new Schema({
    id: ObjectId,
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    document: { type: String, required: true }
});

module.exports = function(app) {
    var student = {};
    student = mongoose.model('Student', StudentSchema);
    
    return student;
};