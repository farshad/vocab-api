var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
    client_id: Number,
    name: String,
    wordCount: Number,
    user_id: Schema.Types.ObjectId
});

module.exports = mongoose.model('Category', CategorySchema);
