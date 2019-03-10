'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredient = mongoose.Schema(
  {
    refId: String,
    quantity: String,
    unity: {
      type: String,
      default: 'gram',
      enum: ['gram', 'piece'],
    },
  },
);

const comment = mongoose.Schema(
  {
    text: String,
    rating: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const Recipe = new Schema(
  {
    name: String,
    category: String,
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    level: String,
    preparationTime: String,
    cookingTime: String,
    averageRating: {
      type: Number,
      default: 0
    },
    steps: [String],
    ingredients: [ingredient],
    equipments: [String],
    comments: [comment],
    rating: String,
    image: { type: Schema.Types.ObjectId, ref: 'Image' }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

module.exports = mongoose.model('Recipe', Recipe, 'recipe');
