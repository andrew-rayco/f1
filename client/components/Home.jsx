import React from 'react'
import * as api from '../api'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      seasons: 'none yet'
    }
  }

  componentWillMount() {
    api.getSeasons((seasons) => {
      this.setState({seasons})
      // console.log(seasons[0].year)
    })
  }

  render() {
    return (
      <div>
        <h1>Formula 1 Database</h1>
        <div className="row">
          <div className="twelve columns home">
            <h3>Seasons</h3>
            <ul>{listSeasons(this.state.seasons)}</ul>

            <h3>Circuits</h3>
            <div className="circuits">
              <a href="/circuits">See all the circuits</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function listSeasons (seasons) {
  console.log(seasons[0])
  var htmlString = ''
  for (var i=0; i < seasons.length; i++) {
    htmlString += seasons[i].year + ' '
  }
  return htmlString
  // return seasons.map((season) => {
  //   return `<p>${season.year}</p>`
  // })
}




// <h1>Formula 1 Database</h1>
//
// <div class="row">
//   <div class="twelve columns home">
//     <h3>Seasons</h3>
//
//     <div class="seasons">
//       {{#each seasons}}
//         <div class="season">
//           <a href="/season/{{year}}">{{year}}</a>
//         </div>
//       {{/each}}
//     </div>
//
//     <h3>Circuits</h3>
//     <div class="circuits">
//       <a href="/circuits">See all the circuits</a>
//     </div>
//   </div>
// </div>
