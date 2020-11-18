var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function IngredientDisplay(props) {
    var ingredient = props.ingredient;
    var name = props.name;

    return React.createElement(
        'h2',
        null,
        name,
        ':\xA0\xA0',
        ingredient.quantity,
        '\xA0',
        ingredient.units
    );
}

var GroceryListDisplay = function (_React$Component) {
    _inherits(GroceryListDisplay, _React$Component);

    function GroceryListDisplay(props) {
        _classCallCheck(this, GroceryListDisplay);

        var _this = _possibleConstructorReturn(this, (GroceryListDisplay.__proto__ || Object.getPrototypeOf(GroceryListDisplay)).call(this, props));

        _this.recipeRef = props.recipeRef;
        _this.recipeKeys = props.recipes;

        _this.state = {
            recipes: [],
            ready: false
        };

        _this.addSnapshotToRecipeList = _this.addSnapshotToRecipeList.bind(_this);
        _this.ready = _this.ready.bind(_this);
        _this.convertToOunces = _this.convertToOunces.bind(_this);
        _this.reduceUnits = _this.reduceUnits.bind(_this);
        _this.mergeOunces = _this.mergeOunces.bind(_this);
        return _this;
    }

    _createClass(GroceryListDisplay, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var recipes = Object.entries(this.recipeKeys);
            for (var i = 0; i < recipes.length - 1; i++) {
                this.recipeRef.child(recipes[i][1].authorid).child(recipes[i][0]).once('value').then(this.addSnapshotToRecipeList);
            }

            // Only set 'ready' once last food item is fetched
            this.recipeRef.child(recipes[recipes.length - 1][1].authorid).child(recipes[recipes.length - 1][0]).once('value').then(this.addSnapshotToRecipeList).then(this.ready);
        }

        // Ready to render component

    }, {
        key: 'ready',
        value: function ready() {
            console.log("ready");
            this.setState({ ready: true });
        }
    }, {
        key: 'addSnapshotToRecipeList',
        value: function addSnapshotToRecipeList(snapshot) {
            this.setState(function (state) {
                state.recipes.push(snapshot.val());
                return state;
            });
        }
    }, {
        key: 'mergeOunces',
        value: function mergeOunces(amount1, amount2) {
            if (amount1.units == "oz" && amount2.units == "oz") {
                return { quantity: amount1.quantity + amount2.quantity, units: "oz" };
            } else {
                amount1 = this.convertToOunces(amount1);
                amount2 = this.convertToOunces(amount2);
                return { quantity: amount1.quantity + amount2.quantity, units: "oz" };
            }
        }
    }, {
        key: 'reduceUnits',
        value: function reduceUnits(amount) {
            // Should prob always be the case
            if (amount.units == "oz") {
                if (amount.quantity > 33) {
                    return { quantity: Math.ceil(amount.quantity / 33.814), units: "L" };
                } else if (amount.quantity >= 8) {
                    return { quantity: Math.ceil(amount.quantity / 8.0), units: "cups" };
                } else return amount;
            } else return amount;
        }
    }, {
        key: 'convertToOunces',
        value: function convertToOunces(amount) {
            var quantity = amount.quantity;
            var units = amount.units;

            if (units == "oz") {
                return { quantity: quantity, units: units };
            } else if (units == "mL") {
                return { quantity: quantity * 0.033814, units: "oz" };
            } else if (units == "tsp") {
                return { quantity: quantity / 6.0, units: "oz" };
            } else if (units == "Tbsp") {
                return { quantity: quantity / 2.0, units: "oz" };
            } else if (units == "cups") {
                return { quantity: quantity * 8.0, units: "oz" };
            } else if (units == "L") {
                return { quantity: quantity * 33.814, units: "oz" };
            }
        }
    }, {
        key: 'combineIngredients',
        value: function combineIngredients() {
            var ingredients = {};

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.state.recipes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var recipe = _step.value;

                    console.log(recipe);
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = Object.entries(recipe.ingredients)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var kvp = _step2.value;

                            console.log(kvp);

                            var _kvp = _slicedToArray(kvp, 2),
                                key = _kvp[0],
                                value = _kvp[1];
                            // Is the ingredient already in our list?


                            if (ingredients[value.name]) {
                                // Are they the same units?
                                if (ingredients[value.name].units == value.units) {
                                    ingredients[value.name].quantity += parseFloat(value.quantity);
                                } else {
                                    var amount1 = this.convertToOunces(ingredients[value.name]);
                                    var amount2 = this.convertToOunces({ quantity: parseFloat(value.quantity), units: value.units });

                                    ingredients[value.name] = this.mergeOunces(amount1, amount2);
                                }
                            } else {
                                ingredients[value.name] = { quantity: parseFloat(value.quantity), units: value.units };
                            }

                            ingredients[value.name] = this.reduceUnits(ingredients[value.name]);
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return ingredients;
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state.ready) {
                var ingredients = Object.entries(this.combineIngredients());
                console.log(ingredients);
                return React.createElement(
                    'div',
                    null,
                    ingredients.map(function (kvp) {
                        return React.createElement(IngredientDisplay, { name: kvp[0], ingredient: kvp[1] });
                    })
                );
            } else return null;
        }
    }]);

    return GroceryListDisplay;
}(React.Component);

function renderGroceryListDisplay(recipeRef, keys, container) {
    ReactDOM.render(React.createElement(GroceryListDisplay, { recipeRef: recipeRef, recipes: keys }), container);
}