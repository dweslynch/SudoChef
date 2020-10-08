function GroceryList(props)
{
  let recipes = Object.entries(props.groceries);
  return recipes.map(function(kvp) {
    let [_key, recipe] = kvp;
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

/*
function GroceryList(props)
{
  let entries = Object.entries(props.groceries);
  let outval = entries.map(function(kvp) {
    let [key, value] = kvp;
    return <div>
      <h2>{key}</h2>
      <ul>
        <FoodItem ingredients={value} />
      </ul>
    </div>;
  });
  return outval;
}
*/

function renderList(groceries, container)
{
  ReactDOM.render(<GroceryList groceries={groceries}/>, container);
}
