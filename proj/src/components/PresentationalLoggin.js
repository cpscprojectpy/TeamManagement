"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const LoginContainer_1 = require("./LoginContainer");
class Loggin extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement("div", { style: { position: 'absolute', top: '17vh', left: '0vw', width: '70vw', height: '83vh', backgroundColor: 'orange',
                margin: '0', shadow: '5px 10px red' } },
            React.createElement(LoginContainer_1.LogginInterface, { login: 'something' })));
    }
}
exports.Loggin = Loggin;
//# sourceMappingURL=PresentationalLoggin.js.map