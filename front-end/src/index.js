import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './reduxStore/store/store'
import './sass/index.scss'
import App from './App'

import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router } from 'react-router-dom'
import HeaderContextProvider from './Context/HeaderContext'
import ProductContextProvider from './Context/ProductContext'

ReactDOM.render(
  <ProductContextProvider>
    <HeaderContextProvider>
      <React.StrictMode>
        <Router>
          <Provider store={store}>
            <App />
          </Provider>
        </Router>
      </React.StrictMode>
    </HeaderContextProvider>
  </ProductContextProvider>,
  document.getElementById('yuniver')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
