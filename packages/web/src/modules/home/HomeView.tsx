import * as React from 'react'
import db from '../../utils/db'
import Autcomplete from '../shared/Autocomplete'

export default function HomeView() {
  const [reloadData, setReloadData] = React.useState(0)

  const addToFavorite = React.useCallback(async id => {
    await db.films
      .where(':id')
      .equals(id)
      .modify({ favorite: true })

    setReloadData(r => r + 1)
  }, [])

  return (
    <div className="md:px-8 py-4 md:py-16 mb-4 h-auto">
      <div className="block items-center xl:mt-16">
        <Autcomplete
          primaryLabel="Add to favorite"
          reloadData={reloadData}
          onPrimaryPress={addToFavorite}
        />
      </div>
    </div>
  )
}
