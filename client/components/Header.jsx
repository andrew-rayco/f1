import React from 'react'

const Header = () => {
  return (
    <div className="header">
      <nav>
        <a id="home-link" href="/"><img id="home-link-img" src="/images/car-formula-1.png" alt="F1 car silhouette" /></a>
      </nav>
      <h1>Formula 1 Database</h1>
    </div>
  )
}

module.exports = Header
