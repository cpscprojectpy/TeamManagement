"use strict";
var React = require('react');
var Hello = React.createClass({
    render: function () {
        return React.createElement("h1", null, 
            "Hello from ", 
            this.props.compiler, 
            " and ", 
            this.props.framework, 
            "!");
    }
});
module.exports = Hello;
//# sourceMappingURL=Hello.js.map