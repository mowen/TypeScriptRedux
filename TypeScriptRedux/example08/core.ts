﻿import { Store, Dispatch, ActionCreator } from "redux";
import { Provider, connect } from "react-redux";

export interface IMapStateToProps {
    (state: any, ownProps?: any): any;
}

export interface IMapDispatchToPropsFunction {
    (dispatch: Dispatch, ownProps?: any): any;
}

export interface IMapDispatchToPropsObject {
    [name: string]: ActionCreator;
}

export function reduxify(mapStateToProps?: IMapStateToProps, mapDispatchToProps?: IMapDispatchToPropsFunction | IMapDispatchToPropsObject) {
    return target => connect(mapStateToProps, mapDispatchToProps)(target);
}

export function subscribeToStore() {
    return target => {
        var didMount = target.prototype.componentDidMount;
        target.prototype.componentDidMount = function() {
            if (didMount != null)
                didMount.call(this);
            this.unsubscribe = this.props.store.subscribe(() => this.forceUpdate());
        };

        var willUnmount = target.prototype.componentWillUnmount;
        target.prototype.componentWillUnmount = function() {
            if (willUnmount != null)
                willUnmount.call(this);
            this.unsubscribe();
        };
    }
}

export function bindAll() {
    return target => {
        function F() {
            for (let k in target.prototype) {
                const fn = target.prototype[k];
                if (typeof fn !== "function" || target.prototype.hasOwnProperty(k))
                    continue;
                this[k] = fn.bind(this);
            }
            target.apply(this, arguments);
        }
        F.prototype = target.prototype;

        var a = target; // Hack to get around TypeScript build error
        a = F;
        return a;
    }
}