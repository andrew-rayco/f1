import React from 'react'

const Header = (props) => {
  console.log(props.location.pathname.substr(1))
  return (
    <div className="header">
      <nav>
          <a id="home-link" href="/#/">Home</a>
      </nav>
      <h1>F1ian</h1>
    </div>
  )
}

module.exports = Header
