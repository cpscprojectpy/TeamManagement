"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var react_hot_loader_1 = require("react-hot-loader");
var main_1 = require("./main");
var render = function (Component) {
    ReactDOM.render(React.createElement(react_hot_loader_1.AppContainer, null,
        React.createElement(Component, null)), document.getElementById("container"));
};
render(main_1.Main);
if (module.hot) {
    module.hot.accept('./main', function () { render(require('./main').default); });
}
//# sourceMappingURL=index.js.map