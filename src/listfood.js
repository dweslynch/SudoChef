function GroceryList(props)
{
  // Get list of entries in the user's grocery list
  let recipes = Object.entries(props.groceries);

  return recipes.map(function(kvp) {
    let [key, recipe] = kvp;
    let ingredients = Object.entries(recipe.ingredients);
    return <div>
      <h2>{recipe.name}</h2>
      <ul>
        {
          ingredients.map(function(_kvp) {
              let [_key, ingredient] = _kvp;
              return <li>{ingredient.name}:&nbsp;&nbsp;{ingredient.quantity}</li>;
            }
          )
        }
      </ul>
    </div>;
  });
}

function renderList(groceries, container)
{
  ReactDOM.render(<GroceryList groceries={groceries}/>, container);
}
