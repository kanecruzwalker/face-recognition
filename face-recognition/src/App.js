import React, {Component} from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation"
import Rank from "./components/Rank/Rank"
import Logo from "./components/Logo/Logo"
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm"
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'

const app = new Clarifai.App({apiKey: ''});

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}


class App extends Component {

  constructor(){
    super();
    this.state = {
      input : '',
      imageUrl : '',
    }
  }

  onInputChange = (event) => {
    this.setState({input : event.target.value})
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    this.setState({imageUrl : this.state.input})
    
    // Predict the contents of an image by passing in a URL.
    app.models.predict(Clarifai.GENERAL_MODEL, this.state.input)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render(){
    return (
      <div className="App">
        <Particles className='particles'
          params={{particlesOptions}} 
        />
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
