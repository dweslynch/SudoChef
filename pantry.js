var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pantry = function (_React$Component) {
    _inherits(Pantry, _React$Component);

    function Pantry(props) {
        _classCallCheck(this, Pantry);

        var _this = _possibleConstructorReturn(this, (Pantry.__proto__ || Object.getPrototypeOf(Pantry)).call(this, props));

        _this.userRef = props.userRef;

        _this.state = {
            ingredients: 0,
            ingredientList: []
        };

        _this.updateIngredientListFromSnapshot = _this.updateIngredientListFromSnapshot.bind(_this);
        _this.handleIngredientICommit = _this.handleIngredientICommit.bind(_this);
        _this.handleIngredientQuantityCommit = _this.handleIngredientQuantityCommit.bind(_this);
        _this.handleIngredientIChange = _this.handleIngredientIChange.bind(_this);
        _this.handleIngredientQuantityChange = _this.handleIngredientQuantityChange.bind(_this);
        _this.handleUnitChange = _this.handleUnitChange.bind(_this);
        _this.handleRemoveIngredientButtonClick = _this.handleRemoveIngredientButtonClick.bind(_this);
        _this.handleAddIngredientButtonClick = _this.handleAddIngredientButtonClick.bind(_this);
        _this.removeIngredient = _this.removeIngredient.bind(_this);
        return _this;
    }

    _createClass(Pantry, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.userRef.child('pantry').once('value').then(this.updateIngredientListFromSnapshot);
            this.userRef.child('pantry').on('value', this.updateIngredientListFromSnapshot);
        }
    }, {
        key: 'updateIngredientListFromSnapshot',
        value: function updateIngredientListFromSnapshot(snapshot) {
            if (snapshot.val()) {
                console.log("snapshot present");
                var entries = Object.entries(snapshot.val());
                var ingredients = entries.map(function (kvp) {
                    var _kvp = _slicedToArray(kvp, 2),
                        key = _kvp[0],
                        value = _kvp[1];

                    return {
                        name: value.name,
                        quantity: value.quantity,
                        units: value.units ? value.units : ""
                    };
                });

                this.setState({
                    ingredients: ingredients.length,
                    ingredientList: ingredients
                });
            } else {
                // User has no ingredients in their pantry
                console.log("no snapshot present");
                this.setState({
                    ingredients: 0,
                    ingredientList: []
                });
            }
        }
    }, {
        key: 'handleIngredientICommit',
        value: function handleIngredientICommit(i, name) {
            // Wonder if this works
            // Here's the catch:
            // I don't know the answer and neither do you
            // I'm pretty sure no one knows
            // We'll probably never figure it out
            // And we just have to live with that
            this.userRef.child('pantry').child(i).child('name').set(name);
        }
    }, {
        key: 'handleIngredientQuantityCommit',
        value: function handleIngredientQuantityCommit(i, quantity) {
            this.userRef.child('pantry').child(i).child('quantity').set(quantity);
        }
    }, {
        key: 'handleIngredientIChange',
        value: function handleIngredientIChange(i, name) {
            this.setState(function (state) {
                state.ingredientList[i].name = name;
                return state;
            });
        }
    }, {
        key: 'handleIngredientQuantityChange',
        value: function handleIngredientQuantityChange(i, quantity) {
            this.setState(function (state) {
                state.ingredientList[i].quantity = quantity;
                return state;
            });
        }
    }, {
        key: 'handleUnitChange',
        value: function handleUnitChange(i, unit) {
            this.userRef.child('pantry').child(i).child('units').set(unit);
        }
    }, {
        key: 'removeIngredient',
        value: function removeIngredient(i, snapshot) {
            if (snapshot.exists()) {
                // Directly remove the ingredient from the database
                // Should automatically remove it from our end too
                this.userRef.child('pantry').child(i).remove();
            } else {
                // The ingredient only exists on our end so remove it from the local component only
                this.setState(function (state) {
                    state.ingredients = state.ingredients - 1;
                    state.ingredientList.splice(i, 1); // Remove one element at index i
                    return state;
                });
            }
        }
    }, {
        key: 'handleRemoveIngredientButtonClick',
        value: function handleRemoveIngredientButtonClick(i) {
            var _this2 = this;

            // There's GOTTA be a better way to do this
            this.userRef.child('pantry').child(i).once('value').then(function (snapshot) {
                return _this2.removeIngredient(i, snapshot);
            });
        }
    }, {
        key: 'handleAddIngredientButtonClick',
        value: function handleAddIngredientButtonClick(event) {
            this.setState(function (state) {
                console.log("adding ingredients");
                var xingredients = state.ingredients;
                state.ingredients = xingredients + 1;
                state.ingredientList[xingredients] = {
                    name: '',
                    quantity: '',
                    units: ''
                };
                return state;
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            // let arr = [0..this.state.ingredients]
            var arr = [];
            for (var i = 0; i < this.state.ingredients; i++) {
                console.log("pushing ingredient");
                arr.push(i);
            }

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h2',
                    null,
                    'My Pantry'
                ),
                React.createElement(
                    'p',
                    null,
                    'Click anywhere on the screen to save'
                ),
                arr.map(function (i) {
                    return React.createElement(
                        'div',
                        null,
                        React.createElement('input', { type: 'text', value: _this3.state.ingredientList[i] ? _this3.state.ingredientList[i].name : "", placeholder: 'Ingredient ' + (i + 1), onBlur: function onBlur(event) {
                                return _this3.handleIngredientICommit(i, event.target.value);
                            }, onChange: function onChange(event) {
                                return _this3.handleIngredientIChange(i, event.target.value);
                            } }),
                        '\xA0\xA0',
                        React.createElement('input', { style: { "width": "75px" }, type: 'text', value: _this3.state.ingredientList[i] ? _this3.state.ingredientList[i].quantity : "", placeholder: 'Quantity', onBlur: function onBlur(event) {
                                return _this3.handleIngredientQuantityCommit(i, event.target.value);
                            }, onChange: function onChange(event) {
                                return _this3.handleIngredientQuantityChange(i, event.target.value);
                            } }),
                        '\xA0\xA0',
                        React.createElement(
                            'select',
                            { value: _this3.state.ingredientList[i] ? _this3.state.ingredientList[i].units : "", onChange: function onChange(event) {
                                    return _this3.handleUnitChange(i, event.target.value);
                                } },
                            React.createElement(
                                'option',
                                { selected: true, value: '' },
                                ' '
                            ),
                            React.createElement(
                                'option',
                                { value: 'cups' },
                                'Cup(s)'
                            ),
                            React.createElement(
                                'option',
                                { value: 'oz' },
                                'oz'
                            ),
                            React.createElement(
                                'option',
                                { value: 'L' },
                                'Liter(s)'
                            )
                        ),
                        React.createElement('input', { style: { "backgroundColor": "rgba(0,0,0,0)", border: "none" }, className: 'clickable circle-button', type: 'button', value: 'X', onClick: function onClick(event) {
                                return _this3.handleRemoveIngredientButtonClick(i);
                            } })
                    );
                }),
                this.state.ingredients > 0 ? React.createElement('br', null) : null,
                React.createElement('input', { type: 'button', className: 'dark-button fullest', value: 'Add Ingredient', onClick: this.handleAddIngredientButtonClick })
            );
        }
    }]);

    return Pantry;
}(React.Component);

function renderPantry(userRef, container) {
    ReactDOM.render(React.createElement(Pantry, { userRef: userRef }), container);
}