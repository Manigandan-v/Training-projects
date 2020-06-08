import React from 'react';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EmailVerifier = function (_React$Component) {
    _inherits(EmailVerifier, _React$Component);

    function EmailVerifier(props) {
        _classCallCheck(this, EmailVerifier);

        var _this = _possibleConstructorReturn(this, (EmailVerifier.__proto__ || Object.getPrototypeOf(EmailVerifier)).call(this, props));

        _this.handleCheckMail = _this.handleCheckMail.bind(_this);
        _this.state = {
            value: '',
            response: '',
            error: ''
        };
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }

    _createClass(EmailVerifier, [{
        key: 'handleChange',
        value: function handleChange(e) {
            this.setState({ value: e.target.value.trim() });
            e.target.value = '';
        }
    }, {
        key: 'handleCheckMail',
        value: function handleCheckMail(e) {
            var _this2 = this;

            e.preventDefault();
            this.setState(function () {
                return {
                    response: 'Checking....',
                    error: ''
                };
            });
            fetch("https://api.trumail.io/v2/lookups/json?email=" + this.state.value, {
                "method": "GET",
                "headers": {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(function (res) {
                return res.json();
            }).then(function (data) {
                if (data.deliverable) {
                    _this2.setState(function () {
                        return {
                            response: 'Valid Email : ' + _this2.state.value
                        };
                    });
                } else if (data.Message) {
                    _this2.setState(function () {
                        return {
                            response: 'Error from API : ' + data.Message
                        };
                    });
                } else {
                    _this2.setState(function () {
                        return {
                            response: 'Invalid Email : ' + _this2.state.value
                        };
                    });
                }
            }).catch(function (error) {
                //on error
                _this2.setState(function () {
                    return {
                        error: 'Error while fetching : ' + error,
                        response: ''
                    };
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'form',
                    { onSubmit: this.handleCheckMail },
                    React.createElement('input', { type: 'email', name: 'checkmail', value: this.state.value, onChange: this.handleChange }),
                    React.createElement(
                        'button',
                        null,
                        'Submit'
                    )
                ),
                this.state.response != null ? React.createElement(
                    'p',
                    null,
                    this.state.response
                ) : '',
                this.state.error != null ? React.createElement(
                    'p',
                    null,
                    this.state.error
                ) : ''
            );
        }
    }]);

    return EmailVerifier;
}(React.Component);

export default EmailVerifier;
