/* */ 
(function(process) {
  'use strict';
  var DOMPropertyOperations = require('./DOMPropertyOperations');
  var LinkedValueUtils = require('./LinkedValueUtils');
  var ReactDOMComponentTree = require('./ReactDOMComponentTree');
  var ReactUpdates = require('./ReactUpdates');
  var assign = require('./Object.assign');
  var invariant = require('fbjs/lib/invariant');
  var warning = require('fbjs/lib/warning');
  var didWarnValueLink = false;
  var didWarnValueNull = false;
  var didWarnValDefaultVal = false;
  function forceUpdateIfMounted() {
    if (this._rootNodeID) {
      ReactDOMTextarea.updateWrapper(this);
    }
  }
  function warnIfValueIsNull(props) {
    if (props != null && props.value === null && !didWarnValueNull) {
      process.env.NODE_ENV !== 'production' ? warning(false, '`value` prop on `textarea` should not be null. ' + 'Consider using the empty string to clear the component or `undefined` ' + 'for uncontrolled components.') : undefined;
      didWarnValueNull = true;
    }
  }
  var ReactDOMTextarea = {
    getNativeProps: function(inst, props) {
      !(props.dangerouslySetInnerHTML == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, '`dangerouslySetInnerHTML` does not make sense on <textarea>.') : invariant(false) : undefined;
      var nativeProps = assign({}, props, {
        defaultValue: undefined,
        value: undefined,
        children: inst._wrapperState.initialValue,
        onChange: inst._wrapperState.onChange
      });
      return nativeProps;
    },
    mountWrapper: function(inst, props) {
      if (process.env.NODE_ENV !== 'production') {
        LinkedValueUtils.checkPropTypes('textarea', props, inst._currentElement._owner);
        if (props.valueLink !== undefined && !didWarnValueLink) {
          process.env.NODE_ENV !== 'production' ? warning(false, '`valueLink` prop on `textarea` is deprecated; set `value` and `onChange` instead.') : undefined;
          didWarnValueLink = true;
        }
        if (props.value !== undefined && props.defaultValue !== undefined && !didWarnValDefaultVal) {
          process.env.NODE_ENV !== 'production' ? warning(false, 'Textarea elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled textarea ' + 'and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components') : undefined;
          didWarnValDefaultVal = true;
        }
        warnIfValueIsNull(props);
      }
      var defaultValue = props.defaultValue;
      var children = props.children;
      if (children != null) {
        if (process.env.NODE_ENV !== 'production') {
          process.env.NODE_ENV !== 'production' ? warning(false, 'Use the `defaultValue` or `value` props instead of setting ' + 'children on <textarea>.') : undefined;
        }
        !(defaultValue == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'If you supply `defaultValue` on a <textarea>, do not pass children.') : invariant(false) : undefined;
        if (Array.isArray(children)) {
          !(children.length <= 1) ? process.env.NODE_ENV !== 'production' ? invariant(false, '<textarea> can only have at most one child.') : invariant(false) : undefined;
          children = children[0];
        }
        defaultValue = '' + children;
      }
      if (defaultValue == null) {
        defaultValue = '';
      }
      var value = LinkedValueUtils.getValue(props);
      inst._wrapperState = {
        initialValue: '' + (value != null ? value : defaultValue),
        listeners: null,
        onChange: _handleChange.bind(inst)
      };
    },
    updateWrapper: function(inst) {
      var props = inst._currentElement.props;
      if (process.env.NODE_ENV !== 'production') {
        warnIfValueIsNull(props);
      }
      var value = LinkedValueUtils.getValue(props);
      if (value != null) {
        DOMPropertyOperations.setValueForProperty(ReactDOMComponentTree.getNodeFromInstance(inst), 'value', '' + value);
      }
    }
  };
  function _handleChange(event) {
    var props = this._currentElement.props;
    var returnValue = LinkedValueUtils.executeOnChange(props, event);
    ReactUpdates.asap(forceUpdateIfMounted, this);
    return returnValue;
  }
  module.exports = ReactDOMTextarea;
})(require('process'));
