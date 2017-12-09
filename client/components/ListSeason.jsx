import React from 'react'

import { Link } from 'react-router-dom'

const ListSeason = (props) => {
  let year = props.year
  return (
    <li className="season">
      <Link to={`/season/${year}`}>{year}</Link>
    </li>
  )
}

export default ListSeason
