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
var LoginContainer_1 = require("./LoginContainer");
var Loggin = /** @class */ (function (_super) {
    __extends(Loggin, _super);
    function Loggin(props) {
        return _super.call(this, props) || this;
    }
    Loggin.prototype.render = function () {
        return (React.createElement("div", { style: { position: 'absolute', top: '17vh', left: '0vw', width: '70vw', height: '83vh', backgroundColor: 'orange',
                margin: '0', shadow: '5px 10px red' } },
            React.createElement(LoginContainer_1.LogginInterface, { login: this.props.login })));
    };
    return Loggin;
}(React.Component));
exports.Loggin = Loggin;
//# sourceMappingURL=PresentationalLoggin.js.map