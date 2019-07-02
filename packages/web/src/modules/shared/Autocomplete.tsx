import compose from 'ramda/es/compose'
import contains from 'ramda/es/contains'
import filter from 'ramda/es/filter'
import length from 'ramda/es/length'
import map from 'ramda/es/map'
import pathOr from 'ramda/es/pathOr'
import prop from 'ramda/es/prop'
import toLower from 'ramda/es/toLower'
import * as React from 'react'
import { debounce, throttle } from 'throttle-debounce'
import useFilms from '../../utils/useFilms'

let qWaitingFor: any = null

export interface IAutcompleteProps {
  primaryLabel?: string
  onPrimaryPress?: (item: any) => void
  reloadData?: any
}

export default ({
  primaryLabel,
  onPrimaryPress,
  reloadData,
}: IAutcompleteProps) => {
  const [search, setSearch] = React.useState('')
  const [selected, setSelected] = React.useState('')
  const [isSearching, setIsSearching] = React.useState(false)
  const [results, setResults] = React.useState<any>([])

  const cachedFilms = useFilms(reloadData)

  function searchCharacters(q: string, films: any[]) {
    return Promise.resolve(() => {
      return filter(
        compose(
          contains(q.toLowerCase()),
          toLower,
          // @ts-ignore
          prop('title')
        )
      )(films)
    })
  }

  const _fetch = (q: string, films: any[]) => {
    qWaitingFor = q

    searchCharacters(q, films)
      .then(response => {
        if (q === qWaitingFor) {
          setResults(response)
        }
      })
      .catch(() => {
        setIsSearching(false)
        alert('Error loading  ')
      })
      .finally(() =>
        setTimeout(() => {
          setIsSearching(false)
        }, 500)
      )
  }

  const autocompleteSearch = (q: string, films: any[]) => {
    setIsSearching(true)
    _fetch(q, films)
  }

  const throttled = React.useRef(throttle(500, autocompleteSearch))
  const debounced = React.useRef(debounce(500, autocompleteSearch))

  React.useEffect(() => {
    if (search.length < 5 || search.endsWith(' ')) {
      throttled.current(search.trim(), cachedFilms)
    } else {
      debounced.current(search.trim(), cachedFilms)
    }
  }, [search, cachedFilms])

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  return (
    <div className="max-w-lg mx-auto flexp-6 bg-white rounded-lg shadow">
      <div className="px-3 py-6">
        <h5 className="text-gray-700 text-lg mb-6 ">Films</h5>
        <div className="w-full">
          <div className="relative">
            <span className="autocomplete">
              <input
                className="transition focus:outline-none border border-transparent focus:bg-white focus:border-gray-400 placeholder-gray-900 rounded-lg bg-gray-200 py-2 pr-4 pl-10 block w-full appearance-none leading-normal ds-input"
                type="text"
                placeholder="Search films"
                value={search}
                onChange={onChange}
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 pl-4 flex items-center">
                <svg
                  className="fill-current pointer-events-none text-gray-600 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                </svg>
              </div>
            </span>
          </div>
        </div>

        {isSearching && (
          <div className="text-center text-blue-900 p-6">Searching ...</div>
        )}

        {!length(results) && !isSearching && (
          <div className="text-center text-gray-600 p-6">No data</div>
        )}

        <ul className="flex flex-col mt-6 max-h-md overflow-scroll">
          {map(
            (film: any) => (
              <li
                onClick={() => setSelected(pathOr('', ['id'], film))}
                className={`cursor-pointer text-gray-700 flex justify-between font-medium px-5 py-2 hover:text-blue-900 hover:bg-blue-100 ${
                  selected === pathOr('', ['id'], film)
                    ? 'text-blue-900 bg-blue-100'
                    : ''
                }`}
                key={pathOr('', ['id'], film)}
              >
                <div className="flex items-center">
                  <div
                    className={`rounded-full h-2 w-2 flex items-center justify-center mr-3 ${
                      pathOr(false, ['favorite'], film)
                        ? 'bg-green-600'
                        : 'bg-gray-800'
                    }`}
                  />

                  <span>{pathOr('', ['title'], film)}</span>
                </div>
                <span className="text-gray-500 text-sm">
                  {pathOr('', ['director'], film)}
                </span>
              </li>
            ),
            results
          )}
        </ul>
      </div>
      {selected && (
        <div className="h-16 flex items-center justify-end w-full bg-gray-200 px-3 py-6">
          <button
            className="bg-transparent text-gray-900 font-semibold  py-2 px-4 border-transparent rounded mr-4"
            onClick={() => setSelected('')}
          >
            Cancel
          </button>
          <button
            onClick={() => onPrimaryPress && onPrimaryPress(selected)}
            className="bg-blue-800 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded shadow"
          >
            {primaryLabel}
          </button>
        </div>
      )}
    </div>
  )
}
