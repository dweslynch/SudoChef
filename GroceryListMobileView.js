var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GroceryListMobileView = function (_React$Component) {
    _inherits(GroceryListMobileView, _React$Component);

    function GroceryListMobileView(props) {
        _classCallCheck(this, GroceryListMobileView);

        var _this = _possibleConstructorReturn(this, (GroceryListMobileView.__proto__ || Object.getPrototypeOf(GroceryListMobileView)).call(this, props));

        _this.listKey = props.listKey;
        _this.dbRef = props.dbRef;

        _this.state = {
            items: 0,
            list: [],
            checked: []
        };

        _this.updateListFromSnapshot = _this.updateListFromSnapshot.bind(_this);
        _this.handleToggleCheck = _this.handleToggleCheck.bind(_this);
        _this.clearList = _this.clearList.bind(_this);
        return _this;
    }

    _createClass(GroceryListMobileView, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.dbRef.child('mobile').child(this.listKey).once('value').then(this.updateListFromSnapshot);
        }
    }, {
        key: 'updateListFromSnapshot',
        value: function updateListFromSnapshot(snapshot) {
            if (snapshot.val()) {
                var _list = [];
                var _checked = [];
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = Object.entries(snapshot.val())[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var kvp = _step.value;

                        _list.push(kvp[1]);
                        _checked.push(false);
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
                    items: _list.length,
                    list: _list,
                    checked: _checked
                });
            }
        }
    }, {
        key: 'clearList',
        value: function clearList() {
            this.dbRef.child('mobile').child(this.key).remove();
        }
    }, {
        key: 'handleToggleCheck',
        value: function handleToggleCheck(i) {
            this.setState(function (state) {
                state.checked[i] = !state.checked[i];
                return state;
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var arr = [];
            for (var i = 0; i < this.state.items; i++) {
                arr.push(i);
            }

            return React.createElement(
                'div',
                { className: 'mobileCell' },
                arr.map(function (i) {
                    return React.createElement(
                        'span',
                        { className: _this2.state.checked[i] ? "strikethrough" : "blank", onClick: function onClick(event) {
                                return _this2.handleToggleCheck(i);
                            } },
                        _this2.state.list[i].name,
                        ':\xA0\xA0',
                        _this2.state.list[i].quantity,
                        '\xA0',
                        _this2.state.list[i].units ? _this2.state.list[i].units : ""
                    );
                })
            );
        }
    }]);

    return GroceryListMobileView;
}(React.Component);

function renderMobileView(key, dbRef, container) {
    ReactDOM.render(React.createElement(GroceryListMobileView, { listKey: key, dbRef: dbRef }), container);
}