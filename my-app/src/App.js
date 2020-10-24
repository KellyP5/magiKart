import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import {getCart} from './Cart'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button 
          variant="outline-primary"
          onClick={() => getCart(['B000P7188G', 'B074H7L7WY'])}
          >Primary</Button>{' '}

      </header>
    </div>
  );
}

export default App;


