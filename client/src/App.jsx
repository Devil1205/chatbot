import './App.css';
import Home from './components/Home/Home';
import User from './components/SignupSignin/User';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

function App() {

  const base_URL = "http://localhost:5000";
  // const base_URL = "https://chat-zone-qu4q.onrender.com";

  const [message, setMessage] = useState("");
  const [showNavbar, setShowNavbar] = useState(true);
  const updateMessage = (type, message) => {
    setMessage({ type, message });
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }

  //Check valid user using authtoken
  const verifyUser = async () => {
    try {
      const authToken = !localStorage.getItem('auth-token') ? "" : localStorage.getItem('auth-token');
      const response = await fetch(base_URL + "/chatbotAuthAPI/verifyUser/", {
        method: "GET",
        headers: { "Content-type": "application/json", "auth-token": authToken }
      })
      // console.log(response);
      if (response.status !== 200)
        return false;
      const responseJson = await response.json();
      return responseJson;
    }
    catch (e) {
      console.log(e);
      return false;
    }
  }

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home verifyUser={verifyUser} message={message} updateMessage={updateMessage} setShowNavbar={setShowNavbar} base_URL={base_URL} />} />
        <Route exact path="/home" element={<Home verifyUser={verifyUser} message={message} updateMessage={updateMessage} setShowNavbar={setShowNavbar} base_URL={base_URL} />} />
        <Route exact path="/user" element={<User base_URL={base_URL} setShowNavbar={setShowNavbar} message={message} updateMessage={updateMessage} />} />
      </Routes>
    </Router>
  )
}

export default App
