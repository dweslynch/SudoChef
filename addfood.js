var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UpdateForm = function (_React$Component) {
  _inherits(UpdateForm, _React$Component);

  function UpdateForm(props) {
    _classCallCheck(this, UpdateForm);

    var _this = _possibleConstructorReturn(this, (UpdateForm.__proto__ || Object.getPrototypeOf(UpdateForm)).call(this, props));

    _this.flowup = props.flowup;

    _this.state = { recipeName: "", ingredients: 1, ingredientlist: [] };

    _this.handleNameChange = _this.handleNameChange.bind(_this);
    _this.handleButtonClick = _this.handleButtonClick.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(UpdateForm, [{
    key: "handleNameChange",
    value: function handleNameChange(event) {
      var val = event.target.value;
      this.setState(function (state) {
        return { recipeName: val, ingredients: state.ingredients, ingredientlist: state.ingredientlist };
      });
    }
  }, {
    key: "handleIngredientIChange",
    value: function handleIngredientIChange(i, name) {
      this.setState(function (state) {
        var rName = state.recipeName;
        var _ingredients = state.ingredients;
        var _list = [].concat(_toConsumableArray(state.ingredientlist));
        _list[i] = name;
        return { recipeName: rName, ingredients: _ingredients, ingredientlist: _list };
      });
    }
  }, {
    key: "handleButtonClick",
    value: function handleButtonClick(event) {
      this.setState(function (state) {
        return { recipeName: state.recipeName, ingredients: state.ingredients + 1, ingredientlist: state.ingredientlist };
      });
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(event) {
      event.preventDefault();
      var ingredients = {};
      for (var i = 0; i < this.state.ingredientlist.length; i++) {
        ingredients[this.state.ingredientlist[i]] = 1;
      }
      var food = [this.state.recipeName, ingredients];
      this.flowup(food);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var arr = [];
      for (var i = 0; i < this.state.ingredients; i++) {
        arr.push(i);
      }
      return React.createElement(
        "form",
        { onSubmit: this.handleSubmit },
        "Recipe Name:",
        React.createElement("input", { value: this.state.recipeName, onChange: this.handleNameChange }),
        arr.map(function (i) {
          return React.createElement("input", { type: "text", value: _this2.state.ingredientlist[i], onChange: function onChange(event) {
              return _this2.handleIngredientIChange(i, event.target.value);
            } });
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