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
    name: {
      type: String,
      required: true
    },
    maxDate: Date,
    ingredients: [ingredient],
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    isPin: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

module.exports = mongoose.model('ShoppingList', ShoppingList, 'shoppinglist');
