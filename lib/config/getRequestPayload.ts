import { NextApiRequest } from "next";
import { configRepository } from "./configRepository";

export function getRequestPayload<T>(req: NextApiRequest): T {
  const { recipeId } = req.query;
  let body = req.body as T;

  const lookupRecipe = !body && recipeId;
  if (lookupRecipe) {
    body = configRepository.getRecipePayload(recipeId as string) as T;
  }

  if (!body) {
    throw new Error(`Missing or invalid request body or 'recipeId' parameter`);
  }

  return body as T;
}
