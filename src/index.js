function FoodItem(props)
{
  return Object.entries(props.ingredients).map(function(kvp) {
    let [key, value] = kvp;
    return <li>{key} {value}</li>;
  });
}

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

function renderList(groceries, container)
{
  ReactDOM.render(<GroceryList groceries={groceries}/>, container);
}
