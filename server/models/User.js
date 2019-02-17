'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const User = new Schema(
  {
    email: {
      type: String,
      required: [true, "can't be blank"],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    username: {
      type: String,
      unique: true,
      required: [true, "can't be blank"],
      trim: true
    },
    avatar: { type: Schema.Types.ObjectId, ref: 'Image' },
    recipes: [String],
    bio: {
      type: String
    },
    firstName: {
      type: String,
    },
    lastName: String,
    localization: String,
    birthday: Date,
    lastConnection: Date,
    isVerified: {
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

User.methods.encryptPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);

User.methods.validPassword = (password, hash) => bcrypt.compareSync(password, hash);

module.exports = mongoose.model('User', User);
