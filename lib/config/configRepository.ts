import { Recipe } from "../recipes/Recipe";
import { AppConfigProperties } from "./AppConfigProperties";

const fs = require("fs");
const config = require("data/config.json");

function load(): AppConfigProperties {
  return config as AppConfigProperties;
}

function getRecipe(recipeId: string): Recipe {
  const config = load();
  const recipe = config.recipes.find((r) => r.id === recipeId);
  if (!recipe) {
    throw new Error(`Unable to retrieve recipe with ID '${recipeId}'`);
  }

  return recipe;
}

function getRecipePayload(recipeId: string): any {
  return getRecipe(recipeId).payload;
}

function save(updates: AppConfigProperties) {
  Object.assign(config, updates);
  const json = JSON.stringify(config, null, 2);
  return fs.writeFile("data/config.json", json);
}

export const configRepository = { load, save, getRecipe, getRecipePayload };
