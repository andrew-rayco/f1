import React from 'react'

class RunRace extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lap: 1,
      sortedLaps: [], // All laptimes for current lap
      count: 1,

    }
  }

  // attempt to set initial state value of 0 for each driver (to avoid NaN error)
  letsTryThatAgain() {
    this.props.raceData.forEach((lap) => {  // I can't get this to work
      // console.log(lap.milliseconds);
      var driverSurname = lap.surname
      // var stateCopy = Object.assign({}, this.state)
      // stateCopy[driverSurname] = typeOf(Number) // It needs to start at 0, but I can't define it as zero everytime!
      // stateCopy[driverSurname] += lap.milliseconds
      //
      // this.setState(stateCopy)
      return this.setState({
        driverSurname: 0
      })
    })
  }

  // calculate total race laps so setInterval knows when to stop
  maxLapsInRace() {
    var maxLaps = 0;
    this.props.raceData.forEach((lap) => {
      if (lap.lap > maxLaps) {
        maxLaps = lap.lap
      }
    })
    return maxLaps
  }


  // calculate total race time for winner
  winnerRaceTime() {
    var winningTime = 0; // milliseconds
    this.props.raceData.forEach((lap) => {
      if (lap.surname == 'Ricciardo') {  // hardcoded race winner. Most sub-optimal
        winningTime += lap.milliseconds
      }
    })
    return winningTime
  }


  // Find all laptimes for next lap and set state
  componentDidMount () {
    var lapTicker = setInterval(() => {
      if (this.state.count < this.maxLapsInRace()) {
        this.setState({
          sortedLaps: this.props.raceData.filter((lap) => {
            return lap.lap == this.state.count
          }),
          count: this.state.count + 1,
          lap: this.state.lap + 1
        })
      } else {
        clearInterval(lapTicker)
      }
    }, 150)

    // cumulatively add laptimes to generate progress bar
    this.props.raceData.forEach((lap) => {  // I can't get this to work
      // console.log(lap.milliseconds);
      var driverSurname = lap.surname
      var stateCopy = Object.assign({}, this.state)
      // stateCopy[driverSurname] = typeOf(Number) // It needs to start at 0, but I can't define it as zero everytime!
      stateCopy[driverSurname] = lap.milliseconds

      this.setState(stateCopy)
    })
  }


  showRace(data) {
    // console.log(data.raceData);
  return data.raceData.map((driverLap, i) => {
   if (driverLap.lap == this.state.count) {
     return (
         <div key={i} className="driver">
           <div className={driverLap.surname}>
             {driverLap.position}: {driverLap.surname}: {driverLap.time}
             <div className="vis-color">&nbsp;</div>
           </div>
         </div>
       )
     }
    })
  }


  render() {
    return (
      <div className="race">
        {console.log(this.state)}
        {/* {console.log(this.winnerRaceTime())} */}
        <h3>Lap {this.state.lap}</h3>
        {this.showRace(this.props)}
      </div>
    )
  }
}

export default RunRace
