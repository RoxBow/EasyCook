'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShoppingList = new Schema(
  {
    name: String,
    maxDate: Date,
    aliments: [String],
    ourAliments: [String],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

module.exports = mongoose.model('ShoppingList', ShoppingList, 'shoppinglist');
