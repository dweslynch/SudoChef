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

    var matches = [];

    var _loop = function _loop() {
        console.log(key);
        var uRecipe = recipes[key].name.toUpperCase();
        var uQuery = query.toUpperCase();

        if (uQuery.includes(" ")) {
            // If the query has multiple words, check if recipe name includes query directly
            if (uRecipe.includes(uQuery)) {
                matches.push(key);
            }
        } else {
            // Otherwise, does a word in the recipe start with the query?
            if (uRecipe.split(" ").some(function (x) {
                return x.startsWith(uQuery);
            })) {
                matches.push(key);
            }
        }
    };

    for (key in recipes) {
        _loop();
    }

    console.log(matches);

    // Only deal with maximum 10 matches
    // Will eventually sort by recipe score
    return matches.slice(0, 10).map(function (key) {
        return React.createElement(
            "div",
            { className: "autocomplete-suggestion", onClick: function onClick(event) {
                    return flowup(key);
                } },
            recipes[key].name,
            " by ",
            recipes[key].author
        );
    });
}

var RecipeFinder = function (_React$Component) {
    _inherits(RecipeFinder, _React$Component);

    function RecipeFinder(props) {
        _classCallCheck(this, RecipeFinder);

        var _this = _possibleConstructorReturn(this, (RecipeFinder.__proto__ || Object.getPrototypeOf(RecipeFinder)).call(this, props));

        _this.recipes = props.recipes;
        _this.submit = props.submit;

        _this.state = { query: "" };

        _this.handleQueryChange = _this.handleQueryChange.bind(_this);
        return _this;
    }

    _createClass(RecipeFinder, [{
        key: "handleQueryChange",
        value: function handleQueryChange(event) {
            this.setState({ query: event.target.value });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "autocomplete-container" },
                React.createElement(
                    "h1",
                    null,
                    React.createElement("br", null),
                    React.createElement("br", null),
                    React.createElement("br", null)
                ),
                React.createElement("input", { id: "autocomplete", value: this.state.query, placeholder: "Find A Recipe", onChange: this.handleQueryChange }),
                React.createElement(Suggestions, { className: "autocomplete-suggestions-container", query: this.state.query, recipes: this.recipes, flowup: this.submit })
            );
        }
    }]);

    return RecipeFinder;
}(React.Component);

function renderRecipeFinder(submit, recipes, container) {
    ReactDOM.render(React.createElement(RecipeFinder, { recipes: recipes, submit: submit }), container);
}