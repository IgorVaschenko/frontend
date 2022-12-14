import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.scss'

import Calc from "./calc";
import Log from "./log";

import img from './react.png'

const calc = new Calc()
const log = new Log()

log.log(calc.add(1, 2, 3))

const item = document.createElement('img')
item.src = img

const App = () => <><p>Webpack-Dev-Server</p><img src={img} style={{width: '100px', height: '50px'}}/></>;

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(<App />)


// import Calc from "./calc";
// import Log from "./log";

// import img from './react.png'

// const calc= new Calc()
// const log= new Log()

// log.log(calc.add(1,2,3))

// const item = document.createElement('img')
// item.src = img

// document.body.append(item)

