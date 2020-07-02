import React, {Component} from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation"
import Rank from "./components/Rank/Rank"
import Logo from "./components/Logo/Logo"
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm"
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import SignIn from "./components/SignIn/SignIn"

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
      box : {},
      route: 'signin',
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input : event.target.value})
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    this.setState({imageUrl : this.state.input})
    
    // Predict the contents of an image by passing in a URL.
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    this.setState({route :route});
  }
  render(){
    return (
      <div className="App">
        <Particles className='particles'
          params={{particlesOptions}} 
        />
        <Navigation onRouteChange={this.onRouteChange}/>
        {this.state.route === 'signin' ?
          <SignIn onRouteChange={this.onRouteChange}/> :
        <div>
          <Logo/>
          <Rank/>
          <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit}
          />
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
        </div>
        }
      </div>
    );
  }
}

export default App;
