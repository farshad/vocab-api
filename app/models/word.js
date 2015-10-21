var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WordSchema = new Schema({
    name: String,
    meaning: String,
    example: String,
    translate: String,
    category_id: Number,
    view_count: Number,
    favorite: { type: Boolean, default: 0 },
    user_id: Schema.Types.ObjectId
});

module.exports = mongoose.model('Word', WordSchema);
