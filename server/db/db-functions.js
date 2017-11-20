function getRacesInSeason (db, id) {
  return db('races')
    .select(
      'races.year as season-year',
      'races.url as raceUrl',
      'races.name as raceName',
      '*'
    )
    .join('seasons', 'seasons.year', '=', 'races.year')
    .where('races.year', id)
    .orderBy('round', 'asc')
}

function getQualifyingResults (db, season, raceId) {
  return db('qualifying')
    .select(
      'constructors.name as constructorName',
      'constructors.url as constructorUrl',
      'races.name as raceName',
      'races.url as raceUrl',
      'drivers.url as driverUrl',
      'qualifying.*',
      'drivers.*',
      'races.*'
    )
    .join('drivers', 'qualifying.driverId', '=', 'drivers.driverId')
    .join('races', 'races.raceId', '=', 'qualifying.raceId')
    .join('constructors', 'qualifying.constructorId', '=', 'constructors.constructorId')
    .where('qualifying.raceId', raceId)
  }

function getGrid (db, raceId) {
  return db('results')
    .select(
      'races.name as raceName',
      'drivers.url as driverUrl',
      'constructors.name as constructorName',
      'constructors.url as constructorUrl',
      'races.url as raceUrl',
      '*'
    )
    .join('drivers', 'drivers.driverId', '=', 'results.driverId')
    .join('races', 'races.raceId', '=', 'results.raceId')
    .join('constructors', 'results.constructorId', '=', 'constructors.constructorId')
    .where('results.raceId', raceId)
    .orderBy('positionOrder', 'asc')
}

function visualise (db, season, raceId) {
  return db('laptimes')
    .select('*')
    .where('laptimes.raceId', raceId)
    .join('drivers', 'laptimes.driverId', '=', 'drivers.driverId')
    .orderBy('position', 'asc')
}

function getAllLaptimes (db, season, raceId) {
  return db('laptimes')
    .select('*')
    .where('laptimes.raceId', raceId)
    .join('drivers', 'laptimes.driverId', '=', 'drivers.driverId')
    .orderBy('lap', 'asc')
}

function getRaceResults (db, season, raceId) {
  return db('results')
    .select(
      'races.name as raceName',
      'races.year as raceYear',
      'races.url as raceUrl',
      'drivers.url as driverUrl',
      'constructors.url as constructorUrl',
      'constructors.name as constructorName',
      'results.time as raceTime',
      '*'
    )
    .where('results.raceId', raceId)
    .join('drivers', 'results.driverId', '=', 'drivers.driverId')
    .join('races', 'results.raceId', '=', 'races.raceId')
    .join('constructors', 'constructors.constructorId', '=', 'results.constructorId')
    .orderBy('position', 'asc')
}

function getRaceInfo (db, season, raceId) {
  return db('races')
    .select('*')
    .where('races.raceId', raceId)
    .join('results', 'races.raceId', '=', 'results.raceId')
    .join('drivers', 'results.driverId', '=', 'drivers.driverId')
}

module.exports = {
  getRacesInSeason,
  getQualifyingResults,
  getGrid,
  visualise,
  getAllLaptimes,
  getRaceResults,
  getRaceInfo
}
