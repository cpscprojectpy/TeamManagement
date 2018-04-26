"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
class LogginInterface extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {
                user: '',
                pw: ''
            }
        };
    }
    delay_onKeyUp(e, target) {
        clearTimeout(this.counter);
        let update_string = e.target.value;
        this.counter = setTimeout(this.setState(((prevState, props) => {
            let new_obj = prevState.info;
            new_obj[target] = e.target.value;
            return { info: new_obj };
        })), 3000);
        setTimeout(() => console.log(JSON.stringify(this.state.info)), 0);
    }
    render() {
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
                    position: 'relative', top: '32%', left: '31%', fontWeight: 'normal',
                    letterSpacing: '3px', fontSize: '3vw', color: '#0B70D0', width: '21vw'
                } },
                React.createElement(react_bootstrap_1.FormGroup, { controlId: "formBasicText" },
                    React.createElement(react_bootstrap_1.FormControl, { type: "text", placeholder: "Username", onKeyUp: (e) => { this.delay_onKeyUp(e, 'user'); } }))),
            React.createElement("div", { style: {
                    position: 'relative', top: '34%', left: '31%', fontWeight: 'normal',
                    letterSpacing: '3px', fontSize: '3vw', color: '#0B70D0', width: '21vw'
                } },
                React.createElement(react_bootstrap_1.FormGroup, { controlId: "formBasicText" },
                    React.createElement(react_bootstrap_1.FormControl, { type: "text", placeholder: "Password", onKeyUp: (e) => { this.delay_onKeyUp(e, 'pw'); } })))));
    }
}
exports.LogginInterface = LogginInterface;
//# sourceMappingURL=LoginContainer.js.map