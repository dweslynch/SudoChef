var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calendar = function (_React$Component) {
  _inherits(Calendar, _React$Component);

  function Calendar(props) {
    _classCallCheck(this, Calendar);

    var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

    _this.userRef = props.userRef;

    _this.state = {
      userRecipes: {},
      selectedRecipe: "",
      days: {}
    };

    _this.handleRecipeClick = _this.handleRecipeClick.bind(_this);
    _this.updateUserRecipesFromSnapshot = _this.updateUserRecipesFromSnapshot.bind(_this);
    _this.handleSlotClick = _this.handleSlotClick.bind(_this);
    return _this;
  }

  _createClass(Calendar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.userRef.child('inventory').once('value').then(this.updateUserRecipesFromSnapshot);
    }
  }, {
    key: 'updateUserRecipesFromSnapshot',
    value: function updateUserRecipesFromSnapshot(snapshot) {

      /*
        userRecipes: [
            [ $key, { name: $name, author: $author, etc} ],
            [ $key2, { name: $name2, etc} ]
        ]
      */

      if (snapshot.val()) {
        this.setState({
          userRecipes: snapshot.val()
        });
      } else {
        this.setState({
          userRecipes: {}
        });
      }
    }
  }, {
    key: 'handleRecipeClick',
    value: function handleRecipeClick(key) {
      this.setState({
        selectedRecipe: key
      });
    }
  }, {
    key: 'handleSlotClick',
    value: function handleSlotClick(day, meal) {
      if (this.state.selectedRecipe) {
        var _recipeKey = this.state.selectedRecipe;
        var _recipeName = this.state.userRecipes[_recipeKey].name;
        var _recipeAuthorId = this.state.userRecipes[_recipeKey].authorid;

        var _recipe = {
          key: _recipeKey,
          name: _recipeName,
          authorid: _recipeAuthorId
        };

        // This should autoupdate the relevant slot
        this.userRef.child('calendar').child(day).child(meal).set(_recipe);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _handleRecipeClick = this.handleRecipeClick;
      return (

        /*
        // Left div goes here
        <div>
            let _copy = this.handleRecipeClick;
            recipes.map(function(kvp) {
                    let [key, value] = kvp;
                    return <RecipeItem recipeKey={key} key={key} onClick={(event) => _copy(key)}
                }
            )
        </div>
        */

        React.createElement(
          'div',
          null,
          React.createElement(
            'div',
            null,
            Object.entries(this.state.userRecipes).map(function (kvp) {
              var _kvp = _slicedToArray(kvp, 2),
                  key = _kvp[0],
                  value = _kvp[1];

              return React.createElement(
                'div',
                null,
                React.createElement(
                  'h2',
                  { onClick: function onClick(event) {
                      return _handleRecipeClick(key);
                    } },
                  value.name
                )
              );
            })
          ),
          React.createElement(
            'div',
            { className: 'sun' },
            React.createElement(RecipeSlot, { dateNumber: null, day: "sun", meal: "b", userRef: this.userRef, slotClick: this.handleSlotClick }),
            React.createElement(RecipeSlot, { dateNumber: null, day: "sun", meal: "l", userRef: this.userRef, slotClick: this.handleSlotClick }),
            React.createElement(RecipeSlot, { dateNumber: null, day: "sun", meal: "d", userRef: this.userRef, slotClick: this.handleSlotClick })
          ),
          React.createElement(
            'div',
            { className: 'mon' },
            React.createElement(RecipeSlot, { dateNumber: null, day: "mon", meal: "b", userRef: this.userRef, slotClick: this.handleSlotClick }),
            React.createElement(RecipeSlot, { dateNumber: null, day: "mon", meal: "l", userRef: this.userRef, slotClick: this.handleSlotClick }),
            React.createElement(RecipeSlot, { dateNumber: null, day: "mon", meal: "d", userRef: this.userRef, slotClick: this.handleSlotClick })
          ),
          React.createElement(
            'div',
            { className: 'tue' },
            React.createElement(RecipeSlot, { dateNumber: null, day: "tue", meal: "b", userRef: this.userRef, slotClick: this.handleSlotClick }),
            React.createElement(RecipeSlot, { dateNumber: null, day: "tue", meal: "l", userRef: this.userRef, slotClick: this.handleSlotClick }),
            React.createElement(RecipeSlot, { dateNumber: null, day: "tue", meal: "d", userRef: this.userRef, slotClick: this.handleSlotClick })
          ),
          React.createElement(
            'div',
            { className: 'wed' },
            React.createElement(RecipeSlot, { dateNumber: null, day: "wed", meal: "b", userRef: this.userRef, slotClick: this.handleSlotClick }),
            React.createElement(RecipeSlot, { dateNumber: null, day: "wed", meal: "l", userRef: this.userRef, slotClick: this.handleSlotClick }),
            React.createElement(RecipeSlot, { dateNumber: null, day: "wed", meal: "d", userRef: this.userRef, slotClick: this.handleSlotClick })
          ),
          React.createElement(
            'div',
            { className: 'thu' },
            React.createElement(RecipeSlot, { dateNumber: null, day: "thu", meal: "b", userRef: this.userRef, slotClick: this.handleSlotClick }),
            React.createElement(RecipeSlot, { dateNumber: null, day: "thu", meal: "l", userRef: this.userRef, slotClick: this.handleSlotClick }),
            React.createElement(RecipeSlot, { dateNumber: null, day: "thu", meal: "d", userRef: this.userRef, slotClick: this.handleSlotClick })
          ),
          React.createElement(
            'div',
            { className: 'fri' },
            React.createElement(RecipeSlot, { dateNumber: null, day: "fri", meal: "b", userRef: this.userRef, slotClick: this.handleSlotClick }),
            React.createElement(RecipeSlot, { dateNumber: null, day: "fri", meal: "l", userRef: this.userRef, slotClick: this.handleSlotClick }),
            React.createElement(RecipeSlot, { dateNumber: null, day: "fri", meal: "d", userRef: this.userRef, slotClick: this.handleSlotClick })
          ),
          React.createElement(
            'div',
            { className: 'sat' },
            React.createElement(RecipeSlot, { dateNumber: null, day: "sat", meal: "b", userRef: this.userRef, slotClick: this.handleSlotClick }),
            React.createElement(RecipeSlot, { dateNumber: null, day: "sat", meal: "l", userRef: this.userRef, slotClick: this.handleSlotClick }),
            React.createElement(RecipeSlot, { dateNumber: null, day: "sat", meal: "d", userRef: this.userRef, slotClick: this.handleSlotClick })
          )
        )
      );
    }
  }]);

  return Calendar;
}(React.Component);