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
        _this.flowup = props.flowup;

        _this.state = {
            userRecipes: {},
            selectedRecipe: "",
            days: {}
        };

        _this.handleRecipeClick = _this.handleRecipeClick.bind(_this);
        _this.updateUserRecipesFromSnapshot = _this.updateUserRecipesFromSnapshot.bind(_this);
        _this.handleSlotClick = _this.handleSlotClick.bind(_this);
        _this.clearDay = _this.clearDay.bind(_this);
        _this.generateWeeklyListFromSnapshot = _this.generateWeeklyListFromSnapshot.bind(_this);
        _this.compileWeeklyList = _this.compileWeeklyList.bind(_this);
        _this.clearEntireCalendar = _this.clearEntireCalendar.bind(_this);
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
        key: 'generateWeeklyListFromSnapshot',
        value: function generateWeeklyListFromSnapshot(snapshot) {
            var weeklyList = [];

            if (snapshot.val()) {
                var calendar = snapshot.val();

                for (var day in calendar) {
                    var _day = calendar[day];

                    for (var meal in _day) {
                        var _meal = _day[meal];

                        var obj = { name: _meal.name, authorid: _meal.authorid };

                        weeklyList.push([_meal.key, obj]);
                    }
                }
            }

            this.flowup(weeklyList);
        }
    }, {
        key: 'compileWeeklyList',
        value: function compileWeeklyList() {
            this.userRef.child('calendar').once('value').then(this.generateWeeklyListFromSnapshot);
        }
    }, {
        key: 'handleRecipeClick',
        value: function handleRecipeClick(key) {
            if (this.state.selectedRecipe == key) {
                this.setState({
                    selectedRecipe: ""
                });
            } else {
                this.setState({
                    selectedRecipe: key
                });
            }
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
        key: 'clearDay',
        value: function clearDay(day) {
            this.userRef.child('calendar').child(day).remove();
        }
    }, {
        key: 'clearEntireCalendar',
        value: function clearEntireCalendar() {
            this.userRef.child('calendar').remove();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _handleRecipeClick = this.handleRecipeClick;
            var _selectedRecipe = this.state.selectedRecipe;
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
                        { className: 'left-calendar-float' },
                        React.createElement(
                            'div',
                            { className: 'card', style: { 'marginRight': '25px' } },
                            React.createElement(
                                'h2',
                                null,
                                'My Recipes'
                            ),
                            React.createElement(
                                'p',
                                null,
                                'Click a recipe then a calendar slot to assign a meal'
                            ),
                            React.createElement('br', null),
                            React.createElement(
                                'div',
                                { style: { 'marginLeft': '0px' } },
                                Object.entries(this.state.userRecipes).map(function (kvp) {
                                    var _kvp = _slicedToArray(kvp, 2),
                                        key = _kvp[0],
                                        value = _kvp[1];

                                    return React.createElement(
                                        'div',
                                        null,
                                        React.createElement('input', { type: 'button', value: value.name, className: _selectedRecipe == key ? "dark-button fullest" : "light-button fullest", onClick: function onClick(event) {
                                                return _handleRecipeClick(key);
                                            } }),
                                        React.createElement('br', null),
                                        React.createElement('br', null)
                                    );
                                })
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'right-calendar-float' },
                        React.createElement(
                            'div',
                            { className: '', style: { 'marginLeft': '25px' } },
                            React.createElement('input', { type: 'button', className: 'dark-button fullest', onClick: function onClick(event) {
                                    return _this2.compileWeeklyList();
                                }, value: 'Preview Weekly List' }),
                            React.createElement('br', null),
                            React.createElement('br', null),
                            React.createElement('input', { type: 'button', className: 'dark-button fullest', onClick: function onClick(event) {
                                    return _this2.clearEntireCalendar();
                                }, value: 'Clear Entire Calendar' }),
                            React.createElement('br', null),
                            React.createElement('br', null),
                            React.createElement(
                                'div',
                                { className: 'sun' },
                                React.createElement(
                                    'div',
                                    { className: 'card' },
                                    React.createElement(
                                        'table',
                                        { style: { 'width': '100%' } },
                                        React.createElement(
                                            'tr',
                                            null,
                                            React.createElement(
                                                'td',
                                                { style: { 'textAlign': 'left' } },
                                                React.createElement(
                                                    'h2',
                                                    null,
                                                    'Sunday'
                                                )
                                            ),
                                            React.createElement(
                                                'td',
                                                { style: { 'textAlign': 'right' } },
                                                React.createElement('input', { className: 'clickable circle-button', type: 'button', value: 'X', onClick: function onClick(event) {
                                                        return _this2.clearDay('sun');
                                                    } })
                                            )
                                        )
                                    ),
                                    React.createElement(RecipeSlot, { dateNumber: null, day: "sun", meal: "b", userRef: this.userRef, slotClick: this.handleSlotClick }),
                                    React.createElement(RecipeSlot, { dateNumber: null, day: "sun", meal: "l", userRef: this.userRef, slotClick: this.handleSlotClick }),
                                    React.createElement(RecipeSlot, { dateNumber: null, day: "sun", meal: "d", userRef: this.userRef, slotClick: this.handleSlotClick })
                                )
                            ),
                            React.createElement('br', null),
                            React.createElement(
                                'div',
                                { className: 'mon' },
                                React.createElement(
                                    'div',
                                    { className: 'card' },
                                    React.createElement(
                                        'table',
                                        { style: { 'width': '100%' } },
                                        React.createElement(
                                            'tr',
                                            null,
                                            React.createElement(
                                                'td',
                                                { style: { 'textAlign': 'left' } },
                                                React.createElement(
                                                    'h2',
                                                    null,
                                                    'Monday'
                                                )
                                            ),
                                            React.createElement(
                                                'td',
                                                { style: { 'textAlign': 'right' } },
                                                React.createElement('input', { className: 'clickable circle-button', type: 'button', value: 'X', onClick: function onClick(event) {
                                                        return _this2.clearDay('mon');
                                                    } })
                                            )
                                        )
                                    ),
                                    React.createElement(RecipeSlot, { dateNumber: null, day: "mon", meal: "b", userRef: this.userRef, slotClick: this.handleSlotClick }),
                                    React.createElement(RecipeSlot, { dateNumber: null, day: "mon", meal: "l", userRef: this.userRef, slotClick: this.handleSlotClick }),
                                    React.createElement(RecipeSlot, { dateNumber: null, day: "mon", meal: "d", userRef: this.userRef, slotClick: this.handleSlotClick })
                                )
                            ),
                            React.createElement('br', null),
                            React.createElement(
                                'div',
                                { className: 'tue' },
                                React.createElement(
                                    'div',
                                    { className: 'card' },
                                    React.createElement(
                                        'table',
                                        { style: { 'width': '100%' } },
                                        React.createElement(
                                            'tr',
                                            null,
                                            React.createElement(
                                                'td',
                                                { style: { 'textAlign': 'left' } },
                                                React.createElement(
                                                    'h2',
                                                    null,
                                                    'Tuesday'
                                                )
                                            ),
                                            React.createElement(
                                                'td',
                                                { style: { 'textAlign': 'right' } },
                                                React.createElement('input', { className: 'clickable circle-button', type: 'button', value: 'X', onClick: function onClick(event) {
                                                        return _this2.clearDay('tue');
                                                    } })
                                            )
                                        )
                                    ),
                                    React.createElement(RecipeSlot, { dateNumber: null, day: "tue", meal: "b", userRef: this.userRef, slotClick: this.handleSlotClick }),
                                    React.createElement(RecipeSlot, { dateNumber: null, day: "tue", meal: "l", userRef: this.userRef, slotClick: this.handleSlotClick }),
                                    React.createElement(RecipeSlot, { dateNumber: null, day: "tue", meal: "d", userRef: this.userRef, slotClick: this.handleSlotClick })
                                )
                            ),
                            React.createElement('br', null),
                            React.createElement(
                                'div',
                                { className: 'wed' },
                                React.createElement(
                                    'div',
                                    { className: 'card' },
                                    React.createElement(
                                        'table',
                                        { style: { 'width': '100%' } },
                                        React.createElement(
                                            'tr',
                                            null,
                                            React.createElement(
                                                'td',
                                                { style: { 'textAlign': 'left' } },
                                                React.createElement(
                                                    'h2',
                                                    null,
                                                    'Wednesday'
                                                )
                                            ),
                                            React.createElement(
                                                'td',
                                                { style: { 'textAlign': 'right' } },
                                                React.createElement('input', { className: 'clickable circle-button', type: 'button', value: 'X', onClick: function onClick(event) {
                                                        return _this2.clearDay('wed');
                                                    } })
                                            )
                                        )
                                    ),
                                    React.createElement(RecipeSlot, { dateNumber: null, day: "wed", meal: "b", userRef: this.userRef, slotClick: this.handleSlotClick }),
                                    React.createElement(RecipeSlot, { dateNumber: null, day: "wed", meal: "l", userRef: this.userRef, slotClick: this.handleSlotClick }),
                                    React.createElement(RecipeSlot, { dateNumber: null, day: "wed", meal: "d", userRef: this.userRef, slotClick: this.handleSlotClick })
                                )
                            ),
                            React.createElement('br', null),
                            React.createElement(
                                'div',
                                { className: 'thu' },
                                React.createElement(
                                    'div',
                                    { className: 'card' },
                                    React.createElement(
                                        'table',
                                        { style: { 'width': '100%' } },
                                        React.createElement(
                                            'tr',
                                            null,
                                            React.createElement(
                                                'td',
                                                { style: { 'textAlign': 'left' } },
                                                React.createElement(
                                                    'h2',
                                                    null,
                                                    'Thursday'
                                                )
                                            ),
                                            React.createElement(
                                                'td',
                                                { style: { 'textAlign': 'right' } },
                                                React.createElement('input', { className: 'clickable circle-button', type: 'button', value: 'X', onClick: function onClick(event) {
                                                        return _this2.clearDay('thu');
                                                    } })
                                            )
                                        )
                                    ),
                                    React.createElement(RecipeSlot, { dateNumber: null, day: "thu", meal: "b", userRef: this.userRef, slotClick: this.handleSlotClick }),
                                    React.createElement(RecipeSlot, { dateNumber: null, day: "thu", meal: "l", userRef: this.userRef, slotClick: this.handleSlotClick }),
                                    React.createElement(RecipeSlot, { dateNumber: null, day: "thu", meal: "d", userRef: this.userRef, slotClick: this.handleSlotClick })
                                )
                            ),
                            React.createElement('br', null),
                            React.createElement(
                                'div',
                                { className: 'fri' },
                                React.createElement(
                                    'div',
                                    { className: 'card' },
                                    React.createElement(
                                        'table',
                                        { style: { 'width': '100%' } },
                                        React.createElement(
                                            'tr',
                                            null,
                                            React.createElement(
                                                'td',
                                                { style: { 'textAlign': 'left' } },
                                                React.createElement(
                                                    'h2',
                                                    null,
                                                    'Friday'
                                                )
                                            ),
                                            React.createElement(
                                                'td',
                                                { style: { 'textAlign': 'right' } },
                                                React.createElement('input', { className: 'clickable circle-button', type: 'button', value: 'X', onClick: function onClick(event) {
                                                        return _this2.clearDay('fri');
                                                    } })
                                            )
                                        )
                                    ),
                                    React.createElement(RecipeSlot, { dateNumber: null, day: "fri", meal: "b", userRef: this.userRef, slotClick: this.handleSlotClick }),
                                    React.createElement(RecipeSlot, { dateNumber: null, day: "fri", meal: "l", userRef: this.userRef, slotClick: this.handleSlotClick }),
                                    React.createElement(RecipeSlot, { dateNumber: null, day: "fri", meal: "d", userRef: this.userRef, slotClick: this.handleSlotClick })
                                )
                            ),
                            React.createElement('br', null),
                            React.createElement(
                                'div',
                                { className: 'sat' },
                                React.createElement(
                                    'div',
                                    { className: 'card' },
                                    React.createElement(
                                        'table',
                                        { style: { 'width': '100%' } },
                                        React.createElement(
                                            'tr',
                                            null,
                                            React.createElement(
                                                'td',
                                                { style: { 'textAlign': 'left' } },
                                                React.createElement(
                                                    'h2',
                                                    null,
                                                    'Saturday'
                                                )
                                            ),
                                            React.createElement(
                                                'td',
                                                { style: { 'textAlign': 'right' } },
                                                React.createElement('input', { className: 'clickable circle-button', type: 'button', value: 'X', onClick: function onClick(event) {
                                                        return _this2.clearDay('sat');
                                                    } })
                                            )
                                        )
                                    ),
                                    React.createElement(RecipeSlot, { dateNumber: null, day: "sat", meal: "b", userRef: this.userRef, slotClick: this.handleSlotClick }),
                                    React.createElement(RecipeSlot, { dateNumber: null, day: "sat", meal: "l", userRef: this.userRef, slotClick: this.handleSlotClick }),
                                    React.createElement(RecipeSlot, { dateNumber: null, day: "sat", meal: "d", userRef: this.userRef, slotClick: this.handleSlotClick })
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Calendar;
}(React.Component);

function renderCalendar(userRef, flowup, container) {
    ReactDOM.render(React.createElement(Calendar, { userRef: userRef, flowup: flowup }), container);
}