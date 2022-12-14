///Babel (13) chart


import React from 'react';
import ReactDOM from 'react-dom';

const App = () => <p>Hello</p>;

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(<App />,
  document.getElementById('root'));


// class App {
//     run = async (name = 'world') => {
//         console.log(`hello ${name}`);
//         console.log([1, 2, [2, 3]].flat());
//     }

// }

// const app = new App()
// app.run()
//     .then(() => console.log('done'))
//     .catch(() => console.log('error'))