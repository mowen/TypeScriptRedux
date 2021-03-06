﻿/// <reference path='../../typings/browser.d.ts'/>

import * as React from "react";
import { connect } from "react-redux";
import { isDark } from "./ColorPicker";
import { reduxify } from "./core";

@reduxify(
    (state) => ({
        width: state.width, height: state.height, color: state.color,
        top: state.nextShapeId * 10, left: state.nextShapeId * 10
    }),
    (dispatch) => ({
        addShape: (color, height, width, top, left) => {
            dispatch({ type: 'SHAPE_ADD', height, width, color, top, left });
        }
    })
)
export default class ShapeMaker extends React.Component<any, any> {
    constructor(props?, context?) {
        super(props, context);
        this.state = { top: props.top, left: props.left };
    }

    render() {
        var width = this.props.width,
            height = this.props.height,
            background = this.props.color;
        const color = isDark(background) ? "#fff" : "#000";

        return (
            <div>
                <p>
                    <label>size: </label>
                    <b>{height}x{width}</b>
                </p>
                <div style={{ height, width, background, color, lineHeight: height + "px", margin: "auto" }}>
                    ({this.state.top},{this.state.left})
                </div>
                <div>
                    <p>
                        <label>position: </label>
                        <input style={{ width: 30 }} defaultValue={this.props.top} onChange={ e => this.handleTop(e) } />
                        <span>,</span>
                        <input style={{ width: 30 }} defaultValue={this.props.left} onChange={ e => this.handleLeft(e) } />
                    </p>

                    <button onClick={ e => this.props.addShape(background, height, width, this.state.top, this.state.left) }>
                        Add Shape
                    </button>
                </div>
            </div>
        );
    }

    handleTop(event) {
        var top = parseInt(event.target.value);
        if (!isNaN(top))
            this.setState({ top });
    }

    handleLeft(event) {
        var left = parseInt(event.target.value);
        if (!isNaN(left))
            this.setState({ left });        
    }
}
