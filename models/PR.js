const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const PRSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  materials: [
    {
      materialName: {
        type: String,
        required: true,
        description: 'The name of material.',
      },
      quantity: {
        type: Number,
        default: 0,
        required: true,
        description: 'The qty of material.',
      },
      materialCode: {
        type: Number,
        required: true,
        description: '4 digit code of material.',
      },
    },
  ],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  deliveryTime: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['pending', 'passed'],
    default: 'pending',
  },
});

module.exports = PR = mongoose.model('pr', PRSchema);
