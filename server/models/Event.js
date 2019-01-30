'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Event = new Schema(
  {
    name: String,
    date: Date,
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    address: String,
    description: {
      type: String,
      maxlength: 500
    },
    price: {
      type: Number,
      default: 0,
    },
    interested: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    image: { type: Schema.Types.ObjectId, ref: 'Image' }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

module.exports = mongoose.model('Event', Event, 'event');
