function RecipeView(props)
{
  const recipe = props.recipe;
  const backtrack = props.backtrack;
  const ingredients = Object.entries(recipe.ingredients);

  return <div>
    <h2>{recipe.name} by {recipe.author}</h2>
    <ul>
      {
        ingredients.map(function(kvp)
        {
          let [key, ingredient] = kvp;
          return <li>{ingredient.name}:&nbsp;&nbsp;{ingredient.quantity}&nbsp;{ingredient.units}</li>;
        })
      }
    </ul>
    <h2>Instructions:</h2>
    <p>{recipe.description}</p>
    <h2 className="clickable" onClick={backtrack}>Return to My Recipes&nbsp;&rsaquo;</h2>
  </div>;
}

function renderRecipeView(recipe, backtrack, container)
{
  ReactDOM.render(<RecipeView recipe={recipe} backtrack={backtrack}/>, container);
}
