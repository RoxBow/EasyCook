'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Image = new Schema(
  {
    uri: String,
    contentType: String
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

module.exports = mongoose.model('Image', Image);
