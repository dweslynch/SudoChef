var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Suggestions(props) {
    console.log(props.recipes);
    console.log("running");
    console.log(props.query);

    if (!props.query) {
        return null;
    }

    console.log("finding matches");

    var query = props.query;
    var recipes = props.recipes;
    var flowup = props.flowup;
    var userRef = props.userRef;

    var matches = [];

    for (uid in recipes) {
        var userRecipes = recipes[uid];

        var _loop = function _loop() {
            var uRecipe = userRecipes[key].name.toUpperCase();
            var uQuery = query.toUpperCase();

            if (uQuery.includes(" ")) {
                // If the query has multiple words, check if recipe name includes query directly
                if (uRecipe.includes(uQuery)) {
                    matches.push({ key: key, value: userRecipes[key] });
                    /*
                    matches.push({
                        uid: uid,
                        key: key
                    });
                    */
                }
            } else {
                // Otherwise, does a word in the recipe start with the query?
                if (uRecipe.split(" ").some(function (x) {
                    return x.startsWith(uQuery);
                })) {
                    matches.push({ key: key, value: userRecipes[key] });
                    /*
                    matches.push({
                        uid: uid,
                        key: key
                    });
                    */
                }
            }
        };

        for (key in userRecipes) {
            _loop();
        }
    }

    console.log(matches);

    // Only deal with maximum 10 matches
    // Will eventually sort by recipe score
    /*
    return matches.slice(0, 10).map(identifier =>
        <div className="autocomplete-suggestion" onClick={(event) => flowup(identifier.uid, identifier.key)}>
            {recipes[identifier.uid][identifier.key].name} by {recipes[identifier.uid][identifier.key].author}
        </div>
    );
    */

    /*
    return matches.slice(0, 10).map(recipe =>
        <AutoCompleteSuggestion recipeKey={recipe.key} recipe={recipe.value} userRef={userRef} flowup={flowup}/>
    );
    */

    return matches.slice(0, 10).map(function (recipe) {
        return React.createElement(
            "div",
            { className: "autocomplete-suggestion", onClick: function onClick(event) {
                    return flowup(recipe.value.authorid, recipe.key);
                } },
            recipe.value.name,
            " by ",
            recipe.value.author
        );
    });
}

var RecipeFinder = function (_React$Component) {
    _inherits(RecipeFinder, _React$Component);

    function RecipeFinder(props) {
        _classCallCheck(this, RecipeFinder);

        var _this = _possibleConstructorReturn(this, (RecipeFinder.__proto__ || Object.getPrototypeOf(RecipeFinder)).call(this, props));

        _this.recipeRef = props.recipeRef;
        _this.userRef = props.userRef;
        _this.submit = props.submit;

        _this.state = {
            query: "",
            recipes: {}
        };

        _this.handleQueryChange = _this.handleQueryChange.bind(_this);
        _this.updateStateFromSnapshot = _this.updateStateFromSnapshot.bind(_this);
        return _this;
    }

    _createClass(RecipeFinder, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.recipeRef.once('value').then(this.updateStateFromSnapshot);
            this.recipeRef.on('value', this.updateStateFromSnapshot);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.recipeRef.off('value', this.updateStateFromSnapshot);
        }
    }, {
        key: "handleQueryChange",
        value: function handleQueryChange(event) {
            this.setState({ query: event.target.value });
        }
    }, {
        key: "updateStateFromSnapshot",
        value: function updateStateFromSnapshot(snapshot) {
            this.setState({ recipes: snapshot.val() });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h1",
                    null,
                    React.createElement("br", null)
                ),
                React.createElement(
                    "div",
                    { className: "autocomplete-container" },
                    React.createElement(
                        "h1",
                        null,
                        "Find A Recipe",
                        React.createElement("br", null),
                        React.createElement("br", null)
                    ),
                    React.createElement("input", { className: "autocomplete", value: this.state.query, placeholder: "Find A Recipe...", onChange: this.handleQueryChange }),
                    React.createElement(
                        "div",
                        { className: "autocomplete-suggestions-container" },
                        React.createElement(Suggestions, { className: "autocomplete-suggestions-container", key: this.state.query, query: this.state.query, userRef: this.userRef, recipes: this.state.recipes, flowup: this.submit })
                    )
                )
            );
        }
    }]);

    return RecipeFinder;
}(React.Component);

function renderRecipeFinder(submit, recipeRef, userRef, container) {
    ReactDOM.render(React.createElement(RecipeFinder, { recipeRef: recipeRef, userRef: userRef, submit: submit }), container);
}