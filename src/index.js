// Force the fileloader to load index.html
import 'file-loader?name=[name].[ext]!./index.html'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { createBrowserHistory } from 'history'
import store from './redux/createStore'
import { DevbarWrapper, Root } from '@components'
import './theme.scss'

if (!Config) {
  console.error('Config does not exist! ', process.env.NODE_ENV)
}

const history = syncHistoryWithStore(createBrowserHistory(), store)

// Render root
ReactDOM.render(
  <div className="app-root">
    <DevbarWrapper store={store}>
      <Provider store={store}>
        <Root history={history} />
      </Provider>
    </DevbarWrapper>
  </div>
  ,
  document.getElementById('reactRoot')
)
