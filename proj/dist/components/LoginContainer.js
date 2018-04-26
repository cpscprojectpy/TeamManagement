"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var LogginInterface = /** @class */ (function (_super) {
    __extends(LogginInterface, _super);
    function LogginInterface(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            user: '',
            pw: ''
        };
        return _this;
    }
    LogginInterface.prototype.delay_onKeyUp = function (e, target) {
        // clearTimeout(this.counter);
        var update_string = e.target.value;
        console.log(update_string);
        var new_obj = {};
        new_obj[target] = update_string;
        this.setState(new_obj);
        // setTimeout(() => console.log(JSON.stringify(this.state[target])), 0);
    };
    LogginInterface.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { style: { position: 'relative', left: '20vw', width: '50vw', height: '83vh', margin: '0', backgroundColor: "white" } },
            React.createElement("div", { style: {
                    position: 'relative', top: '26%', left: '31%', fontWeight: 'normal',
                    letterSpacing: '3px', fontSize: '3vw', color: '#0B70D0'
                } }, "LOGIN"),
            React.createElement("div", { style: {
                    position: 'relative', top: '27%', left: '31%', fontWeight: 'normal',
                    letterSpacing: '1px', fontSize: '1.4vh', color: 'grey', width: '17vw', lineHeight: '1.7'
                } }, "providing team management services to coaches/players/managers"),
            React.createElement("div", { style: {
                    position: 'relative', top: '31%', left: '31%', fontWeight: 'normal',
                    letterSpacing: '3px', fontSize: '3vw', color: '#0B70D0', width: '19vw'
                } },
                React.createElement(react_bootstrap_1.FormGroup, { controlId: "formBasicText" },
                    React.createElement(react_bootstrap_1.FormControl, { type: "text", placeholder: "Username", onKeyUp: function (e) { _this.delay_onKeyUp(e, 'user'); } }))),
            React.createElement("div", { style: {
                    position: 'relative', top: '32%', left: '31%', fontWeight: 'normal',
                    letterSpacing: '3px', fontSize: '3vw', color: '#0B70D0', width: '19vw'
                } },
                React.createElement(react_bootstrap_1.FormGroup, { controlId: "formBasicText" },
                    React.createElement(react_bootstrap_1.FormControl, { type: "text", placeholder: "Password", onKeyUp: function (e) { _this.delay_onKeyUp(e, 'pw'); } }))),
            React.createElement("div", { style: {
                    position: 'relative', top: '33%', left: '31%', fontWeight: 'normal',
                    letterSpacing: '3px', fontSize: '3vw', color: '#0B70D0', width: '19vw'
                } },
                React.createElement(react_bootstrap_1.Button, { bsStyle: "primary", type: "submit", style: {
                        width: '9vw', padding: '2px'
                    }, onClick: function (e) {
                        var new_obj = { user: '', pw: '' };
                        new_obj['user'] = _this.state.user;
                        new_obj['pw'] = _this.state.pw;
                        _this.props.login(new_obj);
                    } }, "Submit"))));
    };
    return LogginInterface;
}(React.Component));
exports.LogginInterface = LogginInterface;
//# sourceMappingURL=LoginContainer.js.map