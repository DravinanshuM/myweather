import React from 'react'
import Weather from './components/Weather'

const App = () => {
  // console.log(process.env.REACT_APP_WEATHER_API_KEY);
  // console.log(process.env);
  return (
     <div>
       <Weather/>
     </div>
  )
}

export default App