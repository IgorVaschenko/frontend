import axios from 'axios'
import logo from './logo.svg';
import './App.css';

function App() {

  const makeApiRequest = () => {
    axios.get('/api/testwithcurrentuser').then(response => {
      console.log('response from API', response);
    })
  }
  const makeAuthRequest = () => {
    axios.get('/testwithapidata').then(response => {
      console.log('response from AUTH', response);
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Dockerr
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <button onClick={makeApiRequest}>Make api request</button>
      <button onClick={makeAuthRequest}>Make auth request</button>
    </div>
  );
}

export default App;
