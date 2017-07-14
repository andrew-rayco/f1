import request from 'superagent'

export function getSeasons(callback) {
  request
    .get('/api-v1/')
    .end((err, res) => {
      err ? callback(err) : callback(res.body)
    })
}

export function getCircuits(callback) {
  request
    .get('/api-v1/circuits')
    .end((err, res) => {
      err ? callback(err) : callback(res.body)
    })
}
