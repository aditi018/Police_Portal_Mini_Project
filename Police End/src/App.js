import './App.css';
import './index.css'
import Navigation from './components/Header';
import React, {createContext , useState} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import Landing from "./screens/Landing/Landing"
import SignUp from "./screens/Signup/SignUp"
import Login from "./screens/Login/Login"
import Extract from "./screens/Extract/Extract"
import Request from "./screens/Request/Request";
import Map from "./screens/Map/Map"
import Translate from './components/Translate';
import Analytics from './screens/Analytics/analytics';
import Metrics from './screens/Metrics/metrics';
import States from './screens/States/States';




const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: `'Roboto Mono', monospace`,
      fontWeightLight: 400,
      fontWeightRegular: 600,
      fontWeightMedium: 900,
    },
  },
})

export const UserContext = createContext(null)




function App() {
  const [user, setUser] = useState({
    username: "",
    id: "",
    email: "",
  })

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={{ user, setUser }}>
          <Navigation />
          <div style={{ marginTop: "75px" }}>
            <Routes>
              <Route exact path='/' element={<Landing />} />
              <Route path='signup' element={<SignUp />} />
              <Route path='login' element={<Login />} />
              <Route path='map' element={<Map />} />
              <Route path='extract' element={<Extract />} />
              <Route path='translate' element={<Translate/>} />
              <Route path='analytics' element={<Analytics/>} />
              <Route path="requests" element={<Request/>} />
              <Route path='states' element={<States/>}/>
              <Route path='metrics' element={<Metrics/>}/>

            </Routes>
          </div>
        </UserContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
  )
}


export default App;
