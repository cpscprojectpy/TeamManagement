"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./App.css");
const logo = require('./logo.svg');
class App extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            response: 'something'
        };
        this.callApi = () => __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch('/api');
            const body = yield response.json();
            if (response.status !== 200) {
                throw Error(body.message);
            }
            return body;
        });
    }
    componentDidMount() {
        this.callApi()
            .then(res => this.setState({ response: res.express }))
            .catch(err => alert(err));
    }
    render() {
        return (React.createElement("div", { className: "App" },
            React.createElement("header", { className: "App-header" },
                React.createElement("img", { src: logo, className: "App-logo", alt: "logo" }),
                React.createElement("h1", { className: "App-title" }, "Welcome to React")),
            React.createElement("p", { className: "App-intro" },
                "To get started, edit ",
                React.createElement("code", null, "src/App.tsx"),
                " and save to reload."),
            React.createElement("div", null, this.state.response)));
    }
}
exports.default = App;
//# sourceMappingURL=App.js.map