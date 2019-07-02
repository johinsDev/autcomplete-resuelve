import map from 'ramda/es/map'
import pick from 'ramda/es/pick'
import React from 'react'
import db from './db'

const api = 'https://ghibliapi.herokuapp.com/films?_page=1&_limit=20'

export default () => {
  const [films, setFilms] = React.useState<any>([])

  React.useEffect(() => {
    db.version(1).stores({ films: 'id,title,director' })

    db.films.toArray().then((cachedFilms: []) => {
      if (!cachedFilms.length) {
        fetch(api, {
          method: 'GET',
        }).then(response => {
          if (response.status === 200) {
            response.json().then(r => {
              const filterFilms = map(pick(['id', 'title', 'director']), r)

              db.films
                .bulkAdd(filterFilms)
                .then(console.log)
                .catch(console.log)

              setFilms(filterFilms)
            })
          }
        })
      }

      setFilms(cachedFilms)
    })

    return () => db.close()
  }, [db])

  return films
}
