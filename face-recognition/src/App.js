import React from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation"
import Rank from "./components/Rank/Rank"
import Logo from "./components/Logo/Logo"
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm"
function App() {
  return (
    <div className="App">
      <Navigation/>
      <Logo/>
      <Rank/>
      <ImageLinkForm/>
      {/* 
      
      <FaceRecognition/> */}
    </div>
  );
}

export default App;
