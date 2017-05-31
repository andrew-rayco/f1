import request from 'superagent'

export function getSeasons(callback) {
  request
    .get('/api/v1/seasons')
    .end((err, result) => {
      if(err) {

      } else {
        callback(result)
      }
    })
}

//in code which calls this
//import * as api from './api'
//api.getSeasons((seasons) => console.log(seasons))
