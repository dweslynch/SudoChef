var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GroceryList = function (_React$Component) {
    _inherits(GroceryList, _React$Component);

    function GroceryList(props) {
        _classCallCheck(this, GroceryList);

        var _this = _possibleConstructorReturn(this, (GroceryList.__proto__ || Object.getPrototypeOf(GroceryList)).call(this, props));

        _this.userRef = props.userRef;
        _this.recipeRef = props.recipeRef;
        _this.container = props.container;

        _this.state = {
            groceries: []
        };

        _this.backtrack = _this.backtrack.bind(_this);
        _this.updateStateFromSnapshot = _this.updateStateFromSnapshot.bind(_this);
        _this.viewIndividualRecipe = _this.viewIndividualRecipe.bind(_this);
        return _this;
    }

    _createClass(GroceryList, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.userRef.once('value').then(this.updateStateFromSnapshot);
            this.userRef.on('value', this.updateStateFromSnapshot);
        }
    }, {
        key: 'backtrack',
        value: function backtrack(event) {
            renderList(this.userRef, this.recipeRef, this.container);
        }
    }, {
        key: 'updateStateFromSnapshot',
        value: function updateStateFromSnapshot(snapshot) {
            this.setState({
                groceries: Object.entries(snapshot.val())
            });
        }
    }, {
        key: 'viewIndividualRecipe',
        value: function viewIndividualRecipe(user, key) {
            renderRecipeView(user, key, this.backtrack, "Return to My Recipes", this.container, true, this.userRef, this.recipeRef);
        }
    }, {
        key: 'render',
        value: function render() {
            console.log(this.state.groceries);
            if (this.state.groceries) {
                // Create a local reference to view individual recipe
                var _viewRecipe = this.viewIndividualRecipe;
                return this.state.groceries.map(function (kvp) {
                    var _kvp = _slicedToArray(kvp, 2),
                        key = _kvp[0],
                        recipe = _kvp[1];

                    var ingredients = Object.entries(recipe.ingredients);
                    return React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'h2',
                            { className: 'clickable', onClick: function onClick(event) {
                                    return _viewRecipe(recipe.authorid, key);
                                } },
                            recipe.name,
                            '\xA0\u203A'
                        )
                    );
                });
            } else {
                return React.createElement(
                    'h2',
                    null,
                    'No Entries'
                );
            }
        }
    }]);

    return GroceryList;
}(React.Component);

function renderList(userRef, recipeRef, container) {
    console.log(container);
    ReactDOM.render(React.createElement(GroceryList, { userRef: userRef, recipeRef: recipeRef, container: container }), container);
}