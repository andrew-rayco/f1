import React from 'react'

const Header = (props) => {
  let path = props.location.pathname.substr(1).split('/')

  return (
    <div className="header">
      <nav>
          <a id="home-link" href="/#/">Home</a>
          {/* {(path[0] !== "") ? console.log(`Path is ${path.length} long`, path, 'Breadcrumb start from the Header component') : console.log('Path is empty. You should be on the homepage', 'Breadcrumb start from the Header component')} */}
      </nav>
      <h1><a className="main-header" href="/#/">F1ian</a></h1>
    </div>
  )
}

module.exports = Header
