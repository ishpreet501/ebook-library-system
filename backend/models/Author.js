const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide author name'],
      trim: true,
    },
    biography: {
      type: String,
      default: '',
    },
    nationality: {
      type: String,
      default: 'Unknown',
    },
    bornYear: {
      type: String,
      default: '',
    },
    photoUrl: {
      type: String,
      default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Author', authorSchema);
