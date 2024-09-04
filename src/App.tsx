import Navbar from './navbar'
import Footer from './footer';
import Home from './home';
import Timer from './timer';
import Algorithms from './algorithms';
import Error from './error';
import { useState } from 'react';
import axios from 'axios';
import { Route, Routes, BrowserRouter } from 'react-router-dom'

// API URL
axios.defaults.baseURL = "https://lastlayerdojoapi-rasya-harimurtis-projects.vercel.app";

function App() {

  // User defaults to "" when signed out
  const [signedIn, setSignedIn] = useState(false)
  const [user, setUser] = useState("")

  // Whether or not Successful Sign In Alert will appear
  const [alert, setAlert] = useState(false)

  // Prop function for navbar (changes states when signing in including alert)
  const handleSignIn = (user: string) => {
    setSignedIn(true);
    setUser(user);
    setAlert(true);
    setTimeout(() => setAlert(false), 3000);
  }

  // Prop function for navbar (signing out)
  const handleSignOut = () => {
    setSignedIn(false);
    setUser("");
  }

  // Prop function for home (to remove alert on clicking x)
  const removeAlert = () => {
    setAlert(false)
  }

  return (
    // Navbar and Footer are always active 
    <>
      <BrowserRouter>
        <Navbar signedIn={signedIn} user={user} onSignIn={handleSignIn} onSignOut={handleSignOut}/>
        <Routes>
          <Route path="/" element={<Home signedIn={signedIn} user={user} alert={alert} removeAlert={removeAlert} />}/>

          {/* Only Accessible when Signed in (Else: Error Component) */}
          {signedIn && <Route path="/oll" element={<Algorithms TrueForOLL={true} user={user} />}/>}
          {signedIn && <Route path="/pll" element={<Algorithms TrueForOLL={false} user={user} />}/>}

          <Route path="/timer" element={<Timer signedIn={signedIn} user={user} />}/>

           {/* When Route doesn't exist or is not accessible, go to Error Component */}
          <Route path="*" element={<Error />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App
