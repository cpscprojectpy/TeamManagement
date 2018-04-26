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
var PresentationalLoggin_1 = require("./components/PresentationalLoggin");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super.call(this) || this;
    }
    Main.prototype.login = function (info) {
        console.log(JSON.stringify(info));
        return true;
    };
    Main.prototype.render = function () {
        return React.createElement(PresentationalLoggin_1.Loggin, { login: this.login.bind(this) });
    };
    return Main;
}(React.Component));
exports.Main = Main;
//# sourceMappingURL=main.js.map