var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    id: ObjectId,
    username: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, required: true }
});

module.exports = function(app) {
    var user = {};
    user = mongoose.model('User', UserSchema);

    return user;
};