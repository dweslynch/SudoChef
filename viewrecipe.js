var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RecipeView = function (_React$Component) {
    _inherits(RecipeView, _React$Component);

    function RecipeView(props) {
        _classCallCheck(this, RecipeView);

        var _this = _possibleConstructorReturn(this, (RecipeView.__proto__ || Object.getPrototypeOf(RecipeView)).call(this, props));

        _this.backtrack = props.backtrack;
        _this.returnPrompt = props.prompt;
        _this.mine = props.mine;
        _this.userRef = props.userRef;
        _this.recipeRef = props.recipeRef;
        _this.key = props.recipeKey;
        _this.uid = props.user;

        _this.state = {
            recipe: {}
        };

        _this.addToInventory = _this.addToInventory.bind(_this);
        _this.updateStateFromSnapshot = _this.updateStateFromSnapshot.bind(_this);
        return _this;
    }

    _createClass(RecipeView, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.recipeRef.child(this.uid).child(this.key).once('value').then(this.updateStateFromSnapshot);
        }
    }, {
        key: "addToInventory",
        value: function addToInventory(event) {
            var recipe = this.state.recipe;
            this.userRef.child(this.key).set({ name: recipe.name, author: recipe.author, authorid: recipe.authorid, description: recipe.description });
            this.backtrack(event);
        }
    }, {
        key: "updateStateFromSnapshot",
        value: function updateStateFromSnapshot(snapshot) {
            console.log(this.key);
            console.log(snapshot.val());
            this.setState({
                recipe: snapshot.val()
            });
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.recipe && this.state.recipe.ingredients) {
                var ingredients = Object.entries(this.state.recipe.ingredients);
                return React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "h2",
                        null,
                        this.state.recipe.name,
                        " by ",
                        this.state.recipe.author
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
                        this.state.recipe.description
                    ),
                    !this.mine ? React.createElement(
                        "h2",
                        { className: "clickable", onClick: this.addToInventory },
                        "Add To My Grocery List"
                    ) : null,
                    React.createElement(
                        "h2",
                        { className: "clickable", onClick: this.backtrack },
                        this.returnPrompt,
                        "\xA0\u203A"
                    )
                );
            } else {
                return null;
            }
        }
    }]);

    return RecipeView;
}(React.Component);

function renderRecipeView(user, key, backtrack, returnPrompt, container, mine, userRef, recipeRef) {
    console.log(container);
    ReactDOM.render(React.createElement(RecipeView, { user: user, recipeKey: key, prompt: returnPrompt, mine: mine, backtrack: backtrack, userRef: userRef, recipeRef: recipeRef }), container);
}