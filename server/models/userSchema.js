const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isblocked: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model('person', userSchema);
  