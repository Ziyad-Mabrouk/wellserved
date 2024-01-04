//import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import NotificationContext from './NotificationContext';

const App = () => {
  const [notifications, setNotifications] = React.useState([
    {
    message: "Zone 1 has been served",
    },
    {
    message: "Zone 2 has been served",
    }]);

  return (
    <div className="App">
      <Router>
        <NotificationContext.Provider value={{ notifications, setNotifications }}>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
        </NotificationContext.Provider>
      </Router>
    </div>
  );
};

export default App;