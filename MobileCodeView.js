var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MobileCodeView = function (_React$Component) {
    _inherits(MobileCodeView, _React$Component);

    function MobileCodeView(props) {
        _classCallCheck(this, MobileCodeView);

        var _this = _possibleConstructorReturn(this, (MobileCodeView.__proto__ || Object.getPrototypeOf(MobileCodeView)).call(this, props));

        _this.mobileKey = props.mobileKey;
        _this.generateURL = _this.generateURL.bind(_this);
        return _this;
    }

    _createClass(MobileCodeView, [{
        key: 'generateURL',
        value: function generateURL(key) {
            // Replace this later
            var mobileURL = 'https://dweslynch.github.io/SudoChef/mobile.html?key=' + key;
            console.log(mobileURL);
            var formattedMobileURL = encodeURIComponent(mobileURL);

            var codeURL = 'http://api.qrserver.com/v1/create-qr-code/?data=' + formattedMobileURL + '&size=250x250&color=111111&bgcolor=eeeeee';

            return codeURL;
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { style: { 'textAlign': 'center' } },
                React.createElement(
                    'h2',
                    null,
                    'Make a Grocery Run'
                ),
                React.createElement(
                    'p',
                    null,
                    'Bring your list with you to the grocery store and cross off items as you go by scanning this code with your mobile device.'
                ),
                React.createElement('br', null),
                React.createElement('img', { className: 'code', src: this.generateURL(this.mobileKey) })
            );
        }
    }]);

    return MobileCodeView;
}(React.Component);

function renderMobileCode(key, container) {
    ReactDOM.render(React.createElement(MobileCodeView, { mobileKey: key }), container);
}