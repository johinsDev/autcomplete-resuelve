import * as React from 'react'
import db from '../../utils/db'

export default function Header() {
  const reload = React.useCallback(async () => {
    await db.films.clear()
    window.location.reload()
  }, [])

  return (
    <header className="md:fixed w-full z-50">
      <nav className="flex items-center justify-between flex-wrap bg-white p-3 shadow relative z-50">
        <div className="flex items-center flex-no-shrink text-black mr-6 ml-4">
          <a href="https://resuelvetudeuda.com">
            <img
              src="https://e9q9uqkt7zc4gs944hys116z-wpengine.netdna-ssl.com/es-co/wp-content/themes/rtd/theme/images/logo.svg"
              alt="Resuelve"
              width="90"
              className="retina"
            />
          </a>
        </div>
        <div className="flex items-center mr-4 md:mr-6 text-gray-700 hover:text-gray-800 cursor-pointer">
          <div className="text-sm md:text-base mr-3 w-3 md:w-4 h-3 md:h-4">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="undo"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="fill-current"
            >
              <path
                fill="currentColor"
                d="M212.333 224.333H12c-6.627 0-12-5.373-12-12V12C0 5.373 5.373 0 12 0h48c6.627 0 12 5.373 12 12v78.112C117.773 39.279 184.26 7.47 258.175 8.007c136.906.994 246.448 111.623 246.157 248.532C504.041 393.258 393.12 504 256.333 504c-64.089 0-122.496-24.313-166.51-64.215-5.099-4.622-5.334-12.554-.467-17.42l33.967-33.967c4.474-4.474 11.662-4.717 16.401-.525C170.76 415.336 211.58 432 256.333 432c97.268 0 176-78.716 176-176 0-97.267-78.716-176-176-176-58.496 0-110.28 28.476-142.274 72.333h98.274c6.627 0 12 5.373 12 12v48c0 6.627-5.373 12-12 12z"
              />
            </svg>
          </div>
          <span className="text-sm md:text-base" onClick={reload}>
            Reload films
          </span>
        </div>
      </nav>
      <div className="flex items-center justify-between flex-wrap bg-gray-300 p-4 border-nav border-solid border-b z-50">
        <div className="flex items-center justify-center flex-row xl:flex-col flex-no-shrink text-black ml-0 md:ml-4 mr-0 md:mr-4 xl:ml-6 xl:mr-6 animate-banner">
          <p className="text-sm md:text-base xl:text-lg text-gray-700">
            Find Ghibli films
          </p>
        </div>
      </div>
    </header>
  )
}
