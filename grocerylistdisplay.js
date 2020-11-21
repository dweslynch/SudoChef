var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function IngredientDisplay(props) {
    var ingredient = props.ingredient;
    var name = props.name;

    if (ingredient.pantry) {
        if (ingredient.quantity > 0) {
            // Recipe partially covered by pantry
            return React.createElement(
                "span",
                null,
                React.createElement(
                    "h2",
                    null,
                    name,
                    ":\xA0\xA0",
                    ingredient.quantity,
                    "\xA0",
                    ingredient.units
                ),
                React.createElement(
                    "span",
                    { style: { "color": "orange" } },
                    "\u25CA You still need to purchase ",
                    ingredient.units ? ingredient.quantity + " " + ingredient.units + " of " + name : ingredient.quantity + " " + name
                )
            );
        } else {
            // Recipe fully covered by pantry
            return React.createElement(
                "span",
                null,
                React.createElement(
                    "h2",
                    { "class": "strikethrough" },
                    name,
                    ":\xA0\xA00\xA0",
                    ingredient.units
                ),
                React.createElement(
                    "span",
                    { style: { "color": "green" } },
                    "\u2713 You have enough ",
                    name,
                    " in your pantry"
                )
            );
        }
    } else return React.createElement(
        "h2",
        null,
        name,
        ":\xA0\xA0",
        ingredient.quantity,
        "\xA0",
        ingredient.units
    );
}

