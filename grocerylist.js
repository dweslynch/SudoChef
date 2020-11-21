var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function RestrictionMatchIndicator(props) {
    if (props.restrictions.length > 0) {
        var tagTrue = false;
        var violates = false;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = props.restrictions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var kvp = _step.value;

                console.log("restriction " + kvp[0] + ": " + kvp[1] + " and tag: " + props.tags[kvp[0]]);
                //if (kvp[1] == "true" && this.tags[kvp[0]] == "false")
                if (kvp[1] && !props.tags[kvp[0]]) {
                    violates = true;
                } else if (props.tags[kvp[0]]) {
                    tagTrue = true;
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

        if (tagTrue && violates) {
            return React.createElement(
                "span",
                { style: { "color": "red" } },
                "\u2717 This recipe may not meet your dietary restrictions"
            );
        } else if (tagTrue && !violates) {
            return React.createElement(
                "span",
                { style: { "color": "green" } },
                "\u2713 This recipe meets all your dietary restrictions"
            );
        } else {
            return React.createElement(
                "span",
                { style: { "color": "orange" } },
                "\u25CA This recipe does not include dietary restriction information"
            );
        }
    } else return null;
}

/*
class RestrictionMatchIndicator extends React.Component {
    constructor(props)
    {
        super(props);

        this.restrictions = props.restrictions;
        this.tags = props.tags;

        this.matchesRestrictions = this.matchesRestrictions.bind(this);
        this.matchesSomeRestrictions = this.matchesSomeRestrictions.bind(this);
        this.doesNotHaveRestrictions = this.doesNotHaveRestrictions.bind(this);
    }

    // Returns true if restrictions are met, returns false if not or if there are none
    matchesRestrictions()
    {
        if (this.restrictions.length > 0)
        {
            for (const kvp of this.restrictions)
            {
                console.log(`restriction ${kvp[0]}: ${kvp[1]} and tag: ${this.tags[kvp[0]]}`);
                //if (kvp[1] == "true" && this.tags[kvp[0]] == "false")
                if (kvp[1] && !this.tags[kvp[0]])
                {
                    return false;
                }
            }
            return true;
        }
        else return false;
    }

    // Returns true if the user has restrictions, the recipe has tags, but not all restrictions are met
    matchesSomeRestrictions()
    {
        if (this.restrictions.length > 0)
        {
            let hasTags = false;
            const _tags = Object.entries(this.tags);
            for (const kvp of _tags)
            {
                if (kvp[1])
                    hasTags = true;
            }

            if (!hasTags)
                return false;

            for (const kvp of this.restrictions)
            {
                if (kvp[1] && !this.tags[kvp[0]])
                    return true;
            }
            return false;
        }
        else return false
    }

    // Returns true if the user has dietary restrictions and there are no tags on the recipe
    doesNotHaveRestrictions()
    {
        if (this.restrictions.length > 0)
        {
            const _tags = Object.entries(this.tags);
            for (const kvp of _tags)
            {
                if (kvp[1])
                    return false;
            }
            return true;
        }
        else return false;
    }

    render()
    {
        if (this.restrictions.length > 0)
        {
            if (this.matchesRestrictions())
            {
                return <span style={{"color" : "green"}}>&#x02713; This recipe meets all your dietary restrictions</span>;
            }
            else if (this.matchesSomeRestrictions())
            {
                return <span style={{"color": "red"}}>&#x02717; This recipe may not meet your dietary restrictions</span>;
            }
            else if (this.doesNotHaveRestrictions())
            {
                return <span style={{"color": "orange"}}>&#x025CA; This recipe does not include dietary restriction information</span>;
            }
        }
        else
        {
            return null;
        }
    }
}
*/

var GroceryList = function (_React$Component) {
    _inherits(GroceryList, _React$Component);

    function GroceryList(props) {
        _classCallCheck(this, GroceryList);

        var _this = _possibleConstructorReturn(this, (GroceryList.__proto__ || Object.getPrototypeOf(GroceryList)).call(this, props));

        _this.userRef = props.userRef;
        _this.recipeRef = props.recipeRef;
        _this.container = props.container;

        _this.state = {
            groceries: [],
            restrictions: []
        };

        _this.backtrack = _this.backtrack.bind(_this);
        _this.updateGroceriesFromSnapshot = _this.updateGroceriesFromSnapshot.bind(_this);
        _this.updateRestrictionsFromSnapshot = _this.updateRestrictionsFromSnapshot.bind(_this);
        _this.viewIndividualRecipe = _this.viewIndividualRecipe.bind(_this);
        _this.userHasDietaryRestrictions = _this.userHasDietaryRestrictions.bind(_this);
        _this.renderDisplay = _this.renderDisplay.bind(_this);
        _this.renderDisplayFromSnapshot = _this.renderDisplayFromSnapshot.bind(_this);
        _this.handleRemoveRecipeClick = _this.handleRemoveRecipeClick.bind(_this);
        return _this;
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
            if (snapshot.val()) {
                this.setState({
                    groceries: Object.entries(snapshot.val())
                });
            } else {
                this.setState({
                    groceries: []
                });
            }
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
                    React.createElement(
                        "h2",
                        null,
                        "My Recipes"
                    ),
                    this.state.groceries.map(function (kvp) {
                        var _kvp = _slicedToArray(kvp, 2),
                            key = _kvp[0],
                            recipe = _kvp[1];

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
                                "\xA0\xA0",
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
                    React.createElement("input", { type: "button", className: "dark-button fullest", value: "Preview Grocery List", onClick: function onClick(event) {
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