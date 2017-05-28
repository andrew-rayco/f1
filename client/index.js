import React from 'react'
import ReactDom from 'react-dom'

import App from './components/App'

console.log(window.seasons);
ReactDom.render(
  <App />,
  document.getElementById('app')
)
