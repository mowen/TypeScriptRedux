/// <reference path='../typings/browser.d.ts'/>

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Counter from './Counter';

ReactDOM.render(
    <Provider>
        <Counter field="width" step={10} />
        <Counter field="height" step={10} />
    </Provider>,
    document.getElementById('content')
);
