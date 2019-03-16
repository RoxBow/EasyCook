'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeCalendar = new Schema(
  {
    refRecipe: { type: Schema.Types.ObjectId, ref: 'Recipe' },
    date: {
      type: Date,
      required: true
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

module.exports = mongoose.model('RecipeCalendar', RecipeCalendar, 'recipeCalendar');
