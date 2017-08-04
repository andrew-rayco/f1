import React from 'react'

const Header = (props) => {
  let path = props.location.pathname.substr(1).split('/')

  return (
    <div className="header">
      <nav>
          <a id="home-link" href="/#/">Home</a>
          {(path[0] !== "") ? console.log(`Path is ${path.length} long`, path) : console.log('Path is empty. You should be on the homepage')}
      </nav>
      <h1>F1ian</h1>
    </div>
  )
}

module.exports = Header
