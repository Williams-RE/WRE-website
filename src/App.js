import './App.css';
import logo from './wre-logo.png';
import "typeface-roboto";

function App() {
  return (
    <div class="main">
      
      <div class="background">

      </div>

      <div class="logo">
        <img src={ logo } alt="logo" />
        <nav class = "navigation">
          <h1>Buy a Home</h1> 
          <h1> Sell a Home</h1> 
          <h1>Find an Agent</h1> 
          <h1> About Us </h1>
        </nav>
      </div>
      <div class="slogan">
        <h1>Find Your Dream Home</h1>
      </div>
    </div>
  );
}

export default App;
