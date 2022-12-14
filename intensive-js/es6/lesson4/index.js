import Cart from './components/cart.js';

// const cart = new Cart()
// document.querySelector('.sample').appendChild(cart.render())

(new Cart()).bindMount('.sample').render()