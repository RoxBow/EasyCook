'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredient = mongoose.Schema(
  {
    refId: String,
    isValidate: {
      type: Boolean,
      default: false
    },
    quantity: Number,
    unity: {
      type: String,
      default: 'gram',
      enum: ['gram', 'piece'],
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
);

const ShoppingList = new Schema(
  {
    name: String,
    maxDate: Date,
    ingredients: [ingredient],
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    isPin: Boolean
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

module.exports = mongoose.model('ShoppingList', ShoppingList, 'shoppinglist');
