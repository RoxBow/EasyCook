'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoodDeal = new Schema(
  {
    storeName: String,
    date: Date,
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    address: String,
    description: {
      type: String,
      maxlength: 500
    },
    category: {
      type: String,
      default: 'good deal',
    },
    interested: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    thumbUp: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    thumbDown: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    image: { type: Schema.Types.ObjectId, ref: 'Image' }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

module.exports = mongoose.model('GoodDeal', GoodDeal, 'gooddeal');
