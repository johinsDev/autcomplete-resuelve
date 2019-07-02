import React from 'react'
import HomeView from './modules/home/HomeView'
import Header from './modules/shared/Header'

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main className="builder bg-white flex">
        <div className="md:w-5/6 max-w-6xl mx-2 md:mx-auto h-full">
          <HomeView />
        </div>
      </main>
    </>
  )
}

export default App
