import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { Recipe } from "@/lib/recipes/Recipe";
import { CONFIG } from "@/lib/config/AppConfig";
import { configRepository } from "@/lib/config/configRepository";
import { AppConfigProperties } from "@/lib/config/AppConfigProperties";
import { AppEvent, subscribe, unsubscribe } from "@/lib/events/events";

export const getStaticProps = async () => {
  const config = configRepository.load();
  return { props: { config } };
};

export default function Recipes(props: { config: AppConfigProperties }) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    CONFIG.apply(props.config);
    refreshRecipes();
    subscribe(AppEvent.ConfigChange, refreshRecipes);

    return () => {
      unsubscribe(AppEvent.ConfigChange, refreshRecipes);
    };
  }, []);

  const refreshRecipes = async () => {
    if (!CONFIG.activeServer) {
      return;
    }

    setRecipes([...CONFIG.recipes]);
  };

  const runRecipe = (recipe: Recipe) => {
    fetch(`/api/${recipe.type}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(recipe.payload)
    });
  };

  const footer = (recipe: Recipe) => (
    <div className="flex flex-wrap justify-content-end gap-2">
      <Button label="Run" icon="pi pi-bolt" onClick={() => runRecipe(recipe)} />
    </div>
  );

  return (
    <main className="flex flex-column">
      <div className="flex align-items-center">
        <h1>Recipes</h1>
      </div>

      <style jsx>{`
        section {
          padding: 35px;
          background: #f8f9fa;
          color: #495057;
          border: 1px solid #dee2e6;
          border-radius: 6px;
          display: flex;
          flex-wrap: wrap;
          gap: 35px;
        }
      `}</style>

      <section>
        {recipes.map((recipe, i) => (
          <Card
            title={recipe.name}
            key={i}
            className="md:w-25rem"
            footer={footer(recipe)}
          >
            <p className="m-0">{recipe.description}</p>
          </Card>
        ))}
      </section>
    </main>
  );
}
