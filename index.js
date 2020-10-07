var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function FoodItem(props) {
  return Object.entries(props.ingredients).map(function (kvp) {
    var _kvp = _slicedToArray(kvp, 2),
        key = _kvp[0],
        value = _kvp[1];

    return React.createElement(
      "li",
      null,
      key,
      " ",
      value
    );
  });
}

function GroceryList(props) {
  var entries = Object.entries(props.groceries);
  console.log(entries);
  var outval = entries.map(function (kvp) {
    var _kvp2 = _slicedToArray(kvp, 2),
        key = _kvp2[0],
        value = _kvp2[1];

    return React.createElement(
      "div",
      null,
      React.createElement(
        "h2",
        null,
        key
      ),
      React.createElement(
        "ul",
        null,
        React.createElement(FoodItem, { ingredients: value })
      )
    );
  });
  console.log(outval);
  return outval;
}

function renderList(groceries, container) {
  console.log(groceries);
  ReactDOM.render(React.createElement(GroceryList, { groceries: groceries }), container);
}