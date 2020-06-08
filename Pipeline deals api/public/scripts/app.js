"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PiplelineDeals = function (_React$Component) {
    _inherits(PiplelineDeals, _React$Component);

    function PiplelineDeals(props) {
        _classCallCheck(this, PiplelineDeals);

        var _this = _possibleConstructorReturn(this, (PiplelineDeals.__proto__ || Object.getPrototypeOf(PiplelineDeals)).call(this, props));

        _this.state = {
            deals: []
        };
        return _this;
    }

    _createClass(PiplelineDeals, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            fetch("https://api.pipelinedeals.com/api/v3/deals.json?api_key=fiIbpGxSi1A__B5wYsVJ", {
                "method": "GET",
                "headers": {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(function (res) {
                return res.json();
            })
            //.then(json=>console.log(json.entries))
            .then(function (data) {
                return _this2.setState({ deals: data.entries });
            }).catch(function (error) {
                //on error
                console.log(error);
            });
        }
    }, {
        key: "render",
        value: function render() {
            var deals = this.state.deals;


            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h2",
                    null,
                    "Pipeline Deals"
                ),
                React.createElement(
                    "table",
                    null,
                    React.createElement(
                        "tr",
                        { key: "1" },
                        React.createElement(
                            "th",
                            null,
                            "Deal ID"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Name"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Summary"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Value in cents"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Source ID"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Source Name"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Probability"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Primary contact"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Phone"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Email"
                        )
                    ),
                    deals.map(function (deal) {
                        return React.createElement(
                            "tr",
                            { key: deal.id },
                            React.createElement(
                                "td",
                                null,
                                deal.id
                            ),
                            React.createElement(
                                "td",
                                null,
                                deal.name
                            ),
                            React.createElement(
                                "td",
                                null,
                                deal.summary
                            ),
                            React.createElement(
                                "td",
                                null,
                                deal.value_in_cents
                            ),
                            React.createElement(
                                "td",
                                null,
                                deal.source.id
                            ),
                            React.createElement(
                                "td",
                                null,
                                deal.source.name
                            ),
                            React.createElement(
                                "td",
                                null,
                                deal.probability
                            ),
                            React.createElement(
                                "td",
                                null,
                                deal.primary_contact.first_name + ' ' + deal.primary_contact.last_name
                            ),
                            React.createElement(
                                "td",
                                null,
                                deal.primary_contact.phone
                            ),
                            React.createElement(
                                "td",
                                null,
                                deal.primary_contact.email
                            )
                        );
                    })
                )
            );
        }
    }]);

    return PiplelineDeals;
}(React.Component);

ReactDOM.render(React.createElement(PiplelineDeals, null), document.getElementById('app'));
