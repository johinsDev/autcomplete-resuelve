import * as React from 'react'
import Autcomplete from '../shared/Autocomplete'
import Modal from '../shared/Modal'

export default function HomeView() {
  return (
    <div className="md:px-8 py-4 md:py-16 mb-4 h-auto">
      <div className="block items-center xl:mt-16">
        <Autcomplete />
      </div>
    </div>
  )
}
