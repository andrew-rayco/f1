import React from 'react'

const ListSeasons = (props) => {
  let year = props.year
  return (
    <li className="season">
      <a href={`/#/season/${year}`}>{year}</a>
    </li>
  )
}

export default ListSeasons
