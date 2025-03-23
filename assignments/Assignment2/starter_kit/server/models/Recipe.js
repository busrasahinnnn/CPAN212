// models/Recipe.js
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  difficulty: String,
  ingredients: [String],
  steps: [String]
});

module.exports = mongoose.model('Recipe', recipeSchema);
