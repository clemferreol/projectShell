var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var pid=0;

var postSchema = new Schema({
  id: { type: Number },
  created: { type: Date, default: Date.now },
  title: { type: String, default: '', trim: true, required: 'Title cannot be blank' },
  content: { type: String, default: '', trim: true },
  comments: { type: Array, default: [] },
  imageURL: { type: String, default: '' },
  user: { type: Object, ref: 'user' }
});

postSchema.pre('save', function(next) {
    this.id = pid++;
    next();
});

module.exports = mongoose.model('post', postSchema);
