var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function RecipeView(props) {
  var recipe = props.recipe;
  var backtrack = props.backtrack;
  var ingredients = Object.entries(recipe.ingredients);

  return React.createElement(
    "div",
    null,
    React.createElement(
      "h2",
      null,
      recipe.name,
      " by ",
      recipe.author
    ),
    React.createElement(
      "ul",
      null,
      ingredients.map(function (kvp) {
        var _kvp = _slicedToArray(kvp, 2),
            key = _kvp[0],
            ingredient = _kvp[1];

        return React.createElement(
          "li",
          null,
          ingredient.name,
          ":\xA0\xA0",
          ingredient.quantity,
          "\xA0",
          ingredient.units
        );
      })
    ),
    React.createElement(
      "h2",
      null,
      "Instructions:"
    ),
    React.createElement(
      "p",
      null,
      recipe.description
    ),
    React.createElement(
      "h2",
      { className: "clickable", onClick: backtrack },
      "Return to My Recipes\xA0\u203A"
    )
  );
}

function renderRecipeView(recipe, backtrack, container) {
  ReactDOM.render(React.createElement(RecipeView, { recipe: recipe, backtrack: backtrack }), container);
}