var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Settings = function (_React$Component) {
    _inherits(Settings, _React$Component);

    function Settings(props) {
        _classCallCheck(this, Settings);

        var _this = _possibleConstructorReturn(this, (Settings.__proto__ || Object.getPrototypeOf(Settings)).call(this, props));

        _this.userRef = props.userRef;

        _this.titles = {
            peanutFree: "Peanut allergy",
            treenutFree: "Treenut allergy",
            fishFree: "Fish allergy",
            shellfishFree: "Shellfish allergy",
            dairyFree: "Dairy allergy",
            eggFree: "Egg allergy",
            kosher: "Kosher",
            vegetarian: "Vegetarian",
            vegan: "Vegan"
        };

        _this.state = {
            restrictions: {
                peanutFree: false,
                treenutFree: false,
                fishFree: false,
                shellfishFree: false,
                dairyFree: false,
                eggFree: false,
                kosher: false,
                vegetarian: false,
                vegan: false
            }
        };

        _this.handleRestrictionToggle = _this.handleRestrictionToggle.bind(_this);
        _this.updateStateFromSnapshot = _this.updateStateFromSnapshot.bind(_this);
        return _this;
    }

    _createClass(Settings, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.userRef.child('restrictions').once('value').then(this.updateStateFromSnapshot);
            this.userRef.child('restrictions').on('value', this.updateStateFromSnapshot);
        }
    }, {
        key: "updateStateFromSnapshot",
        value: function updateStateFromSnapshot(snapshot) {
            if (snapshot.val()) {
                var data = snapshot.val();
                console.log(data);
                this.setState(function (state) {
                    for (var key in state.restrictions) {
                        console.log(key);
                        if (data[key]) {
                            console.log("data contains key");
                            state.restrictions[key] = true;
                        } else {
                            console.log("data does not contain key");
                            state.restrictions[key] = false;
                        }
                    }
                    return state;
                });
            } else {
                this.setState({
                    restrictions: {
                        peanutFree: false,
                        treenutFree: false,
                        fishFree: false,
                        shellfishFree: false,
                        dairyFree: false,
                        eggFree: false,
                        kosher: false,
                        vegetarian: false,
                        vegan: false
                    }
                });
            }
        }
    }, {
        key: "handleRestrictionToggle",
        value: function handleRestrictionToggle(event) {
            var name = event.target.name;
            if (this.state.restrictions[name]) {
                // Currently set, toggling to off
                this.userRef.child('restrictions').child(name).remove();
                // State will be refreshed once the data changes in firebase
            } else {
                // Currently off, toggling to on
                this.userRef.child('restrictions').child(name).set(true);
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            return React.createElement(
                "div",
                null,
                Object.entries(this.state.restrictions).map(function (kvp) {
                    return React.createElement(
                        "span",
                        null,
                        React.createElement("input", { type: "button", style: { "margin": "5px", "backgroundColor": kvp[1] ? "black" : "white", "color": kvp[1] ? "white" : "black" }, name: kvp[0], value: _this2.titles[kvp[0]], onClick: _this2.handleRestrictionToggle })
                    );
                })
            );
        }
    }]);

    return Settings;
}(React.Component);

function renderSettingsView(userRef, container) {
    ReactDOM.render(React.createElement(Settings, { userRef: userRef }), container);
}