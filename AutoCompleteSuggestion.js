var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AutoCompleteSuggestion = function (_React$Component) {
  _inherits(AutoCompleteSuggestion, _React$Component);

  function AutoCompleteSuggestion(props) {
    _classCallCheck(this, AutoCompleteSuggestion);

    var _this = _possibleConstructorReturn(this, (AutoCompleteSuggestion.__proto__ || Object.getPrototypeOf(AutoCompleteSuggestion)).call(this, props));

    _this.flowup = props.flowup;
    _this.key = props.recipeKey;
    _this.recipe = props.recipe;
    _this.name = _this.recipe.name;
    _this.author = _this.recipe.author;
    _this.authorid = _this.recipe.authorid;
    return _this;
  }

  _createClass(AutoCompleteSuggestion, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(
        "div",
        { className: "autocomplete-suggestion", onClick: function onClick(event) {
            return _this2.flowup(_this2.authorid, _this2.key);
          } },
        this.name,
        " by ",
        this.author
      );
    }
  }]);

  return AutoCompleteSuggestion;
}(React.Component);