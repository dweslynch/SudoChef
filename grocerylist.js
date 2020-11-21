var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RestrictionMatchIndicator = function (_React$Component) {
    _inherits(RestrictionMatchIndicator, _React$Component);

    function RestrictionMatchIndicator(props) {
        _classCallCheck(this, RestrictionMatchIndicator);

        var _this = _possibleConstructorReturn(this, (RestrictionMatchIndicator.__proto__ || Object.getPrototypeOf(RestrictionMatchIndicator)).call(this, props));

        _this.restrictions = props.restrictions;
        _this.tags = props.tags;

        _this.matchesRestrictions = _this.matchesRestrictions.bind(_this);
        _this.matchesSomeRestrictions = _this.matchesSomeRestrictions.bind(_this);
        _this.doesNotHaveRestrictions = _this.doesNotHaveRestrictions.bind(_this);
        return _this;
    }

    // Returns true if restrictions are met, returns false if not or if there are none


    _createClass(RestrictionMatchIndicator, [{
        key: "matchesRestrictions",
        value: function matchesRestrictions() {
            if (this.restrictions.length > 0) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.restrictions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var kvp = _step.value;

                        console.log("restriction " + kvp[0] + ": " + kvp[1] + " and tag: " + this.tags[kvp[0]]);
                        //if (kvp[1] == "true" && this.tags[kvp[0]] == "false")
                        if (kvp[1] && !this.tags[kvp[0]]) {
                            return false;
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

                return true;
            } else return false;
        }

        // Returns true if the user has restrictions, the recipe has tags, but not all restrictions are met

    }, {
        key: "matchesSomeRestrictions",
        value: function matchesSomeRestrictions() {
            if (this.restrictions.length > 0) {
                var hasTags = false;
                var _tags = Object.entries(this.tags);
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = _tags[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var kvp = _step2.value;

                        if (kvp[1]) hasTags = true;
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

                if (!hasTags) return false;

                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = this.restrictions[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var _kvp = _step3.value;

                        if (_kvp[1] && !this.tags[_kvp[0]]) return true;
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

                return false;
            } else return false;
        }

        // Returns true if the user has dietary restrictions and there are no tags on the recipe

    }, {
        key: "doesNotHaveRestrictions",
        value: function doesNotHaveRestrictions() {
            if (this.restrictions.length > 0) {
                var _tags = Object.entries(this.tags);
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = _tags[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var kvp = _step4.value;

                        if (kvp[1]) return false;
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

                return true;
            } else return false;
        }
    }, {
        key: "render",
        value: function render() {
            if (this.restrictions.length > 0) {
                if (this.matchesRestrictions()) {
                    return React.createElement(
                        "span",
                        { style: { "color": "green" } },
                        "\u2713 This recipe meets all your dietary restrictions"
                    );
                } else if (this.matchesSomeRestrictions()) {
                    return React.createElement(
                        "span",
                        { style: { "color": "red" } },
                        "\u2717 This recipe may not meet your dietary restrictions"
                    );
                } else if (this.doesNotHaveRestrictions()) {
                    return React.createElement(
                        "span",
                        { style: { "color": "orange" } },
                        "\u25CA This recipe does not include dietary restriction information"
                    );
                }
            } else {
                return null;
            }
        }
    }]);

    return RestrictionMatchIndicator;
}(React.Component);

var GroceryList = function (_React$Component2) {
    _inherits(GroceryList, _React$Component2);

    function GroceryList(props) {
        _classCallCheck(this, GroceryList);

        var _this2 = _possibleConstructorReturn(this, (GroceryList.__proto__ || Object.getPrototypeOf(GroceryList)).call(this, props));

        _this2.userRef = props.userRef;
        _this2.recipeRef = props.recipeRef;
        _this2.container = props.container;

        _this2.state = {
            groceries: [],
            restrictions: []
        };

        _this2.backtrack = _this2.backtrack.bind(_this2);
        _this2.updateGroceriesFromSnapshot = _this2.updateGroceriesFromSnapshot.bind(_this2);
        _this2.updateRestrictionsFromSnapshot = _this2.updateRestrictionsFromSnapshot.bind(_this2);
        _this2.viewIndividualRecipe = _this2.viewIndividualRecipe.bind(_this2);
        _this2.userHasDietaryRestrictions = _this2.userHasDietaryRestrictions.bind(_this2);
        _this2.renderDisplay = _this2.renderDisplay.bind(_this2);
        _this2.renderDisplayFromSnapshot = _this2.renderDisplayFromSnapshot.bind(_this2);
        _this2.handleRemoveRecipeClick = _this2.handleRemoveRecipeClick.bind(_this2);
        return _this2;
    }

    _createClass(GroceryList, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.userRef.child('inventory').once('value').then(this.updateGroceriesFromSnapshot);
            this.userRef.child('restrictions').once('value').then(this.updateRestrictionsFromSnapshot);

            this.userRef.child('inventory').on('value', this.updateGroceriesFromSnapshot);
            this.userRef.child('restrictions').on('value', this.updateRestrictionsFromSnapshot);
        }
    }, {
        key: "renderDisplayFromSnapshot",
        value: function renderDisplayFromSnapshot(snapshot) {
            renderGroceryListDisplay(this.userRef, this.recipeRef, snapshot.val(), this.container);
        }
    }, {
        key: "renderDisplay",
        value: function renderDisplay() {
            this.userRef.child('inventory').once('value').then(this.renderDisplayFromSnapshot);
        }
    }, {
        key: "userHasDietaryRestrictions",
        value: function userHasDietaryRestrictions() {
            console.log(this.state.restrictions);
            return this.state.restrictions.length > 0;
        }
    }, {
        key: "backtrack",
        value: function backtrack(event) {
            renderList(this.userRef, this.recipeRef, this.container);
        }
    }, {
        key: "handleRemoveRecipeClick",
        value: function handleRemoveRecipeClick(key) {
            this.userRef.child('inventory').child(key).remove();
        }
    }, {
        key: "updateRestrictionsFromSnapshot",
        value: function updateRestrictionsFromSnapshot(snapshot) {
            if (snapshot.val()) {
                this.setState({
                    restrictions: Object.entries(snapshot.val())
                });
            }
        }
    }, {
        key: "updateGroceriesFromSnapshot",
        value: function updateGroceriesFromSnapshot(snapshot) {
            this.setState({
                groceries: Object.entries(snapshot.val())
            });
        }
    }, {
        key: "viewIndividualRecipe",
        value: function viewIndividualRecipe(user, key) {
            renderRecipeView(user, key, this.backtrack, "Return to My Recipes", this.container, true, this.userRef, this.recipeRef);
        }
    }, {
        key: "render",
        value: function render() {
            console.log(this.state.groceries);

            // Create local copy so can call from within the map callback
            var _hasRestrictions = this.userHasDietaryRestrictions;
            var restrictions = this.state.restrictions;
            var _renderDisplay = this.renderDisplay;
            var _removeRecipe = this.handleRemoveRecipeClick;
            if (this.state.groceries) {
                // Create a local reference to view individual recipe
                var _viewRecipe = this.viewIndividualRecipe;
                return React.createElement(
                    "div",
                    null,
                    this.state.groceries.map(function (kvp) {
                        var _kvp2 = _slicedToArray(kvp, 2),
                            key = _kvp2[0],
                            recipe = _kvp2[1];

                        return React.createElement(
                            "div",
                            null,
                            React.createElement("input", { style: { "backgroundColor": "rgba(0,0,0,0)", border: "none" }, className: "clickable circle-button", type: "button", value: "X", onClick: function onClick(event) {
                                    return _removeRecipe(key);
                                } }),
                            React.createElement(
                                "h2",
                                { className: "clickable", style: { "display": "inline-block" }, onClick: function onClick(event) {
                                        return _viewRecipe(recipe.authorid, key);
                                    } },
                                "\xA0",
                                recipe.name,
                                "\xA0\u203A"
                            ),
                            React.createElement(
                                "p",
                                { style: { 'marginLeft': "15px" } },
                                recipe.description
                            ),
                            _hasRestrictions() ? React.createElement(
                                "span",
                                { style: { 'marginLeft': '15px' } },
                                React.createElement(RestrictionMatchIndicator, { restrictions: restrictions, tags: recipe.tags })
                            ) : null
                        );
                    }),
                    React.createElement("br", null),
                    React.createElement("input", { type: "button", "class": "dark-button fullest", value: "Preview Grocery List", onClick: function onClick(event) {
                            return _renderDisplay();
                        } })
                );
            } else {
                return React.createElement(
                    "h2",
                    null,
                    "No Entries"
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