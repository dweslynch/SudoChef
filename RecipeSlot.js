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
          recipeKey: ""
        });
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      this.state.recipeKey = null;
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
      return React.createElement(
        "div",
        { className: "slotWrapper" },
        React.createElement("div", { className: "slot", onClick: this.slotClick(this.day, this.meal) }),
        React.createElement("button", { className: "deleteButton", onClick: this.clear })
      );
    }
  }]);

  return RecipeSlot;
}(React.Component);