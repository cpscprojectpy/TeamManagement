"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const PresentationalLoggin_1 = require("./components/PresentationalLoggin");
class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return React.createElement(PresentationalLoggin_1.Loggin, { login: 'something' });
    }
}
exports.Main = Main;
//# sourceMappingURL=main.js.map