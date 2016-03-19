﻿/// <reference path='../typings/browser.d.ts'/>

import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";

import Counter from "./Counter";
import ActionPlayer from "./ActionPlayer";
import ShapeMaker from "./ShapeMaker";
import ShapeViewer from "./ShapeViewer";
import { ColorPicker } from "./ColorPicker";

import reducers from './reducers';

var actions = [];
var defaultState = { nextShapeId: 0, width: 100, height: 100, color: "#000000", shapes: [] };

let store = createStore(
    (state, action) => {
        var reducer = reducers[action.type];
        var nextState = reducer != null ? reducer(state, action) : state;

        if (action.type != 'LOAD')
            history.add(action, state);

        return nextState;
    },
    defaultState
);

class ColorWrapperBase extends React.Component<any, any> {
    render() {
        return <ColorPicker color={this.props.color} onChange={this.props.setColor} />;
    }
}

const ColorWrapper = connect(
    (state) => ({ color: state.color }),
    (dispatch) => ({
         setColor: (color) => dispatch({ type: "COLOR_CHANGE", color })
    })
)(ColorWrapperBase);

ReactDOM.render(
    <Provider store={store}>
        <table>
            <tbody>
                <tr>
                    <td style={{ width: 220 }}>
                        <Counter field="width" step={10}/>
                        <Counter field="height" step={10}/>
                        <ColorWrapper />
                    </td>
                    <td style={{ verticalAlign: "top", textAlign: "center", width: 500 }}>
                        <h2>Preview</h2>
                        <ShapeMaker />
                    </td>
                    <td style={{ verticalAlign: "bottom" }}>
                        <ActionPlayer store={store} actions={actions} defaultState={defaultState} />
                    </td>
                </tr>
                <tr>
                    <td colSpan="3">
                        <h2 style={{ margin: 5, textAlign: "center" }}>Shapes</h2>
                        <ShapeViewer />
                    </td>
                </tr>
            </tbody>
        </table>
    </Provider>,
    document.getElementById('content')
);
