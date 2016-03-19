import { connect } from "react-redux";

export function reduxify(mapStateToProps?: MapStateToProps,
    mapDispatchToProps?: MapDispatchToPropsFunction | MapDispatchToPropsObject) {
    return target => connect(mapStateToProps, mapDispatchToProps)(target);
}