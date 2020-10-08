var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UpdateForm = function (_React$Component) {
  _inherits(UpdateForm, _React$Component);

  function UpdateForm(props) {
    _classCallCheck(this, UpdateForm);

    // Allows the form to submit groceries to the database
    var _this = _possibleConstructorReturn(this, (UpdateForm.__proto__ || Object.getPrototypeOf(UpdateForm)).call(this, props));

    _this.flowup = props.flowup;

    _this.state = { recipeName: "", ingredients: 1, ingredientlist: [] };

    // Bind event handlers
    _this.handleNameChange = _this.handleNameChange.bind(_this);
    _this.handleButtonClick = _this.handleButtonClick.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.handleIngredientQuantityChange = _this.handleIngredientQuantityChange.bind(_this);
    return _this;
  }

  _createClass(UpdateForm, [{
    key: "handleNameChange",
    value: function handleNameChange(event) {
      var val = event.target.value; // Have to grab value because the callback erases it
      this.setState(function (state) {
        return {
          recipeName: val,
          ingredients: state.ingredients,
          ingredientlist: state.ingredientlist };
      });
    }
  }, {
    key: "handleIngredientIChange",
    value: function handleIngredientIChange(i, name) {
      this.setState(function (state) {
        // Grab list from state and change name of ingredient
        var _list = [].concat(_toConsumableArray(state.ingredientlist));

        // Update name if ingredient exists, otherwise create one
        if (_list[i]) {
          _list[i].name = name;
        } else {
          // Don't set quantity, handleIngredientQuantityChange will do that
          _list[i] = {
            name: name
          };
        }

        // Return new state
        return {
          recipeName: state.recipeName,
          ingredients: state.ingredients,
          ingredientlist: _list };
      });
    }
  }, {
    key: "handleIngredientQuantityChange",
    value: function handleIngredientQuantityChange(i, quantity) {
      this.setState(function (state) {
        // Grab list from state and change quantity of ingredient
        var _list = [].concat(_toConsumableArray(state.ingredientlist));

        if (_list[i]) {
          _list[i].quantity = quantity;
        } else {
          // Don't set name, handleIngredientIChange will do that
          _list[i] = {
            quantity: quantity
          };
        }

        // Return new state
        return {
          recipeName: state.recipeName,
          ingredients: state.ingredients,
          ingredientlist: _list };
      });
    }
  }, {
    key: "handleButtonClick",
    value: function handleButtonClick(event) {
      // Add a new ingredient slot
      this.setState(function (state) {
        return {
          recipeName: state.recipeName,
          ingredients: state.ingredients + 1,
          ingredientlist: state.ingredientlist };
      });
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(event) {
      // Prevent reload
      event.preventDefault();

      var food = {
        name: this.state.recipeName,
        ingredients: this.state.ingredientlist
      };

      // Send recipe back up to page to update database
      this.flowup(food);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      // let arr = [1..this.state.ingredients]
      var arr = [];
      for (var i = 0; i < this.state.ingredients; i++) {
        arr.push(i);
      }

      return React.createElement(
        "form",
        { onSubmit: this.handleSubmit },
        React.createElement(
          "h2",
          null,
          "Add Recipe"
        ),
        React.createElement(
          "label",
          null,
          "Recipe Name:"
        ),
        React.createElement("br", null),
        React.createElement("input", { type: "text", value: this.state.recipeName, onChange: this.handleNameChange }),
        React.createElement("br", null),
        React.createElement("br", null),
        arr.map(function (i) {
          return React.createElement(
            "div",
            null,
            React.createElement(
              "label",
              null,
              "Ingredient ",
              i + 1,
              ":\xA0\xA0"
            ),
            React.createElement("input", { type: "text", value: _this2.state.ingredientlist[i] ? _this2.state.ingredientlist[i].name : "", onChange: function onChange(event) {
                return _this2.handleIngredientIChange(i, event.target.value);
              } }),
            React.createElement("input", { type: "text", value: _this2.state.ingredientlist[i] ? _this2.state.ingredientlist[i].quantity : "", onChange: function onChange(event) {
                return _this2.handleIngredientQuantityChange(i, event.target.value);
              } }),
            React.createElement("br", null),
            React.createElement("br", null)
          );
        }),
        React.createElement("input", { type: "button", value: "Add Ingredient", onClick: this.handleButtonClick }),
        React.createElement("input", { type: "submit", value: "Submit" })
      );
    }
  }]);

  return UpdateForm;
}(React.Component);

function renderform(flowup, container) {
  ReactDOM.render(React.createElement(UpdateForm, { flowup: flowup }), container);
}