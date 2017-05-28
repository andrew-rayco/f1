function getRacesInSeason (db, id) {
  return db('races')
    .select('races.year as season-year', 'races.url as races-url', '*')
    .join('seasons', 'seasons.year', '=', 'races.year')
    .where('races.year', id)
}

function getQualifyingResults (db, season, raceId) {
  return db('qualifying')
    .select('constructors.name as constructorName', 'constructors.url as constructorUrl', 'races.name as raceName', 'qualifying.*', 'drivers.*')
    .join('drivers', 'qualifying.driverId', '=', 'drivers.driverId')
    .join('races', 'races.raceId', '=', 'qualifying.raceId')
    .join('constructors', 'qualifying.constructorId', '=', 'constructors.constructorId')
    .where('qualifying.raceId', raceId)
  }

function getGrid (db, raceId) {
  console.log(raceId);
  return db('results')
    .select('races.name as raceName', 'drivers.url as driver-url', 'constructors.name as constructorName', 'constructors.url as constructorUrl', '*')
    .join('drivers', 'drivers.driverId', '=', 'results.driverId')
    .join('races', 'races.raceId', '=', 'results.raceId')
    .join('constructors', 'results.constructorId', '=', 'constructors.constructorId')
    .where('results.raceId', raceId)
    .orderBy('grid', 'asc')
}

module.exports = {
  getRacesInSeason,
  getQualifyingResults,
  getGrid
}
