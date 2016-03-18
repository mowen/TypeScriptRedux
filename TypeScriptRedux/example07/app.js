/// <reference path='../typings/browser.d.ts'/>
System.register(['react', 'react-dom', 'react-redux', './Counter'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var React, ReactDOM, react_redux_1, Counter_1;
    return {
        setters:[
            function (React_1) {
                React = React_1;
            },
            function (ReactDOM_1) {
                ReactDOM = ReactDOM_1;
            },
            function (react_redux_1_1) {
                react_redux_1 = react_redux_1_1;
            },
            function (Counter_1_1) {
                Counter_1 = Counter_1_1;
            }],
        execute: function() {
            ReactDOM.render(React.createElement(react_redux_1.Provider, null, React.createElement(Counter_1.default, {field: "width", step: 10}), React.createElement(Counter_1.default, {field: "height", step: 10})), document.getElementById('content'));
        }
    }
});
//# sourceMappingURL=app.js.map