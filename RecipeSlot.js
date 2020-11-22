var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RecipeSlot = function (_React$Component) {
  _inherits(RecipeSlot, _React$Component);

  function RecipeSlot(props) {
    _classCallCheck(this, RecipeSlot);

    var _this = _possibleConstructorReturn(this, (RecipeSlot.__proto__ || Object.getPrototypeOf(RecipeSlot)).call(this, props));

    _this.dateNumber = props.dateNumber;

    _this.day = props.day;
    _this.meal = props.meal;
    _this.userRef = props.userRef;
    _this.slotClick = props.slotClick;

    _this.state = {
      content: null,
      recipeKey: "",
      recipeName: "",
      recipeAuthorId: ""
    };

    _this.updateRecipeFromSnapshot = _this.updateRecipeFromSnapshot.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);
    _this.translateMeal = _this.translateMeal.bind(_this);
    return _this;
  }

  _createClass(RecipeSlot, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.userRef.child('calendar').child(this.day).child(this.meal).once('value').then(this.updateRecipeFromSnapshot);

      // Continuous updates
      this.userRef.child('calendar').child(this.day).child(this.meal).on('value', this.updateRecipeFromSnapshot);
    }
  }, {
    key: "translateMeal",
    value: function translateMeal(m) {
      if (m == "b") {
        return "Breakfast";
      } else if (m == "l") {
        return "Lunch";
      } else {
        return "Dinner";
      }
    }
  }, {
    key: "updateRecipeFromSnapshot",
    value: function updateRecipeFromSnapshot(snapshot) {
      if (snapshot.val()) {
        var recipe = snapshot.val();
        this.setState({
          recipeKey: recipe.key,
          recipeName: recipe.name,
          recipeAuthorId: recipe.authorid
        });
      } else {
        this.setState({
          recipeKey: "",
          recipeName: "",
          recipeAuthorId: ""
        });
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick() {
      if (this.state.content == null) {
        //return;
      } else {
        setState({ content: null });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(
        "div",
        { className: "slotWrapper" },
        React.createElement(
          "div",
          { className: "slot clickable", style: { "fontWeight": this.state.recipeKey ? "bold" : "normal" }, onClick: function onClick(event) {
              return _this2.slotClick(_this2.day, _this2.meal);
            } },
          this.translateMeal(this.meal),
          ":\xA0\xA0",
          this.state.recipeName
        )
      );
    }
  }]);

  return RecipeSlot;
}(React.Component);