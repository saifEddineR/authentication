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
    type: String,
    default: 'https://media2.image-republic.com/11609-large_default/cadre-noir.jpg',
  },
});
module.exports = mongoose.model('post', postSchema);
