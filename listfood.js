var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function GroceryList(props) {
  // Get list of entries in the user's grocery list
  var recipes = Object.entries(props.groceries);

  return recipes.map(function (kvp) {
    var _kvp2 = _slicedToArray(kvp, 2),
        key = _kvp2[0],
        recipe = _kvp2[1];

    var ingredients = Object.entries(recipe.ingredients);
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h2",
        null,
        recipe.name
      ),
      React.createElement(
        "ul",
        null,
        ingredients.map(function (_kvp) {
          var _kvp3 = _slicedToArray(_kvp, 2),
              _key = _kvp3[0],
              ingredient = _kvp3[1];

          return React.createElement(
            "li",
            null,
            ingredient.name,
            ":\xA0\xA0",
            ingredient.quantity
          );
        })
      )
    );
  });
}

function renderList(groceries, container) {
  ReactDOM.render(React.createElement(GroceryList, { groceries: groceries }), container);
}