var GroceryListDisplay = function (_React$Component) {
    _inherits(GroceryListDisplay, _React$Component);

    function GroceryListDisplay(props) {
        _classCallCheck(this, GroceryListDisplay);

        var _this = _possibleConstructorReturn(this, (GroceryListDisplay.__proto__ || Object.getPrototypeOf(GroceryListDisplay)).call(this, props));

        _this.recipeRef = props.recipeRef;
        _this.userRef = props.userRef;
        _this.recipeKeys = props.recipes;
        _this.container = props.container;

        _this.state = {
            recipes: [],
            ready: false,
            pantry: [],
            ready2: false
        };

        _this.addSnapshotToRecipeList = _this.addSnapshotToRecipeList.bind(_this);
        _this.getPantryFromSnapshot = _this.getPantryFromSnapshot.bind(_this);
        _this.pushUpdatedPantry = _this.pushUpdatedPantry.bind(_this);
        _this.generateMobileList = _this.generateMobileList.bind(_this);
        _this.pushMobileIngredients = _this.pushMobileIngredients.bind(_this);
        _this.ready = _this.ready.bind(_this);
        _this.convertToOunces = _this.convertToOunces.bind(_this);
        _this.reduceUnits = _this.reduceUnits.bind(_this);
        _this.mergeOunces = _this.mergeOunces.bind(_this);
        return _this;
    }

    _createClass(GroceryListDisplay, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.userRef.child('pantry').once('value').then(this.getPantryFromSnapshot);
            // Let's eventually refactor to make a list of authors and reduce the number of database calls

            var recipes = Object.entries(this.recipeKeys);
            for (var i = 0; i < recipes.length - 1; i++) {
                this.recipeRef.child(recipes[i][1].authorid).child(recipes[i][0]).once('value').then(this.addSnapshotToRecipeList);
            }

            // Only set 'ready' once last food item is fetched
            this.recipeRef.child(recipes[recipes.length - 1][1].authorid).child(recipes[recipes.length - 1][0]).once('value').then(this.addSnapshotToRecipeList).then(this.ready);
        }

        // Ready to render component

    }, {
        key: "ready",
        value: function ready() {
            console.log("ready");
            this.setState({ ready: true });
        }
    }, {
        key: "addSnapshotToRecipeList",
        value: function addSnapshotToRecipeList(snapshot) {
            this.setState(function (state) {
                state.recipes.push(snapshot.val());
                return state;
            });
        }
    }, {
        key: "getPantryFromSnapshot",
        value: function getPantryFromSnapshot(snapshot) {
            // Treat userIngredients as kvps for efficiency
            if (snapshot.val()) {
                var entries = Object.entries(snapshot.val());
                var ingredients = {};

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var kvp = _step.value;

                        var _kvp = _slicedToArray(kvp, 2),
                            _key = _kvp[0],
                            value = _kvp[1];
                        // Gotta parse that float


                        ingredients[value.name] = { quantity: parseFloat(value.quantity), units: value.units };
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

                this.setState({
                    pantry: ingredients,
                    ready2: true
                });
            } else {
                this.setState({
                    pantry: [],
                    ready2: true
                });
            }
        }
    }, {
        key: "pushUpdatedPantry",
        value: function pushUpdatedPantry(pantry) {
            // Clone pantry and remove undefined units
            var _pantry = [];

            for (key in pantry) {
                if (pantry[key].quantity > 0) {
                    if (pantry[key].units) {
                        var item = {
                            name: key,
                            quantity: pantry[key].quantity,
                            units: pantry[key].units
                        };
                        _pantry.push(item);
                    } else {
                        var _item = {
                            name: key,
                            quantity: pantry[key].quantity
                        };
                        _pantry.push(_item);
                    }
                }
            }

            this.userRef.child('pantry').set(_pantry);
        }
    }, {
        key: "pushMobileIngredients",
        value: function pushMobileIngredients(ingredients) {
            var mobileRef = this.recipeRef.parent.child('mobile');

            var _ingredients = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = ingredients[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var kvp = _step2.value;

                    var _kvp2 = _slicedToArray(kvp, 2),
                        _key2 = _kvp2[0],
                        value = _kvp2[1];

                    if (value.quantity > 0) {
                        if (value.units) {
                            var item = {
                                name: _key2,
                                quantity: value.quantity,
                                units: value.units
                            };
                            _ingredients.push(item);
                        } else {
                            var _item2 = {
                                name: _key2,
                                quantity: value.quantity
                            };
                            _ingredients.push(_item2);
                        }
                    }
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

            var mobileKey = mobileRef.push().key;

            mobileRef.child(mobileKey).set(_ingredients);

            return mobileKey;
        }
    }, {
        key: "generateMobileList",
        value: function generateMobileList(pantry, ingredients) {
            this.pushUpdatedPantry(pantry);
            var key = this.pushMobileIngredients(ingredients);

            // x

            renderMobileCode(key, this.container);
        }
    }, {
        key: "mergeOunces",
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
        key: "reduceUnits",
        value: function reduceUnits(amount) {
            var _amount = Object.assign({}, amount);

            // Should prob always be the case
            if (_amount.units == "oz") {
                if (_amount.quantity > 33) {
                    return { quantity: Math.ceil(_amount.quantity / 33.814), units: "L" };
                } else if (_amount.quantity >= 8) {
                    return { quantity: Math.ceil(_amount.quantity / 8.0), units: "cups" };
                } else return _amount;
            } else return _amount;
        }
    }, {
        key: "convertToOunces",
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
        key: "combineIngredients",
        value: function combineIngredients(pantry) {
            var ingredients = {};

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.state.recipes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var recipe = _step3.value;

                    console.log(recipe);
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;

                    try {
                        for (var _iterator4 = Object.entries(recipe.ingredients)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var kvp = _step4.value;

                            console.log(kvp);

                            var _kvp3 = _slicedToArray(kvp, 2),
                                _key3 = _kvp3[0],
                                value = _kvp3[1];
                            // Is the ingredient already in our list?


                            if (ingredients[value.name]) {
                                // Are they the same units?
                                if (ingredients[value.name].units == value.units) {
                                    ingredients[value.name].quantity += parseFloat(value.quantity);
                                } else {
                                    //TODO:  Need to handle case where exactly one ingredient is unitless
                                    var amount1 = this.convertToOunces(ingredients[value.name]);
                                    var amount2 = this.convertToOunces({ quantity: parseFloat(value.quantity), units: value.units });

                                    ingredients[value.name] = this.mergeOunces(amount1, amount2);
                                }
                            } else {
                                ingredients[value.name] = { quantity: parseFloat(value.quantity), units: value.units };
                            }

                            // Check pantry.  Might need to make this faster later
                            if (pantry[value.name]) {
                                console.log("in pantry");
                                var pantryIngredients = Object.assign({}, pantry[value.name]);
                                var recipeIngredients = Object.assign({}, ingredients[value.name]);

                                if (pantryIngredients.units != recipeIngredients.units) {
                                    console.log("different units");
                                    // Normalize units
                                    // Won't work when exactly one unit is blank, but should work when both are
                                    pantryIngredients = this.convertToOunces(pantryIngredients);
                                    recipeIngredients = this.convertToOunces(recipeIngredients);
                                }

                                if (pantryIngredients.quantity >= recipeIngredients.quantity) {
                                    console.log("pantry covers recipe");
                                    // User has enough to cover their recipes
                                    var remaining = pantryIngredients.quantity - recipeIngredients.quantity;

                                    recipeIngredients.quantity = 0;
                                    recipeIngredients.pantry = true;
                                    ingredients[value.name] = recipeIngredients;

                                    pantryIngredients.quantity = remaining;
                                    pantry[value.name] = this.reduceUnits(pantryIngredients);
                                } else {
                                    console.log("pantry does not cover recipe");
                                    // Some pantry ingredients, but not enough to cover the recipe
                                    var _remaining = recipeIngredients.quantity - pantryIngredients.quantity;

                                    pantryIngredients.quantity = 0;
                                    pantry[value.name] = pantryIngredients;
                                    recipeIngredients.pantry = true;

                                    console.log(recipeIngredients.name);
                                    console.log(recipeIngredients.quantity);
                                    console.log(recipeIngredients.units);

                                    console.log(_remaining);
                                    recipeIngredients.quantity = _remaining;
                                    ingredients[value.name] = this.reduceUnits(recipeIngredients);

                                    console.log(recipeIngredients.name);
                                    console.log(recipeIngredients.quantity);
                                    console.log(recipeIngredients.units);
                                }
                            } else {
                                ingredients[value.name].pantry = false;
                            }

                            ingredients[value.name] = this.reduceUnits(ingredients[value.name]);
                        }
                    } catch (err) {
                        _didIteratorError4 = true;
                        _iteratorError4 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                _iterator4.return();
                            }
                        } finally {
                            if (_didIteratorError4) {
                                throw _iteratorError4;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            return ingredients;
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            if (this.state.ready && this.state.ready2) {
                var _pantry = Object.assign({}, this.state.pantry);
                var ingredients = Object.entries(this.combineIngredients(_pantry));

                return React.createElement(
                    "div",
                    null,
                    ingredients.map(function (kvp) {
                        return React.createElement(IngredientDisplay, { name: kvp[0], ingredient: kvp[1] });
                    }),
                    React.createElement("input", { type: "button", className: "dark-button fullest", value: "Ready to Purchase", onClick: function onClick(event) {
                            return _this2.generateMobileList(_pantry, ingredients);
                        } })
                );
            } else return null;
        }
    }]);

    return GroceryListDisplay;
}(React.Component);

function renderGroceryListDisplay(userRef, recipeRef, keys, container) {
    ReactDOM.render(React.createElement(GroceryListDisplay, { userRef: userRef, recipeRef: recipeRef, container: container, recipes: keys }), container);
}