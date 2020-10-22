var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddRecipeForm = function (_React$Component) {
  _inherits(AddRecipeForm, _React$Component);

  function AddRecipeForm(props) {
    _classCallCheck(this, AddRecipeForm);

    // Allows the form to submit groceries to the database
    var _this = _possibleConstructorReturn(this, (AddRecipeForm.__proto__ || Object.getPrototypeOf(AddRecipeForm)).call(this, props));

    _this.flowup = props.flowup;
    _this.recipes = props.recipes;
    _this.backtrack = props.backtrack;
    console.log(_this.recipes);

    _this.state = { selectedvalue: "", selectedkey: "" };

    // Bind event handlers
    _this.handleOptionClick = _this.handleOptionClick.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(AddRecipeForm, [{
    key: "handleOptionClick",
    value: function handleOptionClick(event) {
      console.log(event.target.value);
      var val = event.target.value; // Have to grab value because the callback erases it
      this.setState(function (state) {
        // Clone state
        var clone = Object.assign({}, state);

        // Change selected key and value
        clone.selectedkey = val;
        clone.selectedvalue = this.recipes[val].name;

        // Return new state
        return clone;
      });
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(event) {
      // Prevent reload
      event.preventDefault();
      console.log(this.state.selectedkey);
      this.flowup(this.state.selectedkey);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(
        "form",
        { onSubmit: this.handleSubmit },
        React.createElement(
          "h2",
          null,
          "Add Recipe"
        ),
        React.createElement("br", null),
        React.createElement(
          "label",
          null,
          "Select Recipe:\xA0\xA0"
        ),
        React.createElement(
          "select",
          { value: this.state.selectedkey, onChange: this.handleOptionClick },
          Object.keys(this.recipes).map(function (k) {
            return React.createElement(
              "option",
              { value: k },
              _this2.recipes[k].name,
              " by ",
              _this2.recipes[k].author
            );
          })
        ),
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement("input", { type: "submit", value: "Submit" }),
        React.createElement(
          "h2",
          { className: "clickable", onClick: function onClick(event) {
              return _this2.backtrack();
            } },
          "Return to My Recipes\xA0\u203A"
        )
      );
    }
  }]);

  return AddRecipeForm;
}(React.Component);

function renderAddRecipeForm(flowup, backtrack, recipes, container) {
  ReactDOM.render(React.createElement(AddRecipeForm, { flowup: flowup, recipes: recipes, backtrack: backtrack }), container);
}