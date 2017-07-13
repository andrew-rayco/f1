import request from 'superagent'

export function getSeasons(callback) {
  request
    .get('/api-v1/')
    .end((err, res) => {
      err ? callback(err) : callback(res.body)
    })
}

// export function getUser(user_id, callback) {
//   request
//     .get(`/api-v1/users/${user_id}`)
//     .end((err, res) => {
//       err ? callback(err) : callback(res.body)
//     })
// }
