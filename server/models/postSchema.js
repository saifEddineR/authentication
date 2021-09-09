const mongoose = require('mongoose');
const schema = mongoose.Schema;

const postSchema = new schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  description: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'person',
    required: true,
  },
  // likes:{

  // },
  image: {
    imageURL: String,
    public_id: String,
  },
});
module.exports = mongoose.model('post', postSchema);
