import assoc from 'ramda/es/assoc'
import compose from 'ramda/es/compose'
import map from 'ramda/es/map'
import pick from 'ramda/es/pick'
import prop from 'ramda/es/prop'
import reverse from 'ramda/es/reverse'
import sortBy from 'ramda/es/sortBy'
import React from 'react'
import db from './db'

const api = 'https://ghibliapi.herokuapp.com/films?_page=1&_limit=20'

export default (reloadData?: any) => {
  const [films, setFilms] = React.useState<any>([])

  React.useEffect(() => {
    db.version(1).stores({ films: 'id,title,director,favorite' })

    db.open()

    db.films.toArray().then((cachedFilms: []) => {
      if (!cachedFilms.length) {
        fetch(api, {
          method: 'GET',
        }).then(response => {
          if (response.status === 200) {
            response.json().then(r => {
              const filterFilms = map(
                compose(
                  assoc('favorite', false),
                  // @ts-ignore
                  pick(['id', 'title', 'director'])
                ),
                r
              )

              db.films
                .bulkAdd(filterFilms)
                .then(console.log)
                .catch(console.log)

              setFilms(filterFilms)
            })
          }
        })
      }

      setFilms(
        reverse(
          sortBy(
            // @ts-ignore
            prop('favorite')
          )(cachedFilms)
        )
      )
    })

    return () => db.close()
  }, [db, reloadData])

  return films
}
