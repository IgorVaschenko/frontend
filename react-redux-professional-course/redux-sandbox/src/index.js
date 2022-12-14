import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from "redux"
import { Provider } from 'react-redux'

import reducer from './reducer'
import App from './components/app'

const store = createStore(reducer)

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)








// // const incDispatch = () => dispatch(inc())
// // const decDispatch = () => dispatch(dec())
// // const rndDispatch = (payload) => dispatch(rnd(payload))
// //    ||
// //   \\//
// //    \/
// // const bindActionCreator = (creator, dispatch) => (...args) => dispatch(creator(...args))
// // const incDispatch = bindActionCreator(inc, dispatch)
// // const decDispatch = bindActionCreator(dec, dispatch)
// // const rndDispatch = bindActionCreator(rnd, dispatch)
// //    ||
// //   \\//
// //    \/
// // const { incDispatch, decDispatch, rndDispatch } = bindActionCreators({
// //   incDispatch: inc,
// //   decDispatch: dec,
// //   rndDispatch: rnd,
// // }, dispatch)
// //    ||
// //   \\//
// //    \/
// const { inc, dec, rnd } = bindActionCreators(actions, dispatch)

// // document
// //   .getElementById('inc')
// //   .addEventListener('click', inc)

// // document
// //   .getElementById('dec')
// //   .addEventListener('click', dec)
// // document
// //   .getElementById('rnd')
// //   .addEventListener('click', () => {
// //     const payload = Math.floor(Math.random() * 10)
// //     rnd(payload)
// //   })
// const root = ReactDOM.createRoot(document.querySelector('#root'))

// const update = () => {
//   root.render(
//     <Counter
//       counter={store.getState()}
//       inc={inc}
//       dec={dec}
//       rnd={() => {
//         const random = Math.floor(Math.random() * 10)
//         rnd(random)
//       }}
//     />
//   )
// }
// update()
// store.subscribe(update)



