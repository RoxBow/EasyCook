'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredient = mongoose.Schema(
  {
    id: String,
    isValidate: {
      type: Boolean,
      default: false
    }
  },
  { _id: false }
);

const ShoppingList = new Schema(
  {
    name: String,
    maxDate: Date,
    ingredients: [ingredient],
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
