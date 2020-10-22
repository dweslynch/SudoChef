function GroceryList(props)
{
  // Get list of entries in the user's grocery list
  let recipes = Object.entries(props.groceries);
  let container = props.container;

  // Allows individual RecipeView's to get back to this list
  function backtrack(event)
  {
    renderList(props.groceries, container);
  }

  return recipes.map(function(kvp) {
    let [key, recipe] = kvp;
    let ingredients = Object.entries(recipe.ingredients);
    return <div>
      <h2 className="clickable" onClick={(event) => renderRecipeView(recipe, backtrack, props.container)}>{recipe.name}&nbsp;&rsaquo;</h2>
      <ul>
        {
          ingredients.map(function(_kvp) {
              let [_key, ingredient] = _kvp;
              return <li>{ingredient.name}:&nbsp;&nbsp;{ingredient.quantity}&nbsp;{ingredient.units}</li>;
            }
          )
        }
      </ul>
    </div>;
  });
}

function renderList(groceries, container)
{
  if (groceries) {
    ReactDOM.render(<GroceryList groceries={groceries} container={container}/>, container);
  }
  else {
    ReactDOM.render(<h2>No Entries</h2>, container);
  }
}
