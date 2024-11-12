import React from "react";
import Header from "./components/Header";
import MainDisplay from "./components/MainDisplay";
import Suggestions from "./components/Suggestions";
import Forecast from "./components/Forecast";
import "./App.css";

const App = () => {
  return (
    <div className="weather-app">
      <Header/>
      <MainDisplay/>
      <Suggestions/>
      <Forecast/>
    </div>
  );
};

export default App;
