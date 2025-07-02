import { useState } from 'react'
import { BrowserRouter as Router ,Routes,Route } from 'react-router-dom'
import { publicRoute } from '~/routers/index.jsx'
function App() {

  return (
    <div>
        <Router>
          <Routes>
            {publicRoute.map((route,index) => {
              let Page = route.component;
              return <Route  path={route.path} element= {<Page />} />
            })}
          </Routes>
        </Router>
    </div>
  )
}

export default App
