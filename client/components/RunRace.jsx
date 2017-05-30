import React from 'react'

class RunRace extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lap: 0,
      sortedLaps: null,
      count: 0
    }
  }

  componentDidMount () {
    // console.log('get your props here!', this.props);
    var lapTicker = setInterval(() => {
      // this is where some sort of state business occurs
      this.setState({
        count: this.state.count++,
        sortedLaps: this.props.lap.filter((lap) => {
          return lap.lap == this.state.count
        })
      })
    }, 1000) // I'm getting an error here!
  }

  showRace(data) {
    // console.log(data.raceData);
  return data.raceData.map((driverLap, i) => {
   if (driverLap.lap == 1) {
     return (
       <div key={i} className="driver">
         <div className={driverLap.surname}>
           {driverLap.position}: {driverLap.surname}: {driverLap.time}
         </div>
       </div>
       )
     }
    })
    // console.log(data[0].lap);
  }

  render() {
    return (
      <div className="race">
        {this.showRace(this.props)}
      </div>
    )
  }

}




export default RunRace
