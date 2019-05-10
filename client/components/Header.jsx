import React from 'react'

const Header = (props) => {
    let path = props.location.pathname.substr(1).split('/')
    let seasonUrl

    if (path.indexOf('visualise') >= 0) {
        seasonUrl = '/#/season/' + path[1]
    }

    return (
        <div className="header">
            <nav>
                {
                    seasonUrl
                        ? <a id="home-link" href={seasonUrl}>Back to {path[1]} season</a>
                        : null
                }
                {/* {(path[0] !== "") ? console.log(`Path is ${path.length} long`, path, 'Breadcrumb start from the Header component') : console.log('Path is empty. You should be on the homepage', 'Breadcrumb start from the Header component')} */}
            </nav>
            <h1>
                <a className="main-header" href="/#/">F1ian</a>
            </h1>
        </div>
    )
}

module.exports = Header
