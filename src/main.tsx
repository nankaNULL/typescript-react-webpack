import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Routers } from './router';
import store from './store'

// 这里是新建的分支typescript
ReactDOM.render(
    <Provider store={store}>
        <Routers />
    </Provider>,
    document.getElementById('root')
)
