const mongoose = require('mongoose');
const { toJSON } = require('./plugins');


const notionSchema = mongoose.Schema(
  {
    access_token: {
      type: String,
      required: true,
      index: true,
    },
    token_type: {
      type: String,
      required: true,
    },
    bot_id: {
      type: String,
      required: true,
    },
    workspace_name: {
      type: String,
      required: true,
    },
    workspace_icon: {
      type: String,
      required: true,
    },
    workspace_id: {
      type: String,
      required: true,
    },
    owner: {
      type: Object,
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
notionSchema.plugin(toJSON);

/**
 * @typedef Notion
 */
const Notion = mongoose.model('Notion', notionSchema);

module.exports = Notion;
